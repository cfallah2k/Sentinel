import { Database, EyeOff, ShieldCheck, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { SeverityBadge } from '@/components/enforcement/badges';
import { fmt, incidentById, incidentDataRows, incidentNav } from '@/components/enforcement/helpers';
import { incidents } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const inc = incidentById(id) ?? incidents[0];
  const rows = incidentDataRows(inc);
  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'category', label: 'Category', sortValue: (r) => r.category, render: (r) => <Badge label={r.category} tone="blue" /> },
    { key: 'fields', label: 'Fields', render: (r) => <span className="text-slate-400">{r.fields}</span> },
    { key: 'records', label: 'Records', sortValue: (r) => r.records, render: (r) => <span className="text-slate-200">{fmt(r.records)}</span> },
    { key: 'sensitivity', label: 'Sensitivity', sortValue: (r) => r.sensitivity, render: (r) => <span className="font-mono text-xs text-sentinel-300">{r.sensitivity}</span> },
    { key: 'source', label: 'Source', render: (r) => <span className="text-slate-300">{r.source}</span> }
  ];

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Incidents"
        title={inc.title}
        id={inc.id}
        description="Data categories involved in this incident."
        badges={[
          <SeverityBadge key="sev" label={inc.severity} />,
          <Badge key="s" label={inc.status} tone={inc.status === 'Resolved' ? 'green' : inc.status === 'Investigating' ? 'sky' : 'amber'} />
        ]}
      />
      <DetailNav base={`/incidents/${id}`} items={incidentNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Categories" value={rows.length} icon={Tag} accent="violet" />
        <StatCard label="Records Involved" value={fmt(rows.reduce((a, r) => a + r.records, 0))} icon={Database} accent="sky" />
        <StatCard label="Sensitive Fields" value={rows.filter((r) => r.sensitivity !== 'INTERNAL').length} icon={EyeOff} accent="rose" />
        <StatCard label="Audited" value="Yes" icon={ShieldCheck} accent="green" />
      </div>
      <Card>
        <CardHeader title="Data inventory" subtitle="Affected data categories and estimated volume" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchable={false} pageSize={10} />
        </CardBody>
      </Card>
    </div>
  );
}