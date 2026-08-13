'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Building2, CheckCircle2, Eye, EyeOff, Lock, Mail, ShieldAlert, User, X } from 'lucide-react';
import { currentOrg, invitations } from '@/lib/mock-data';

const inviteeEmail = invitations.find((i) => i.status === 'Pending')?.email ?? invitations[0].email;

export default function AcceptInvitationPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !password.trim()) {
      setError('Enter your full name and a password to accept the invitation.');
      return;
    }
    if (password.length < 12) {
      setError('Passwords must be at least 12 characters.');
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

        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[rgba(15,23,42,0.92)] p-8 shadow-panel backdrop-blur-xl">
          <div className="flex flex-col items-center py-2 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15">
              <CheckCircle2 className="h-7 w-7 text-emerald-400" size={28} />
            </span>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white">You&apos;re in</h1>
            <p className="mt-1.5 text-sm text-slate-400">
              Your account for <span className="font-semibold text-white">{currentOrg.name}</span> is ready. Sign in to get started.
            </p>
          </div>

          <Link
            href="/login"
            className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-sentinel-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
          >
            Sign in to {currentOrg.name}
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

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[rgba(15,23,42,0.92)] p-8 shadow-panel backdrop-blur-xl">
        <div className="flex items-start gap-3 rounded-2xl border border-sentinel-500/20 bg-sentinel-500/10 p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sentinel-500/15">
            <Building2 className="h-5 w-5 text-sentinel-300" size={20} />
          </span>
          <div>
            <p className="text-sm font-semibold text-white">You&apos;ve been invited to join {currentOrg.name}</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              {currentOrg.name} uses Sentinel to govern their AI systems. Accept to request access to their control plane.
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/75 p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-800">
              <Mail className="h-4 w-4 text-slate-400" size={16} />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Invited as</p>
              <p className="text-sm font-medium text-white">{inviteeEmail}</p>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="inv-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Full name
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" size={16} />
              <input
                id="inv-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/75 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15"
              />
            </div>
          </div>

          <div>
            <label htmlFor="inv-password" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" size={16} />
              <input
                id="inv-password"
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
            {loading ? 'Accepting invitation...' : 'Accept invitation'}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between">
          <Link href="/login" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition hover:text-white">
            <X className="h-3.5 w-3.5" size={14} /> Decline invitation
          </Link>
          <Link href="/register" className="text-xs font-semibold text-sentinel-300 transition hover:text-sentinel-200">
            Create a new account instead
          </Link>
        </div>
      </div>
    </div>
  );
}
