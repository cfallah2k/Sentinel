import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AttrGrid } from '@/components/registry/attr-grid';
import { providerNav } from '@/components/registry/nav';
import { providers } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const provider = providers.find((p) => p.id === id) ?? providers[0];

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Providers"
        title={provider.name}
        id={provider.id}
        description={`${provider.type} provider serving requests from ${provider.region}.`}
        badges={[
          <Badge key="status" label={provider.status} tone={toneForStatus(provider.status)} />,
          <Badge key="risk" label={`${provider.risk} Risk`} tone={toneForStatus(provider.risk)} />
        ]}
        meta={[
          { label: 'Region', value: provider.region },
          { label: 'Uptime', value: `${provider.uptime.toFixed(2)}%` }
        ]}
      />
      <DetailNav base={`/providers/${id}`} items={providerNav(id)} />
      <Card>
        <CardHeader title="Profile Summary" subtitle="Key attributes" />
        <CardBody>
          <AttrGrid
            items={[
              { label: 'Type', value: provider.type },
              { label: 'Status', value: provider.status },
              { label: 'Risk', value: provider.risk },
              { label: 'Region', value: provider.region },
              { label: 'Models', value: provider.models },
              { label: 'Requests / 24h', value: provider.requests24h.toLocaleString() },
              { label: 'Latency', value: `${provider.latencyMs} ms` },
              { label: 'Uptime', value: `${provider.uptime.toFixed(2)}%` }
            ]}
          />
        </CardBody>
      </Card>
    </div>
  );
}