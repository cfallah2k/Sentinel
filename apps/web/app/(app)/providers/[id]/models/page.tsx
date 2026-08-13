import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { ModelsTable } from '@/components/registry/registry-tables';
import { providerNav } from '@/components/registry/nav';
import { models, providers } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const provider = providers.find((p) => p.id === id) ?? providers[0];
  const rows = models.filter((m) => m.providerId === provider.id);

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Providers"
        title={provider.name}
        id={provider.id}
        description="Models exposed by this provider for gateway routing."
        badges={[
          <Badge key="status" label={provider.status} tone={toneForStatus(provider.status)} />,
          <Badge key="risk" label={`${provider.risk} Risk`} tone={toneForStatus(provider.risk)} />
        ]}
      />
      <DetailNav base={`/providers/${id}`} items={providerNav(id)} />
      <Card>
        <CardHeader title="Models" subtitle={`${rows.length} models available`} />
        <CardBody>
          <ModelsTable rows={rows} />
        </CardBody>
      </Card>
    </div>
  );
}