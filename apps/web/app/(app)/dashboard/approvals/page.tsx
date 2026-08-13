import { CircleCheck, CircleX, Hourglass, Package } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DonutChart } from '@/components/ui/charts';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { aiSystems, approvals } from '@/lib/mock-data';

const pending = approvals.filter((a) => a.status === 'Pending');
const countBy = (s: string) => approvals.filter((a) => a.status === s).length;

const statusData = ['Pending', 'Approved', 'Denied', 'Expired'].map((s) => ({
  name: s,
  value: countBy(s)
}));

const systemName = new Map(aiSystems.map((s) => [s.id, s.name]));

const approvalRows = approvals
  .filter((a) => a.status === 'Pending')
  .sort((a, b) => a.expiresAt.localeCompare(b.expiresAt))
  .map((a) => ({
    id: a.id,
    requester: a.requester,
    type: a.type,
    risk: a.risk,
    system: systemName.get(a.systemId ?? '') ?? '—',
    requestedAt: a.requestedAt,
    expiresAt: a.expiresAt,
    note: a.note
  }));
type ApprovalRow = (typeof approvalRows)[number];

const approvalColumns: Column<ApprovalRow>[] = [
  { key: 'id', label: 'Request', render: (r) => <span className="font-mono text-sentinel-300">{r.id}</span> },
  { key: 'requester', label: 'Requester', render: (r) => <span className="font-medium text-slate-200">{r.requester}</span> },
  { key: 'type', label: 'Type' },
  { key: 'risk', label: 'Risk', tone: (r) => toneForStatus(r.risk) },
  { key: 'system', label: 'AI system' },
  { key: 'requestedAt', label: 'Requested', render: (r) => r.requestedAt.slice(5, 16).replace('T', ' ') },
  { key: 'expiresAt', label: 'Expires', render: (r) => r.expiresAt.slice(5, 16).replace('T', ' ') }
];

export default function Page() {
  return (
    <div>
      <PageHeader
        eyebrow="Approvals"
        title="Approvals Snapshot"
        description="Requests awaiting decision and the overall approvals funnel across the organization."
      />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pending" value={countBy('Pending')} icon={Hourglass} accent="amber" sub="Awaiting decision" />
        <StatCard label="Approved" value={countBy('Approved')} icon={CircleCheck} accent="green" sub="All time" />
        <StatCard label="Denied" value={countBy('Denied')} icon={CircleX} accent="rose" sub="All time" />
        <StatCard label="Expired" value={countBy('Expired')} icon={Package} accent="violet" sub="Lapsed before decision" />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Pending approvals" subtitle={`${pending.length} requests awaiting decision, soonest expiry first`} />
          <CardBody>
            <DataTable columns={approvalColumns} rows={approvalRows} searchable={false} pageSize={6} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Approvals by status" subtitle="Distribution across all requests" />
          <CardBody>
            <DonutChart data={statusData} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}