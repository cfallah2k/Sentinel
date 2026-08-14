import { AlertCircle, CheckCircle2, Clock, PlusCircle, SearchCheck, ShieldAlert, Siren } from 'lucide-react';
import { PageHeader, PrimaryButton } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { BarSeries, DonutChart } from '@/components/ui/charts';
import { ModuleNav } from '@/components/governance/module-nav';
import { IncidentTable } from '@/components/enforcement/tables';
import { incidentCounts, incidentNavItems, severityDonut } from '@/components/enforcement/helpers';
import ExportCsvButton from '@/components/ui/export-button';
import { dailySeries, incidents } from '@/lib/mock-data';

export default function Page() {
  const counts = incidentCounts();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Incidents"
        description="Security events across AI traffic — triage, investigate and resolve."
        actions={[
          <PrimaryButton key="report" href="/incidents/create">Report Incident</PrimaryButton>,
          <ExportCsvButton
            key="export"
            label="Export"
            filename="incidents"
            rows={incidents.map((i) => ({
              id: i.id,
              title: i.title,
              severity: i.severity,
              status: i.status,
              system: i.systemId ?? '',
              reported: i.openedAt
            }))}
          />
        ]}
      />
      <ModuleNav items={incidentNavItems} active="/incidents" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Open" value={counts.open} icon={AlertCircle} accent="amber" />
        <StatCard label="Investigating" value={counts.investigating} icon={SearchCheck} accent="sky" />
        <StatCard label="Resolved (30d)" value={counts.resolved} delta={-12.5} deltaLabel="vs prior 30d" icon={CheckCircle2} accent="green" />
        <StatCard label="SLA Breached" value={counts.slaBreached} delta={-4.1} deltaLabel="vs prior 30d" icon={Siren} accent="rose" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Critical" value={counts.critical} icon={ShieldAlert} accent="red" />
        <StatCard label="High Severity" value={counts.high} icon={AlertCircle} accent="rose" />
        <StatCard label="Avg SLA Window" value={`${counts.avgSla}h`} icon={Clock} accent="violet" />
        <StatCard label="Reported (30d)" value={incidents.length} icon={PlusCircle} accent="cyan" />
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
        <Card className="xl:col-span-2">
          <CardHeader title="Severity mix" subtitle="Distribution of active incidents" />
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
        <CardHeader title="All incidents" subtitle={`${incidents.length} incidents on record`} />
        <CardBody>
          <IncidentTable rows={incidents} />
        </CardBody>
      </Card>
    </div>
  );
}