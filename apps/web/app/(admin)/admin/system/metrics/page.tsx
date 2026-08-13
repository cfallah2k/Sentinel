import { AdminShell } from '@/components/admin/page-shell';
import { SystemShell } from '@/components/admin/system-shell';
import { MetricBar, MetricCards } from '@/components/admin/infra';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { AreaTrend } from '@/components/ui/charts';
import { hourlySeries } from '@/lib/mock-data';

export default function Page() {
  return (
    <AdminShell>
      <SystemShell active="metrics">
        <MetricCards />
        <Card>
          <CardHeader title="Gateway Throughput — 24h" subtitle="Requests per hour" />
          <CardBody>
            <AreaTrend data={hourlySeries} dataKey="requests" xKey="hour" color="#38bdf8" height={200} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Rolling Averages" subtitle="24h aggregate resource utilization" />
          <CardBody className="p-0 divide-y divide-white/5">
            <MetricBar label="CPU Utilization" value={62} detail="16 cores · 10.1 used" />
            <MetricBar label="Memory" value={58} detail="14.8 / 26 GB" />
            <MetricBar label="Disk I/O" value={31} detail="420 MB/s peak" />
            <MetricBar label="Network" value={44} detail="1.9 Gbps peak" />
          </CardBody>
        </Card>
      </SystemShell>
    </AdminShell>
  );
}