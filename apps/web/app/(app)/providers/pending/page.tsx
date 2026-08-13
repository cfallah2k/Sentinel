import { Activity, AlertTriangle, Clock, Server } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { ProvidersTable } from '@/components/registry/registry-tables';
import { providers } from '@/lib/mock-data';

const fmt = (n: number) => n.toLocaleString();

export default function Page() {
  const rows = providers.filter((p) => p.status === 'Pending');
  const requests = rows.reduce((a, p) => a + p.requests24h, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Registry · Providers"
        title="Pending Providers"
        description="Providers awaiting approval. Traffic is blocked until the provider passes security and data residency review."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pending" value={rows.length} icon={Clock} accent="amber" />
        <StatCard label="High Risk" value={rows.filter((p) => p.risk === 'High').length} icon={AlertTriangle} accent="rose" />
        <StatCard label="Requests / 24h" value={fmt(requests)} icon={Activity} accent="violet" />
        <StatCard label="Self-hosted" value={rows.filter((p) => p.type === 'Self-hosted').length} icon={Server} accent="sky" />
      </div>
      <Card>
        <CardHeader title="Pending Providers" subtitle="In security review" />
        <CardBody>
          <ProvidersTable rows={rows} />
        </CardBody>
      </Card>
    </div>
  );
}