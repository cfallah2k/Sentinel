import { Braces, GitMerge, ListFilter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { policyById, policyNav, rulesForPolicy } from '@/components/enforcement/helpers';
import { policies } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const policy = policyById(id) ?? policies[0];
  const conditions = rulesForPolicy(policy).map((r, i) => ({
    ...r,
    group: `Group ${(i % 2) + 1}`,
    required: i % 3 !== 0
  }));
  const columns: Column<(typeof conditions)[number]>[] = [
    { key: 'group', label: 'Condition Group', sortValue: (r) => r.group, render: (r) => <span className="text-slate-400">{r.group}</span> },
    { key: 'field', label: 'Field', render: (r) => <span className="font-mono text-xs text-sentinel-300">{r.field}</span> },
    { key: 'operator', label: 'Operator', render: (r) => <span className="font-mono text-xs text-slate-400">{r.operator}</span> },
    { key: 'value', label: 'Value', sortValue: (r) => r.value, render: (r) => <span className="text-slate-200">{r.value}</span> },
    { key: 'required', label: 'Required', render: (r) => (r.required ? <Badge label="Required" tone="green" /> : <Badge label="Optional" tone="slate" />) }
  ];

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Policies"
        title={policy.name}
        id={policy.id}
        description="Logical conditions that gate this policy's rules."
        badges={[
          <Badge key="s" label={policy.status} tone={policy.status === 'Active' ? 'green' : policy.status === 'Draft' ? 'amber' : 'slate'} />,
          <Badge key="v" label={policy.version} tone="blue" />
        ]}
      />
      <DetailNav base={`/policies/${id}`} items={policyNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Conditions" value={conditions.length} icon={ListFilter} accent="violet" />
        <StatCard label="Groups" value={2} icon={GitMerge} accent="sky" />
        <StatCard label="Required" value={conditions.filter((c) => c.required).length} icon={Braces} accent="green" />
        <StatCard label="Evaluation" value="AND within group" icon={Braces} accent="cyan" />
      </div>
      <Card>
        <CardHeader title="Conditions" subtitle="All conditions must hold within a group for the rule to fire" />
        <CardBody>
          <DataTable columns={columns} rows={conditions} searchable={false} pageSize={10} />
        </CardBody>
      </Card>
    </div>
  );
}