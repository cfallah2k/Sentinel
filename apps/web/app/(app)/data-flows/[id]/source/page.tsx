import { Database, HardDrive } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Metric } from '@/components/ui/progress';
import { StatCard } from '@/components/ui/stat-card';
import { FlowHeader, FlowSubnav } from '@/components/data-intel/flow-detail';
import { findSource, fmt, fmtTime, resolveFlow, toneForCategory } from '@/components/data-intel/derived';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const flow = resolveFlow(id);
  const src = findSource(flow.source);
  return (
    <div className="space-y-6">
      <FlowSubnav id={flow.id} active="Source" />
      <FlowHeader flow={flow} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Source records" value={fmt(src?.records ?? 0)} icon={Database} accent="sky" sub="Rows in source system" />
        <StatCard label="Connector" value={src?.connector ?? '—'} icon={HardDrive} accent="cyan" sub={src?.type ?? 'Unknown type'} />
        <StatCard label="Last sync" value={src ? fmtTime(src.lastSync) : '—'} icon={HardDrive} accent="violet" sub="Source synchronization" />
        <StatCard label="Source risk" value={src?.risk ?? '—'} icon={Database} accent="rose" sub={src?.status ?? 'Unmanaged'} />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Source system" subtitle="Where this flow originates" />
          <CardBody>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2">
              {[
                { label: 'Name', value: flow.source },
                { label: 'Type', value: src?.type ?? '—' },
                { label: 'Connector', value: src?.connector ?? '—' },
                { label: 'Records', value: fmt(src?.records ?? 0) },
                { label: 'Last sync', value: src ? fmtTime(src.lastSync) : '—' },
                { label: 'Status', value: src?.status ?? '—' }
              ].map((it) => (
                <div key={it.label} className="bg-slate-950/90 px-4 py-3">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">{it.label}</p>
                  <p className="mt-1 text-xs text-slate-200">{it.value}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Classified categories" subtitle="Labels applied to this source" />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {src?.categories.map((c) => (
                <Badge key={c} label={c} tone={toneForCategory(c)} />
              )) ?? <Badge label="Unclassified" tone="slate" />}
            </div>
            <div className="mt-6 space-y-4">
              <Metric label="Routes from source" value={fmt(flow.volumeMb)} suffix="MB today" />
              <Metric label="Source risk" value={src?.risk ?? '—'} />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}