import { Activity, AlertTriangle, AppWindow, Archive, Radar } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { PageHeader, PrimaryButton, SecondaryButton } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { DonutChart } from '@/components/ui/charts';
import { ApplicationsTable } from '@/components/registry/registry-tables';
import { applications, currentOrg } from '@/lib/mock-data';

const fmt = (n: number) => n.toLocaleString();

export default function Page() {
  const active = applications.filter((a) => a.status === 'Active').length;
  const discovered = applications.filter((a) => a.status === 'Discovered').length;
  const highRisk = applications.filter((a) => a.risk === 'High').length;
  const totalKeys = applications.reduce((a, x) => a + x.apiKeys, 0);

  const statusData = Object.entries(
    applications.reduce<Record<string, number>>((acc, a) => {
      acc[a.status] = (acc[a.status] ?? 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Registry"
        title="Applications"
        description="Every application that consumes AI systems through the gateway, with ownership, risk and key posture."
        actions={
          <>
            <SecondaryButton href="/applications/import">Import Applications</SecondaryButton>
            <PrimaryButton href="/applications/create">Register Application</PrimaryButton>
          </>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Applications" value={applications.length} icon={AppWindow} accent="sky" sub={currentOrg.name} />
        <StatCard label="Active" value={active} icon={Activity} accent="green" />
        <StatCard label="Discovered" value={discovered} icon={Radar} accent="amber" />
        <StatCard label="High Risk" value={highRisk} icon={AlertTriangle} accent="rose" />
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader title="Status Distribution" subtitle="Applications by lifecycle state" />
          <CardBody>
            <DonutChart data={statusData} />
          </CardBody>
        </Card>
        <Card className="xl:col-span-2">
          <CardHeader title="All Applications" subtitle={`${totalKeys} API keys issued across ${applications.length} applications`} />
          <CardBody>
            <ApplicationsTable rows={applications} />
          </CardBody>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader title="Lifecycle" subtitle="Filter by status" />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {(['Active', 'Archived', 'Discovered'] as const).map((s) => (
                <a key={s} href={`/applications/${s === 'Active' ? 'approved' : s.toLowerCase()}`} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[0.7rem] font-semibold text-slate-300 transition hover:border-sentinel-500/40 hover:text-sentinel-300">
                  {s} ({applications.filter((x) => x.status === s).length})
                </a>
              ))}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="AI Consumption" subtitle="Systems attached" />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {[...applications].sort((a, b) => b.aiSystemIds.length - a.aiSystemIds.length).slice(0, 5).map((a) => (
                <a key={a.id} href={`/applications/${a.id}`} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[0.7rem] font-semibold text-slate-300 transition hover:text-sentinel-300">
                  <Archive className="h-3 w-3 text-sentinel-400" /> {a.name} · {a.aiSystemIds.length}
                </a>
              ))}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Key Hygiene" subtitle="API keys in use" />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {[...applications].sort((a, b) => b.apiKeys - a.apiKeys).slice(0, 5).map((a) => (
                <a key={a.id} href={`/applications/${a.id}/api-keys`} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[0.7rem] font-semibold text-slate-300 transition hover:text-sentinel-300">
                  <Activity className="h-3 w-3 text-sentinel-400" /> {a.name} · {a.apiKeys} keys
                </a>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}