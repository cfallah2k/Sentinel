import { Activity, EyeOff, Gauge, ShieldX, Timer } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { MultiArea, DonutChart } from '@/components/ui/charts';
import { ModuleNav } from '@/components/governance/module-nav';
import { RequestTable } from '@/components/enforcement/tables';
import { decisionDonut, fmt, gatewayNavItems, gatewayTotals } from '@/components/enforcement/helpers';
import { gatewayRequests, hourlySeries } from '@/lib/mock-data';

export default function Page() {
  const totals = gatewayTotals();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Gateway Overview"
        description="Traffic, enforcement and latency posture for the last 24 hours."
      />
      <ModuleNav items={gatewayNavItems} active="/gateway/overview" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Requests / 24h" value={fmt(totals.requests)} delta={12.4} deltaLabel="vs yesterday" icon={Activity} accent="sky" />
        <StatCard label="Blocked / 24h" value={fmt(totals.blocked)} delta={8.2} deltaLabel="vs yesterday" icon={ShieldX} accent="rose" />
        <StatCard label="Redacted / 24h" value={fmt(totals.redacted)} delta={3.1} deltaLabel="vs yesterday" icon={EyeOff} accent="violet" />
        <StatCard label="Approval Required" value={fmt(totals.pending)} delta={1.8} deltaLabel="vs yesterday" icon={Timer} accent="amber" />
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Enforcement volume" subtitle="Allowed, blocked and redacted requests per hour" />
          <CardBody>
            <MultiArea data={hourlySeries} keys={['allowed', 'blocked', 'redacted']} colors={['#38bdf8', '#f87171', '#a78bfa']} height={240} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Decision mix" subtitle="All requests by final decision" />
          <CardBody>
            <DonutChart data={decisionDonut()} />
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Evaluated requests" subtitle={`${gatewayRequests.length} sample requests from the evaluation stream`} />
        <CardBody>
          <RequestTable rows={gatewayRequests} />
        </CardBody>
      </Card>
    </div>
  );
}
