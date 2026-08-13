import { Cpu, ScanSearch, ShieldCheck, Zap } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { ClassificationNav } from '@/components/data-intel/classification-shared';
import { detectorRows, fmt } from '@/components/data-intel/derived';

type DetRow = { id: string; name: string; detector: string; matches24h: number; blocked24h: number; blockRate: number; accuracy: number; status: string };

const detColumns: Column<DetRow>[] = [
  { key: 'name', label: 'Detector', render: (r) => <span className="font-medium text-white">{r.name}</span>, sortValue: (r) => r.name },
  { key: 'detector', label: 'Engine', render: (r) => <span className="font-mono text-[0.65rem] text-sky-300">{r.detector}</span> },
  { key: 'matches24h', label: 'Matches 24h', render: (r) => <span className="text-slate-300">{fmt(r.matches24h)}</span>, sortValue: (r) => r.matches24h },
  { key: 'blocked24h', label: 'Blocked 24h', render: (r) => <span className="text-rose-300">{fmt(r.blocked24h)}</span>, sortValue: (r) => r.blocked24h },
  { key: 'blockRate', label: 'Block rate', render: (r) => <span className="text-slate-300">{r.blockRate}%</span>, sortValue: (r) => r.blockRate },
  { key: 'accuracy', label: 'Accuracy', render: (r) => <span className="text-emerald-300">{r.accuracy}%</span>, sortValue: (r) => r.accuracy },
  { key: 'status', label: 'Status', render: (r) => <Badge label={r.status} tone={r.status === 'Active' ? 'green' : 'amber'} /> }
];

export default function Page() {
  const rows: DetRow[] = detectorRows.map((d) => ({ ...d }));
  const active = rows.filter((r) => r.status === 'Active').length;
  const totalMatches = rows.reduce((a, r) => a + r.matches24h, 0);
  const avgAccuracy = Math.round(rows.reduce((a, r) => a + r.accuracy, 0) / rows.length);
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="Detectors"
        description="The detection engines behind classification. Each detector scans payloads in transit and reports matches to the gateway."
      />
      <ClassificationNav active="Detectors" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active detectors" value={active} icon={ScanSearch} accent="sky" sub={`${rows.length} total engines`} />
        <StatCard label="Matches 24h" value={fmt(totalMatches)} icon={Cpu} accent="violet" sub="Detected in transit" />
        <StatCard label="Avg accuracy" value={`${avgAccuracy}%`} icon={ShieldCheck} accent="green" sub="Cross-engine precision" />
        <StatCard label="Blocked 24h" value={fmt(rows.reduce((a, r) => a + r.blocked24h, 0))} icon={Zap} accent="rose" sub="Enforced by gateway" />
      </div>
      <Card>
        <CardHeader title="Detector registry" subtitle="Engine performance over the last 24 hours" />
        <CardBody>
          <DataTable columns={detColumns} rows={rows} pageSize={10} initialSort={{ key: 'matches24h', dir: 'desc' }} searchPlaceholder="Search detectors..." />
        </CardBody>
      </Card>
    </div>
  );
}