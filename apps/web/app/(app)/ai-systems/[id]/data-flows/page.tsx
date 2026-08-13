import { Activity, Ban, Lock, ShieldCheck } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { FlowsTable } from '@/components/registry/related-tables';
import { systemNav } from '@/components/registry/nav';
import { aiSystems, dataFlows } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const system = aiSystems.find((s) => s.id === id) ?? aiSystems[0];
  const flows = dataFlows.filter((f) => f.systemId === system.id);
  const allowed = flows.filter((f) => f.decision === 'Allow');
  const blocked = flows.filter((f) => f.decision === 'Block');
  const redacted = flows.filter((f) => f.decision === 'Redact');

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · AI Systems"
        title={system.name}
        id={system.id}
        description="Every data flow touching this system, with gateway decisions."
        badges={[
          <Badge key="status" label={system.status} tone={toneForStatus(system.status)} />,
          <Badge key="risk" label={`${system.risk} Risk`} tone={toneForStatus(system.risk)} />
        ]}
      />
      <DetailNav base={`/ai-systems/${id}`} items={systemNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Flows" value={flows.length} icon={Activity} accent="sky" />
        <StatCard label="Allowed" value={allowed.length} icon={ShieldCheck} accent="green" />
        <StatCard label="Blocked" value={blocked.length} icon={Ban} accent="rose" />
        <StatCard label="Redacted" value={redacted.length} icon={Lock} accent="amber" />
      </div>
      <Card>
        <CardHeader title="Data Flows" subtitle={`${flows.length} traced flows`} />
        <CardBody>
          <FlowsTable rows={flows} />
        </CardBody>
      </Card>
    </div>
  );
}