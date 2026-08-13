import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { PolicyTable } from '@/components/registry/related-tables';
import { sourceNav } from '@/components/registry/nav';
import { seededFilter } from '@/components/registry/helpers';
import { dataSources, policies } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const source = dataSources.find((s) => s.id === id) ?? dataSources[0];
  const applicable = seededFilter(policies, source.id, 2).filter((p) => p.status !== 'Disabled');

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Data Sources"
        title={source.name}
        id={source.id}
        description="Policies that apply to data leaving this source."
        badges={[
          <Badge key="status" label={source.status} tone={toneForStatus(source.status)} />,
          <Badge key="risk" label={`${source.risk} Risk`} tone={toneForStatus(source.risk)} />
        ]}
      />
      <DetailNav base={`/data-sources/${id}`} items={sourceNav(id)} />
      <Card>
        <CardHeader title="Applicable Policies" subtitle="Evaluated on data extraction" />
        <CardBody>
          <PolicyTable rows={applicable} />
        </CardBody>
      </Card>
    </div>
  );
}