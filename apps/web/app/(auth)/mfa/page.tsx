import Link from 'next/link';
import { CheckCircle2, KeyRound, ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';
import { currentUser } from '@/lib/mock-data';

const mfaEnabled = currentUser.mfa;

export default function MfaPage() {
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
        <h1 className="text-2xl font-semibold tracking-tight text-white">Multi-factor authentication</h1>
        <p className="mt-1.5 text-sm text-slate-400">
          Require a second proof of identity on every sign-in to your Sentinel control plane.
        </p>

        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-slate-950/75 p-5">
            <div className="flex items-start gap-3">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  mfaEnabled ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'
                }`}
              >
                {mfaEnabled ? <CheckCircle2 className="h-5 w-5" size={20} /> : <AlertTriangle className="h-5 w-5" size={20} />}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-white">Current status</p>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider ${
                      mfaEnabled ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'
                    }`}
                  >
                    {mfaEnabled ? 'Enrolled' : 'Not set up'}
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-5 text-slate-400">
                  {mfaEnabled
                    ? 'Your account is protected by a second factor. Review your methods and recovery options below.'
                    : 'Your account relies on a password alone. Enroll now to protect access to governance and billing.'}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/75 p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sentinel-500/15 text-sentinel-300">
                <KeyRound className="h-5 w-5" size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">How it works</p>
                <ul className="mt-1.5 space-y-1 text-xs leading-5 text-slate-400">
                  <li>Sign in with your email and password as usual.</li>
                  <li>Sentinel then requests a time-based code, SMS code, or security key.</li>
                  <li>Codes rotate every 30 seconds and expire after a single use.</li>
                  <li>Recovery codes can be used once per session if your device is lost.</li>
                </ul>
              </div>
            </div>
          </div>

          {mfaEnabled ? (
            <Link
              href="/mfa/setup"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sentinel-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
            >
              <ShieldCheck className="h-4 w-4" size={16} /> Manage MFA
            </Link>
          ) : (
            <div className="space-y-3">
              <Link
                href="/mfa/setup"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sentinel-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
              >
                Set up MFA
              </Link>
              <Link
                href="/mfa/verify"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:text-white"
              >
                I already have MFA — verify
              </Link>
            </div>
          )}
        </div>
      </div>

      <p className="mt-6 text-sm text-slate-400">
        <Link href="/login" className="font-semibold text-sentinel-300 transition hover:text-sentinel-200">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
