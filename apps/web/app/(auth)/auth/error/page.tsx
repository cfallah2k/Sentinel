import Link from 'next/link';
import { ShieldAlert, ShieldX } from 'lucide-react';

export default function AuthErrorPage() {
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
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/15">
            <ShieldX className="h-7 w-7 text-rose-400" size={28} />
          </span>
          <span className="mt-4 rounded-full border border-rose-500/25 bg-rose-500/10 px-3 py-1 font-mono text-xs font-semibold text-rose-300">
            ERR-4001
          </span>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white">Authentication failed</h1>
          <p className="mt-1.5 text-sm text-slate-400">
            We couldn&apos;t complete your sign-in. The session may have expired, or the security token was rejected. No
            changes were made to your account.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <Link
            href="/login"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sentinel-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
          >
            Back to sign in
          </Link>
          <Link
            href="/register"
            className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:text-white"
          >
            Create an account
          </Link>
        </div>
      </div>

      <p className="mt-6 text-sm text-slate-400">
        Still stuck? Contact your organization&apos;s security team or{' '}
        <Link href="/forgot-password" className="font-semibold text-sentinel-300 transition hover:text-sentinel-200">
          reset your password
        </Link>
        .
      </p>
    </div>
  );
}
