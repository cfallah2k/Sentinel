'use client';

import { LiveCycle, LiveTicker } from './live-hero';

const barHeights = [38, 55, 42, 64, 48, 72, 58, 66, 50, 60, 45, 68];

export default function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-sentinel-500/25 via-sky-500/10 to-cyan-400/25 blur-2xl" />
      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/15 bg-[var(--surface-strong)] p-4 shadow-panel backdrop-blur-xl sm:p-6">
        <div className="flex items-center gap-1.5 border-b border-white/10 pb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-3 hidden rounded-md bg-white/5 px-2 py-0.5 text-[0.6rem] text-slate-400 sm:block">
            sentinel.ai — AI Governance Console
          </span>
          <span className="ml-auto whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-slate-400">
            Simulated preview
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="text-[0.55rem] uppercase tracking-[0.2em] text-slate-500">Requests</p>
            <p className="mt-1 text-sm font-semibold text-white">0</p>
          </div>
          <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-3">
            <p className="text-[0.55rem] uppercase tracking-[0.2em] text-emerald-300">Allowed</p>
            <p className="mt-1 text-sm font-semibold text-white">0%</p>
          </div>
          <div className="rounded-xl border border-rose-500/25 bg-rose-500/10 p-3">
            <p className="text-[0.55rem] uppercase tracking-[0.2em] text-rose-300">Blocked</p>
            <p className="mt-1 text-sm font-semibold text-white">0%</p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sentinel-500/20 text-xs font-bold text-sentinel-300">AI</span>
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-white">Anthropic — Claude 4</p>
                <p className="text-[0.6rem] text-slate-500">Policy: data-minimization</p>
              </div>
            </div>
            <LiveCycle
              states={[
                { label: 'Allowed', tone: 'text-emerald-300' },
                { label: 'Inspecting', tone: 'text-sky-300' },
                { label: 'Redacted', tone: 'text-cyan-300' }
              ]}
            />
          </div>
          <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-500/20 text-xs font-bold text-rose-300">EX</span>
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-white">External — data export</p>
                <p className="text-[0.6rem] text-slate-500">Policy: pii-transfer</p>
              </div>
            </div>
            <LiveCycle
              states={[
                { label: 'Blocked', tone: 'text-rose-300' },
                { label: 'Evaluating', tone: 'text-amber-300' },
                { label: 'Queued', tone: 'text-slate-400' }
              ]}
            />
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between">
            <p className="text-[0.55rem] uppercase tracking-[0.2em] text-slate-500">Threat posture</p>
            <LiveCycle
              states={[
                { label: 'Healthy', tone: 'text-emerald-300' },
                { label: 'Monitoring', tone: 'text-sky-300' },
                { label: 'Healthy', tone: 'text-emerald-300' }
              ]}
            />
          </div>
          <div className="mt-3 flex items-end gap-1.5">
            {barHeights.map((height, index) => (
              <div
                key={index}
                className={`flex-1 animate-pulse rounded-t ${
                  index === 6 || index === 9 ? 'bg-sentinel-400' : 'bg-sentinel-500/40'
                }`}
                style={{ height: `${height}px`, animationDelay: `${index * 140}ms` }}
              />
            ))}
          </div>
        </div>

        <LiveTicker
          className="mt-4"
          items={[
            'simulated · req evaluate · allow · policy data-minimization',
            'simulated · pii detected · redacted before provider call',
            'simulated · pii-transfer · blocked · audit event written',
            'simulated · posture snapshot · saved to registry'
          ]}
        />
      </div>
    </div>
  );
}