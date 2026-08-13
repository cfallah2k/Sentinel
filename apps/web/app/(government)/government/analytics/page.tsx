import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { AreaTrend, BarSeries, MultiArea } from '@/components/ui/charts';
import { PageHeader } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { DonutChart } from '@/components/ui/charts';
import { kpiHistory, dailySeries, governmentRegistry, hourlySeries } from '@/lib/mock-data';

const riskDist = ['Low', 'Medium', 'High', 'Critical'].map((r) => ({
  name: r,
  value: governmentRegistry.filter((x) => x.risk === r).length
}));

export default function Page() {
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="Oversight Analytics"
        description="Trends across registrations, request volume, and national risk posture."
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Gateway Volume — 30 Days" subtitle="Requests, blocked, and incidents from daily telemetry" />
          <CardBody>
            <MultiArea data={dailySeries} keys={['requests', 'blocked', 'incidents']} xKey="date" colors={['#38bdf8', '#f87171', '#fbbf24']} height={220} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Hourly Decision Mix" subtitle="Last 24 hours across the oversight gateway" />
          <CardBody>
            <MultiArea data={hourlySeries} keys={['allowed', 'blocked', 'redacted']} colors={['#38bdf8', '#f87171', '#a78bfa']} height={220} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Registry Risk Distribution" subtitle="Systems by risk tier" />
          <CardBody>
            <DonutChart data={riskDist} height={190} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Request Volume — 12 Months" subtitle="Monthly request growth" />
          <CardBody>
            <BarSeries data={kpiHistory.requests} dataKey="value" xKey="month" height={220} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Risk Score Trend" subtitle="Rolling national risk indicator" />
          <CardBody>
            <AreaTrend data={dailySeries} dataKey="riskScore" xKey="date" color="#fbbf24" height={200} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Incident Trend" subtitle="Reported incidents per day" />
          <CardBody>
            <AreaTrend data={dailySeries} dataKey="incidents" xKey="date" color="#f87171" height={200} />
          </CardBody>
        </Card>
      </div>
    </GovShell>
  );
}