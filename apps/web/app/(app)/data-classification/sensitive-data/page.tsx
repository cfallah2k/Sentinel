import { Eye, EyeOff, Lock } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { DonutChart } from '@/components/ui/charts';
import { DataTable, type Column } from '@/components/ui/data-table';
import { sensitiveCategories } from '@/lib/mock-data';
import { ClassificationNav } from '@/components/data-intel/classification-shared';
import { fmt } from '@/components/data-intel/derived';

type SensRow = { id: string; name: string; detector: string; matches24h: number; blocked24h: number; blockRate: number; status: string };

const sensColumns: Column<SensRow>[] = [
  { key: 'name', label: 'Sensitive category', render: (r) => <span className="font-medium text-white">{r.name}</span>, sortValue: (r) => r.name },
  { key: 'detector', label: 'Detector', render: (r) => <span className="font-mono text-[0.65rem] text-sky-300">{r.detector}</span> },
  { key: 'matches24h', label: 'Matches 24h', render: (r) => <span className="text-slate-300">{fmt(r.matches24h)}</span>, sortValue: (r) => r.matches24h },
  { key: 'blocked24h', label: 'Blocked 24h', render: (r) => <span className="text-rose-300">{fmt(r.blocked24h)}</span>, sortValue: (r) => r.blocked24h },
  { key: 'blockRate', label: 'Block rate', render: (r) => <span className="text-slate-300">{r.blockRate}%</span>, sortValue: (r) => r.blockRate },
  { key: 'status', label: 'Status', render: (r) => <span className={`text-xs font-semibold ${r.status === 'Active' ? 'text-emerald-300' : 'text-amber-300'}`}>{r.status}</span> }
];

export default function Page() {
  const totalMatches = sensitiveCategories.reduce((a, s) => a + s.matches24h, 0);
  const totalBlocked = sensitiveCategories.reduce((a, s) => a + s.blocked24h, 0);
  const rows: SensRow[] = sensitiveCategories.map((s, i) => ({
    id: s.detector,
    name: s.name,
    detector: s.detector,
    matches24h: s.matches24h,
    blocked24h: s.blocked24h,
    blockRate: Math.round((s.blocked24h / s.matches24h) * 100),
    status: i < 6 ? 'Active' : 'Review'
  }));
  const donutData = sensitiveCategories.slice(0, 5).map((s) => ({ name: s.name.split(' ')[0], value: s.matches24h }));
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="Sensitive Data"
        description="All payloads containing sensitive information, grouped by category with enforcement rates per detector."
      />
      <ClassificationNav active="Sensitive Data" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Sensitive categories" value={sensitiveCategories.length} icon={Eye} accent="sky" sub="Detector-backed labels" />
        <StatCard label="Matches 24h" value={fmt(totalMatches)} icon={Eye} accent="violet" sub="Detected in transit" />
        <StatCard label="Blocked 24h" value={fmt(totalBlocked)} icon={EyeOff} accent="rose" sub="Never left the org" />
        <StatCard label="Block rate" value={`${Math.round((totalBlocked / totalMatches) * 100)}%`} icon={Lock} accent="amber" sub="Overall enforcement" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader title="Match distribution" subtitle="Top 5 categories by volume" />
          <CardBody>
            <DonutChart data={donutData} />
          </CardBody>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader title="Sensitive data activity" subtitle="Detector performance over 24 hours" />
          <CardBody>
            <DataTable columns={sensColumns} rows={rows} pageSize={10} searchPlaceholder="Search sensitive data..." />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}