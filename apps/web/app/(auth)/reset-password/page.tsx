'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { CheckCircle2, Eye, EyeOff, Lock, ShieldAlert } from 'lucide-react';

function strength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score += 1;
  if (pw.length >= 12) score += 1;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score += 1;
  if (/\d/.test(pw) && /[^a-zA-Z0-9]/.test(pw)) score += 1;
  return score;
}

const strengthMeta = [
  { label: 'Too weak', color: 'bg-rose-500', text: 'text-rose-400' },
  { label: 'Weak', color: 'bg-amber-500', text: 'text-amber-400' },
  { label: 'Fair', color: 'bg-sentinel-500', text: 'text-sentinel-300' },
  { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-400' }
];

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const score = strength(password);
  const meta = score > 0 ? strengthMeta[score - 1] : null;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (password.length < 12) {
      setError('Passwords must be at least 12 characters.');
      return;
    }
    if (password !== confirm) {
      setError('The passwords do not match.');
      return;
    }
    setLoading(true);
    setError('');
    window.setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 600);
  };

  if (done) {
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

        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[var(--surface)] p-6 shadow-panel sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col items-center py-2 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15">
              <CheckCircle2 className="h-7 w-7 text-emerald-400" size={28} />
            </span>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white">Password updated</h1>
            <p className="mt-1.5 text-sm text-slate-400">
              Your password has been changed. Sign in with your new credentials to continue.
            </p>
          </div>

          <Link
            href="/login"
            className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-sentinel-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

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

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[var(--surface)] p-6 shadow-panel sm:p-8 backdrop-blur-xl">
        <h1 className="text-2xl font-semibold tracking-tight text-white">Choose a new password</h1>
        <p className="mt-1.5 text-sm text-slate-400">Minimum 12 characters with mixed case, a number, and a symbol.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="rp-password" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              New password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" size={16} />
              <input
                id="rp-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/75 py-2.5 pl-10 pr-11 text-sm text-white outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15"
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

            {password ? (
              <div className="mt-2 space-y-1.5">
                <div className="flex gap-1.5">
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className={`h-1 flex-1 rounded-full ${i < score ? meta?.color : 'bg-white/10'}`} />
                  ))}
                </div>
                <p className={`text-[0.65rem] font-semibold uppercase tracking-wider ${meta?.text ?? 'text-slate-500'}`}>
                  {meta?.label ?? 'Enter a password to see strength'}
                </p>
              </div>
            ) : null}
          </div>

          <div>
            <label htmlFor="rp-confirm" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Confirm new password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" size={16} />
              <input
                id="rp-confirm"
                type={showConfirm ? 'text' : 'password'}
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/75 py-2.5 pl-10 pr-11 text-sm text-white outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-300"
                aria-label="Toggle password visibility"
              >
                {showConfirm ? <EyeOff className="h-4 w-4" size={16} /> : <Eye className="h-4 w-4" size={16} />}
              </button>
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
            {loading ? 'Updating password...' : 'Update password'}
          </button>
        </form>
      </div>

      <p className="mt-6 text-sm text-slate-400">
        <Link href="/login" className="font-semibold text-sentinel-300 transition hover:text-sentinel-200">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
