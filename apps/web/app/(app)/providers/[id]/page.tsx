import { Activity, Gauge, Server, Zap } from 'lucide-react';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AttrGrid } from '@/components/registry/attr-grid';
import { ModelsTable } from '@/components/registry/registry-tables';
import { ActivityList } from '@/components/registry/activity-list';
import { providerNav } from '@/components/registry/nav';
import { models, providers } from '@/lib/mock-data';

const fmt = (n: number) => n.toLocaleString();

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const provider = providers.find((p) => p.id === id) ?? providers[0];
  const modelRows = models.filter((m) => m.providerId === provider.id);

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Providers"
        title={provider.name}
        id={provider.id}
        description={`${provider.type} provider hosted in ${provider.region}.`}
        badges={[
          <Badge key="status" label={provider.status} tone={toneForStatus(provider.status)} />,
          <Badge key="risk" label={`${provider.risk} Risk`} tone={toneForStatus(provider.risk)} />,
          <Badge key="type" label={provider.type} tone="blue" />
        ]}
        meta={[
          { label: 'Region', value: provider.region },
          { label: 'Requests / 24h', value: fmt(provider.requests24h) },
          { label: 'Uptime', value: `${provider.uptime.toFixed(2)}%` }
        ]}
      />
      <DetailNav base={`/providers/${id}`} items={providerNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Requests / 24h" value={fmt(provider.requests24h)} icon={Activity} accent="sky" />
        <StatCard label="Models" value={modelRows.length} icon={Server} accent="violet" />
        <StatCard label="Latency" value={`${provider.latencyMs} ms`} icon={Gauge} accent="amber" />
        <StatCard label="Uptime" value={`${provider.uptime.toFixed(2)}%`} icon={Zap} accent="green" />
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Provider Profile" subtitle="Core registry attributes" />
          <CardBody>
            <AttrGrid
              items={[
                { label: 'Type', value: provider.type },
                { label: 'Status', value: provider.status },
                { label: 'Risk', value: provider.risk },
                { label: 'Region', value: provider.region },
                { label: 'Models Available', value: provider.models },
                { label: 'Requests / 24h', value: fmt(provider.requests24h) },
                { label: 'Latency', value: `${provider.latencyMs} ms` },
                { label: 'Uptime', value: `${provider.uptime.toFixed(2)}%` }
              ]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Recent Activity" subtitle="Governance events for this provider" />
          <CardBody>
            <ActivityList entityId={provider.id} entityName={provider.name} count={6} />
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Models" subtitle={`${modelRows.length} models exposed by this provider`} />
        <CardBody>
          <ModelsTable rows={modelRows} />
        </CardBody>
      </Card>
    </div>
  );
}