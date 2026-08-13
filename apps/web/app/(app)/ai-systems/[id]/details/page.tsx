import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AttrGrid } from '@/components/registry/attr-grid';
import { systemNav } from '@/components/registry/nav';
import { aiSystems, applications, models, providers } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const system = aiSystems.find((s) => s.id === id) ?? aiSystems[0];
  const provider = providers.find((p) => p.id === system.providerId);
  const model = models.find((m) => m.id === system.modelId);
  const usedBy = applications.filter((a) => a.aiSystemIds.includes(system.id));

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · AI Systems"
        title={system.name}
        id={system.id}
        description="Complete registry attributes for this system."
        badges={[
          <Badge key="status" label={system.status} tone={toneForStatus(system.status)} />,
          <Badge key="risk" label={`${system.risk} Risk`} tone={toneForStatus(system.risk)} />
        ]}
      />
      <DetailNav base={`/ai-systems/${id}`} items={systemNav(id)} />
      <Card>
        <CardHeader title="Registry Attributes" subtitle="Full record as stored in the inventory" />
        <CardBody>
          <AttrGrid
            items={[
              { label: 'System ID', value: system.id },
              { label: 'Name', value: system.name },
              { label: 'Type', value: system.type },
              { label: 'Status', value: system.status },
              { label: 'Risk', value: system.risk },
              { label: 'Owner', value: system.owner },
              { label: 'Purpose', value: system.purpose, full: true },
              { label: 'Environment', value: system.environment },
              { label: 'Oversight', value: system.oversight },
              { label: 'Provider', value: `${provider?.name ?? system.providerId} (${system.providerId})` },
              { label: 'Base Model', value: `${model?.name ?? system.modelId} (${system.modelId})` },
              { label: 'Data Categories', value: system.dataCategories.join(', ') },
              { label: 'Approved At', value: system.approvedAt },
              { label: 'Last Activity', value: system.lastActivity },
              { label: 'Used By', value: usedBy.map((a) => a.name).join(', ') || 'None' }
            ]}
          />
        </CardBody>
      </Card>
    </div>
  );
}