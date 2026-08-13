import { ScrollText } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { ActivityList } from '@/components/registry/activity-list';
import { sourceNav } from '@/components/registry/nav';
import { dataSources } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const source = dataSources.find((s) => s.id === id) ?? dataSources[0];

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Data Sources"
        title={source.name}
        id={source.id}
        description="Immutable audit trail for this source record."
        badges={[
          <Badge key="status" label={source.status} tone={toneForStatus(source.status)} />,
          <Badge key="risk" label={`${source.risk} Risk`} tone={toneForStatus(source.risk)} />
        ]}
      />
      <DetailNav base={`/data-sources/${id}`} items={sourceNav(id)} />
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
          <ActivityList entityId={`${source.id}-audit`} entityName={source.name} count={10} />
        </CardBody>
      </Card>
    </div>
  );
}