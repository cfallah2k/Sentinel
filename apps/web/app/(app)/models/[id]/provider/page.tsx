import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AttrGrid } from '@/components/registry/attr-grid';
import { ProvidersTable } from '@/components/registry/registry-tables';
import { modelNav } from '@/components/registry/nav';
import { models, providers } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const model = models.find((m) => m.id === id) ?? models[0];
  const provider = providers.find((p) => p.id === model.providerId);

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Models"
        title={model.name}
        id={model.id}
        description="The provider serving this model."
        badges={[
          <Badge key="status" label={model.status} tone={toneForStatus(model.status)} />,
          <Badge key="risk" label={`${model.risk} Risk`} tone={toneForStatus(model.risk)} />
        ]}
      />
      <DetailNav base={`/models/${id}`} items={modelNav(id)} />
      {provider ? (
        <Card>
          <CardHeader title="Serving Provider" subtitle="Inference routing target" />
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
                  { label: 'Latency', value: `${provider.latencyMs} ms` },
                  { label: 'Uptime', value: `${provider.uptime.toFixed(2)}%` }
                ]}
              />
            </div>
          </CardBody>
        </Card>
      ) : null}
      <Card>
        <CardHeader title="Provider Registry" subtitle="All providers" />
        <CardBody>
          <ProvidersTable rows={providers} />
        </CardBody>
      </Card>
    </div>
  );
}