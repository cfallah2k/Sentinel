import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AttrGrid } from '@/components/registry/attr-grid';
import { ActivityList } from '@/components/registry/activity-list';
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
        description={`${model.modality} model with a ${model.contextWindow} context window.`}
        badges={[
          <Badge key="status" label={model.status} tone={toneForStatus(model.status)} />,
          <Badge key="risk" label={`${model.risk} Risk`} tone={toneForStatus(model.risk)} />
        ]}
        meta={[
          { label: 'Provider', value: provider?.name ?? model.providerId },
          { label: 'Requests / 24h', value: model.requests24h.toLocaleString() }
        ]}
      />
      <DetailNav base={`/models/${id}`} items={modelNav(id)} />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Profile Summary" subtitle="Key attributes" />
          <CardBody>
            <AttrGrid
              items={[
                { label: 'Modality', value: model.modality },
                { label: 'Status', value: model.status },
                { label: 'Risk', value: model.risk },
                { label: 'Provider', value: provider?.name ?? model.providerId },
                { label: 'Context Window', value: model.contextWindow },
                { label: 'Pricing', value: model.pricing }
              ]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Recent Activity" subtitle="Last governance events" />
          <CardBody>
            <ActivityList entityId={model.id} entityName={model.name} count={6} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}