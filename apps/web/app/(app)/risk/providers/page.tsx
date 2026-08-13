import { CheckCircle2, Globe, Link2, ShieldAlert, Timer } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { BarSeries } from '@/components/ui/charts';
import { ModuleNav } from '@/components/governance/module-nav';
import { riskNavItems } from '@/components/governance/risk-helpers';
import { providers, gatewayRequests } from '@/lib/mock-data';

export default function Page() {
  const rows = providers.map((p) => ({
    ...p,
    latency: `${p.latencyMs}ms`,
    uptimePct: `${p.uptime.toFixed(1)}%`,
    denied24h: gatewayRequests.filter((r) => r.providerId === p.id && r.decision === 'Blocked').length
  }));
  const approved = providers.filter((p) => p.status === 'Approved').length;
  const restricted = providers.filter((p) => p.status === 'Restricted').length;
  const highRisk = providers.filter((p) => p.risk === 'High').length;
  const avgUptime = Math.round((providers.reduce((s, p) => s + p.uptime, 0) / providers.length) * 10) / 10;
  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'name', label: 'Provider', sortValue: (r) => r.name },
    { key: 'type', label: 'Type', sortValue: (r) => r.type },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> },
    { key: 'risk', label: 'Risk', sortValue: (r) => r.risk, render: (r) => <Badge label={r.risk} tone={toneForStatus(r.risk)} /> },
    { key: 'region', label: 'Region', sortValue: (r) => r.region },
    { key: 'models', label: 'Models', sortValue: (r) => r.models },
    { key: 'requests24h', label: 'Req / 24h', sortValue: (r) => r.requests24h },
    { key: 'denied24h', label: 'Blocked / 24h', sortValue: (r) => r.denied24h },
    { key: 'latency', label: 'Latency', sortValue: (r) => r.latencyMs },
    { key: 'uptimePct', label: 'Uptime', sortValue: (r) => r.uptime }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Governance"
        title="Provider Risk"
        description="Model provider posture — approval state, regions, reliability and request health across the gateway."
      />
      <ModuleNav items={riskNavItems} active="/risk/providers" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Providers" value={providers.length} delta={1} deltaLabel="added this quarter" icon={Link2} accent="sky" />
        <StatCard label="Approved" value={approved} delta={Math.round((approved / providers.length) * 100)} deltaLabel="of providers" icon={CheckCircle2} accent="green" />
        <StatCard label="Restricted" value={restricted} delta={0} deltaLabel="no change" icon={ShieldAlert} accent="rose" />
        <StatCard label="Avg uptime" value={`${avgUptime}%`} delta={1} deltaLabel="rolling 30d" icon={Timer} accent="amber" />
      </div>
      <Card>
        <CardHeader title="Provider register" subtitle="All providers with gateway health" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search providers..." initialSort={{ key: 'requests24h', dir: 'desc' }} />
        </CardBody>
      </Card>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Requests by provider" subtitle="24-hour gateway volume" />
          <CardBody>
            <BarSeries data={providers.map((p) => ({ name: p.name.split(' ')[0], requests: p.requests24h }))} dataKey="requests" color="#38bdf8" height={200} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="High risk providers" subtitle="Providers flagged for review" />
          <CardBody className="space-y-3">
            {providers
              .filter((p) => p.risk === 'High')
              .map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-white">{p.name}</p>
                    <p className="mt-0.5 text-[0.65rem] text-slate-500">
                      {p.type} · {p.region} · {p.requests24h.toLocaleString()} requests / 24h
                    </p>
                  </div>
                  <Badge label={p.risk} tone={toneForStatus(p.risk)} />
                </div>
              ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}