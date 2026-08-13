import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { FlowHeader, FlowSubnav, Timeline } from '@/components/data-intel/flow-detail';
import { flowEvents, resolveFlow, systemGatewayRows } from '@/components/data-intel/derived';

type ReqRow = { id: string; timestamp: string; model: string; category: string; decision: string; latencyMs: number; tokens: number; policyId: string };

const reqColumns: Column<ReqRow>[] = [
  { key: 'id', label: 'Request', render: (r) => <span className="font-medium text-white">{r.id}</span> },
  { key: 'timestamp', label: 'Time', render: (r) => <span className="whitespace-nowrap text-slate-400">{r.timestamp}</span>, sortValue: (r) => r.timestamp },
  { key: 'model', label: 'Model', render: (r) => <span className="text-slate-300">{r.model}</span> },
  { key: 'category', label: 'Category', render: (r) => <Badge label={r.category} /> },
  { key: 'decision', label: 'Decision', render: (r) => <Badge label={r.decision} tone={r.decision === 'Blocked' ? 'rose' : r.decision === 'Redacted' ? 'amber' : r.decision === 'Allowed' ? 'green' : 'violet'} /> },
  { key: 'latencyMs', label: 'Latency', render: (r) => <span className="text-slate-300">{r.latencyMs} ms</span>, sortValue: (r) => r.latencyMs },
  { key: 'policyId', label: 'Policy', render: (r) => <span className="text-slate-300">{r.policyId}</span> }
];

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const flow = resolveFlow(id);
  const requests = systemGatewayRows(flow);
  return (
    <div className="space-y-6">
      <FlowSubnav id={flow.id} active="Activity" />
      <FlowHeader flow={flow} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Route timeline" subtitle="Lifecycle events" />
          <CardBody>
            <Timeline events={flowEvents(flow)} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Gateway activity" subtitle={`Latest requests from ${flow.systemName}`} />
          <CardBody>
            <DataTable columns={reqColumns} rows={requests} searchable={false} pageSize={8} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}