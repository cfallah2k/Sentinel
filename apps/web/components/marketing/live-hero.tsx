'use client';

import { useEffect, useState } from 'react';

export interface LiveState {
  label: string;
  tone: string;
}

export function LiveCycle({
  states,
  interval = 2600,
  className = ''
}: {
  states: LiveState[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % states.length), interval);
    return () => clearInterval(timer);
  }, [interval, states.length]);

  const current = states[index % states.length];

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${current.tone} ${className}`}
    >
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-40" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
      </span>
      {current.label}
    </span>
  );
}

export function LiveTicker({
  items,
  interval = 2800,
  className = ''
}: {
  items: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % items.length), interval);
    return () => clearInterval(timer);
  }, [interval, items.length]);

  return (
    <div className={`flex items-center gap-2.5 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 px-3.5 py-2.5 ${className}`}>
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>
      <p
        key={index}
        className="truncate font-mono text-[0.65rem] leading-4 text-slate-400"
        style={{ animation: 'feed-in 0.35s ease-out' }}
      >
        {items[index % items.length]}
      </p>
    </div>
  );
}