import { BarChart3, Fingerprint, ScanSearch, ShieldAlert } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { BarSeries, DonutChart } from '@/components/ui/charts';
import { ClassificationNav, CategoryGrid } from '@/components/data-intel/classification-shared';
import { classRows, detectorRows, fmt } from '@/components/data-intel/derived';

export default function Page() {
  const donutData = classRows.map((c) => ({ name: c.name, value: c.systems }));
  const barData = detectorRows.slice(0, 6).map((d) => ({ name: d.name.split(' ')[0], value: d.matches24h }));
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="Classification Overview"
        description="Taxonomy health at a glance: label coverage, sensitive data volume and detector throughput."
      />
      <ClassificationNav active="Overview" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Labels" value={classRows.length} icon={Fingerprint} accent="sky" sub="Classification levels" />
        <StatCard label="Systems tagged" value={classRows.reduce((a, c) => a + c.systems, 0)} icon={BarChart3} accent="cyan" sub="Across all labels" />
        <StatCard label="Avg coverage" value={`${Math.round(classRows.reduce((a, c) => a + c.coverage, 0) / classRows.length)}%`} icon={ScanSearch} accent="violet" sub="Label propagation" />
        <StatCard label="Blocked 24h" value={fmt(detectorRows.reduce((a, d) => a + d.blocked24h, 0))} icon={ShieldAlert} accent="rose" sub="Detector blocks" />
      </div>
      <CategoryGrid rows={classRows} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Systems per label" subtitle="Distribution of tagged systems" />
          <CardBody>
            <DonutChart data={donutData} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Detector matches — 24h" subtitle="Top sensitive detectors by volume" />
          <CardBody>
            <BarSeries data={barData} dataKey="value" color="#a78bfa" />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}