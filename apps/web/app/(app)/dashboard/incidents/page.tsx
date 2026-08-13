import { AlertTriangle, CircleAlert, CircleCheck, CircleDot } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { BarSeries } from '@/components/ui/charts';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { aiSystems, dailySeries, incidents } from '@/lib/mock-data';

const openIncidents = incidents.filter((i) => i.status === 'Open' || i.status === 'Investigating');
const bySeverity = (s: string) => incidents.filter((i) => i.severity === s).length;
const byType = (t: string) => openIncidents.filter((i) => i.type === t).length;

const systemName = new Map(aiSystems.map((s) => [s.id, s.name]));

const incidentRows = openIncidents.map((i) => ({
  id: i.id,
  title: i.title,
  severity: i.severity,
  status: i.status,
  type: i.type,
  system: systemName.get(i.systemId) ?? i.systemId,
  assignee: i.assignee,
  openedAt: i.openedAt,
  slaHours: i.slaHours
}));
type IncidentRow = (typeof incidentRows)[number];

const incidentColumns: Column<IncidentRow>[] = [
  { key: 'id', label: 'ID', render: (r) => <span className="font-mono text-sentinel-300">{r.id}</span> },
  { key: 'title', label: 'Incident', render: (r) => <span className="font-medium text-slate-200">{r.title}</span> },
  { key: 'severity', label: 'Severity', sortValue: (r) => ({ Critical: 4, High: 3, Medium: 2, Low: 1 } as Record<string, number>)[r.severity], tone: (r) => toneForStatus(r.severity) },
  { key: 'status', label: 'Status', tone: (r) => toneForStatus(r.status) },
  { key: 'type', label: 'Type' },
  { key: 'system', label: 'AI system' },
  { key: 'assignee', label: 'Assignee' },
  { key: 'openedAt', label: 'Opened', render: (r) => r.openedAt.slice(5, 16).replace('T', ' ') },
  { key: 'slaHours', label: 'SLA', sortValue: (r) => r.slaHours, render: (r) => `${r.slaHours}h` }
];

export default function Page() {
  return (
    <div>
      <PageHeader
        eyebrow="Incidents"
        title="Incidents Snapshot"
        description="Active incidents across severity levels, with historical incident volume for the last 30 days."
      />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Critical" value={bySeverity('Critical')} icon={CircleAlert} accent="rose" spark={dailySeries.map((d) => d.incidents)} sub={`${byType('AI Risk')} AI risk · ${byType('Data Exposure')} exposure`} />
        <StatCard label="High" value={bySeverity('High')} icon={AlertTriangle} accent="amber" sub={`${byType('Policy Violation')} policy violations`} />
        <StatCard label="Medium" value={bySeverity('Medium')} icon={CircleDot} accent="sky" sub={`${byType('Anomaly')} anomalies`} />
        <StatCard label="Low" value={bySeverity('Low')} icon={CircleCheck} accent="green" sub={`${incidents.filter((i) => i.status === 'Resolved').length} resolved overall`} />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Open incidents" subtitle={`${openIncidents.length} open or under investigation`} />
          <CardBody>
            <DataTable columns={incidentColumns} rows={incidentRows} searchable={false} pageSize={6} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Incidents by day" subtitle="Reported incidents, last 30 days" />
          <CardBody>
            <BarSeries data={dailySeries} dataKey="incidents" xKey="date" color="#f87171" height={240} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}