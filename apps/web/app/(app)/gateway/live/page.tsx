import { Activity, Radio, ShieldX, Zap } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ModuleNav } from '@/components/governance/module-nav';
import { RequestTable } from '@/components/enforcement/tables';
import { fmt, gatewayNavItems } from '@/components/enforcement/helpers';
import { gatewayRequests } from '@/lib/mock-data';

export default function Page() {
  const newest = Math.max(...gatewayRequests.map((r) => Date.parse(r.timestamp)));
  const lastHour = gatewayRequests.filter((r) => newest - Date.parse(r.timestamp) < 3600000).length;
  const recent = [...gatewayRequests].sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Live Requests"
        description="Real-time view of traffic flowing through the gateway evaluation pipeline."
      />
      <ModuleNav items={gatewayNavItems} active="/gateway/live" />
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-wide text-emerald-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Streaming
        </span>
        <span className="text-[0.65rem] uppercase tracking-wider text-slate-500">Auto-refresh every 5 seconds</span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Last Hour" value={lastHour} icon={Activity} accent="sky" />
        <StatCard label="In Flight" value={Math.round(lastHour * 0.06)} icon={Radio} accent="cyan" />
        <StatCard label="Blocked (Live)" value={recent.filter((r) => r.decision === 'Blocked').length} icon={ShieldX} accent="rose" />
        <StatCard label="Tokens (Live)" value={fmt(recent.slice(0, 10).reduce((a, r) => a + r.tokens, 0))} icon={Zap} accent="amber" />
      </div>
      <Card>
        <CardHeader title="Live stream" subtitle="Newest requests first" action={<Badge label="Realtime" tone="green" />} />
        <CardBody>
          <RequestTable rows={recent} searchPlaceholder="Search live requests..." pageSize={10} />
        </CardBody>
      </Card>
    </div>
  );
}