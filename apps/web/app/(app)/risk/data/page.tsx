import { AlertTriangle, Database, Folder, Link2 } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { BarSeries } from '@/components/ui/charts';
import { ModuleNav } from '@/components/governance/module-nav';
import { riskNavItems } from '@/components/governance/risk-helpers';
import { dataSources, dataFlows } from '@/lib/mock-data';

export default function Page() {
  const rows = dataSources.map((d) => ({
    ...d,
    recordsLabel: d.records > 0 ? d.records.toLocaleString() : 'Live',
    flowCount: dataFlows.filter((f) => f.source === d.name).length
  }));
  const connected = dataSources.filter((d) => d.status === 'Connected').length;
  const restricted = dataSources.filter((d) => d.status === 'Restricted').length;
  const highRisk = dataSources.filter((d) => d.risk === 'High').length;
  const totalRecords = dataSources.reduce((s, d) => s + d.records, 0);
  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'name', label: 'Source', sortValue: (r) => r.name },
    { key: 'type', label: 'Type', sortValue: (r) => r.type },
    { key: 'connector', label: 'Connector', sortValue: (r) => r.connector },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> },
    { key: 'risk', label: 'Risk', sortValue: (r) => r.risk, render: (r) => <Badge label={r.risk} tone={toneForStatus(r.risk)} /> },
    { key: 'categories', label: 'Categories', sortValue: (r) => r.categories.join(', ') },
    { key: 'recordsLabel', label: 'Records', sortValue: (r) => r.records },
    { key: 'flowCount', label: 'Flows', sortValue: (r) => r.flowCount },
    { key: 'lastSync', label: 'Last sync', sortValue: (r) => r.lastSync }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Governance"
        title="Data Risk"
        description="Sensitive data source posture — connectors, classification categories, record counts and sync health."
      />
      <ModuleNav items={riskNavItems} active="/risk/data" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Data sources" value={dataSources.length} delta={0} deltaLabel="unchanged" icon={Folder} accent="sky" />
        <StatCard label="Connected" value={connected} delta={Math.round((connected / dataSources.length) * 100)} deltaLabel="of sources" icon={Link2} accent="green" />
        <StatCard label="Restricted" value={restricted} delta={0} deltaLabel="unchanged" icon={AlertTriangle} accent="rose" />
        <StatCard label="Records" value={totalRecords.toLocaleString()} delta={3} deltaLabel="this week" icon={Database} accent="amber" />
      </div>
      <Card>
        <CardHeader title="Data source register" subtitle="All connected and pending sources" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search sources..." initialSort={{ key: 'risk', dir: 'desc' }} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Data flows per source" subtitle="Active pipelines feeding AI systems" />
        <CardBody>
          <BarSeries data={dataSources.map((d) => ({ name: d.name.split(' ')[0], flows: dataFlows.filter((f) => f.source === d.name).length }))} dataKey="flows" color="#38bdf8" height={200} />
        </CardBody>
      </Card>
    </div>
  );
}