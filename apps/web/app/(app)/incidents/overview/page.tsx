import { AlertCircle, CheckCircle2, Clock, SearchCheck, Siren } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { BarSeries, DonutChart } from '@/components/ui/charts';
import { ModuleNav } from '@/components/governance/module-nav';
import { IncidentTable } from '@/components/enforcement/tables';
import { incidentCounts, incidentNavItems, severityDonut } from '@/components/enforcement/helpers';
import { dailySeries, incidents } from '@/lib/mock-data';

export default function Page() {
  const counts = incidentCounts();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Incident Overview"
        description="Pipeline health, severity mix and reporting trends."
      />
      <ModuleNav items={incidentNavItems} active="/incidents/overview" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Open" value={counts.open} icon={AlertCircle} accent="amber" />
        <StatCard label="Investigating" value={counts.investigating} icon={SearchCheck} accent="sky" />
        <StatCard label="Resolved" value={counts.resolved} icon={CheckCircle2} accent="green" />
        <StatCard label="Avg SLA Window" value={`${counts.avgSla}h`} icon={Clock} accent="violet" />
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
        <Card className="xl:col-span-2">
          <CardHeader title="Severity mix" subtitle="By severity" />
          <CardBody>
            <DonutChart data={severityDonut()} />
          </CardBody>
        </Card>
        <Card className="xl:col-span-3">
          <CardHeader title="Incidents — last 30 days" subtitle="New incidents per day" />
          <CardBody>
            <BarSeries data={dailySeries} dataKey="incidents" xKey="date" color="#fbbf24" height={220} />
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Incident list" subtitle="All incidents" />
        <CardBody>
          <IncidentTable rows={incidents} />
        </CardBody>
      </Card>
    </div>
  );
}