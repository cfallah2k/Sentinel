import { Activity, Ban, Gauge, Zap } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { StatCard } from '@/components/ui/stat-card';
import { BarSeries, AreaTrend } from '@/components/ui/charts';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { usageSeries, trendSeries } from '@/components/registry/helpers';
import { providerNav } from '@/components/registry/nav';
import { providers } from '@/lib/mock-data';

const fmt = (n: number) => n.toLocaleString();

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const provider = providers.find((p) => p.id === id) ?? providers[0];
  const hourly = usageSeries(provider.id, provider.requests24h);
  const trend = trendSeries(provider.id, 14, Math.round(provider.requests24h / 3));

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Providers"
        title={provider.name}
        id={provider.id}
        description="Request volume and latency for this provider."
        badges={[
          <Badge key="status" label={provider.status} tone={toneForStatus(provider.status)} />,
          <Badge key="risk" label={`${provider.risk} Risk`} tone={toneForStatus(provider.risk)} />
        ]}
      />
      <DetailNav base={`/providers/${id}`} items={providerNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Requests / 24h" value={fmt(provider.requests24h)} icon={Activity} accent="sky" />
        <StatCard label="Blocked / 24h" value={fmt(hourly.reduce((a, h) => a + h.blocked, 0))} icon={Ban} accent="rose" />
        <StatCard label="Latency" value={`${provider.latencyMs} ms`} icon={Gauge} accent="amber" />
        <StatCard label="Uptime" value={`${provider.uptime.toFixed(2)}%`} icon={Zap} accent="green" />
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Traffic Today" subtitle="Requests per hour (24h)" />
          <CardBody>
            <AreaTrend data={hourly} dataKey="requests" color="#38bdf8" />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="14-Day Trend" subtitle="Daily request volume" />
          <CardBody>
            <BarSeries data={trend} dataKey="value" xKey="date" color="#a78bfa" />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}