import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AttrGrid } from '@/components/registry/attr-grid';
import { ModelsTable } from '@/components/registry/registry-tables';
import { systemNav } from '@/components/registry/nav';
import { aiSystems, models, providers } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const system = aiSystems.find((s) => s.id === id) ?? aiSystems[0];
  const model = models.find((m) => m.id === system.modelId);
  const provider = providers.find((p) => p.id === system.providerId);
  const siblings = model ? models.filter((m) => m.providerId === model.providerId) : [];

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · AI Systems"
        title={system.name}
        id={system.id}
        description="The models powering this system."
        badges={[
          <Badge key="status" label={system.status} tone={toneForStatus(system.status)} />,
          <Badge key="risk" label={`${system.risk} Risk`} tone={toneForStatus(system.risk)} />
        ]}
      />
      <DetailNav base={`/ai-systems/${id}`} items={systemNav(id)} />
      {model ? (
        <Card>
          <CardHeader title="Assigned Model" subtitle="Primary model for inference" />
          <CardBody>
            <div className="flex flex-wrap items-center gap-2">
              <a href={`/models/${model.id}`} className="text-sm font-semibold text-sentinel-300 hover:underline">{model.name}</a>
              <Badge label={model.status} tone={toneForStatus(model.status)} />
              <Badge label={`${model.risk} Risk`} tone={toneForStatus(model.risk)} />
            </div>
            <div className="mt-4">
              <AttrGrid
                items={[
                  { label: 'Provider', value: provider?.name ?? model.providerId },
                  { label: 'Modality', value: model.modality },
                  { label: 'Context Window', value: model.contextWindow },
                  { label: 'Pricing', value: model.pricing },
                  { label: 'Requests / 24h', value: model.requests24h.toLocaleString() }
                ]}
              />
            </div>
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardHeader title="Assigned Model" subtitle="Not resolved" />
          <CardBody>
            <p className="text-xs text-slate-400">No model record found for modelId {system.modelId}.</p>
          </CardBody>
        </Card>
      )}
      <Card>
        <CardHeader title="Models from Same Provider" subtitle="Other models available from this provider" />
        <CardBody>
          <ModelsTable rows={siblings} />
        </CardBody>
      </Card>
    </div>
  );
}