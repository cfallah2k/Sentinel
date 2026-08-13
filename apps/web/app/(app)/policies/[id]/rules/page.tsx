import { Boxes, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { DecisionBadge } from '@/components/enforcement/badges';
import { policyById, policyNav, rulesForPolicy } from '@/components/enforcement/helpers';
import { policies } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const policy = policyById(id) ?? policies[0];
  const rules = rulesForPolicy(policy);
  const columns: Column<(typeof rules)[number]>[] = [
    { key: 'name', label: 'Rule', sortValue: (r) => r.name, render: (r) => <span className="font-medium text-white">{r.name}</span> },
    { key: 'field', label: 'Field', render: (r) => <span className="font-mono text-xs text-sentinel-300">{r.field}</span> },
    { key: 'operator', label: 'Operator', sortValue: (r) => r.operator, render: (r) => <span className="font-mono text-xs text-slate-400">{r.operator}</span> },
    { key: 'value', label: 'Value', sortValue: (r) => r.value, render: (r) => <span className="text-slate-200">{r.value}</span> },
    { key: 'action', label: 'Action', sortValue: (r) => r.action, render: (r) => <DecisionBadge label={r.action} /> },
    { key: 'hits', label: 'Hits', sortValue: (r) => r.hits, render: (r) => <span className="text-slate-200">{r.hits.toLocaleString()}</span> }
  ];

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Policies"
        title={policy.name}
        id={policy.id}
        description="The rules that make up this policy, evaluated in order."
        badges={[
          <Badge key="s" label={policy.status} tone={policy.status === 'Active' ? 'green' : policy.status === 'Draft' ? 'amber' : 'slate'} />,
          <Badge key="v" label={policy.version} tone="blue" />
        ]}
      />
      <DetailNav base={`/policies/${id}`} items={policyNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Rules" value={rules.length} icon={Boxes} accent="violet" />
        <StatCard label="Rule Hits" value={rules.reduce((a, r) => a + r.hits, 0).toLocaleString()} icon={ShieldCheck} accent="sky" />
        <StatCard label="First Match Wins" value="Yes" icon={ShieldCheck} accent="green" />
        <StatCard label="Evaluation Cost" value="~0.4 ms / rule" icon={Boxes} accent="cyan" />
      </div>
      <Card>
        <CardHeader title="Rule set" subtitle="Ordered evaluation — the first matching rule decides" />
        <CardBody>
          <DataTable columns={columns} rows={rules} searchable={false} pageSize={10} />
        </CardBody>
      </Card>
    </div>
  );
}