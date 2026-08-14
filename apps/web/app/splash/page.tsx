'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, ShieldAlert } from 'lucide-react';

const SPLASH_DURATION_MS = 4000;

export default function SplashPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / SPLASH_DURATION_MS);
      setProgress(p);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!doneRef.current) {
        doneRef.current = true;
        router.replace('/login');
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [router]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[var(--bg)] px-5 py-12 text-[var(--text)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_36%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-96 bg-[radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.14),_transparent_32%)] blur-3xl" />

      <div className="relative flex w-full max-w-md flex-col items-center text-center">
        <span className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-sentinel-500 to-cyan-400 shadow-glow animate-float">
          <span className="absolute inset-0 animate-pulse rounded-3xl bg-sentinel-500/30" />
          <ShieldAlert className="relative h-9 w-9 text-white" size={36} />
        </span>

        <p className="mt-8 text-xl font-bold uppercase tracking-[0.35em] text-white sm:text-2xl">Sentinel</p>
        <p className="mt-2 text-[0.65rem] uppercase tracking-[0.25em] text-slate-500">AI Control Plane</p>

        <p className="mt-6 max-w-sm text-sm leading-7 text-slate-300 sm:text-base">
          Policy guardrails for every AI data path — governance, enforcement, and audit in one place.
        </p>

        <div className="mt-7 grid w-full max-w-xs grid-cols-3 gap-2 text-[0.6rem] uppercase tracking-[0.2em] text-slate-500">
          <span>Govern</span>
          <span>Enforce</span>
          <span>Audit</span>
        </div>

        <div className="mt-8 h-1 w-full max-w-xs overflow-hidden rounded-full border border-white/10 bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sentinel-500 to-cyan-400 shadow-glow transition-[width] duration-100"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>

        <Link
          href="/login"
          className="mt-8 inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-sentinel-500 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
        >
          Enter Sentinel <ArrowRight className="h-4 w-4" size={16} />
        </Link>
        <p className="mt-4 text-[0.65rem] text-slate-600">You will be taken to the sign-in page automatically.</p>
      </div>
    </main>
  );
}