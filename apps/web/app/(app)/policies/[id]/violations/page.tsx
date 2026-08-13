import { AlertTriangle, ShieldAlert, ShieldX, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { RequestTable } from '@/components/enforcement/tables';
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
        description="Requests that tripped this policy — the evidence behind every violation."
        badges={[
          <Badge key="s" label={policy.status} tone={policy.status === 'Active' ? 'green' : policy.status === 'Draft' ? 'amber' : 'slate'} />,
          <Badge key="v" label={policy.version} tone="blue" />
        ]}
      />
      <DetailNav base={`/policies/${id}`} items={policyNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Violations" value={fmt(policy.violations)} icon={ShieldAlert} accent="rose" />
        <StatCard label="In 24h" value={fmt(policyViolations(policy.id).length)} icon={AlertTriangle} accent="amber" />
        <StatCard label="Violating Requests" value={violations.length} icon={ShieldX} accent="sky" />
        <StatCard label="Trend" value="-8.3%" delta={-8.3} deltaLabel="vs last 30d" icon={TrendingUp} accent="green" />
      </div>
      <Card>
        <CardHeader title="Violating requests" subtitle="Requests blocked, redacted or queued by this policy" />
        <CardBody>
          <RequestTable rows={violations} searchPlaceholder="Search violating requests..." />
        </CardBody>
      </Card>
    </div>
  );
}