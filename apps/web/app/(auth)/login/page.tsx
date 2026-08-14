'use client';

import { useState, type FormEvent, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, ShieldAlert } from 'lucide-react';
import { encodeSession, findDemoAccount } from '@/lib/role-access';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/dashboard';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Enter your email and password to continue.');
      return;
    }
    setLoading(true);
    setError('');
    window.setTimeout(() => {
      const account = findDemoAccount(email, password);
      if (!account) {
        setError('Invalid email or password.');
        setLoading(false);
        return;
      }
      document.cookie = `sentinel_session=${encodeSession(account.role)};path=/;max-age=86400;SameSite=Lax`;
      router.push(next === '/login' ? account.landing : next);
    }, 500);
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