import { AlertTriangle, Gauge, ShieldX, Timer } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ModuleNav } from '@/components/governance/module-nav';
import { RequestTable } from '@/components/enforcement/tables';
import { fmt, gatewayLogs, gatewayNavItems, gatewayTotals, modelName } from '@/components/enforcement/helpers';
import { gatewayRequests } from '@/lib/mock-data';

export default function Page() {
  const totals = gatewayTotals();
  const rows = gatewayRequests.filter((r) => r.latencyMs > 2500);
  const errorLogs = gatewayLogs.filter((l) => l.level === 'ERROR' || l.level === 'WARN').slice(0, 6);
  const worstLatency = Math.max(0, ...rows.map((r) => r.latencyMs));

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Gateway Errors"
        description="Requests that failed or timed out during evaluation or upstream transmission."
      />
      <ModuleNav items={gatewayNavItems} active="/gateway/errors" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Errors / 24h" value={totals.errors} delta={-4.5} deltaLabel="vs yesterday" icon={AlertTriangle} accent="rose" />
        <StatCard label="Slow Requests" value={rows.length} icon={Timer} accent="amber" />
        <StatCard label="Worst Latency" value={`${worstLatency} ms`} icon={Gauge} accent="cyan" />
        <StatCard label="Timeout Rate" value="0.4%" icon={ShieldX} accent="sky" />
      </div>
      <Card>
        <CardHeader title="Slow & timed-out requests" subtitle="Latency above the 2.5s timeout threshold" />
        <CardBody>
          <RequestTable rows={rows} searchPlaceholder="Search error requests..." />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Error log" subtitle="Recent ERROR and WARN entries from the gateway" />
        <CardBody className="space-y-2">
          {errorLogs.map((l) => (
            <div key={l.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-xs text-slate-300">{l.message}</p>
                <p className="mt-0.5 text-[0.65rem] text-slate-500">
                  {l.component} · {l.requestId ? `${l.requestId} · ` : ''}{l.timestamp}
                </p>
              </div>
              <Badge label={l.level} tone={l.level === 'ERROR' ? 'rose' : 'amber'} />
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}