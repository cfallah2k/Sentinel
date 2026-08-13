import { Boxes, ScrollText, ShieldAlert } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AttrGrid } from '@/components/registry/attr-grid';
import { RequestTable } from '@/components/enforcement/tables';
import { DecisionBadge } from '@/components/enforcement/badges';
import { fmt, policyById, policyNav, policyViolations } from '@/components/enforcement/helpers';
import { policies } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const policy = policyById(id) ?? policies[0];
  const violations = policyViolations(policy.id);

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Policies"
        title={policy.name}
        id={policy.id}
        description={policy.description}
        badges={[
          <Badge key="s" label={policy.status} tone={policy.status === 'Active' ? 'green' : policy.status === 'Draft' ? 'amber' : 'slate'} />,
          <Badge key="v" label={policy.version} tone="blue" />
        ]}
      />
      <DetailNav base={`/policies/${id}`} items={policyNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Violations" value={fmt(policy.violations)} icon={ShieldAlert} accent="rose" />
        <StatCard label="Enforcements" value={fmt(policy.enforcements)} icon={ScrollText} accent="sky" />
        <StatCard label="Rules" value={policy.conditions} icon={Boxes} accent="violet" />
        <StatCard label="Scope" value={policy.scope.split(' ')[0]} icon={ScrollText} accent="cyan" />
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader title="Overview" subtitle="Policy essentials" />
          <CardBody>
            <AttrGrid
              items={[
                { label: 'Status', value: policy.status },
                { label: 'Version', value: policy.version },
                { label: 'Scope', value: policy.scope },
                { label: 'Updated', value: policy.updatedAt },
                {
                  label: 'Decisions',
                  value: (
                    <div className="flex flex-wrap gap-1.5">
                      {policy.decisions.map((d) => (
                        <DecisionBadge key={d} label={d} />
                      ))}
                    </div>
                  )
                }
              ]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Recent violations" subtitle={`${violations.length} recent enforcement events`} />
          <CardBody>
            <RequestTable rows={violations} searchPlaceholder="Search violations..." pageSize={6} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}