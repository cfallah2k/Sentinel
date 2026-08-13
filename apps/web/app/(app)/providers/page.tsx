import { Activity, AlertTriangle, Gauge, Server } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { PageHeader, PrimaryButton, SecondaryButton } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { DonutChart } from '@/components/ui/charts';
import { ProvidersTable } from '@/components/registry/registry-tables';
import { providers } from '@/lib/mock-data';

const fmt = (n: number) => n.toLocaleString();

export default function Page() {
  const approved = providers.filter((p) => p.status === 'Approved').length;
  const pending = providers.filter((p) => p.status === 'Pending').length;
  const highRisk = providers.filter((p) => p.risk === 'High').length;
  const totalRequests = providers.reduce((a, p) => a + p.requests24h, 0);

  const statusData = Object.entries(
    providers.reduce<Record<string, number>>((acc, p) => {
      acc[p.status] = (acc[p.status] ?? 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Registry"
        title="Providers"
        description="External and internal model providers routed through the gateway, with health, latency and risk posture."
        actions={
          <>
            <SecondaryButton href="/providers/import">Import Providers</SecondaryButton>
            <PrimaryButton href="/providers/create">Register Provider</PrimaryButton>
          </>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Providers" value={providers.length} icon={Server} accent="sky" />
        <StatCard label="Approved" value={approved} icon={Activity} accent="green" />
        <StatCard label="Pending" value={pending} icon={Gauge} accent="amber" />
        <StatCard label="High Risk" value={highRisk} icon={AlertTriangle} accent="rose" />
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader title="Status Distribution" subtitle="Providers by approval state" />
          <CardBody>
            <DonutChart data={statusData} />
          </CardBody>
        </Card>
        <Card className="xl:col-span-2">
          <CardHeader title="All Providers" subtitle={`${fmt(totalRequests)} requests routed in the last 24h`} />
          <CardBody>
            <ProvidersTable rows={providers} />
          </CardBody>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader title="Approval State" subtitle="Filter by status" />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {(['Approved', 'Pending', 'Restricted'] as const).map((s) => (
                <a key={s} href={`/providers/${s.toLowerCase()}`} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[0.7rem] font-semibold text-slate-300 transition hover:border-sentinel-500/40 hover:text-sentinel-300">
                  {s} ({providers.filter((x) => x.status === s).length})
                </a>
              ))}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Request Volume" subtitle="Top providers in 24h" />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {[...providers].sort((a, b) => b.requests24h - a.requests24h).slice(0, 5).map((p) => (
                <a key={p.id} href={`/providers/${p.id}`} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[0.7rem] font-semibold text-slate-300 transition hover:text-sentinel-300">
                  <Activity className="h-3 w-3 text-sentinel-400" /> {p.name} · {fmt(p.requests24h)}
                </a>
              ))}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Latency" subtitle="Slowest provider in 24h" />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {[...providers].sort((a, b) => b.latencyMs - a.latencyMs).slice(0, 5).map((p) => (
                <a key={p.id} href={`/providers/${p.id}`} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[0.7rem] font-semibold text-slate-300 transition hover:text-sentinel-300">
                  <Gauge className="h-3 w-3 text-sentinel-400" /> {p.name} · {p.latencyMs} ms
                </a>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}