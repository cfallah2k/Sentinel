import { BarChart3, Database, HardDrive, ShieldAlert } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { BarSeries } from '@/components/ui/charts';
import { DataTable, type Column } from '@/components/ui/data-table';
import { ModuleNav } from '@/components/data-intel/module-nav';
import { FlowTable } from '@/components/data-intel/flow-table';
import { enrichedFlows, flowNavItems, fmt, groupFlows, toneForCategory } from '@/components/data-intel/derived';

type SourceRow = {
  name: string;
  count: number;
  volumeMb: number;
  blocked: number;
  categories: string[];
  risk: string;
};

const sourceColumns: Column<SourceRow>[] = [
  { key: 'name', label: 'Source', render: (r) => <span className="font-medium text-white">{r.name}</span>, sortValue: (r) => r.name },
  { key: 'count', label: 'Routes', render: (r) => <span className="text-slate-300">{r.count}</span>, sortValue: (r) => r.count },
  { key: 'volumeMb', label: 'Volume', render: (r) => <span className="text-slate-300">{fmt(r.volumeMb)} MB</span>, sortValue: (r) => r.volumeMb },
  { key: 'blocked', label: 'Blocked', render: (r) => <span className="text-rose-300">{r.blocked}</span>, sortValue: (r) => r.blocked },
  {
    key: 'categories',
    label: 'Categories',
    render: (r) => (
      <span className="flex flex-wrap gap-1">
        {r.categories.slice(0, 3).map((c) => (
          <Badge key={c} label={c} tone={toneForCategory(c)} />
        ))}
      </span>
    )
  },
  { key: 'risk', label: 'Risk', render: (r) => <Badge label={r.risk} tone={r.risk === 'High' ? 'rose' : 'blue'} /> }
];

export default function Page() {
  const groups = groupFlows(enrichedFlows, 'source');
  const totalVolume = groups.reduce((a, g) => a + g.volumeMb, 0);
  const barData = groups
    .sort((a, b) => b.volumeMb - a.volumeMb)
    .map((g) => ({ name: g.name.split(' ').slice(0, 2).join(' '), value: g.volumeMb }));
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="Flow Sources"
        description="Where data originates: source systems ranked by the volume and number of routes they feed into AI applications."
      />
      <ModuleNav items={flowNavItems.map((it) => ({ ...it, active: it.label === 'Sources' }))} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Source systems" value={groups.length} icon={Database} accent="sky" sub="Active data origins" />
        <StatCard label="Total routes" value={enrichedFlows.length} icon={HardDrive} accent="cyan" sub="Across all sources" />
        <StatCard label="Volume routed" value={`${fmt(totalVolume)} MB`} icon={BarChart3} accent="violet" sub="Last 24 hours" />
        <StatCard label="Sources at risk" value={groups.filter((g) => g.risk === 'High').length} icon={ShieldAlert} accent="rose" sub="High risk routes attached" />
      </div>
      <Card>
        <CardHeader title="Volume by source" subtitle="MB routed per source system" />
        <CardBody>
          <BarSeries data={barData} dataKey="value" color="#38bdf8" />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Source breakdown" subtitle="Aggregated route health per source" />
        <CardBody>
          <DataTable columns={sourceColumns} rows={groups} pageSize={10} initialSort={{ key: 'volumeMb', dir: 'desc' }} searchPlaceholder="Search sources..." />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Routes from these sources" subtitle="Detailed flow list" />
        <CardBody>
          <FlowTable flows={enrichedFlows} />
        </CardBody>
      </Card>
    </div>
  );
}