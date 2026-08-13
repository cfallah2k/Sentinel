import { Database, FileWarning, ShieldCheck, Siren } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ModuleNav } from '@/components/governance/module-nav';
import { IncidentTable } from '@/components/enforcement/tables';
import { incidentNavItems } from '@/components/enforcement/helpers';
import { incidents } from '@/lib/mock-data';

export default function Page() {
  const rows = incidents.filter((i) => i.type === 'Data Exposure');
  const active = rows.filter((i) => i.status !== 'Resolved');

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Data Exposure Incidents"
        description="Sensitive data reaching places it shouldn't."
      />
      <ModuleNav items={incidentNavItems} active="/incidents/data-exposure" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Exposures (30d)" value={rows.length} icon={Database} accent="rose" />
        <StatCard label="Active Now" value={active.length} icon={FileWarning} accent="amber" />
        <StatCard label="Resolved" value={rows.filter((i) => i.status === 'Resolved').length} icon={ShieldCheck} accent="green" />
        <StatCard label="SLA Breached" value={rows.filter((i) => i.status !== 'Resolved' && i.slaHours <= 8).length} icon={Siren} accent="rose" />
      </div>
      <Card>
        <CardHeader title="Data exposure incidents" subtitle="Confirmed or suspected data exposure" />
        <CardBody>
          <IncidentTable rows={rows} searchPlaceholder="Search data exposure incidents..." />
        </CardBody>
      </Card>
    </div>
  );
}