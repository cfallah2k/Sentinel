import { AlertTriangle, CheckCircle2, Clock, ShieldAlert } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { IncidentsTable } from '@/components/registry/related-tables';
import { providerNav } from '@/components/registry/nav';
import { aiSystems, incidents, providers } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const provider = providers.find((p) => p.id === id) ?? providers[0];
  const systemIds = new Set(aiSystems.filter((s) => s.providerId === provider.id).map((s) => s.id));
  const rows = incidents.filter((i) => systemIds.has(i.systemId));
  const open = rows.filter((i) => i.status !== 'Resolved').length;
  const critical = rows.filter((i) => i.severity === 'Critical' || i.severity === 'High').length;

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Providers"
        title={provider.name}
        id={provider.id}
        description="Incidents involving systems routed to this provider."
        badges={[
          <Badge key="status" label={provider.status} tone={toneForStatus(provider.status)} />,
          <Badge key="risk" label={`${provider.risk} Risk`} tone={toneForStatus(provider.risk)} />
        ]}
      />
      <DetailNav base={`/providers/${id}`} items={providerNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Incidents" value={rows.length} icon={ShieldAlert} accent="sky" />
        <StatCard label="Open" value={open} icon={Clock} accent="amber" />
        <StatCard label="Critical / High" value={critical} icon={AlertTriangle} accent="rose" />
        <StatCard label="Resolved" value={rows.length - open} icon={CheckCircle2} accent="green" />
      </div>
      <Card>
        <CardHeader title="Incidents" subtitle="Across systems using this provider" />
        <CardBody>
          <IncidentsTable rows={rows} />
        </CardBody>
      </Card>
    </div>
  );
}