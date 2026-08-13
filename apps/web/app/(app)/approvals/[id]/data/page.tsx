import { Database, EyeOff, ShieldCheck, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { fmt, approvalById, approvalNav, sensitivityOf, systemById } from '@/components/enforcement/helpers';
import { approvals } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const apr = approvalById(id) ?? approvals[0];
  const system = systemById(apr.systemId ?? '');
  const categories = system?.dataCategories ?? ['PII', 'Internal'];
  const rows = categories.map((cat, i) => ({
    id: `${apr.id}-d${i + 1}`,
    category: cat,
    sensitivity: sensitivityOf(cat),
    records: ((apr.id.charCodeAt(apr.id.length - 1) + i * 7) % 240 + 8) * 100,
    destination: system?.name ?? '—'
  }));
  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'category', label: 'Category', sortValue: (r) => r.category, render: (r) => <Badge label={r.category} tone="blue" /> },
    { key: 'sensitivity', label: 'Sensitivity', render: (r) => <span className="font-mono text-xs text-sentinel-300">{r.sensitivity}</span> },
    { key: 'records', label: 'Records', sortValue: (r) => r.records, render: (r) => <span className="text-slate-200">{fmt(r.records)}</span> },
    { key: 'destination', label: 'Destination', render: (r) => <span className="text-slate-400">{r.destination}</span> }
  ];

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Approvals"
        title={`${apr.type} · ${system?.name ?? apr.id}`}
        id={apr.id}
        description="Data that would be involved if this request is approved."
        badges={[
          <Badge key="s" label={apr.status} tone={apr.status === 'Approved' ? 'green' : apr.status === 'Denied' ? 'rose' : apr.status === 'Expired' ? 'slate' : 'amber'} />,
          <Badge key="r" label={`${apr.risk} risk`} tone={apr.risk === 'Critical' ? 'red' : apr.risk === 'High' ? 'rose' : 'amber'} />
        ]}
      />
      <DetailNav base={`/approvals/${id}`} items={approvalNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Categories" value={rows.length} icon={Tag} accent="violet" />
        <StatCard label="Records" value={fmt(rows.reduce((a, r) => a + r.records, 0))} icon={Database} accent="sky" />
        <StatCard label="Sensitive" value={rows.filter((r) => r.sensitivity !== 'INTERNAL').length} icon={EyeOff} accent="rose" />
        <StatCard label="Audited" value="Yes" icon={ShieldCheck} accent="green" />
      </div>
      <Card>
        <CardHeader title="Data impact" subtitle="Categories and volume at risk" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchable={false} pageSize={10} />
        </CardBody>
      </Card>
    </div>
  );
}