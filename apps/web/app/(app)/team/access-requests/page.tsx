import { Fingerprint } from 'lucide-react';
import { PageHeader, PrimaryButton } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { approvals } from '@/lib/mock-data';

type Row = {
  id: string;
  requester: string;
  type: string;
  status: string;
  risk: string;
  requestedAt: string;
  expiresAt: string;
  note: string;
};

export default function Page() {
  const rows: Row[] = approvals.map((a) => ({ ...a }));

  const columns: Column<Row>[] = [
    { key: 'id', label: 'Request', render: (r) => <span className="font-mono text-slate-400">{r.id}</span> },
    { key: 'requester', label: 'Requester', sortValue: (r) => r.requester, render: (r) => <span className="text-slate-200">{r.requester}</span> },
    { key: 'type', label: 'Type', render: (r) => <Badge label={r.type} tone="blue" /> },
    { key: 'status', label: 'Status', tone: (r) => toneForStatus(r.status) },
    { key: 'risk', label: 'Risk', tone: (r) => toneForStatus(r.risk) },
    { key: 'requestedAt', label: 'Requested', sortValue: (r) => r.requestedAt, render: (r) => r.requestedAt.slice(0, 10) },
    { key: 'note', label: 'Note', className: 'max-w-xs truncate text-slate-400' }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Access Requests"
        description="Requests from team members for data, policy exceptions and high-risk access."
        actions={<PrimaryButton href="/team/access-requests">Request Access</PrimaryButton>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pending" value={approvals.filter((a) => a.status === 'Pending').length} icon={Fingerprint} accent="amber" sub="Awaiting decision" />
        <StatCard label="Approved (7d)" value={approvals.filter((a) => a.status === 'Approved').length} icon={Fingerprint} accent="green" sub="Granted access" />
        <StatCard label="Denied (7d)" value={approvals.filter((a) => a.status === 'Denied').length} icon={Fingerprint} accent="rose" sub="Rejected requests" />
        <StatCard label="High Risk" value={approvals.filter((a) => a.risk === 'High' || a.risk === 'Critical').length} icon={Fingerprint} accent="red" sub="Require escalation" />
      </div>

      <Card>
        <CardHeader title="Access request queue" subtitle="All requests with review status" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search requests..." initialSort={{ key: 'requestedAt', dir: 'desc' }} />
        </CardBody>
      </Card>
    </div>
  );
}