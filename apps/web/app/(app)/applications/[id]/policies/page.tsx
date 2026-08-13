import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { PolicyTable } from '@/components/registry/related-tables';
import { appNav } from '@/components/registry/nav';
import { seededFilter } from '@/components/registry/helpers';
import { applications, policies } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const app = applications.find((a) => a.id === id) ?? applications[0];
  const applicable = seededFilter(policies, app.id, 2).filter((p) => p.status !== 'Disabled');

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Applications"
        title={app.name}
        id={app.id}
        description="Policies that apply to this application's traffic."
        badges={[
          <Badge key="status" label={app.status} tone={toneForStatus(app.status)} />,
          <Badge key="risk" label={`${app.risk} Risk`} tone={toneForStatus(app.risk)} />
        ]}
      />
      <DetailNav base={`/applications/${id}`} items={appNav(id)} />
      <Card>
        <CardHeader title="Applicable Policies" subtitle="Evaluated for every gateway request" />
        <CardBody>
          <PolicyTable rows={applicable} />
        </CardBody>
      </Card>
    </div>
  );
}