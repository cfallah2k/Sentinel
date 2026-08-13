import { PageHeader } from '@/components/ui/page-header';
import { AdminShell } from '@/components/admin/page-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { AreaTrend, BarSeries, MultiArea } from '@/components/ui/charts';
import { hourlySeries, dailySeries, usageByApp, usageByProvider, kpiHistory } from '@/lib/mock-data';

export default function Page() {
  return (
    <AdminShell>
      <PageHeader
        eyebrow="Admin"
        title="Platform Usage"
        description="Aggregate consumption across applications, providers, and time."
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Daily Volume — 30 Days" subtitle="Requests and blocked traffic across the platform" />
          <CardBody>
            <MultiArea data={dailySeries} keys={['requests', 'blocked']} xKey="date" colors={['#38bdf8', '#f87171']} height={220} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Hourly Latency" subtitle="Gateway latency last 24 hours" />
          <CardBody>
            <AreaTrend data={hourlySeries} dataKey="latency" xKey="hour" color="#a78bfa" height={220} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Requests by Application" subtitle="Top consuming applications" />
          <CardBody>
            <BarSeries data={usageByApp} dataKey="requests" xKey="name" height={220} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Provider Cost" subtitle="Spend by provider (USD)" />
          <CardBody>
            <BarSeries data={usageByProvider} dataKey="cost" xKey="name" color="#34d399" height={220} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Monthly Growth — 12 Months" subtitle="Request volume by month" />
          <CardBody>
            <BarSeries data={kpiHistory.requests} dataKey="value" xKey="month" color="#fbbf24" height={200} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Blocked Volume — 12 Months" subtitle="Blocked requests by month" />
          <CardBody>
            <BarSeries data={kpiHistory.blocked} dataKey="value" xKey="month" color="#f87171" height={200} />
          </CardBody>
        </Card>
      </div>
    </AdminShell>
  );
}