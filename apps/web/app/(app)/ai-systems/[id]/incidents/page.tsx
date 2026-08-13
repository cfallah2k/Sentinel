import { AlertTriangle, CheckCircle2, Clock, ShieldAlert } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { IncidentsTable } from '@/components/registry/related-tables';
import { systemNav } from '@/components/registry/nav';
import { aiSystems, incidents } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const system = aiSystems.find((s) => s.id === id) ?? aiSystems[0];
  const rows = incidents.filter((i) => i.systemId === system.id);
  const open = rows.filter((i) => i.status !== 'Resolved').length;
  const critical = rows.filter((i) => i.severity === 'Critical' || i.severity === 'High').length;

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · AI Systems"
        title={system.name}
        id={system.id}
        description="Incidents recorded against this system."
        badges={[
          <Badge key="status" label={system.status} tone={toneForStatus(system.status)} />,
          <Badge key="risk" label={`${system.risk} Risk`} tone={toneForStatus(system.risk)} />
        ]}
      />
      <DetailNav base={`/ai-systems/${id}`} items={systemNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Incidents" value={rows.length} icon={ShieldAlert} accent="sky" />
        <StatCard label="Open" value={open} icon={Clock} accent="amber" />
        <StatCard label="Critical / High" value={critical} icon={AlertTriangle} accent="rose" />
        <StatCard label="Resolved" value={rows.length - open} icon={CheckCircle2} accent="green" />
      </div>
      <Card>
        <CardHeader title="Incidents" subtitle="All incidents for this system" />
        <CardBody>
          <IncidentsTable rows={rows} />
        </CardBody>
      </Card>
    </div>
  );
}