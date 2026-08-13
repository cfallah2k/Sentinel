import { Activity, Gauge, ShieldX, Zap } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ModuleNav } from '@/components/governance/module-nav';
import { RequestTable } from '@/components/enforcement/tables';
import { fmt, gatewayNavItems, gatewayTotals } from '@/components/enforcement/helpers';
import { gatewayRequests } from '@/lib/mock-data';

export default function Page() {
  const totals = gatewayTotals();
  const blockedCount = gatewayRequests.filter((r) => r.decision === 'Blocked').length;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="All Requests"
        description="Every evaluated request with its final decision, risk and latency."
      />
      <ModuleNav items={gatewayNavItems} active="/gateway/requests" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Evaluated / 24h" value={fmt(totals.requests)} delta={12.4} deltaLabel="vs yesterday" icon={Activity} accent="sky" />
        <StatCard label="Blocked" value={blockedCount} icon={ShieldX} accent="rose" />
        <StatCard label="Avg Latency" value={`${totals.latency} ms`} icon={Gauge} accent="cyan" />
        <StatCard label="Tokens" value={fmt(totals.tokens)} icon={Zap} accent="amber" />
      </div>
      <Card>
        <CardHeader title="Request log" subtitle="Full evaluation stream" />
        <CardBody>
          <RequestTable rows={gatewayRequests} pageSize={10} />
        </CardBody>
      </Card>
    </div>
  );
}