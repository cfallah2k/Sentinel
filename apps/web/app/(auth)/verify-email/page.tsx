'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2, MailCheck, ShieldAlert } from 'lucide-react';
import { currentUser } from '@/lib/mock-data';

const COOLDOWN_SECONDS = 30;

export default function VerifyEmailPage() {
  const [cooldown, setCooldown] = useState(0);
  const [sending, setSending] = useState(false);
  const [resent, setResent] = useState(false);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setInterval(() => {
      setCooldown((c) => (c <= 1 ? 0 : c - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [cooldown]);

  const resend = () => {
    if (cooldown > 0 || sending) return;
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setResent(true);
      setCooldown(COOLDOWN_SECONDS);
    }, 600);
  };

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
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sentinel-500/15">
            <MailCheck className="h-7 w-7 text-sentinel-300" size={28} />
          </span>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white">Check your inbox</h1>
          <p className="mt-1.5 text-sm text-slate-400">
            We sent a verification link to{' '}
            <span className="font-semibold text-white">{currentUser.email}</span>. Click the link to activate your account.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          {resent ? (
            <p className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-300">
              A fresh link is on its way. It expires in 24 hours.
            </p>
          ) : null}

          <button
            type="button"
            onClick={resend}
            disabled={cooldown > 0 || sending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {sending ? <Loader2 className="h-4 w-4 animate-spin" size={16} /> : null}
            {cooldown > 0 ? `Resend link in ${cooldown}s` : sending ? 'Sending...' : 'Resend verification link'}
          </button>

          <Link
            href="/login"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sentinel-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
          >
            Continue to sign in <ArrowRight className="h-4 w-4" size={16} />
          </Link>
        </div>
      </div>

      <p className="mt-6 text-sm text-slate-400">
        Didn&apos;t get anything? Check spam, or{' '}
        <Link href="/register" className="font-semibold text-sentinel-300 transition hover:text-sentinel-200">
          use a different email
        </Link>
        .
      </p>
    </div>
  );
}
