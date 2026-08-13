import { Activity, AlertTriangle, Cpu, Lock } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { PageHeader, PrimaryButton, SecondaryButton } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { DonutChart } from '@/components/ui/charts';
import { ModelsTable } from '@/components/registry/registry-tables';
import { models } from '@/lib/mock-data';

const fmt = (n: number) => n.toLocaleString();

export default function Page() {
  const approved = models.filter((m) => m.status === 'Approved').length;
  const restricted = models.filter((m) => m.status === 'Restricted').length;
  const highRisk = models.filter((m) => m.risk === 'High').length;
  const totalRequests = models.reduce((a, m) => a + m.requests24h, 0);

  const statusData = Object.entries(
    models.reduce<Record<string, number>>((acc, m) => {
      acc[m.status] = (acc[m.status] ?? 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Registry"
        title="Models"
        description="Every model available through the gateway, with provider, modality, context window and request volume."
        actions={
          <>
            <SecondaryButton href="/models/import">Import Models</SecondaryButton>
            <PrimaryButton href="/models/create">Register Model</PrimaryButton>
          </>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Models" value={models.length} icon={Cpu} accent="sky" />
        <StatCard label="Approved" value={approved} icon={Activity} accent="green" />
        <StatCard label="Restricted" value={restricted} icon={Lock} accent="amber" />
        <StatCard label="High Risk" value={highRisk} icon={AlertTriangle} accent="rose" />
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader title="Status Distribution" subtitle="Models by approval state" />
          <CardBody>
            <DonutChart data={statusData} />
          </CardBody>
        </Card>
        <Card className="xl:col-span-2">
          <CardHeader title="All Models" subtitle={`${fmt(totalRequests)} requests in the last 24h`} />
          <CardBody>
            <ModelsTable rows={models} />
          </CardBody>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader title="Approval State" subtitle="Filter by status" />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {(['Approved', 'Restricted'] as const).map((s) => (
                <a key={s} href={`/models/${s.toLowerCase()}`} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[0.7rem] font-semibold text-slate-300 transition hover:border-sentinel-500/40 hover:text-sentinel-300">
                  {s} ({models.filter((x) => x.status === s).length})
                </a>
              ))}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Modalities" subtitle="Model capability classes" />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {[...new Set(models.map((m) => m.modality))].map((mod) => (
                <span key={mod} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[0.7rem] font-semibold text-slate-300">
                  {mod} ({models.filter((x) => x.modality === mod).length})
                </span>
              ))}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Request Load" subtitle="Top models in 24h" />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {[...models].sort((a, b) => b.requests24h - a.requests24h).slice(0, 5).map((m) => (
                <a key={m.id} href={`/models/${m.id}`} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[0.7rem] font-semibold text-slate-300 transition hover:text-sentinel-300">
                  <Activity className="h-3 w-3 text-sentinel-400" /> {m.name} · {fmt(m.requests24h)}
                </a>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}