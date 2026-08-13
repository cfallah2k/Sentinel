import { Activity, AlertTriangle, Bot, Clock, ShieldCheck } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { PageHeader, PrimaryButton, SecondaryButton } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { DonutChart } from '@/components/ui/charts';
import { SystemsTable } from '@/components/registry/registry-tables';
import { aiSystems, currentOrg } from '@/lib/mock-data';

const fmt = (n: number) => n.toLocaleString();

export default function Page() {
  const approved = aiSystems.filter((s) => s.status === 'Approved').length;
  const pending = aiSystems.filter((s) => s.status === 'Pending').length;
  const highRisk = aiSystems.filter((s) => s.risk === 'High' || s.risk === 'Critical').length;
  const totalRequests = aiSystems.reduce((a, s) => a + s.requests24h, 0);

  const statusData = Object.entries(
    aiSystems.reduce<Record<string, number>>((acc, s) => {
      acc[s.status] = (acc[s.status] ?? 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Registry"
        title="AI Systems"
        description="Inventory of every AI system operating across the organization, with lifecycle status, risk posture and live request volume."
        actions={
          <>
            <SecondaryButton href="/ai-systems/import">Import AI System</SecondaryButton>
            <PrimaryButton href="/ai-systems/create">Register AI System</PrimaryButton>
          </>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Systems" value={aiSystems.length} icon={Bot} accent="sky" sub={currentOrg.name} />
        <StatCard label="Approved" value={approved} icon={ShieldCheck} accent="green" />
        <StatCard label="Pending Review" value={pending} icon={Clock} accent="amber" />
        <StatCard label="High Risk" value={highRisk} icon={AlertTriangle} accent="rose" />
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader title="Status Distribution" subtitle="Systems by lifecycle state" />
          <CardBody>
            <DonutChart data={statusData} />
          </CardBody>
        </Card>
        <Card className="xl:col-span-2">
          <CardHeader
            title="All AI Systems"
            subtitle={`${fmt(totalRequests)} requests routed in the last 24h`}
          />
          <CardBody>
            <SystemsTable rows={aiSystems} />
          </CardBody>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader title="Lifecycle" subtitle="Filter by status" />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {(['Approved', 'Pending', 'Registered', 'Rejected'] as const).map((s) => (
                <a key={s} href={`/ai-systems/${s.toLowerCase()}`} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[0.7rem] font-semibold text-slate-300 transition hover:border-sentinel-500/40 hover:text-sentinel-300">
                  {s} ({aiSystems.filter((x) => x.status === s).length})
                </a>
              ))}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Risk Exposure" subtitle="Systems flagged high risk" />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {aiSystems.filter((s) => s.risk === 'High' || s.risk === 'Critical').map((s) => (
                <a key={s.id} href={`/ai-systems/${s.id}`} className="rounded-full border border-rose-500/25 bg-rose-500/10 px-3.5 py-1.5 text-[0.7rem] font-semibold text-rose-300 transition hover:bg-rose-500/20">
                  {s.name}
                </a>
              ))}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Request Load" subtitle="Top consumers in 24h" />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {[...aiSystems].sort((a, b) => b.requests24h - a.requests24h).slice(0, 5).map((s) => (
                <a key={s.id} href={`/ai-systems/${s.id}`} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[0.7rem] font-semibold text-slate-300 transition hover:text-sentinel-300">
                  <Activity className="h-3 w-3 text-sentinel-400" /> {s.name} · {fmt(s.requests24h)}
                </a>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}