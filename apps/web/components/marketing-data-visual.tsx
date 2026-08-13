'use client';

import { useEffect, useState } from 'react';

type EventKind = 'blocked' | 'redacted' | 'allowed';

interface FeedEvent {
  id: number;
  kind: EventKind;
  label: string;
  ts: string;
}

const EVENT_POOL: { kind: EventKind; label: string }[] = [
  { kind: 'blocked', label: 'National ID' },
  { kind: 'blocked', label: 'Bank account' },
  { kind: 'blocked', label: 'Credit card number' },
  { kind: 'blocked', label: 'HR personnel file' },
  { kind: 'redacted', label: 'Phone number' },
  { kind: 'redacted', label: 'Email address' },
  { kind: 'redacted', label: 'Home address' },
  { kind: 'redacted', label: 'Passport number' },
  { kind: 'allowed', label: 'Customer name' },
  { kind: 'allowed', label: 'Order total' },
  { kind: 'allowed', label: 'Product SKU' },
  { kind: 'allowed', label: 'Ticket subject' }
];

const KIND_STYLES: Record<EventKind, { dot: string; text: string; label: string }> = {
  blocked: { dot: 'bg-rose-400', text: 'text-rose-300', label: 'Blocked' },
  redacted: { dot: 'bg-amber-400', text: 'text-amber-300', label: 'Redacted' },
  allowed: { dot: 'bg-emerald-400', text: 'text-emerald-300', label: 'Allowed' }
};

const STAT_TARGETS = [98, 72, 100];
const STAT_LABELS = ['Policy blocks', 'Risk reduction', 'Audit readiness'];

const BARS = [
  { h: 'h-14 sm:h-16', kind: 'sky', delay: 0 },
  { h: 'h-20 sm:h-24', kind: 'slate', delay: 0.4 },
  { h: 'h-9 sm:h-10', kind: 'slate', delay: 0.8 },
  { h: 'h-16 sm:h-20', kind: 'sky', delay: 1.2 },
  { h: 'h-10 sm:h-12', kind: 'slate', delay: 1.6 },
  { h: 'h-20 sm:h-24', kind: 'sky', delay: 0.2 },
  { h: 'h-12 sm:h-14', kind: 'slate', delay: 0.6 },
  { h: 'h-14 sm:h-16', kind: 'cyan', delay: 1.0 },
  { h: 'h-20 sm:h-24', kind: 'slate', delay: 1.4 },
  { h: 'h-12 sm:h-14', kind: 'slate', delay: 1.8 },
  { h: 'h-16 sm:h-20', kind: 'sky', delay: 0.5 }
];

const BAR_BG: Record<string, string> = {
  sky: 'from-sky-500/25 to-transparent',
  cyan: 'from-cyan-400/25 to-transparent',
  slate: 'from-slate-700/80 to-slate-800/60'
};

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
}

function seedFeed(count: number): FeedEvent[] {
  const seed: FeedEvent[] = [];
  for (let i = 0; i < count; i++) {
    const src = EVENT_POOL[i % EVENT_POOL.length];
    seed.push({ id: i, kind: src.kind, label: src.label, ts: nowTime() });
  }
  return seed.reverse();
}

export default function MarketingDataVisual() {
  const [values, setValues] = useState<number[]>(STAT_TARGETS.map(() => 0));
  const [feed, setFeed] = useState<FeedEvent[]>(() => seedFeed(3));
  const [throughput, setThroughput] = useState(1.2);

  useEffect(() => {
    let current = STAT_TARGETS.map(() => 0);
    const interval = setInterval(() => {
      current = current.map((value, index) => Math.min(STAT_TARGETS[index], value + Math.max(1, STAT_TARGETS[index] / 40)));
      setValues([...current]);
      if (current.every((value, index) => value >= STAT_TARGETS[index])) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const src = EVENT_POOL[Math.floor(Math.random() * EVENT_POOL.length)];
      setFeed((prev) => [{ id: Date.now(), kind: src.kind, label: src.label, ts: nowTime() }, ...prev].slice(0, 5));
      setThroughput((t) => +(t + (Math.random() * 0.08 - 0.03)).toFixed(2));
    }, 1700);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-4 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),_transparent_30%)] blur-3xl" />
      <div className="relative space-y-5 sm:space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">AI threat lens</p>
            <h2 className="mt-2 text-lg font-semibold text-white sm:text-xl">Visualize the hidden AI data flows that matter most.</h2>
          </div>
          <div className="inline-flex items-center gap-2 self-start rounded-full bg-slate-950/90 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.25em] text-slate-300 sm:self-auto">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-glow" />
            Live map
            <span className="ml-1.5 font-mono text-[0.6rem] normal-case tracking-normal text-emerald-300">
              {throughput.toFixed(2)}M req/min
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-slate-950/95 p-3.5 shadow-[0_30px_70px_rgba(15,23,42,0.22)] sm:rounded-[1.5rem] sm:p-5">
          <div className="pointer-events-none absolute -left-16 top-10 h-24 w-24 rounded-full bg-sentinel-500/15 blur-3xl" />
          <div className="pointer-events-none absolute right-6 top-20 h-20 w-20 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="grid h-[180px] grid-cols-5 gap-2 sm:h-[220px] sm:gap-3 lg:h-[260px]">
            {[0, 1, 2, 3, 4].map((col) => {
              const left = BARS.slice(col * 2, col * 2 + 2);
              const right = BARS.slice(5 + col * 2, 5 + col * 2 + 2);
              const bars = [...left, ...right];
              return (
                <div key={col} className="flex flex-col justify-end gap-2.5 sm:gap-3">
                  {bars.map((bar, index) => (
                    <div
                      key={index}
                      className={`rounded-[1.25rem] bg-gradient-to-b ${BAR_BG[bar.kind]} sm:rounded-[1.5rem] origin-bottom ${bar.h}`}
                      style={{ animation: `flow-pulse 2.6s ease-in-out infinite`, animationDelay: `${bar.delay}s` }}
                    />
                  ))}
                </div>
              );
            })}
          </div>

          <div className="relative mt-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 p-3 sm:mt-5 sm:p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[0.6rem] uppercase tracking-[0.25em] text-slate-500">Live governance events</p>
              <span className="inline-flex shrink-0 items-center gap-1.5 text-[0.6rem] text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-glow" />
                Streaming
              </span>
            </div>
            <ul className="mt-2.5 grid gap-1.5">
              {feed.map((event) => {
                const style = KIND_STYLES[event.kind];
                return (
                  <li
                    key={event.id}
                    className="flex items-center justify-between gap-3 text-xs"
                    style={{ animation: 'feed-in 0.35s ease-out' }}
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`} />
                      <span className="truncate text-slate-300">{event.label}</span>
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.15em] ${style.text}`}>
                        {style.label}
                      </span>
                    </div>
                    <span className="shrink-0 font-mono text-[0.6rem] text-slate-500">{event.ts}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:mt-5 sm:grid-cols-3 sm:gap-3">
            {STAT_LABELS.map((label, index) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-slate-950/90 p-3.5 text-xs text-slate-300 transition hover:border-sentinel-500/20 hover:bg-slate-900/95 sm:rounded-3xl sm:p-4 sm:text-sm"
              >
                <p className="text-lg font-semibold text-white sm:text-xl">
                  {Math.round(values[index])}%
                </p>
                <p className="mt-1.5 uppercase tracking-[0.3em] text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
