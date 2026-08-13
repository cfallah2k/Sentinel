import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { ActivityList } from '@/components/registry/activity-list';
import { modelNav } from '@/components/registry/nav';
import { models } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const model = models.find((m) => m.id === id) ?? models[0];

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Models"
        title={model.name}
        id={model.id}
        description="Activity stream for this model."
        badges={[
          <Badge key="status" label={model.status} tone={toneForStatus(model.status)} />,
          <Badge key="risk" label={`${model.risk} Risk`} tone={toneForStatus(model.risk)} />
        ]}
      />
      <DetailNav base={`/models/${id}`} items={modelNav(id)} />
      <Card>
        <CardHeader title="Activity" subtitle="Approval and catalog events" />
        <CardBody>
          <ActivityList entityId={model.id} entityName={model.name} count={10} />
        </CardBody>
      </Card>
    </div>
  );
}