import { AlertTriangle, ShieldAlert, ShieldX, ScrollText } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ModuleNav } from '@/components/governance/module-nav';
import { PolicyTable, RequestTable } from '@/components/enforcement/tables';
import { fmt, policyNavItems, policyStats } from '@/components/enforcement/helpers';
import { gatewayRequests } from '@/lib/mock-data';

export default function Page() {
  const stats = policyStats();
  const rows = stats.violatedPolicies;
  const violationRequests = gatewayRequests.filter((r) => r.policyId && rows.some((p) => p.id === r.policyId));

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Violated Policies"
        description="Policies with recorded violations, and the requests that triggered them."
      />
      <ModuleNav items={policyNavItems} active="/policies/violated" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Violated Policies" value={rows.length} icon={ShieldAlert} accent="rose" />
        <StatCard label="Total Violations" value={fmt(rows.reduce((a, p) => a + p.violations, 0))} icon={AlertTriangle} accent="amber" />
        <StatCard label="Violations / 24h" value={fmt(stats.violations24h)} icon={ShieldX} accent="rose" />
        <StatCard label="Enforcement Events" value={fmt(rows.reduce((a, p) => a + p.enforcements, 0))} icon={ScrollText} accent="sky" />
      </div>
      <Card>
        <CardHeader title="Violated policies" subtitle="Policies with violations on record" />
        <CardBody>
          <PolicyTable rows={rows} searchPlaceholder="Search violated policies..." />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Violating requests" subtitle={`${violationRequests.length} blocked or redacted requests mapped to these policies`} />
        <CardBody>
          <RequestTable rows={violationRequests} searchPlaceholder="Search violating requests..." />
        </CardBody>
      </Card>
    </div>
  );
}