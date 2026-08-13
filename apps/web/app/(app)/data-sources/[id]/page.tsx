import { Activity, AlertTriangle, Database, Layers } from 'lucide-react';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AttrGrid } from '@/components/registry/attr-grid';
import { SystemsTable } from '@/components/registry/registry-tables';
import { FlowsTable } from '@/components/registry/related-tables';
import { ActivityList } from '@/components/registry/activity-list';
import { sourceNav } from '@/components/registry/nav';
import { aiSystems, dataFlows, dataSources } from '@/lib/mock-data';

const fmt = (n: number) => n.toLocaleString();

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const source = dataSources.find((s) => s.id === id) ?? dataSources[0];
  const flows = dataFlows.filter((f) => f.source === source.name);
  const systemIds = new Set(flows.map((f) => f.systemId));
  const systems = aiSystems.filter((s) => systemIds.has(s.id));

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Data Sources"
        title={source.name}
        id={source.id}
        description={`${source.type} connected via ${source.connector}.`}
        badges={[
          <Badge key="status" label={source.status} tone={toneForStatus(source.status)} />,
          <Badge key="risk" label={`${source.risk} Risk`} tone={toneForStatus(source.risk)} />,
          <Badge key="type" label={source.type} tone="blue" />
        ]}
        meta={[
          { label: 'Connector', value: source.connector },
          { label: 'Records', value: source.records === 0 ? 'Live' : fmt(source.records) },
          { label: 'Last Sync', value: source.lastSync }
        ]}
      />
      <DetailNav base={`/data-sources/${id}`} items={sourceNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Records" value={source.records === 0 ? 'Live' : fmt(source.records)} icon={Database} accent="sky" />
        <StatCard label="Categories" value={source.categories.length} icon={Layers} accent="violet" />
        <StatCard label="Data Flows" value={flows.length} icon={Activity} accent="cyan" />
        <StatCard label="High Risk Flows" value={flows.filter((f) => f.risk === 'High' || f.risk === 'Critical').length} icon={AlertTriangle} accent="rose" />
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Source Profile" subtitle="Core registry attributes" />
          <CardBody>
            <AttrGrid
              items={[
                { label: 'Type', value: source.type },
                { label: 'Status', value: source.status },
                { label: 'Risk', value: source.risk },
                { label: 'Connector', value: source.connector },
                { label: 'Categories', value: source.categories.join(', ') },
                { label: 'Records', value: source.records === 0 ? 'Live' : fmt(source.records) },
                { label: 'Last Sync', value: source.lastSync, full: true }
              ]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Recent Activity" subtitle="Governance events for this source" />
          <CardBody>
            <ActivityList entityId={source.id} entityName={source.name} count={6} />
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="AI Systems Consuming This Source" subtitle={`${systems.length} systems receive data from ${source.name}`} />
        <CardBody>
          <SystemsTable rows={systems} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Data Flows" subtitle={`${flows.length} flows sourced from ${source.name}`} />
        <CardBody>
          <FlowsTable rows={flows} />
        </CardBody>
      </Card>
    </div>
  );
}