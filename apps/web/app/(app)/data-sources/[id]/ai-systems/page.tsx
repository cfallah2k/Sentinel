import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { SystemsTable } from '@/components/registry/registry-tables';
import { sourceNav } from '@/components/registry/nav';
import { aiSystems, dataFlows, dataSources } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const source = dataSources.find((s) => s.id === id) ?? dataSources[0];
  const flows = dataFlows.filter((f) => f.source === source.name);
  const systemIds = new Set(flows.map((f) => f.systemId));
  const rows = aiSystems.filter((s) => systemIds.has(s.id));

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Data Sources"
        title={source.name}
        id={source.id}
        description="AI systems that receive data from this source."
        badges={[
          <Badge key="status" label={source.status} tone={toneForStatus(source.status)} />,
          <Badge key="risk" label={`${source.risk} Risk`} tone={toneForStatus(source.risk)} />
        ]}
      />
      <DetailNav base={`/data-sources/${id}`} items={sourceNav(id)} />
      <Card>
        <CardHeader title="AI Systems" subtitle={`${rows.length} systems consume data from ${source.name}`} />
        <CardBody>
          <SystemsTable rows={rows} />
        </CardBody>
      </Card>
    </div>
  );
}