import { FileWarning, ShieldAlert, ShieldX, Siren } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ModuleNav } from '@/components/governance/module-nav';
import { IncidentTable } from '@/components/enforcement/tables';
import { incidentNavItems } from '@/components/enforcement/helpers';
import { incidents } from '@/lib/mock-data';

export default function Page() {
  const rows = incidents.filter((i) => i.type === 'Policy Violation');
  const active = rows.filter((i) => i.status !== 'Resolved');

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Policy Violation Incidents"
        description="Events triggered when enforcement caught traffic breaking a policy."
      />
      <ModuleNav items={incidentNavItems} active="/incidents/policy-violations" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Violations (30d)" value={rows.length} icon={ShieldX} accent="rose" />
        <StatCard label="Active Now" value={active.length} icon={FileWarning} accent="amber" />
        <StatCard label="Resolved" value={rows.filter((i) => i.status === 'Resolved').length} icon={ShieldAlert} accent="green" />
        <StatCard label="SLA Breached" value={rows.filter((i) => i.status !== 'Resolved' && i.slaHours <= 8).length} icon={Siren} accent="rose" />
      </div>
      <Card>
        <CardHeader title="Policy violations" subtitle="Incidents caused by policy enforcement" />
        <CardBody>
          <IncidentTable rows={rows} searchPlaceholder="Search policy violation incidents..." />
        </CardBody>
      </Card>
    </div>
  );
}