import { Activity, Cpu, Gauge, Zap } from 'lucide-react';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AttrGrid } from '@/components/registry/attr-grid';
import { SystemsTable } from '@/components/registry/registry-tables';
import { ActivityList } from '@/components/registry/activity-list';
import { modelNav } from '@/components/registry/nav';
import { aiSystems, models, providers } from '@/lib/mock-data';

const fmt = (n: number) => n.toLocaleString();

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const model = models.find((m) => m.id === id) ?? models[0];
  const provider = providers.find((p) => p.id === model.providerId);
  const usedBy = aiSystems.filter((s) => s.modelId === model.id);

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Models"
        title={model.name}
        id={model.id}
        description={`${model.modality} model served by ${provider?.name ?? model.providerId}.`}
        badges={[
          <Badge key="status" label={model.status} tone={toneForStatus(model.status)} />,
          <Badge key="risk" label={`${model.risk} Risk`} tone={toneForStatus(model.risk)} />,
          <Badge key="modality" label={model.modality} tone="blue" />
        ]}
        meta={[
          { label: 'Provider', value: provider?.name ?? model.providerId },
          { label: 'Requests / 24h', value: fmt(model.requests24h) },
          { label: 'Context', value: model.contextWindow }
        ]}
      />
      <DetailNav base={`/models/${id}`} items={modelNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Requests / 24h" value={fmt(model.requests24h)} icon={Activity} accent="sky" />
        <StatCard label="Context Window" value={model.contextWindow} icon={Cpu} accent="violet" />
        <StatCard label="Systems Using" value={usedBy.length} icon={Zap} accent="cyan" />
        <StatCard label="Pricing" value={model.pricing} icon={Gauge} accent="amber" />
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Model Profile" subtitle="Core registry attributes" />
          <CardBody>
            <AttrGrid
              items={[
                { label: 'Modality', value: model.modality },
                { label: 'Status', value: model.status },
                { label: 'Risk', value: model.risk },
                { label: 'Provider', value: provider?.name ?? model.providerId },
                { label: 'Context Window', value: model.contextWindow },
                { label: 'Pricing', value: model.pricing },
                { label: 'Requests / 24h', value: fmt(model.requests24h) }
              ]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Recent Activity" subtitle="Governance events for this model" />
          <CardBody>
            <ActivityList entityId={model.id} entityName={model.name} count={6} />
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Systems Using This Model" subtitle={`${usedBy.length} systems routed to ${model.name}`} />
        <CardBody>
          <SystemsTable rows={usedBy} />
        </CardBody>
      </Card>
    </div>
  );
}