import { CheckCircle2, History, RotateCcw, ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ModuleNav } from '@/components/governance/module-nav';
import { IncidentTable } from '@/components/enforcement/tables';
import { incidentNavItems } from '@/components/enforcement/helpers';
import { incidents } from '@/lib/mock-data';

export default function Page() {
  const rows = incidents.filter((i) => i.status === 'Resolved');

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Resolved Incidents"
        description="Closed incidents with verified remediation."
      />
      <ModuleNav items={incidentNavItems} active="/incidents/resolved" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Resolved (30d)" value={rows.length} delta={-12.5} deltaLabel="vs prior 30d" icon={CheckCircle2} accent="green" />
        <StatCard label="Within SLA" value={rows.filter((i) => i.slaHours <= 8).length} icon={ShieldCheck} accent="sky" />
        <StatCard label="Reopened" value={0} icon={RotateCcw} accent="amber" />
        <StatCard label="History Span" value="30 days" icon={History} accent="violet" />
      </div>
      <Card>
        <CardHeader title="Resolved incidents" subtitle="Closed and verified" />
        <CardBody>
          <IncidentTable rows={rows} searchPlaceholder="Search resolved incidents..." />
        </CardBody>
      </Card>
    </div>
  );
}