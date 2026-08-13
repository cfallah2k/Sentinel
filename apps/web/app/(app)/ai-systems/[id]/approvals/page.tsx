import { CheckCircle2, Clock, FileCheck2, XCircle } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { ApprovalsTable } from '@/components/registry/related-tables';
import { systemNav } from '@/components/registry/nav';
import { aiSystems, approvals } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const system = aiSystems.find((s) => s.id === id) ?? aiSystems[0];
  const rows = approvals.filter((a) => a.systemId === system.id);
  const pending = rows.filter((a) => a.status === 'Pending').length;
  const approved = rows.filter((a) => a.status === 'Approved').length;
  const denied = rows.filter((a) => a.status === 'Denied').length;

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · AI Systems"
        title={system.name}
        id={system.id}
        description="Approval requests raised against this system."
        badges={[
          <Badge key="status" label={system.status} tone={toneForStatus(system.status)} />,
          <Badge key="risk" label={`${system.risk} Risk`} tone={toneForStatus(system.risk)} />
        ]}
      />
      <DetailNav base={`/ai-systems/${id}`} items={systemNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Approvals" value={rows.length} icon={FileCheck2} accent="sky" />
        <StatCard label="Pending" value={pending} icon={Clock} accent="amber" />
        <StatCard label="Approved" value={approved} icon={CheckCircle2} accent="green" />
        <StatCard label="Denied" value={denied} icon={XCircle} accent="rose" />
      </div>
      <Card>
        <CardHeader title="Approvals" subtitle="Requests tied to this system" />
        <CardBody>
          <ApprovalsTable rows={rows} />
        </CardBody>
      </Card>
    </div>
  );
}