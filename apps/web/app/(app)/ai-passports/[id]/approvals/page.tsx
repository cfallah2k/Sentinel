import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { PassportHeader, PassportSubnav } from '@/components/data-intel/passport-shared';
import { approvalRows, resolvePassport } from '@/components/data-intel/derived';

type ApprovalRow = { id: string; requester: string; type: string; status: string; risk: string; note: string };

const approvalColumns: Column<ApprovalRow>[] = [
  { key: 'id', label: 'Approval', render: (r) => <span className="font-medium text-white">{r.id}</span> },
  { key: 'type', label: 'Type', render: (r) => <Badge label={r.type} tone="blue" /> },
  { key: 'requester', label: 'Requester', render: (r) => <span className="text-slate-300">{r.requester}</span> },
  { key: 'risk', label: 'Risk', render: (r) => <Badge label={r.risk} tone={r.risk === 'Critical' ? 'red' : r.risk === 'High' ? 'rose' : 'amber'} /> },
  { key: 'status', label: 'Status', render: (r) => <Badge label={r.status} tone={r.status === 'Approved' ? 'green' : r.status === 'Pending' ? 'amber' : 'rose'} /> },
  { key: 'note', label: 'Note', render: (r) => <span className="max-w-[260px] truncate text-slate-400">{r.note}</span> }
];

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = resolvePassport(id);
  const rows = approvalRows(p);
  return (
    <div className="space-y-6">
      <PassportSubnav id={p.id} active="Approvals" />
      <PassportHeader p={p} />
      <Card>
        <CardHeader title="Approvals" subtitle="Access and risk decisions tied to this passport" />
        <CardBody>
          <DataTable columns={approvalColumns} rows={rows} searchable={false} pageSize={10} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Approval posture" subtitle="Current state" />
        <CardBody>
          <div className="flex flex-wrap gap-2">
            <Badge label={`${rows.filter((r) => r.status === 'Approved').length} approved`} tone="green" />
            <Badge label={`${rows.filter((r) => r.status === 'Pending').length} pending`} tone="amber" />
            <Badge label={p.status} tone={p.status === 'Certified' ? 'green' : 'amber'} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}