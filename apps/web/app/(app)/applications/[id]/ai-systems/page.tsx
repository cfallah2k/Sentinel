import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { SystemsTable } from '@/components/registry/registry-tables';
import { appNav } from '@/components/registry/nav';
import { aiSystems, applications } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const app = applications.find((a) => a.id === id) ?? applications[0];
  const systems = aiSystems.filter((s) => app.aiSystemIds.includes(s.id));

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Applications"
        title={app.name}
        id={app.id}
        description="AI systems this application is allowed to consume."
        badges={[
          <Badge key="status" label={app.status} tone={toneForStatus(app.status)} />,
          <Badge key="risk" label={`${app.risk} Risk`} tone={toneForStatus(app.risk)} />
        ]}
      />
      <DetailNav base={`/applications/${id}`} items={appNav(id)} />
      <Card>
        <CardHeader title="AI Systems" subtitle={`${systems.length} systems attached`} />
        <CardBody>
          <SystemsTable rows={systems} />
        </CardBody>
      </Card>
    </div>
  );
}