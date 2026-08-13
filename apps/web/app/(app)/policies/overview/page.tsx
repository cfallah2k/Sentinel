import { Boxes, FileCheck2, ScrollText, ShieldAlert } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { BarSeries } from '@/components/ui/charts';
import { ModuleNav } from '@/components/governance/module-nav';
import { PolicyTable } from '@/components/enforcement/tables';
import { fmt, policyNavItems, policyStats } from '@/components/enforcement/helpers';
import { dailySeries, policies } from '@/lib/mock-data';

export default function Page() {
  const stats = policyStats();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Policy Overview"
        description="Health and enforcement activity across the policy engine."
      />
      <ModuleNav items={policyNavItems} active="/policies/overview" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active" value={stats.active} icon={FileCheck2} accent="green" />
        <StatCard label="Violations / 24h" value={fmt(stats.violations24h)} icon={ShieldAlert} accent="rose" />
        <StatCard label="Enforcements" value={fmt(stats.enforcements)} icon={ScrollText} accent="sky" />
        <StatCard label="Active Rules" value={stats.conditions} icon={Boxes} accent="violet" />
      </div>
      <Card>
        <CardHeader title="Violations — last 30 days" subtitle="Enforcement blocks per day" />
        <CardBody>
          <BarSeries data={dailySeries} dataKey="blocked" xKey="date" color="#f87171" height={220} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Policy list" subtitle="All policies and their enforcement status" />
        <CardBody>
          <PolicyTable rows={policies} />
        </CardBody>
      </Card>
    </div>
  );
}