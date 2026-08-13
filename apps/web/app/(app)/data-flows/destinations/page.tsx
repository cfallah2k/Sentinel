import { BarChart3, Boxes, Building2, TriangleAlert } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { BarSeries } from '@/components/ui/charts';
import { DataTable, type Column } from '@/components/ui/data-table';
import { ModuleNav } from '@/components/data-intel/module-nav';
import { FlowTable } from '@/components/data-intel/flow-table';
import { enrichedFlows, flowNavItems, fmt, groupFlows } from '@/components/data-intel/derived';

type DestRow = {
  name: string;
  count: number;
  volumeMb: number;
  blocked: number;
  categories: string[];
  risk: string;
};

const destColumns: Column<DestRow>[] = [
  { key: 'name', label: 'Destination system', render: (r) => <span className="font-medium text-white">{r.name}</span>, sortValue: (r) => r.name },
  { key: 'count', label: 'Routes', render: (r) => <span className="text-slate-300">{r.count}</span>, sortValue: (r) => r.count },
  { key: 'volumeMb', label: 'Volume', render: (r) => <span className="text-slate-300">{fmt(r.volumeMb)} MB</span>, sortValue: (r) => r.volumeMb },
  { key: 'blocked', label: 'Blocked', render: (r) => <span className="text-rose-300">{r.blocked}</span>, sortValue: (r) => r.blocked },
  {
    key: 'categories',
    label: 'Categories',
    render: (r) => (
      <span className="flex max-w-[220px] flex-wrap gap-1">
        {r.categories.slice(0, 3).map((c) => (
          <span key={c} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[0.6rem] text-slate-300">{c}</span>
        ))}
      </span>
    )
  },
  { key: 'risk', label: 'Risk', render: (r) => <Badge label={r.risk} tone={r.risk === 'High' ? 'rose' : 'blue'} /> }
];

export default function Page() {
  const groups = groupFlows(enrichedFlows, 'destination');
  const totalVolume = groups.reduce((a, g) => a + g.volumeMb, 0);
  const barData = groups
    .sort((a, b) => b.volumeMb - a.volumeMb)
    .slice(0, 6)
    .map((g) => ({ name: g.name.split(' ').slice(0, 2).join(' '), value: g.volumeMb }));
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="Flow Destinations"
        description="Every AI system receiving data, aggregated by volume, route count and the categories flowing into it."
      />
      <ModuleNav items={flowNavItems.map((it) => ({ ...it, active: it.label === 'Destinations' }))} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="AI destinations" value={groups.length} icon={Building2} accent="sky" sub="Systems consuming data" />
        <StatCard label="Total routes" value={enrichedFlows.length} icon={Boxes} accent="cyan" sub="Inbound flows" />
        <StatCard label="Volume received" value={`${fmt(totalVolume)} MB`} icon={BarChart3} accent="violet" sub="Last 24 hours" />
        <StatCard label="High risk targets" value={groups.filter((g) => g.risk === 'High').length} icon={TriangleAlert} accent="amber" sub="Destinations flagged" />
      </div>
      <Card>
        <CardHeader title="Volume by destination" subtitle="Top destinations by MB received" />
        <CardBody>
          <BarSeries data={barData} dataKey="value" color="#38bdf8" />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Destination breakdown" subtitle="Aggregated route health per AI system" />
        <CardBody>
          <DataTable columns={destColumns} rows={groups} pageSize={10} initialSort={{ key: 'volumeMb', dir: 'desc' }} searchPlaceholder="Search destinations..." />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Routes to these systems" subtitle="Detailed flow list" action={<Badge label="Shielded" tone="green" />} />
        <CardBody>
          <FlowTable flows={enrichedFlows} />
        </CardBody>
      </Card>
    </div>
  );
}