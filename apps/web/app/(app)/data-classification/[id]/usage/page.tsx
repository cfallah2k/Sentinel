import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarSeries, DonutChart } from '@/components/ui/charts';
import { ClassHeader, ClassSubnav } from '@/components/data-intel/classification-shared';
import { classRows, detectorRows, resolveClass } from '@/components/data-intel/derived';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = resolveClass(id);
  const barData = detectorRows.slice(0, 6).map((d) => ({ name: d.name.split(' ')[0], value: d.matches24h }));
  const donutData = classRows.map((c) => ({ name: c.name, value: c.matched24h }));
  return (
    <div className="space-y-6">
      <ClassSubnav id={row.id} active="Usage" />
      <ClassHeader row={row} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Detector matches — 24h" subtitle="Payload volume seen by each engine" />
          <CardBody>
            <BarSeries data={barData} dataKey="value" color="#a78bfa" />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Matches by label" subtitle="Distribution across the taxonomy" />
          <CardBody>
            <DonutChart data={donutData} />
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Usage snapshot" subtitle="Where this label is exercised" />
        <CardBody className="space-y-3">
          {[
            { label: 'Matches this label', value: row.matched24h },
            { label: 'Blocked transmissions', value: row.blocked24h },
            { label: 'Systems tagged', value: row.systems },
            { label: 'Coverage', value: `${row.coverage}%` }
          ].map((it) => (
            <div key={it.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <span className="text-xs text-slate-400">{it.label}</span>
              <span className="text-sm font-semibold text-white">{it.value}</span>
            </div>
          ))}
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge label={row.name} tone="blue" />
            <Badge label={`S${row.sensitivity}`} tone="amber" />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}