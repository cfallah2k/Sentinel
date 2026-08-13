import { ListChecks, ShieldAlert, ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { ClassificationNav } from '@/components/data-intel/classification-shared';
import { classifierRules, fmt, toneForCategory } from '@/components/data-intel/derived';

type RuleRow = { id: string; name: string; category: string; detector: string; action: string; scope: string; status: string; enforcements: number };

const ruleColumns: Column<RuleRow>[] = [
  { key: 'name', label: 'Rule', render: (r) => <span className="font-medium text-white">{r.name}</span>, sortValue: (r) => r.name },
  { key: 'category', label: 'Category', render: (r) => <Badge label={r.category} tone={toneForCategory(r.category)} /> },
  { key: 'detector', label: 'Detector', render: (r) => <span className="font-mono text-[0.65rem] text-sky-300">{r.detector}</span> },
  { key: 'action', label: 'Action', render: (r) => <Badge label={r.action} tone={r.action === 'Block' ? 'rose' : 'amber'} /> },
  { key: 'scope', label: 'Scope', render: (r) => <span className="text-slate-300">{r.scope}</span> },
  { key: 'enforcements', label: 'Enforcements', render: (r) => <span className="text-slate-300">{fmt(r.enforcements)}</span>, sortValue: (r) => r.enforcements },
  { key: 'status', label: 'Status', render: (r) => <Badge label={r.status} tone={r.status === 'Active' ? 'green' : 'amber'} /> }
];

export default function Page() {
  const rows: RuleRow[] = classifierRules.map((r) => ({ ...r }));
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="Classification Rules"
        description="Label-level enforcement rules: which detector watches which category and what the gateway does when it matches."
      />
      <ClassificationNav active="Rules" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active rules" value={rows.filter((r) => r.status === 'Active').length} icon={ListChecks} accent="sky" sub={`${rows.length} total rules`} />
        <StatCard label="Block actions" value={rows.filter((r) => r.action === 'Block').length} icon={ShieldAlert} accent="rose" sub="Deny on match" />
        <StatCard label="Redact actions" value={rows.filter((r) => r.action === 'Redact').length} icon={ShieldCheck} accent="amber" sub="Strip on match" />
        <StatCard label="Enforcements 24h" value={fmt(rows.reduce((a, r) => a + r.enforcements, 0))} icon={ListChecks} accent="cyan" sub="Applied decisions" />
      </div>
      <Card>
        <CardHeader title="Rule registry" subtitle="How each classification label is enforced" />
        <CardBody>
          <DataTable columns={ruleColumns} rows={rows} pageSize={10} initialSort={{ key: 'enforcements', dir: 'desc' }} searchPlaceholder="Search rules..." />
        </CardBody>
      </Card>
    </div>
  );
}