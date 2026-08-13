import { Activity, Ban, Lock, ShieldCheck } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { FlowsTable } from '@/components/registry/related-tables';
import { sourceNav } from '@/components/registry/nav';
import { dataFlows, dataSources } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const source = dataSources.find((s) => s.id === id) ?? dataSources[0];
  const flows = dataFlows.filter((f) => f.source === source.name);
  const allowed = flows.filter((f) => f.decision === 'Allow').length;
  const blocked = flows.filter((f) => f.decision === 'Block').length;
  const redacted = flows.filter((f) => f.decision === 'Redact').length;

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Data Sources"
        title={source.name}
        id={source.id}
        description="Every data flow originating from this source."
        badges={[
          <Badge key="status" label={source.status} tone={toneForStatus(source.status)} />,
          <Badge key="risk" label={`${source.risk} Risk`} tone={toneForStatus(source.risk)} />
        ]}
      />
      <DetailNav base={`/data-sources/${id}`} items={sourceNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Flows" value={flows.length} icon={Activity} accent="sky" />
        <StatCard label="Allowed" value={allowed} icon={ShieldCheck} accent="green" />
        <StatCard label="Blocked" value={blocked} icon={Ban} accent="rose" />
        <StatCard label="Redacted" value={redacted} icon={Lock} accent="amber" />
      </div>
      <Card>
        <CardHeader title="Data Flows" subtitle={`${flows.length} flows from this source`} />
        <CardBody>
          <FlowsTable rows={flows} />
        </CardBody>
      </Card>
    </div>
  );
}