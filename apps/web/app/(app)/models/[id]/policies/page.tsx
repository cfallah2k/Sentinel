import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { PolicyTable } from '@/components/registry/related-tables';
import { modelNav } from '@/components/registry/nav';
import { seededFilter } from '@/components/registry/helpers';
import { models, policies } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const model = models.find((m) => m.id === id) ?? models[0];
  const applicable = seededFilter(policies, model.id, 2).filter((p) => p.status !== 'Disabled');

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Models"
        title={model.name}
        id={model.id}
        description="Policies that apply to requests using this model."
        badges={[
          <Badge key="status" label={model.status} tone={toneForStatus(model.status)} />,
          <Badge key="risk" label={`${model.risk} Risk`} tone={toneForStatus(model.risk)} />
        ]}
      />
      <DetailNav base={`/models/${id}`} items={modelNav(id)} />
      <Card>
        <CardHeader title="Applicable Policies" subtitle="Evaluated for requests to this model" />
        <CardBody>
          <PolicyTable rows={applicable} />
        </CardBody>
      </Card>
    </div>
  );
}