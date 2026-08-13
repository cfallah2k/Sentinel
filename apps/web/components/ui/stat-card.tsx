import type { LucideIcon } from 'lucide-react';
import { Sparkline } from './charts';

const accentMap: Record<string, string> = {
  sky: 'text-sky-300 bg-sky-500/10 border-sky-500/25',
  blue: 'text-sky-300 bg-sky-500/10 border-sky-500/25',
  green: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/25',
  emerald: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/25',
  amber: 'text-amber-300 bg-amber-500/10 border-amber-500/25',
  rose: 'text-rose-300 bg-rose-500/10 border-rose-500/25',
  red: 'text-rose-300 bg-rose-500/10 border-rose-500/25',
  violet: 'text-violet-300 bg-violet-500/10 border-violet-500/25',
  cyan: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/25',
  slate: 'text-slate-300 bg-slate-500/10 border-slate-500/25'
};

const sparkColors: Record<string, string> = {
  rose: '#f87171',
  red: '#f87171',
  green: '#34d399',
  emerald: '#34d399',
  amber: '#fbbf24',
  violet: '#a78bfa',
  cyan: '#22d3ee',
  blue: '#38bdf8',
  sky: '#38bdf8',
  slate: '#94a3b8'
};

export function StatCard({
  label,
  value,
  delta,
  deltaLabel,
  icon: Icon,
  accent = 'sky',
  spark,
  sub
}: {
  label: string;
  value: string | number;
  delta?: number;
  deltaLabel?: string;
  icon: LucideIcon;
  accent?: 'sky' | 'green' | 'amber' | 'rose' | 'violet' | 'cyan' | 'blue' | 'emerald' | 'red' | 'slate';
  spark?: number[];
  sub?: string;
}) {
  const positive = (delta ?? 0) >= 0;
  const sparkColor = sparkColors[accent] ?? '#38bdf8';
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{value}</p>
          {delta !== undefined ? (
            <p className="mt-1.5 text-[0.65rem] text-slate-400">
              <span className={`font-semibold ${positive ? 'text-emerald-400' : 'text-rose-400'}`}>
                {positive ? '+' : ''}{delta}%
              </span>
              {deltaLabel ? ` ${deltaLabel}` : ''}
            </p>
          ) : null}
          {sub ? <p className="mt-1.5 text-[0.65rem] text-slate-500">{sub}</p> : null}
        </div>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border ${accentMap[accent]}`}>
          <Icon className="h-4.5 w-4.5" size={18} />
        </div>
      </div>
      {spark ? (
        <div className="mt-3 -mx-1">
          <Sparkline data={spark} color={sparkColor} />
        </div>
      ) : null}
    </div>
  );
}