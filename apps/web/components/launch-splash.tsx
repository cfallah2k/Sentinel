'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ShieldAlert } from 'lucide-react';

const SPLASH_MS = 2600;
const FADE_MS = 500;
const FLAG = 'sentinel-launch-splash';

type Phase = 'visible' | 'fading' | 'hidden';

export default function LaunchSplash() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>('visible');
  const [progress, setProgress] = useState(0);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (pathname === '/splash') {
      setPhase('hidden');
      return;
    }

    let seen = false;
    try {
      seen = sessionStorage.getItem(FLAG) === '1';
    } catch {
      // storage unavailable — still play the splash
    }
    if (seen) {
      setPhase('hidden');
      return;
    }

    const start = performance.now();
    let raf = 0;
    let timeout = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / SPLASH_MS);
      setProgress(p);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase('fading');
        timeout = window.setTimeout(() => {
          try {
            sessionStorage.setItem(FLAG, '1');
          } catch {
            // ignore
          }
          setPhase('hidden');
        }, FADE_MS);
      }
    };
    raf = requestAnimationFrame(tick);

    cleanupRef.current = () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
    };
    return () => cleanupRef.current?.();
  }, [pathname]);

  if (phase === 'hidden') return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[var(--bg)] px-5 py-12 text-center transition-opacity duration-500 ${
        phase === 'fading' ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      role="status"
      aria-label="Sentinel is launching"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_36%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-96 bg-[radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.14),_transparent_32%)] blur-3xl" />

      <div className="relative flex w-full max-w-md flex-col items-center">
        <span className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-sentinel-500 to-cyan-400 shadow-glow animate-float">
          <span className="absolute inset-0 animate-pulse rounded-3xl bg-sentinel-500/30" />
          <ShieldAlert className="relative h-9 w-9 text-white" size={36} />
        </span>

        <p className="mt-8 text-xl font-bold uppercase tracking-[0.35em] text-white sm:text-2xl">Sentinel</p>
        <p className="mt-2 text-[0.65rem] uppercase tracking-[0.25em] text-slate-500">AI Control Plane</p>

        <div className="mt-8 h-1 w-full max-w-xs overflow-hidden rounded-full border border-white/10 bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sentinel-500 to-cyan-400 shadow-glow transition-[width] duration-100"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>

        <p className="mt-4 text-[0.65rem] uppercase tracking-[0.25em] text-slate-600">Launching…</p>
      </div>
    </div>
  );
}