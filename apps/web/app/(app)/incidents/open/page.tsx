import { AlertCircle, Clock, Siren, Users } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ModuleNav } from '@/components/governance/module-nav';
import { IncidentTable } from '@/components/enforcement/tables';
import { incidentCounts, incidentNavItems } from '@/components/enforcement/helpers';
import { incidents } from '@/lib/mock-data';

export default function Page() {
  const counts = incidentCounts();
  const rows = incidents.filter((i) => i.status === 'Open');

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Open Incidents"
        description="Reported but not yet under active investigation."
      />
      <ModuleNav items={incidentNavItems} active="/incidents/open" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Open" value={rows.length} icon={AlertCircle} accent="amber" />
        <StatCard label="SLA Breached" value={rows.filter((i) => i.slaHours <= 8).length} icon={Siren} accent="rose" />
        <StatCard label="Unassigned" value={rows.filter((i) => !i.assignee).length} icon={Users} accent="sky" />
        <StatCard label="Avg SLA Window" value={`${counts.avgSla}h`} icon={Clock} accent="violet" />
      </div>
      <Card>
        <CardHeader title="Open incidents" subtitle="Awaiting triage" />
        <CardBody>
          <IncidentTable rows={rows} searchPlaceholder="Search open incidents..." />
        </CardBody>
      </Card>
    </div>
  );
}