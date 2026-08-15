import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { decisionTone } from './flow-table';
import { fmt, type FlowRow } from './derived';

const lineGradients: Record<string, string> = {
  Allow: 'from-emerald-400/80 via-emerald-300/40 to-slate-500/10',
  Block: 'from-rose-500/80 via-rose-400/40 to-slate-500/10',
  Redact: 'from-amber-400/80 via-amber-300/40 to-slate-500/10',
  'Require Approval': 'from-violet-400/80 via-violet-300/40 to-slate-500/10',
  Log: 'from-sky-400/80 via-sky-300/40 to-slate-500/10'
};

export function FlowMap({ flows }: { flows: FlowRow[] }) {
  const visible = flows.slice(0, 12);
  const sources = [...new Set(flows.map((f) => f.source))].length;
  const destinations = [...new Set(flows.map((f) => f.destination))].length;
  return (
    <Card>
      <CardHeader
        title="Flow Topology"
        subtitle={`${flows.length} routes connecting ${sources} sources to ${destinations} AI systems`}
      />
      <CardBody>
        <div className="relative overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/80 p-4 sm:p-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.1),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="relative min-w-[28rem] space-y-3">
            {visible.map((f) => (
              <Link
                key={f.id}
                href={`/data-flows/${f.id}`}
                className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5 transition hover:border-sky-500/30 hover:bg-white/[0.05]"
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />
                <span className="w-40 shrink-0 truncate text-xs font-medium text-slate-200">{f.source}</span>
                <span className="relative flex flex-1 items-center">
                  <span className={`h-px w-full rounded-full bg-gradient-to-r ${lineGradients[f.decision] ?? lineGradients.Allow}`} />
                  <span className="absolute left-1/2 -translate-x-1/2 animate-glow rounded-full bg-sky-400/90 p-[3px]">
                    <span className="block h-1 w-1 rounded-full bg-white" />
                  </span>
                </span>
                <span className="w-44 shrink-0 truncate text-right text-xs font-semibold text-white">{f.destination}</span>
                <span className="hidden w-12 shrink-0 text-right text-[0.65rem] text-slate-500 sm:block">{fmt(f.volumeMb)} MB</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Decisions</span>
          {[...new Set(flows.map((f) => f.decision))].map((d) => (
            <Badge key={d} label={d} tone={decisionTone(d)} />
          ))}
        </div>
      </CardBody>
    </Card>
  );
}