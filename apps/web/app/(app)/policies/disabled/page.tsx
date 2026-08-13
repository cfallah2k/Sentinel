import { FileX2, History, ShieldOff, Undo2 } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ModuleNav } from '@/components/governance/module-nav';
import { PolicyTable } from '@/components/enforcement/tables';
import { policyNavItems } from '@/components/enforcement/helpers';
import { policies } from '@/lib/mock-data';

export default function Page() {
  const rows = policies.filter((p) => p.status === 'Disabled');

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Disabled Policies"
        description="Policies paused or retired — no longer evaluated on traffic."
      />
      <ModuleNav items={policyNavItems} active="/policies/disabled" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Disabled" value={rows.length} icon={ShieldOff} accent="slate" />
        <StatCard label="Versions Kept" value={rows.length * 2} icon={History} accent="sky" />
        <StatCard label="Re-enable Requests" value={0} icon={Undo2} accent="amber" />
        <StatCard label="Exposure Window" value="—" icon={FileX2} accent="violet" />
      </div>
      <Card>
        <CardHeader title="Disabled policies" subtitle="No traffic is evaluated against these policies" />
        <CardBody>
          <PolicyTable rows={rows} searchPlaceholder="Search disabled policies..." />
        </CardBody>
      </Card>
    </div>
  );
}