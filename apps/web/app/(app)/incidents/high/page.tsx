import { AlertCircle, ShieldAlert, Siren, Timer } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ModuleNav } from '@/components/governance/module-nav';
import { IncidentTable } from '@/components/enforcement/tables';
import { incidentNavItems } from '@/components/enforcement/helpers';
import { incidents } from '@/lib/mock-data';

export default function Page() {
  const rows = incidents.filter((i) => i.severity === 'High');
  const active = rows.filter((i) => i.status !== 'Resolved');

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="High Severity Incidents"
        description="Serious events requiring prompt response."
      />
      <ModuleNav items={incidentNavItems} active="/incidents/high" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="High (30d)" value={rows.length} icon={ShieldAlert} accent="rose" />
        <StatCard label="Active Now" value={active.length} icon={AlertCircle} accent="amber" />
        <StatCard label="SLA Breached" value={rows.filter((i) => i.status !== 'Resolved' && i.slaHours <= 8).length} icon={Siren} accent="rose" />
        <StatCard label="Avg SLA Window" value="8h" icon={Timer} accent="violet" />
      </div>
      <Card>
        <CardHeader title="High severity incidents" subtitle="Serious events" />
        <CardBody>
          <IncidentTable rows={rows} searchPlaceholder="Search high severity incidents..." />
        </CardBody>
      </Card>
    </div>
  );
}