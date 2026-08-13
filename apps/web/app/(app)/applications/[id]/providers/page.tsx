import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { ProvidersTable } from '@/components/registry/registry-tables';
import { appNav } from '@/components/registry/nav';
import { aiSystems, applications, providers } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const app = applications.find((a) => a.id === id) ?? applications[0];
  const systemIds = new Set(app.aiSystemIds);
  const providerIds = new Set(aiSystems.filter((s) => systemIds.has(s.id)).map((s) => s.providerId));
  const rows = providers.filter((p) => providerIds.has(p.id));

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Applications"
        title={app.name}
        id={app.id}
        description="Providers reachable through this application's attached systems."
        badges={[
          <Badge key="status" label={app.status} tone={toneForStatus(app.status)} />,
          <Badge key="risk" label={`${app.risk} Risk`} tone={toneForStatus(app.risk)} />
        ]}
      />
      <DetailNav base={`/applications/${id}`} items={appNav(id)} />
      <Card>
        <CardHeader title="Providers" subtitle={`${rows.length} providers in the request path`} />
        <CardBody>
          <ProvidersTable rows={rows} />
        </CardBody>
      </Card>
    </div>
  );
}