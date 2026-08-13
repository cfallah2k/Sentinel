import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { PolicyTable } from '@/components/registry/related-tables';
import { providerNav } from '@/components/registry/nav';
import { seededFilter } from '@/components/registry/helpers';
import { policies, providers } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const provider = providers.find((p) => p.id === id) ?? providers[0];
  const applicable = seededFilter(policies, provider.id, 2).filter((p) => p.status !== 'Disabled');

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Providers"
        title={provider.name}
        id={provider.id}
        description="Policies that apply to traffic routed to this provider."
        badges={[
          <Badge key="status" label={provider.status} tone={toneForStatus(provider.status)} />,
          <Badge key="risk" label={`${provider.risk} Risk`} tone={toneForStatus(provider.risk)} />
        ]}
      />
      <DetailNav base={`/providers/${id}`} items={providerNav(id)} />
      <Card>
        <CardHeader title="Applicable Policies" subtitle="Evaluated for outbound requests" />
        <CardBody>
          <PolicyTable rows={applicable} />
        </CardBody>
      </Card>
    </div>
  );
}