import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AttrGrid } from '@/components/registry/attr-grid';
import { ActivityList } from '@/components/registry/activity-list';
import { sourceNav } from '@/components/registry/nav';
import { dataSources } from '@/lib/mock-data';

const fmt = (n: number) => n.toLocaleString();

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const source = dataSources.find((s) => s.id === id) ?? dataSources[0];

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Data Sources"
        title={source.name}
        id={source.id}
        description={`${source.type} connected via ${source.connector}.`}
        badges={[
          <Badge key="status" label={source.status} tone={toneForStatus(source.status)} />,
          <Badge key="risk" label={`${source.risk} Risk`} tone={toneForStatus(source.risk)} />
        ]}
        meta={[
          { label: 'Records', value: source.records === 0 ? 'Live' : fmt(source.records) },
          { label: 'Last Sync', value: source.lastSync }
        ]}
      />
      <DetailNav base={`/data-sources/${id}`} items={sourceNav(id)} />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Profile Summary" subtitle="Key attributes" />
          <CardBody>
            <AttrGrid
              items={[
                { label: 'Type', value: source.type },
                { label: 'Status', value: source.status },
                { label: 'Risk', value: source.risk },
                { label: 'Connector', value: source.connector },
                { label: 'Categories', value: source.categories.join(', ') || 'Unclassified' },
                { label: 'Records', value: source.records === 0 ? 'Live' : fmt(source.records) },
                { label: 'Last Sync', value: source.lastSync }
              ]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Recent Activity" subtitle="Last governance events" />
          <CardBody>
            <ActivityList entityId={source.id} entityName={source.name} count={6} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}