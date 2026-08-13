import { ScrollText } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { ActivityList } from '@/components/registry/activity-list';
import { systemNav } from '@/components/registry/nav';
import { aiSystems } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const system = aiSystems.find((s) => s.id === id) ?? aiSystems[0];

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · AI Systems"
        title={system.name}
        id={system.id}
        description="Immutable audit trail for this system record."
        badges={[
          <Badge key="status" label={system.status} tone={toneForStatus(system.status)} />,
          <Badge key="risk" label={`${system.risk} Risk`} tone={toneForStatus(system.risk)} />
        ]}
      />
      <DetailNav base={`/ai-systems/${id}`} items={systemNav(id)} />
      <Card>
        <CardHeader
          title="Audit Log"
          subtitle="Signed events with actor, source IP and context"
          action={
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.65rem] font-semibold text-slate-300">
              <ScrollText className="h-3 w-3 text-sentinel-400" /> Retained 365 days
            </span>
          }
        />
        <CardBody>
          <ActivityList entityId={`${system.id}-audit`} entityName={system.name} count={10} />
        </CardBody>
      </Card>
    </div>
  );
}