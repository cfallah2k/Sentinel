import { AlertTriangle, Ban, GitBranch, RefreshCw } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { DonutChart, BarSeries } from '@/components/ui/charts';
import { ModuleNav } from '@/components/governance/module-nav';
import { riskNavItems, appName, systemName } from '@/components/governance/risk-helpers';
import { dataFlows } from '@/lib/mock-data';

export default function Page() {
  const rows = dataFlows.map((f) => ({ ...f, application: appName(f.applicationId), system: systemName(f.systemId) }));
  const blocked = dataFlows.filter((f) => f.status === 'Blocked').length;
  const review = dataFlows.filter((f) => f.status === 'Review').length;
  const critical = dataFlows.filter((f) => f.risk === 'Critical').length;
  const totalMb = dataFlows.reduce((s, f) => s + f.volumeMb, 0);
  const decisionData = (['Allow', 'Block', 'Redact', 'Require Approval', 'Log'] as const)
    .map((d) => ({ name: d, value: dataFlows.filter((f) => f.decision === d).length }))
    .filter((d) => d.value > 0);
  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'id', label: 'Flow', sortValue: (r) => r.id },
    { key: 'source', label: 'Source', sortValue: (r) => r.source },
    { key: 'application', label: 'Application', sortValue: (r) => r.application },
    { key: 'system', label: 'AI system', sortValue: (r) => r.system },
    { key: 'category', label: 'Category', sortValue: (r) => r.category },
    { key: 'decision', label: 'Decision', sortValue: (r) => r.decision, render: (r) => <Badge label={r.decision} tone={toneForStatus(r.decision)} /> },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> },
    { key: 'risk', label: 'Risk', sortValue: (r) => r.risk, render: (r) => <Badge label={r.risk} tone={toneForStatus(r.risk)} /> },
    { key: 'volumeMb', label: 'Volume (MB)', sortValue: (r) => r.volumeMb },
    { key: 'timestamp', label: 'Timestamp', sortValue: (r) => r.timestamp }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Governance"
        title="Data Flow Risk"
        description="Every data pipeline between sources, applications and AI systems — decisions, status and volume."
      />
      <ModuleNav items={riskNavItems} active="/risk/data-flows" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Data flows" value={dataFlows.length} delta={8} deltaLabel="this week" icon={GitBranch} accent="sky" />
        <StatCard label="Blocked" value={blocked} delta={-20} deltaLabel="vs last week" icon={Ban} accent="rose" />
        <StatCard label="In review" value={review} delta={0} deltaLabel="unchanged" icon={RefreshCw} accent="amber" />
        <StatCard label="Critical risk" value={critical} delta={0} deltaLabel="unchanged" icon={AlertTriangle} accent="red" />
      </div>
      <Card>
        <CardHeader title="Flow register" subtitle="All data flows with governance decisions" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search flows..." initialSort={{ key: 'risk', dir: 'desc' }} />
        </CardBody>
      </Card>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Decision mix" subtitle="Flow decisions by policy type" />
          <CardBody>
            <DonutChart data={decisionData} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Volume by category" subtitle="Megabytes moved per data category" />
          <CardBody>
            <BarSeries data={Array.from(new Set(dataFlows.map((f) => f.category))).map((c) => ({ name: c, volume: dataFlows.filter((f) => f.category === c).reduce((s, f) => s + f.volumeMb, 0) }))} dataKey="volume" color="#38bdf8" height={200} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}