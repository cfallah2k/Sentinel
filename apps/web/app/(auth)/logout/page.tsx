'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Home, LogIn, ShieldAlert } from 'lucide-react';

export default function LogoutPage() {
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    document.cookie = 'sentinel_session=;path=/;max-age=0;SameSite=Lax';
    setCleared(true);
  }, []);

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
            <LogIn className="h-7 w-7 text-sentinel-300" size={28} />
          </span>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white">Signed out</h1>
          <p className="mt-1.5 text-sm text-slate-400">
            {cleared
              ? 'Your session has been ended on this device. All governance activity remains logged and auditable.'
              : 'Ending your session...'}
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <Link
            href="/login"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sentinel-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
          >
            Sign back in
          </Link>
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:text-white"
          >
            <Home className="h-4 w-4" size={16} /> Return home
          </Link>
        </div>
      </div>

      <p className="mt-6 text-sm text-slate-400">
        Expecting something different?{' '}
        <Link href="/auth/error" className="font-semibold text-sentinel-300 transition hover:text-sentinel-200">
          Report a sign-in issue
        </Link>
      </p>
    </div>
  );
}
