'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2, Mail, MailCheck, ShieldAlert } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Enter the email linked to your account.');
      return;
    }
    setLoading(true);
    setError('');
    window.setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 600);
  };

  if (sent) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="mb-8 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sentinel-500 to-cyan-400 shadow-glow">
            <ShieldAlert className="h-5 w-5 text-white" size={20} />
          </span>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-white">Sentinel</p>
            <p className="text-[0.6rem] uppercase tracking-[0.2em] text-slate-500">AI Control Plane</p>
          </div>
        </div>

        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[rgba(15,23,42,0.92)] p-8 shadow-panel backdrop-blur-xl">
          <div className="flex flex-col items-center py-2 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15">
              <MailCheck className="h-7 w-7 text-emerald-400" size={28} />
            </span>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white">Check your inbox</h1>
            <p className="mt-1.5 text-sm text-slate-400">
              If an account exists for <span className="font-semibold text-white">{email}</span>, a password reset link is on its way.
              It expires in 1 hour.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <Link
              href="/login"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sentinel-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
            >
              Back to sign in <ArrowRight className="h-4 w-4" size={16} />
            </Link>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:text-white"
            >
              Didn&apos;t get it? Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="mb-8 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sentinel-500 to-cyan-400 shadow-glow">
          <ShieldAlert className="h-5 w-5 text-white" size={20} />
        </span>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-white">Sentinel</p>
          <p className="text-[0.6rem] uppercase tracking-[0.2em] text-slate-500">AI Control Plane</p>
        </div>
      </div>

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[rgba(15,23,42,0.92)] p-8 shadow-panel backdrop-blur-xl">
        <h1 className="text-2xl font-semibold tracking-tight text-white">Reset your password</h1>
        <p className="mt-1.5 text-sm text-slate-400">
          Enter your work email and we&apos;ll send you a secure reset link.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="fp-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Work email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" size={16} />
              <input
                id="fp-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/75 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15"
              />
            </div>
          </div>

          {error ? (
            <p className="flex items-center gap-2 rounded-2xl border border-rose-500/25 bg-rose-500/10 px-4 py-2.5 text-xs text-rose-300">
              <ShieldAlert className="h-3.5 w-3.5 shrink-0" size={14} /> {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sentinel-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-sentinel-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" size={16} /> : null}
            {loading ? 'Sending link...' : 'Send reset link'}
          </button>
        </form>
      </div>

      <p className="mt-6 text-sm text-slate-400">
        Remembered it?{' '}
        <Link href="/login" className="font-semibold text-sentinel-300 transition hover:text-sentinel-200">
          Sign in
        </Link>
      </p>
    </div>
  );
}
