import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AttrGrid } from '@/components/registry/attr-grid';
import { ProvidersTable } from '@/components/registry/registry-tables';
import { systemNav } from '@/components/registry/nav';
import { aiSystems, providers } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const system = aiSystems.find((s) => s.id === id) ?? aiSystems[0];
  const provider = providers.find((p) => p.id === system.providerId);

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · AI Systems"
        title={system.name}
        id={system.id}
        description="The provider serving inference for this system."
        badges={[
          <Badge key="status" label={system.status} tone={toneForStatus(system.status)} />,
          <Badge key="risk" label={`${system.risk} Risk`} tone={toneForStatus(system.risk)} />
        ]}
      />
      <DetailNav base={`/ai-systems/${id}`} items={systemNav(id)} />
      {provider ? (
        <Card>
          <CardHeader title="Assigned Provider" subtitle="Inference routing target" />
          <CardBody>
            <div className="flex flex-wrap items-center gap-2">
              <a href={`/providers/${provider.id}`} className="text-sm font-semibold text-sentinel-300 hover:underline">{provider.name}</a>
              <Badge label={provider.status} tone={toneForStatus(provider.status)} />
              <Badge label={`${provider.risk} Risk`} tone={toneForStatus(provider.risk)} />
            </div>
            <div className="mt-4">
              <AttrGrid
                items={[
                  { label: 'Type', value: provider.type },
                  { label: 'Region', value: provider.region },
                  { label: 'Models', value: provider.models },
                  { label: 'Requests / 24h', value: provider.requests24h.toLocaleString() },
                  { label: 'Latency', value: `${provider.latencyMs} ms` },
                  { label: 'Uptime', value: `${provider.uptime.toFixed(2)}%` }
                ]}
              />
            </div>
          </CardBody>
        </Card>
      ) : null}
      <Card>
        <CardHeader title="All Providers" subtitle="Provider registry" />
        <CardBody>
          <ProvidersTable rows={providers} />
        </CardBody>
      </Card>
    </div>
  );
}