import { Activity, Ban, Lock, Server } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { ProvidersTable } from '@/components/registry/registry-tables';
import { providers } from '@/lib/mock-data';

const fmt = (n: number) => n.toLocaleString();

export default function Page() {
  const rows = providers.filter((p) => p.status === 'Restricted');
  const requests = rows.reduce((a, p) => a + p.requests24h, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Registry · Providers"
        title="Restricted Providers"
        description="Providers blocked from serving traffic pending remediation. Access requires an approved exception."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Restricted" value={rows.length} icon={Ban} accent="rose" />
        <StatCard label="External" value={rows.filter((p) => p.type === 'External').length} icon={Server} accent="sky" />
        <StatCard label="Requests Blocked" value={fmt(requests)} icon={Activity} accent="amber" />
        <StatCard label="Exceptions Needed" value={rows.length} icon={Lock} accent="violet" />
      </div>
      <Card>
        <CardHeader title="Restricted Providers" subtitle="Blocked at the gateway" />
        <CardBody>
          <ProvidersTable rows={rows} />
        </CardBody>
      </Card>
    </div>
  );
}