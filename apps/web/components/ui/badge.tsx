const tones = {
  green: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300',
  blue: 'border-sky-500/25 bg-sky-500/10 text-sky-300',
  sky: 'border-sky-500/25 bg-sky-500/10 text-sky-300',
  cyan: 'border-cyan-500/25 bg-cyan-500/10 text-cyan-300',
  amber: 'border-amber-500/25 bg-amber-500/10 text-amber-300',
  rose: 'border-rose-500/25 bg-rose-500/10 text-rose-300',
  red: 'border-red-500/25 bg-red-500/10 text-red-300',
  violet: 'border-violet-500/25 bg-violet-500/10 text-violet-300',
  slate: 'border-white/10 bg-white/5 text-slate-300'
};

const dotColors: Record<string, string> = {
  green: 'bg-emerald-400',
  blue: 'bg-sky-400',
  sky: 'bg-sky-400',
  cyan: 'bg-cyan-400',
  amber: 'bg-amber-400',
  rose: 'bg-rose-400',
  red: 'bg-red-400',
  violet: 'bg-violet-400',
  slate: 'bg-slate-400'
};

export type BadgeTone = keyof typeof tones;

export function toneForStatus(status: string): BadgeTone {
  const s = status.toLowerCase();
  if (['active', 'approved', 'connected', 'success', 'paid', 'valid', 'allowed', 'on track', 'running', 'implemented', 'ready'].some((k) => s.includes(k))) return 'green';
  if (['pending', 'queued', 'review', 'scheduled', 'in review', 'partially implemented', 'draft', 'invited'].some((k) => s.includes(k))) return 'amber';
  if (['denied', 'error', 'failed', 'overdue', 'suspended', 'restricted', 'expired', 'disabled', 'blocked', 'behind'].some((k) => s.includes(k))) return 'rose';
  if (['critical', 'high', 'at risk', 'needs review'].some((k) => s.includes(k))) return 'red';
  if (['low', 'medium'].some((k) => s.includes(k))) return 'blue';
  return 'slate';
}

export function Badge({ label, tone }: { label: string; tone?: BadgeTone }) {
  const t = tone ?? toneForStatus(label);
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide ${tones[t]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotColors[t]}`} />
      {label}
    </span>
  );
}