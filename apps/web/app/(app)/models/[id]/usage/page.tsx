import { Activity, Ban, Cpu, Gauge } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { StatCard } from '@/components/ui/stat-card';
import { AreaTrend, BarSeries } from '@/components/ui/charts';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { usageSeries, trendSeries } from '@/components/registry/helpers';
import { modelNav } from '@/components/registry/nav';
import { models } from '@/lib/mock-data';

const fmt = (n: number) => n.toLocaleString();

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const model = models.find((m) => m.id === id) ?? models[0];
  const hourly = usageSeries(model.id, model.requests24h);
  const trend = trendSeries(model.id, 14, Math.round(model.requests24h / 3));

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Models"
        title={model.name}
        id={model.id}
        description="Request volume and cost drivers for this model."
        badges={[
          <Badge key="status" label={model.status} tone={toneForStatus(model.status)} />,
          <Badge key="risk" label={`${model.risk} Risk`} tone={toneForStatus(model.risk)} />
        ]}
      />
      <DetailNav base={`/models/${id}`} items={modelNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Requests / 24h" value={fmt(model.requests24h)} icon={Activity} accent="sky" />
        <StatCard label="Blocked / 24h" value={fmt(hourly.reduce((a, h) => a + h.blocked, 0))} icon={Ban} accent="rose" />
        <StatCard label="Context Window" value={model.contextWindow} icon={Cpu} accent="violet" />
        <StatCard label="Pricing" value={model.pricing} icon={Gauge} accent="amber" />
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