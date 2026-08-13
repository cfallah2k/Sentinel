import { Activity, Clock3, Hourglass, Zap } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { gatewayRequests } from '@/lib/mock-data';
import { ModuleNav } from '@/components/data-intel/module-nav';
import { FlowTable } from '@/components/data-intel/flow-table';
import { enrichedFlows, flowNavItems, fmt, fmtTime } from '@/components/data-intel/derived';
import { decisionTone } from '@/components/data-intel/flow-table';

type ReqRow = { id: string; timestamp: string; category: string; decision: string; tokens: number };

const requestColumns: Column<ReqRow>[] = [
  { key: 'id', label: 'Request', render: (r) => <span className="font-medium text-white">{r.id}</span> },
  { key: 'timestamp', label: 'Time', render: (r) => <span className="whitespace-nowrap text-slate-400">{fmtTime(r.timestamp)}</span>, sortValue: (r) => r.timestamp },
  { key: 'category', label: 'Category', render: (r) => <Badge label={r.category} /> },
  { key: 'decision', label: 'Decision', render: (r) => <Badge label={r.decision} tone={decisionTone(r.decision)} /> },
  { key: 'tokens', label: 'Tokens', render: (r) => <span className="text-slate-300">{fmt(r.tokens)}</span>, sortValue: (r) => r.tokens }
];

export default function Page() {
  const recent = [...enrichedFlows].sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  const latest = recent[0];
  const requests = [...gatewayRequests].sort((a, b) => b.timestamp.localeCompare(a.timestamp)).slice(0, 10);
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="Recent Flows"
        description="The most recently active routes and gateway requests, newest first."
      />
      <ModuleNav items={flowNavItems.map((it) => ({ ...it, active: it.label === 'Recent' }))} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Flows in 24h" value={recent.length} icon={Activity} accent="sky" sub="All routes touched" />
        <StatCard label="Latest activity" value={fmtTime(latest.timestamp)} icon={Clock3} accent="cyan" sub={`${latest.source} → ${latest.destination}`} />
        <StatCard label="Blocked recently" value={recent.filter((f) => f.status === 'Blocked').length} icon={Hourglass} accent="rose" sub="Intercepted routes" />
        <StatCard label="Peak hour volume" value={`${Math.max(...gatewayRequests.map((r) => r.tokens))}`} icon={Zap} accent="violet" sub="Max tokens in one request" />
      </div>
      <Card>
        <CardHeader title="Recent routes" subtitle="Sorted by last activity" />
        <CardBody>
          <FlowTable flows={recent} pageSize={12} initialSort={{ key: 'timestamp', dir: 'desc' }} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Latest gateway requests" subtitle="Evaluated by the control plane" />
        <CardBody>
          <DataTable columns={requestColumns} rows={requests} searchable={false} pageSize={10} />
        </CardBody>
      </Card>
    </div>
  );
}