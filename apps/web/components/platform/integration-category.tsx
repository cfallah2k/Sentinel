import { Activity, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { IntegrationGrid, IntegrationIcon } from './integration-card';
import { categoryMeta, integrationsFor, type IntegrationCategory } from './integration-data';

type Row = {
  id: string;
  name: string;
  status: string;
  version: string;
  lastSync: string;
  description: string;
  syncMs: number;
};

export function IntegrationCategoryPage({ category }: { category: IntegrationCategory }) {
  const items = integrationsFor(category);
  const connected = items.filter((i) => i.status === 'Connected').length;
  const failing = items.filter((i) => i.status === 'Error').length;
  const pending = items.filter((i) => i.status === 'Pending' || i.status === 'Configured').length;
  const avgSync = Math.round(items.filter((i) => i.syncMs > 0).reduce((a, i) => a + i.syncMs, 0) / Math.max(1, items.filter((i) => i.syncMs > 0).length));
  const meta = categoryMeta[category];

  const rows: Row[] = items.map((i) => ({ ...i }));
  const byId = new Map(items.map((i) => [i.id, i]));

  const columns: Column<Row>[] = [
    {
      key: 'name',
      label: 'Integration',
      sortValue: (r) => r.name,
      render: (r) => (
        <Link href={`/integrations-hub/${r.id}`} className="flex items-center gap-2.5 font-medium text-slate-200 transition hover:text-sentinel-300">
          <IntegrationIcon name={byId.get(r.id)?.icon ?? 'Boxes'} className="h-4 w-4 text-sentinel-300" />
          {r.name}
        </Link>
      )
    },
    { key: 'status', label: 'Status', tone: (r) => toneForStatus(r.status) },
    { key: 'version', label: 'Version', sortValue: (r) => r.version },
    { key: 'lastSync', label: 'Last Sync', sortValue: (r) => r.lastSync },
    { key: 'description', label: 'Description', className: 'max-w-xs truncate' }
  ];

  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Platform" title={meta.label} description={meta.description} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Connected" value={connected} icon={CheckCircle2} accent="green" sub={`of ${items.length} catalog entries`} />
        <StatCard label="Awaiting Config" value={pending} icon={Activity} accent="amber" sub="Pending or configured" />
        <StatCard label="Failing" value={failing} icon={AlertTriangle} accent={failing > 0 ? 'rose' : 'green'} sub="Requires attention" />
        <StatCard label="Avg Sync Latency" value={`${avgSync}ms`} icon={Clock} accent="sky" sub="Across connected connectors" />
      </div>
      <IntegrationGrid integrations={items} />
      <Card>
        <CardHeader title={`${meta.label} directory`} subtitle="All connectors in this category" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder={`Search ${meta.label.toLowerCase()}...`} initialSort={{ key: 'name', dir: 'asc' }} />
        </CardBody>
      </Card>
    </div>
  );
}

export function IntegrationBadge({ status }: { status: string }) {
  return <Badge label={status} tone={toneForStatus(status)} />;
}