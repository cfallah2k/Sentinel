import { Activity, Ban, Clock3, ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { gatewayRequests, hourlySeries } from '@/lib/mock-data';
import { FlowTable } from '@/components/data-intel/flow-table';
import { ModuleNav } from '@/components/data-intel/module-nav';
import { enrichedFlows, flowNavItems, fmt, fmtTime } from '@/components/data-intel/derived';
import { decisionTone } from '@/components/data-intel/flow-table';

type ReqRow = { id: string; timestamp: string; category: string; decision: string; tokens: number; latencyMs: number };

const requestColumns: Column<ReqRow>[] = [
  { key: 'id', label: 'Request', render: (r) => <span className="font-medium text-white">{r.id}</span> },
  { key: 'timestamp', label: 'Time', render: (r) => <span className="whitespace-nowrap text-slate-400">{fmtTime(r.timestamp)}</span>, sortValue: (r) => r.timestamp },
  { key: 'category', label: 'Category', render: (r) => <Badge label={r.category} /> },
  { key: 'decision', label: 'Decision', render: (r) => <Badge label={r.decision} tone={decisionTone(r.decision)} /> },
  { key: 'tokens', label: 'Tokens', render: (r) => <span className="text-slate-300">{fmt(r.tokens)}</span>, sortValue: (r) => r.tokens },
  { key: 'latencyMs', label: 'Latency', render: (r) => <span className="text-slate-300">{r.latencyMs} ms</span>, sortValue: (r) => r.latencyMs }
];

export default function Page() {
  const recent = [...gatewayRequests].sort((a, b) => b.timestamp.localeCompare(a.timestamp)).slice(0, 12);
  const live = [...enrichedFlows].sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  const latestHour = hourlySeries[hourlySeries.length - 1];
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="Live Data Flows"
        description="Real-time view of gateway evaluation and the most recent flow activity across the control plane."
      />
      <ModuleNav items={flowNavItems.map((it) => ({ ...it, active: it.label === 'Live' }))} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Requests this hour" value={fmt(latestHour.allowed + latestHour.blocked + latestHour.redacted)} delta={8.2} deltaLabel="vs previous hour" icon={Activity} accent="sky" spark={hourlySeries.map((h) => h.allowed)} />
        <StatCard label="Blocked this hour" value={latestHour.blocked} delta={-2.4} deltaLabel="blocked requests" icon={Ban} accent="rose" />
        <StatCard label="Redacted this hour" value={latestHour.redacted} delta={1.1} deltaLabel="redacted requests" icon={ShieldCheck} accent="cyan" />
        <StatCard label="P95 latency" value={`${latestHour.latency} ms`} delta={-0.6} deltaLabel="vs rolling avg" icon={Clock3} accent="violet" />
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Latest flows" subtitle="Most recent route activity" />
          <CardBody>
            <FlowTable flows={live.slice(0, 6)} pageSize={6} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Gateway decisions — live feed" subtitle="Latest requests evaluated by the gateway" />
          <CardBody>
            <DataTable columns={requestColumns} rows={recent} searchable={false} pageSize={12} initialSort={{ key: 'timestamp', dir: 'desc' }} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}