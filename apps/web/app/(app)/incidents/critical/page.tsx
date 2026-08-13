import { AlertTriangle, Flame, Siren, Timer } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ModuleNav } from '@/components/governance/module-nav';
import { IncidentTable } from '@/components/enforcement/tables';
import { incidentNavItems } from '@/components/enforcement/helpers';
import { incidents } from '@/lib/mock-data';

export default function Page() {
  const rows = incidents.filter((i) => i.severity === 'Critical');
  const active = rows.filter((i) => i.status !== 'Resolved');

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Critical Incidents"
        description="Maximum severity — immediate response required."
      />
      <ModuleNav items={incidentNavItems} active="/incidents/critical" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Critical (30d)" value={rows.length} icon={Flame} accent="red" />
        <StatCard label="Active Now" value={active.length} icon={AlertTriangle} accent="rose" />
        <StatCard label="SLA Breached" value={rows.filter((i) => i.status !== 'Resolved' && i.slaHours <= 4).length} icon={Siren} accent="amber" />
        <StatCard label="Avg SLA Window" value="4h" icon={Timer} accent="violet" />
      </div>
      <Card>
        <CardHeader title="Critical incidents" subtitle="Highest severity events" />
        <CardBody>
          <IncidentTable rows={rows} searchPlaceholder="Search critical incidents..." />
        </CardBody>
      </Card>
    </div>
  );
}