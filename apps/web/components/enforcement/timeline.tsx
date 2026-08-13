import type { TimelineItem } from './helpers';

const dotTones: Record<string, string> = {
  green: 'border-emerald-400/60 bg-emerald-400',
  rose: 'border-rose-400/60 bg-rose-400',
  amber: 'border-amber-400/60 bg-amber-400',
  blue: 'border-sky-400/60 bg-sky-400',
  sky: 'border-sky-400/60 bg-sky-400',
  violet: 'border-violet-400/60 bg-violet-400',
  slate: 'border-slate-500/60 bg-slate-400'
};

type TimelineRow = { time: string; title: string; detail?: string; description?: string; tone?: string };

export function Timeline({ items }: { items: TimelineRow[] }) {
  return (
    <ol>
      {items.map((it, i) => (
        <li key={i} className="relative flex gap-4 pb-6 last:pb-0">
          {i < items.length - 1 ? <span className="absolute left-[7px] top-4 h-full w-px bg-white/10" /> : null}
          <span className={`relative mt-1 h-3.5 w-3.5 shrink-0 rounded-full border ${dotTones[it.tone ?? 'blue'] ?? dotTones.blue}`} />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">{it.title}</p>
            <p className="mt-0.5 text-xs text-slate-400">{it.detail ?? it.description ?? ''}</p>
            <p className="mt-1 text-[0.65rem] font-medium uppercase tracking-wider text-slate-500">{it.time}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}