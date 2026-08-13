import { Radar, Server, ShieldAlert, Workflow } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { ProvidersTable } from '@/components/registry/registry-tables';
import { providers } from '@/lib/mock-data';

const fmt = (n: number) => n.toLocaleString();

export default function Page() {
  const rows = providers.filter((p) => p.status !== 'Approved');
  const requests = rows.reduce((a, p) => a + p.requests24h, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Registry · Providers"
        title="Discover Providers"
        description="Providers surfaced from gateway telemetry and developer registrations that have not completed approval."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Discovered" value={rows.length} icon={Radar} accent="sky" />
        <StatCard label="Pending" value={rows.filter((p) => p.status === 'Pending').length} icon={Workflow} accent="amber" />
        <StatCard label="Restricted" value={rows.filter((p) => p.status === 'Restricted').length} icon={ShieldAlert} accent="rose" />
        <StatCard label="Requests / 24h" value={fmt(requests)} icon={Server} accent="violet" />
      </div>
      <Card>
        <CardHeader title="Discovered Providers" subtitle="Not yet approved for production traffic" />
        <CardBody>
          <ProvidersTable rows={rows} />
        </CardBody>
      </Card>
    </div>
  );
}