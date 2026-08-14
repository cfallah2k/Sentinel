'use client';

import { useState, type FormEvent, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Eye, EyeOff, Lock, Mail, ShieldAlert } from 'lucide-react';
import { roleLabel } from '@/lib/mock-data';
import { DEMO_CREDENTIALS, encodeSession, findDemoAccount } from '@/lib/role-access';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/dashboard';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const signIn = (accEmail: string, accPassword: string) => {
    const account = findDemoAccount(accEmail, accPassword);
    if (!account) {
      setError('Invalid email or password. Use one of the demo accounts below.');
      setLoading(false);
      return;
    }
    setError('');
    document.cookie = `sentinel_session=${encodeSession(account.role)};path=/;max-age=86400;SameSite=Lax`;
    router.push(next === '/login' ? account.landing : next);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Enter your email and password to continue.');
      return;
    }
    setLoading(true);
    window.setTimeout(() => signIn(email, password), 500);
  };

  const quickLogin = (accEmail: string) => {
    const account = findDemoAccount(accEmail, DEMO_CREDENTIALS.find((a) => a.email === accEmail)?.password ?? '');
    if (!account) return;
    setEmail(account.email);
    setPassword(account.password);
    setLoading(true);
    setError('');
    document.cookie = `sentinel_session=${encodeSession(account.role)};path=/;max-age=86400;SameSite=Lax`;
    router.push(next === '/login' ? account.landing : next);
  };

  return (
    <>
      <form onSubmit={submit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Work email
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" size={16} />
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/75 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15"
            />
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Password
            </label>
            <Link href="/forgot-password" className="text-[0.7rem] font-semibold text-sentinel-300 transition hover:text-sentinel-200">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" size={16} />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/75 py-2.5 pl-10 pr-11 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-300"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff className="h-4 w-4" size={16} /> : <Eye className="h-4 w-4" size={16} />}
            </button>
          </div>
        </div>

        {error ? (
          <p className="flex items-center gap-2 rounded-2xl border border-rose-500/25 bg-rose-500/10 px-4 py-2.5 text-xs text-rose-300 sm:col-span-2">
            <ShieldAlert className="h-3.5 w-3.5 shrink-0" size={14} /> {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sentinel-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-sentinel-400 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
        >
          {loading ? 'Signing in...' : 'Sign in to Sentinel'}
        </button>

        <p className="text-center text-xs text-slate-500 sm:col-span-2">
          Protected by enterprise-grade encryption and audit logging.
        </p>
      </form>

      <div className="mt-6 border-t border-white/10 pt-5">
        <p className="mb-3 text-[0.6rem] font-bold uppercase tracking-[0.25em] text-slate-600">Demo accounts — one click per role</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {DEMO_CREDENTIALS.map((acc) => (
            <button
              key={acc.role}
              type="button"
              disabled={loading}
              onClick={() => quickLogin(acc.email)}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-left transition hover:border-sentinel-500/40 hover:bg-sentinel-500/10"
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white">{roleLabel(acc.role)}</p>
                <p className="truncate text-[0.65rem] text-slate-500">{acc.email}</p>
              </div>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-600 transition group-hover:text-sentinel-300" size={14} />
            </button>
          ))}
        </div>
        <p className="mt-3 text-[0.65rem] text-slate-600">
          Every account uses the password <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-slate-400">demo123</code>.
          Each role is locked to its own navigation and pages.
        </p>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <div className="mb-8 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sentinel-500 to-cyan-400 shadow-glow">
          <ShieldAlert className="h-5 w-5 text-white" size={20} />
        </span>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-white">Sentinel</p>
          <p className="text-[0.6rem] uppercase tracking-[0.2em] text-slate-500">AI Control Plane</p>
        </div>
      </div>

      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[var(--surface)] p-6 shadow-panel sm:p-8 backdrop-blur-xl">
        <h1 className="text-2xl font-semibold tracking-tight text-white">Welcome back</h1>
        <p className="mt-1.5 text-sm text-slate-400">Sign in to your Sentinel control plane.</p>
        <div className="mt-6">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>

      <p className="mt-6 text-sm text-slate-400">
        New to Sentinel?{' '}
        <Link href="/register" className="font-semibold text-sentinel-300 transition hover:text-sentinel-200">
          Create an account
        </Link>
      </p>
    </div>
  );
}