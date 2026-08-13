import { Activity, AlertTriangle, EyeOff, Gauge, ShieldCheck, ShieldX, Timer, Zap } from 'lucide-react';
import { PageHeader, PrimaryButton, SecondaryButton } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { MultiArea, DonutChart } from '@/components/ui/charts';
import { ModuleNav } from '@/components/governance/module-nav';
import { RequestTable } from '@/components/enforcement/tables';
import { DecisionBadge } from '@/components/enforcement/badges';
import { decisionDonut, fmt, gatewayNavItems, gatewayTotals, policyName, systemName } from '@/components/enforcement/helpers';
import { gatewayRequests, hourlySeries, policies } from '@/lib/mock-data';

export default function Page() {
  const totals = gatewayTotals();
  const blocked = gatewayRequests.filter((r) => r.decision === 'Blocked').slice(0, 6);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="AI Gateway"
        description="Every request to an AI system is evaluated against your policies before a decision is applied."
        actions={[
          <PrimaryButton key="live" href="/gateway/live">Live Requests</PrimaryButton>,
          <SecondaryButton key="keys" href="/gateway/api-keys">API Keys</SecondaryButton>
        ]}
      />
      <ModuleNav items={gatewayNavItems} active="/gateway" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Requests / 24h" value={fmt(totals.requests)} delta={12.4} deltaLabel="vs yesterday" icon={Activity} accent="sky" spark={hourlySeries.map((h) => h.allowed)} />
        <StatCard label="Blocked" value={fmt(totals.blocked)} delta={8.2} deltaLabel="vs yesterday" icon={ShieldX} accent="rose" spark={hourlySeries.map((h) => h.blocked)} />
        <StatCard label="Redacted" value={fmt(totals.redacted)} delta={3.1} deltaLabel="vs yesterday" icon={EyeOff} accent="violet" spark={hourlySeries.map((h) => h.redacted)} />
        <StatCard label="Approval Required" value={fmt(totals.pending)} delta={1.8} deltaLabel="vs yesterday" icon={Timer} accent="amber" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Errors / 24h" value={totals.errors} delta={-4.5} deltaLabel="vs yesterday" icon={AlertTriangle} accent="rose" />
        <StatCard label="Avg Latency" value={`${totals.latency} ms`} delta={-2.1} deltaLabel="vs yesterday" icon={Gauge} accent="cyan" />
        <StatCard label="Tokens / 24h" value={fmt(totals.tokens)} icon={Zap} accent="sky" />
        <StatCard label="Active Policies" value={policies.filter((p) => p.status === 'Active').length} icon={ShieldCheck} accent="green" />
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Traffic & enforcement" subtitle="Requests evaluated per hour — allowed, blocked and redacted" />
          <CardBody>
            <MultiArea data={hourlySeries} keys={['allowed', 'blocked', 'redacted']} colors={['#38bdf8', '#f87171', '#a78bfa']} height={240} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Decisions" subtitle="Share of gateway decisions" />
          <CardBody>
            <DonutChart data={decisionDonut()} />
          </CardBody>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Recent requests" subtitle="Latest evaluated traffic across all systems" />
          <CardBody>
            <RequestTable rows={gatewayRequests} pageSize={8} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Blocked requests" subtitle="Enforcement actions with policy reason" />
          <CardBody className="space-y-3">
            {blocked.map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-white">{r.id} · {systemName(r.systemId)}</p>
                  <p className="mt-0.5 truncate text-[0.65rem] text-slate-500">
                    {r.policyId ? policyName(r.policyId) : 'No policy matched'} · {r.category}
                  </p>
                </div>
                <DecisionBadge label={r.decision} />
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
