import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { PassportHeader, PassportSubnav } from '@/components/data-intel/passport-shared';
import { passportAuditRows, fmtTime, resolvePassport } from '@/components/data-intel/derived';

type AuditRow = { id: string; timestamp: string; actor: string; action: string; resource: string; result: string; ip: string };

const auditColumns: Column<AuditRow>[] = [
  { key: 'timestamp', label: 'Time', render: (r) => <span className="whitespace-nowrap text-slate-400">{fmtTime(r.timestamp)}</span>, sortValue: (r) => r.timestamp },
  { key: 'actor', label: 'Actor', render: (r) => <span className="text-slate-300">{r.actor}</span> },
  { key: 'action', label: 'Action', render: (r) => <span className="font-mono text-[0.65rem] text-sky-300">{r.action}</span> },
  { key: 'resource', label: 'Resource', render: (r) => <span className="font-mono text-[0.65rem] text-slate-300">{r.resource}</span> },
  { key: 'result', label: 'Result', render: (r) => <Badge label={r.result} tone={r.result === 'Success' ? 'green' : r.result === 'Denied' ? 'rose' : 'amber'} /> },
  { key: 'ip', label: 'IP', render: (r) => <span className="font-mono text-[0.65rem] text-slate-400">{r.ip}</span> }
];

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = resolvePassport(id);
  const rows = passportAuditRows(p);
  return (
    <div className="space-y-6">
      <PassportSubnav id={p.id} active="Audit" />
      <PassportHeader p={p} />
      <Card>
        <CardHeader title="Audit trail" subtitle="Immutable events touching this passport" />
        <CardBody>
          <DataTable columns={auditColumns} rows={rows} searchable={false} pageSize={10} initialSort={{ key: 'timestamp', dir: 'desc' }} />
        </CardBody>
      </Card>
    </div>
  );
}