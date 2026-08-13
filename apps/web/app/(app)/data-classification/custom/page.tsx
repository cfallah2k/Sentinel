import { Braces, FileSearch, Tag } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { ClassificationNav } from '@/components/data-intel/classification-shared';
import { customRows, fmt } from '@/components/data-intel/derived';

type CustomRow = { id: string; name: string; detector: string; sensitivity: number; matches24h: number; blocked24h: number; status: string };

const customColumns: Column<CustomRow>[] = [
  { key: 'name', label: 'Custom category', render: (r) => <span className="font-medium text-white">{r.name}</span>, sortValue: (r) => r.name },
  { key: 'detector', label: 'Detector', render: (r) => <span className="font-mono text-[0.65rem] text-sky-300">{r.detector}</span> },
  { key: 'sensitivity', label: 'Sensitivity', render: (r) => <Badge label={`S${r.sensitivity}`} tone={r.sensitivity >= 4 ? 'rose' : r.sensitivity === 3 ? 'amber' : 'blue'} />, sortValue: (r) => r.sensitivity },
  { key: 'matches24h', label: 'Matches 24h', render: (r) => <span className="text-slate-300">{fmt(r.matches24h)}</span>, sortValue: (r) => r.matches24h },
  { key: 'blocked24h', label: 'Blocked 24h', render: (r) => <span className="text-rose-300">{fmt(r.blocked24h)}</span>, sortValue: (r) => r.blocked24h },
  { key: 'status', label: 'Status', render: (r) => <Badge label={r.status} tone={r.status === 'Active' ? 'green' : 'amber'} /> }
];

export default function Page() {
  const rows: CustomRow[] = customRows.map((c) => ({ ...c }));
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="Custom Classification"
        description="Organization-defined categories built on top of the core taxonomy, tuned for Nexora's specific data assets."
      />
      <ClassificationNav active="Custom" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Custom categories" value={rows.length} icon={Tag} accent="sky" sub="Org-defined labels" />
        <StatCard label="Matches 24h" value={fmt(rows.reduce((a, r) => a + r.matches24h, 0))} icon={FileSearch} accent="violet" sub="Across custom labels" />
        <StatCard label="Blocked 24h" value={fmt(rows.reduce((a, r) => a + r.blocked24h, 0))} icon={Braces} accent="rose" sub="Custom detector hits" />
        <StatCard label="In review" value={rows.filter((r) => r.status === 'Review').length} icon={FileSearch} accent="amber" sub="Awaiting sign-off" />
      </div>
      <Card>
        <CardHeader title="Custom categories" subtitle="Built by security and privacy teams" />
        <CardBody>
          <DataTable columns={customColumns} rows={rows} pageSize={10} initialSort={{ key: 'matches24h', dir: 'desc' }} searchPlaceholder="Search custom categories..." />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Templates" subtitle="Reusable patterns for new custom categories" />
        <CardBody>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { name: 'PII pattern', note: 'Email, phone, national IDs with entity resolution' },
              { name: 'Financial pattern', note: 'IBAN, card numbers, routing data' },
              { name: 'Entity pattern', note: 'Custom regex over structured payloads' }
            ].map((t) => (
              <div key={t.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-semibold text-white">{t.name}</p>
                <p className="mt-1 text-[0.65rem] leading-5 text-slate-400">{t.note}</p>
                <span className="mt-3 inline-block rounded-full border border-sky-500/25 bg-sky-500/10 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-sky-300">
                  Template
                </span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}