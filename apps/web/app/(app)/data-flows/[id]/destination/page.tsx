import { Bot, Box, Building2, Gauge } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/ui/stat-card';
import { FlowHeader, FlowSubnav } from '@/components/data-intel/flow-detail';
import { aiSystems } from '@/lib/mock-data';
import { fmt, fmtTime, resolveFlow, toneForCategory } from '@/components/data-intel/derived';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const flow = resolveFlow(id);
  const sys = aiSystems.find((s) => s.name === flow.destination);
  return (
    <div className="space-y-6">
      <FlowSubnav id={flow.id} active="Destination" />
      <FlowHeader flow={flow} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Destination" value={sys?.name ?? flow.destination} icon={Bot} accent="sky" sub={sys?.type ?? 'AI system'} />
        <StatCard label="Requests 24h" value={fmt(sys?.requests24h ?? 0)} icon={Gauge} accent="cyan" sub="Gateway volume" />
        <StatCard label="Blocked 24h" value={fmt(sys?.blocked24h ?? 0)} icon={Building2} accent="rose" sub="Intercepted requests" />
        <StatCard label="Environment" value={sys?.environment ?? '—'} icon={Box} accent="violet" sub={`Oversight: ${sys?.oversight ?? '—'}`} />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Destination system" subtitle="AI system receiving this flow" />
          <CardBody>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2">
              {[
                { label: 'Name', value: flow.destination },
                { label: 'Type', value: sys?.type ?? '—' },
                { label: 'Owner', value: sys?.owner ?? '—' },
                { label: 'Purpose', value: sys?.purpose ?? '—' },
                { label: 'Environment', value: sys?.environment ?? '—' },
                { label: 'Last activity', value: sys ? fmtTime(sys.lastActivity) : '—' }
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
          <CardHeader title="System status" subtitle="Registration and data handling" />
          <CardBody className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge label={sys?.status ?? '—'} tone={sys?.status === 'Approved' ? 'green' : sys?.status === 'Pending' ? 'amber' : 'slate'} />
              <Badge label={sys?.risk ?? '—'} tone={sys?.risk === 'Critical' ? 'red' : sys?.risk === 'High' ? 'rose' : sys?.risk === 'Medium' ? 'amber' : 'blue'} />
            </div>
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Data categories handled</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {sys?.dataCategories.map((c) => (
                  <Badge key={c} label={c} tone={toneForCategory(c)} />
                ))}
              </div>
            </div>
            <p className="text-xs text-slate-400">
              Provider: {flow.providerName} · model: {sys?.modelId ?? '—'} · approved {sys?.approvedAt ?? '—'}
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}