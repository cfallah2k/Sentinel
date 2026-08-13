import { FlaskConical, SearchCheck, Siren, Timer } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ModuleNav } from '@/components/governance/module-nav';
import { IncidentTable } from '@/components/enforcement/tables';
import { incidentNavItems } from '@/components/enforcement/helpers';
import { incidents } from '@/lib/mock-data';

export default function Page() {
  const rows = incidents.filter((i) => i.status === 'Investigating');

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Investigating Incidents"
        description="Actively worked by responders — evidence collection and containment in flight."
      />
      <ModuleNav items={incidentNavItems} active="/incidents/investigating" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Investigating" value={rows.length} icon={SearchCheck} accent="sky" />
        <StatCard label="SLA at Risk" value={rows.filter((i) => i.slaHours <= 8).length} icon={Siren} accent="rose" />
        <StatCard label="Evidence Pending" value={rows.length * 2} icon={FlaskConical} accent="violet" />
        <StatCard label="Median Age" value={`${Math.max(...rows.map((i) => i.slaHours), 0)}h`} icon={Timer} accent="amber" />
      </div>
      <Card>
        <CardHeader title="Investigating incidents" subtitle="Active response work" />
        <CardBody>
          <IncidentTable rows={rows} searchPlaceholder="Search investigating incidents..." />
        </CardBody>
      </Card>
    </div>
  );
}