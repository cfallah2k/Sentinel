import { Activity, AlertTriangle, CheckCircle2, Clock, RefreshCw } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DonutChart } from '@/components/ui/charts';
import { integrationCatalog, integrationEvents, categoryMeta } from '@/components/platform/integration-data';

type Row = {
  id: string;
  name: string;
  category: string;
  status: string;
  version: string;
  lastSync: string;
};

type EventRow = {
  id: string;
  integration: string;
  time: string;
  type: string;
  detail: string;
  status: string;
};

export default function Page() {
  const connected = integrationCatalog.filter((i) => i.status === 'Connected');
  const failing = integrationCatalog.filter((i) => i.status === 'Error');
  const pending = integrationCatalog.filter((i) => i.status === 'Pending' || i.status === 'Configured' || i.status === 'Available');
  const avgLatency = Math.round(
    integrationCatalog.filter((i) => i.syncMs > 0).reduce((a, i) => a + i.syncMs, 0) /
      Math.max(1, integrationCatalog.filter((i) => i.syncMs > 0).length)
  );

  const statusDonut = (['Connected', 'Configured', 'Available', 'Pending', 'Error', 'Disabled'] as const).map((s) => ({
    name: s,
    value: integrationCatalog.filter((i) => i.status === s).length
  }));

  const rows: Row[] = integrationCatalog.map((i) => ({
    id: i.id,
    name: i.name,
    category: categoryMeta[i.category].label,
    status: i.status,
    version: i.version,
    lastSync: i.lastSync
  }));

  const eventRows: EventRow[] = integrationCatalog
    .slice(0, 10)
    .flatMap((i) =>
      integrationEvents(i.id, 2).map((e) => ({
        id: e.id,
        integration: i.name,
        time: e.time,
        type: e.type,
        detail: e.detail,
        status: e.status
      }))
    );

  const columns: Column<Row>[] = [
    { key: 'name', label: 'Connector', sortValue: (r) => r.name },
    { key: 'category', label: 'Category' },
    { key: 'status', label: 'Status', tone: (r) => toneForStatus(r.status) },
    { key: 'version', label: 'Version' },
    { key: 'lastSync', label: 'Last Sync', sortValue: (r) => r.lastSync }
  ];

  const eventColumns: Column<EventRow>[] = [
    { key: 'time', label: 'Time', sortValue: (r) => r.time },
    { key: 'integration', label: 'Connector' },
    { key: 'type', label: 'Type' },
    { key: 'detail', label: 'Detail' },
    { key: 'status', label: 'Status', tone: (r) => toneForStatus(r.status) }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Integrations Overview"
        description="Fleet-wide health of every connector attached to the Sentinel control plane."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Connected" value={connected.length} delta={6} deltaLabel="this month" icon={CheckCircle2} accent="green" sub="Healthy connectors" />
        <StatCard label="Needs Attention" value={pending.length} icon={Activity} accent="amber" sub="Configure, approve or enable" />
        <StatCard label="Failing" value={failing.length} icon={AlertTriangle} accent={failing.length > 0 ? 'rose' : 'green'} sub="Sync or auth errors" />
        <StatCard label="Avg Sync Latency" value={`${avgLatency}ms`} delta={-9} deltaLabel="vs last week" icon={Clock} accent="violet" sub="Across all connectors" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader title="Connector status mix" subtitle="Distribution across the fleet" />
          <CardBody>
            <DonutChart data={statusDonut} />
          </CardBody>
        </Card>
        <Card className="xl:col-span-2">
          <CardHeader title="Connector directory" subtitle="Every integration in the catalog" />
          <CardBody>
            <DataTable columns={columns} rows={rows} searchPlaceholder="Search connectors..." pageSize={8} initialSort={{ key: 'name', dir: 'asc' }} />
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Recent connector activity" subtitle="Latest sync and health events" action={<Badge label="Live" tone="green" />} />
        <CardBody>
          <DataTable columns={eventColumns} rows={eventRows} searchable={false} pageSize={8} />
        </CardBody>
      </Card>

      {failing.length > 0 ? (
        <Card>
          <CardHeader title="Failure summary" subtitle="Connectors that need operator action" />
          <CardBody>
            <div className="flex flex-wrap items-center gap-2">
              <RefreshCw className="h-4 w-4 text-rose-300" />
              {failing.map((i) => (
                <Badge key={i.id} label={`${i.name} · ${i.lastSync}`} tone="rose" />
              ))}
            </div>
          </CardBody>
        </Card>
      ) : null}
    </div>
  );
}