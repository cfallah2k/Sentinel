import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { ClassHeader, ClassSubnav } from '@/components/data-intel/classification-shared';
import { detectorRows, fmt, resolveClass } from '@/components/data-intel/derived';

type DetRow = { id: string; name: string; detector: string; matches24h: number; blocked24h: number; accuracy: number; status: string };

const detColumns: Column<DetRow>[] = [
  { key: 'name', label: 'Detector', render: (r) => <span className="font-medium text-white">{r.name}</span>, sortValue: (r) => r.name },
  { key: 'detector', label: 'Engine', render: (r) => <span className="font-mono text-[0.65rem] text-sky-300">{r.detector}</span> },
  { key: 'matches24h', label: 'Matches 24h', render: (r) => <span className="text-slate-300">{fmt(r.matches24h)}</span>, sortValue: (r) => r.matches24h },
  { key: 'blocked24h', label: 'Blocked 24h', render: (r) => <span className="text-rose-300">{fmt(r.blocked24h)}</span>, sortValue: (r) => r.blocked24h },
  { key: 'accuracy', label: 'Accuracy', render: (r) => <span className="text-emerald-300">{r.accuracy}%</span>, sortValue: (r) => r.accuracy },
  { key: 'status', label: 'Status', render: (r) => <Badge label={r.status} tone={r.status === 'Active' ? 'green' : 'amber'} /> }
];

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = resolveClass(id);
  const rows: DetRow[] = detectorRows.filter((d) => d.matches24h > 0).slice(0, 5).map((d) => ({ ...d }));
  return (
    <div className="space-y-6">
      <ClassSubnav id={row.id} active="Detectors" />
      <ClassHeader row={row} />
      <Card>
        <CardHeader title="Associated detectors" subtitle="Engines that contribute to detecting this label" />
        <CardBody>
          <DataTable columns={detColumns} rows={rows} searchable={false} pageSize={10} />
        </CardBody>
      </Card>
    </div>
  );
}