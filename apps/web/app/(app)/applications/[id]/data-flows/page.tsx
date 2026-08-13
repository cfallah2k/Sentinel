import { Activity, Ban, Lock, ShieldCheck } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { FlowsTable } from '@/components/registry/related-tables';
import { appNav } from '@/components/registry/nav';
import { applications, dataFlows } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const app = applications.find((a) => a.id === id) ?? applications[0];
  const flows = dataFlows.filter((f) => f.applicationId === app.id);
  const blocked = flows.filter((f) => f.decision === 'Block').length;
  const redacted = flows.filter((f) => f.decision === 'Redact').length;
  const allowed = flows.filter((f) => f.decision === 'Allow').length;

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Applications"
        title={app.name}
        id={app.id}
        description="Every data flow attributed to this application."
        badges={[
          <Badge key="status" label={app.status} tone={toneForStatus(app.status)} />,
          <Badge key="risk" label={`${app.risk} Risk`} tone={toneForStatus(app.risk)} />
        ]}
      />
      <DetailNav base={`/applications/${id}`} items={appNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Flows" value={flows.length} icon={Activity} accent="sky" />
        <StatCard label="Allowed" value={allowed} icon={ShieldCheck} accent="green" />
        <StatCard label="Blocked" value={blocked} icon={Ban} accent="rose" />
        <StatCard label="Redacted" value={redacted} icon={Lock} accent="amber" />
      </div>
      <Card>
        <CardHeader title="Data Flows" subtitle="Traced through the gateway" />
        <CardBody>
          <FlowsTable rows={flows} />
        </CardBody>
      </Card>
    </div>
  );
}