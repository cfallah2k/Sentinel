import { FileCheck2, ShieldAlert, ShieldCheck, ScrollText } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ModuleNav } from '@/components/governance/module-nav';
import { PolicyTable } from '@/components/enforcement/tables';
import { fmt, policyNavItems } from '@/components/enforcement/helpers';
import { policies } from '@/lib/mock-data';

export default function Page() {
  const rows = policies.filter((p) => p.status === 'Active');
  const violations = rows.reduce((a, p) => a + p.violations, 0);
  const enforcements = rows.reduce((a, p) => a + p.enforcements, 0);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Active Policies"
        description="Policies currently enforcing decisions on live traffic."
      />
      <ModuleNav items={policyNavItems} active="/policies/active" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active" value={rows.length} icon={ShieldCheck} accent="green" />
        <StatCard label="Violations" value={fmt(violations)} icon={ShieldAlert} accent="rose" />
        <StatCard label="Enforcements" value={fmt(enforcements)} icon={ScrollText} accent="sky" />
        <StatCard label="Rules" value={rows.reduce((a, p) => a + p.conditions, 0)} icon={FileCheck2} accent="violet" />
      </div>
      <Card>
        <CardHeader title="Active policies" subtitle="Enforcing on all scoped traffic" />
        <CardBody>
          <PolicyTable rows={rows} searchPlaceholder="Search active policies..." />
        </CardBody>
      </Card>
    </div>
  );
}