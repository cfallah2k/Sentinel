import { AlertTriangle, Database, Plug, Zap } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { PageHeader, PrimaryButton, SecondaryButton } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { DonutChart } from '@/components/ui/charts';
import { SourcesTable } from '@/components/registry/registry-tables';
import { dataSources } from '@/lib/mock-data';

const fmt = (n: number) => n.toLocaleString();

export default function Page() {
  const connected = dataSources.filter((s) => s.status === 'Connected').length;
  const pending = dataSources.filter((s) => s.status === 'Pending').length;
  const highRisk = dataSources.filter((s) => s.risk === 'High').length;
  const totalRecords = dataSources.reduce((a, s) => a + s.records, 0);

  const statusData = Object.entries(
    dataSources.reduce<Record<string, number>>((acc, s) => {
      acc[s.status] = (acc[s.status] ?? 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Registry"
        title="Data Sources"
        description="Databases, warehouses and SaaS systems that feed AI traffic, with connector health and classification coverage."
        actions={
          <>
            <SecondaryButton href="/data-sources/import">Import Data Sources</SecondaryButton>
            <PrimaryButton href="/data-sources/create">Register Data Source</PrimaryButton>
          </>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Data Sources" value={dataSources.length} icon={Database} accent="sky" />
        <StatCard label="Connected" value={connected} icon={Plug} accent="green" />
        <StatCard label="Pending" value={pending} icon={Zap} accent="amber" />
        <StatCard label="High Risk" value={highRisk} icon={AlertTriangle} accent="rose" />
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader title="Status Distribution" subtitle="Sources by connectivity state" />
          <CardBody>
            <DonutChart data={statusData} />
          </CardBody>
        </Card>
        <Card className="xl:col-span-2">
          <CardHeader title="All Data Sources" subtitle={`${fmt(totalRecords)} records indexed across connected sources`} />
          <CardBody>
            <SourcesTable rows={dataSources} />
          </CardBody>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader title="Connectivity" subtitle="Filter by status" />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {(['Connected', 'Pending', 'Restricted'] as const).map((s) => (
                <a key={s} href={`/data-sources/${s.toLowerCase()}`} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[0.7rem] font-semibold text-slate-300 transition hover:border-sentinel-500/40 hover:text-sentinel-300">
                  {s} ({dataSources.filter((x) => x.status === s).length})
                </a>
              ))}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Connectors" subtitle="Integration types" />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {[...new Set(dataSources.map((s) => s.connector))].map((c) => (
                <span key={c} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[0.7rem] font-semibold text-slate-300">
                  {c}
                </span>
              ))}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Record Volume" subtitle="Largest sources" />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {[...dataSources].sort((a, b) => b.records - a.records).slice(0, 5).map((s) => (
                <a key={s.id} href={`/data-sources/${s.id}`} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[0.7rem] font-semibold text-slate-300 transition hover:text-sentinel-300">
                  <Database className="h-3 w-3 text-sentinel-400" /> {s.name} · {s.records === 0 ? 'Live' : fmt(s.records)}
                </a>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}