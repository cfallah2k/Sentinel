import { ShieldX, Timer, Activity, AlertTriangle } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ModuleNav } from '@/components/governance/module-nav';
import { RequestTable } from '@/components/enforcement/tables';
import { DecisionBadge } from '@/components/enforcement/badges';
import { fmt, gatewayNavItems, gatewayTotals, policyName, systemName, systemRisk } from '@/components/enforcement/helpers';
import { gatewayRequests } from '@/lib/mock-data';

export default function Page() {
  const totals = gatewayTotals();
  const rows = gatewayRequests.filter((r) => r.decision === 'Blocked');
  const share = Math.round((rows.length / Math.max(1, gatewayRequests.length)) * 100);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Blocked Requests"
        description="Requests terminated at the gateway before reaching the provider."
      />
      <ModuleNav items={gatewayNavItems} active="/gateway/blocked" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Blocked / 24h" value={fmt(totals.blocked)} delta={8.2} deltaLabel="vs yesterday" icon={ShieldX} accent="rose" />
        <StatCard label="Share of traffic" value={`${share}%`} icon={Activity} accent="sky" />
        <StatCard label="High Risk Systems" value={rows.filter((r) => systemRisk(r.systemId) === 'High' || systemRisk(r.systemId) === 'Critical').length} icon={AlertTriangle} accent="amber" />
        <StatCard label="Sample Requests" value={rows.length} icon={Timer} accent="violet" />
      </div>
      <Card>
        <CardHeader title="Blocked requests" subtitle="Each block records the policy that made the decision" />
        <CardBody>
          <RequestTable rows={rows} searchPlaceholder="Search blocked requests..." />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Block reasons" subtitle="Most common policies driving blocks" />
        <CardBody className="space-y-3">
          {rows.slice(0, 6).map((r) => (
            <div key={r.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-white">{systemName(r.systemId)}</p>
                <p className="mt-0.5 truncate text-[0.65rem] text-slate-500">{r.id} · {r.category} · {r.ip}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {r.policyId ? <Badge label={policyName(r.policyId)} tone="slate" /> : <Badge label="No policy" tone="slate" />}
                <DecisionBadge label={r.decision} />
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}
