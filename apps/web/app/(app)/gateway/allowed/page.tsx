import { Activity, CheckCircle2, EyeOff, Gauge, ShieldX, Timer, AlertTriangle } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ModuleNav } from '@/components/governance/module-nav';
import { RequestTable } from '@/components/enforcement/tables';
import { fmt, gatewayNavItems, gatewayTotals } from '@/components/enforcement/helpers';
import { gatewayRequests } from '@/lib/mock-data';

export default function Page() {
  const totals = gatewayTotals();
  const rows = gatewayRequests.filter((r) => r.decision === 'Allowed');
  const share = Math.round((rows.length / Math.max(1, gatewayRequests.length)) * 100);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Allowed Requests"
        description="Traffic that passed every policy evaluation and reached the provider."
      />
      <ModuleNav items={gatewayNavItems} active="/gateway/allowed" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Allowed / 24h" value={fmt(totals.allowed)} delta={11.9} deltaLabel="vs yesterday" icon={CheckCircle2} accent="green" />
        <StatCard label="Share of traffic" value={`${share}%`} icon={Activity} accent="sky" />
        <StatCard label="Avg Latency" value={`${totals.latency} ms`} icon={Gauge} accent="cyan" />
        <StatCard label="Sample Requests" value={rows.length} icon={EyeOff} accent="violet" />
      </div>
      <Card>
        <CardHeader title="Allowed requests" subtitle="Requests forwarded to providers after successful evaluation" />
        <CardBody>
          <RequestTable rows={rows} searchPlaceholder="Search allowed requests..." />
        </CardBody>
      </Card>
    </div>
  );
}
