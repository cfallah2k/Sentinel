import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { ActivityList } from '@/components/registry/activity-list';
import { sourceNav } from '@/components/registry/nav';
import { dataSources } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const source = dataSources.find((s) => s.id === id) ?? dataSources[0];

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Data Sources"
        title={source.name}
        id={source.id}
        description="Activity stream for this source."
        badges={[
          <Badge key="status" label={source.status} tone={toneForStatus(source.status)} />,
          <Badge key="risk" label={`${source.risk} Risk`} tone={toneForStatus(source.risk)} />
        ]}
      />
      <DetailNav base={`/data-sources/${id}`} items={sourceNav(id)} />
      <Card>
        <CardHeader title="Activity" subtitle="Sync and classification events" />
        <CardBody>
          <ActivityList entityId={source.id} entityName={source.name} count={10} />
        </CardBody>
      </Card>
    </div>
  );
}