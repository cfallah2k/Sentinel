import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { ClassHeader, ClassSubnav } from '@/components/data-intel/classification-shared';
import { classifierRules, fmt, resolveClass } from '@/components/data-intel/derived';

type RuleRow = { id: string; name: string; detector: string; action: string; scope: string; status: string; enforcements: number };

const ruleColumns: Column<RuleRow>[] = [
  { key: 'name', label: 'Rule', render: (r) => <span className="font-medium text-white">{r.name}</span>, sortValue: (r) => r.name },
  { key: 'detector', label: 'Detector', render: (r) => <span className="font-mono text-[0.65rem] text-sky-300">{r.detector}</span> },
  { key: 'action', label: 'Action', render: (r) => <Badge label={r.action} tone={r.action === 'Block' ? 'rose' : 'amber'} /> },
  { key: 'scope', label: 'Scope', render: (r) => <span className="text-slate-300">{r.scope}</span> },
  { key: 'enforcements', label: 'Enforcements', render: (r) => <span className="text-slate-300">{fmt(r.enforcements)}</span>, sortValue: (r) => r.enforcements },
  { key: 'status', label: 'Status', render: (r) => <Badge label={r.status} tone={r.status === 'Active' ? 'green' : 'amber'} /> }
];

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = resolveClass(id);
  const rows: RuleRow[] = classifierRules.filter((r) => r.category === row.name).map((r) => ({ ...r }));
  return (
    <div className="space-y-6">
      <ClassSubnav id={row.id} active="Rules" />
      <ClassHeader row={row} />
      <Card>
        <CardHeader title={`Rules for ${row.name}`} subtitle="Enforcement rules scoped to this label" />
        <CardBody>
          <DataTable columns={ruleColumns} rows={rows} searchable={false} pageSize={10} />
        </CardBody>
      </Card>
    </div>
  );
}