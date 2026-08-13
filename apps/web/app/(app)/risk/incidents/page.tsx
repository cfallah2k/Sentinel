import { AlertTriangle, CheckCircle2, Clock, Search } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { DonutChart } from '@/components/ui/charts';
import { ModuleNav } from '@/components/governance/module-nav';
import { riskNavItems, systemName } from '@/components/governance/risk-helpers';
import { incidents } from '@/lib/mock-data';

export default function Page() {
  const rows = incidents.map((i) => ({ ...i, system: systemName(i.systemId) }));
  const open = incidents.filter((i) => i.status === 'Open').length;
  const investigating = incidents.filter((i) => i.status === 'Investigating').length;
  const critical = incidents.filter((i) => i.severity === 'Critical').length;
  const resolved = incidents.filter((i) => i.status === 'Resolved').length;
  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'id', label: 'Incident', sortValue: (r) => r.id, render: (r) => <span className="font-medium text-sky-300">{r.id}</span> },
    { key: 'title', label: 'Title', sortValue: (r) => r.title },
    { key: 'severity', label: 'Severity', sortValue: (r) => r.severity, render: (r) => <Badge label={r.severity} tone={toneForStatus(r.severity)} /> },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> },
    { key: 'type', label: 'Type', sortValue: (r) => r.type },
    { key: 'system', label: 'AI system', sortValue: (r) => r.system },
    { key: 'assignee', label: 'Assignee', sortValue: (r) => r.assignee },
    { key: 'openedAt', label: 'Opened', sortValue: (r) => r.openedAt },
    { key: 'slaHours', label: 'SLA (h)', sortValue: (r) => r.slaHours }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Governance"
        title="Incident Risk"
        description="Security and AI risk incidents — severity, response state, SLA exposure and affected systems."
      />
      <ModuleNav items={riskNavItems} active="/risk/incidents" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Open" value={open} delta={33} deltaLabel="need action" icon={AlertTriangle} accent="rose" />
        <StatCard label="Investigating" value={investigating} delta={0} deltaLabel="in progress" icon={Search} accent="amber" />
        <StatCard label="Critical" value={critical} delta={0} deltaLabel="unchanged" icon={Clock} accent="red" />
        <StatCard label="Resolved" value={resolved} delta={Math.round((resolved / incidents.length) * 100)} deltaLabel="resolution rate" icon={CheckCircle2} accent="green" />
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Incident register" subtitle="All incidents with severity and response state" />
          <CardBody>
            <DataTable columns={columns} rows={rows} searchPlaceholder="Search incidents..." initialSort={{ key: 'openedAt', dir: 'desc' }} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Severity mix" subtitle="Incidents by severity level" />
          <CardBody>
            <DonutChart
              data={(['Critical', 'High', 'Medium', 'Low'] as const)
                .map((s) => ({ name: s, value: incidents.filter((i) => i.severity === s).length }))
                .filter((d) => d.value > 0)}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}