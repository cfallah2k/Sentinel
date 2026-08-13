import { Cloud, Gauge, Server, ShieldCheck, ShieldX } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ModuleNav } from '@/components/governance/module-nav';
import { ProvidersTable } from '@/components/registry/registry-tables';
import { fmt, gatewayNavItems } from '@/components/enforcement/helpers';
import { providers } from '@/lib/mock-data';

export default function Page() {
  const approved = providers.filter((p) => p.status === 'Approved').length;
  const pending = providers.filter((p) => p.status === 'Pending').length;
  const avgUptime = (providers.reduce((a, p) => a + p.uptime, 0) / providers.length).toFixed(2);
  const requests = providers.reduce((a, p) => a + p.requests24h, 0);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Providers"
        description="Model providers reachable through the gateway, with health and approval status."
      />
      <ModuleNav items={gatewayNavItems} active="/gateway/providers" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Providers" value={providers.length} icon={Cloud} accent="sky" />
        <StatCard label="Approved" value={approved} icon={ShieldCheck} accent="green" />
        <StatCard label="Pending" value={pending} icon={ShieldX} accent="amber" />
        <StatCard label="Requests / 24h" value={fmt(requests)} icon={Server} accent="violet" />
      </div>
      <Card>
        <CardHeader title="Provider registry" subtitle="All providers with latency and uptime" />
        <CardBody>
          <ProvidersTable rows={providers} />
        </CardBody>
      </Card>
    </div>
  );
}