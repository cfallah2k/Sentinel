import { Fingerprint, ScanSearch, ShieldAlert, Tag } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { dataSources, sensitiveCategories } from '@/lib/mock-data';
import { ClassificationNav, CategoryGrid } from '@/components/data-intel/classification-shared';
import { Badge } from '@/components/ui/badge';
import { classRows, fmt, toneForCategory } from '@/components/data-intel/derived';

type SensRow = { name: string; detector: string; matches24h: number; blocked24h: number };

const sensColumns: Column<SensRow>[] = [
  { key: 'name', label: 'Sensitive category', render: (r) => <span className="font-medium text-white">{r.name}</span>, sortValue: (r) => r.name },
  { key: 'detector', label: 'Detector', render: (r) => <span className="font-mono text-[0.65rem] text-sky-300">{r.detector}</span> },
  { key: 'matches24h', label: 'Matches 24h', render: (r) => <span className="text-slate-300">{fmt(r.matches24h)}</span>, sortValue: (r) => r.matches24h },
  { key: 'blocked24h', label: 'Blocked 24h', render: (r) => <span className="text-rose-300">{fmt(r.blocked24h)}</span>, sortValue: (r) => r.blocked24h }
];

export default function Page() {
  const totalMatches = sensitiveCategories.reduce((a, s) => a + s.matches24h, 0);
  const totalBlocked = sensitiveCategories.reduce((a, s) => a + s.blocked24h, 0);
  const sensRows: SensRow[] = sensitiveCategories.map((s) => ({ name: s.name, detector: s.detector, matches24h: s.matches24h, blocked24h: s.blocked24h }));
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="Data Classification"
        description="The taxonomy Sentinel applies to every payload: four classification levels, sensitive data detectors and per-source coverage."
      />
      <ClassificationNav active="Overview" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Classification levels" value={classRows.length} icon={Fingerprint} accent="sky" sub="Public → Restricted" />
        <StatCard label="Sensitive types" value={sensitiveCategories.length} icon={Tag} accent="cyan" sub="Detector-backed labels" />
        <StatCard label="Matches 24h" value={fmt(totalMatches)} icon={ScanSearch} accent="violet" sub="Detected payloads" />
        <StatCard label="Blocked 24h" value={fmt(totalBlocked)} icon={ShieldAlert} accent="rose" sub="Intercepted transmissions" />
      </div>
      <CategoryGrid rows={classRows} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Sensitive data" subtitle="Detector activity over the last 24 hours" />
          <CardBody>
            <DataTable columns={sensColumns} rows={sensRows} pageSize={8} searchPlaceholder="Search sensitive categories..." />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Source coverage" subtitle="Classification labels on connected sources" />
          <CardBody className="space-y-3">
            {dataSources.slice(0, 6).map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-white">{s.name}</p>
                  <p className="text-[0.65rem] text-slate-400">{s.type} · {fmt(s.records)} records</p>
                </div>
                <div className="flex shrink-0 flex-wrap justify-end gap-1">
                  {s.categories.slice(0, 2).map((c) => (
                    <Badge key={c} label={c} tone={toneForCategory(c)} />
                  ))}
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}