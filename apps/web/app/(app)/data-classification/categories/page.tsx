import { PageHeader } from '@/components/ui/page-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { ClassificationNav, CategoryGrid } from '@/components/data-intel/classification-shared';
import { catBadgeTone, classRows, fmt } from '@/components/data-intel/derived';

type CatRow = { id: string; name: string; sensitivity: number; systems: number; coverage: number; matched24h: number; blocked24h: number };

const catColumns: Column<CatRow>[] = [
  {
    key: 'name',
    label: 'Category',
    render: (r) => (
      <span className="flex items-center gap-2 font-medium text-white">
        <span className={`h-2 w-2 rounded-full ${r.name === 'PUBLIC' ? 'bg-emerald-400' : r.name === 'INTERNAL' ? 'bg-sky-400' : r.name === 'CONFIDENTIAL' ? 'bg-amber-400' : 'bg-rose-400'}`} />
        {r.name}
      </span>
    ),
    sortValue: (r) => r.name
  },
  {
    key: 'sensitivity',
    label: 'Level',
    render: (r) => (
      <Badge
        label={`S${r.sensitivity}`}
        tone={catBadgeTone(r.name === 'PUBLIC' ? 'emerald' : r.name === 'INTERNAL' ? 'sky' : r.name === 'CONFIDENTIAL' ? 'amber' : 'rose')}
      />
    ),
    sortValue: (r) => r.sensitivity
  },
  { key: 'systems', label: 'Systems', render: (r) => <span className="text-slate-300">{r.systems}</span>, sortValue: (r) => r.systems },
  { key: 'coverage', label: 'Coverage', render: (r) => <span className="text-slate-300">{r.coverage}%</span>, sortValue: (r) => r.coverage },
  { key: 'matched24h', label: 'Matches 24h', render: (r) => <span className="text-slate-300">{fmt(r.matched24h)}</span>, sortValue: (r) => r.matched24h },
  { key: 'blocked24h', label: 'Blocked 24h', render: (r) => <span className="text-rose-300">{fmt(r.blocked24h)}</span>, sortValue: (r) => r.blocked24h }
];

export default function Page() {
  const rows: CatRow[] = classRows.map((c) => ({ id: c.id, name: c.name, sensitivity: c.sensitivity, systems: c.systems, coverage: c.coverage, matched24h: c.matched24h, blocked24h: c.blocked24h }));
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="Classification Categories"
        description="The four-tier classification taxonomy. Each level defines access controls, retention and required gateway behavior."
      />
      <ClassificationNav active="Categories" />
      <CategoryGrid rows={classRows} />
      <Card>
        <CardHeader title="Taxonomy table" subtitle="All levels with live detector activity" />
        <CardBody>
          <DataTable columns={catColumns} rows={rows} pageSize={10} initialSort={{ key: 'sensitivity', dir: 'asc' }} searchPlaceholder="Search categories..." />
        </CardBody>
      </Card>
    </div>
  );
}