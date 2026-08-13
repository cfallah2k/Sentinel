import { Clock, FileCheck2, PencilRuler, Users } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ModuleNav } from '@/components/governance/module-nav';
import { PolicyTable } from '@/components/enforcement/tables';
import { policyNavItems } from '@/components/enforcement/helpers';
import { policies } from '@/lib/mock-data';

export default function Page() {
  const rows = policies.filter((p) => p.status === 'Draft');

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Draft Policies"
        description="Policies in authoring — not yet enforcing on traffic."
      />
      <ModuleNav items={policyNavItems} active="/policies/draft" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Drafts" value={rows.length} icon={PencilRuler} accent="amber" />
        <StatCard label="Rules Planned" value={rows.reduce((a, p) => a + p.conditions, 0)} icon={FileCheck2} accent="sky" />
        <StatCard label="Awaiting Review" value={rows.length} icon={Clock} accent="violet" />
        <StatCard label="Reviewers" value={4} icon={Users} accent="green" />
      </div>
      <Card>
        <CardHeader title="Draft policies" subtitle="Pending authoring or review" />
        <CardBody>
          <PolicyTable rows={rows} searchPlaceholder="Search draft policies..." />
        </CardBody>
      </Card>
    </div>
  );
}