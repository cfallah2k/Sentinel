import { Bot, Radar, Search, Server, Workflow } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { SystemsTable } from '@/components/registry/registry-tables';
import { aiSystems } from '@/lib/mock-data';

const fmt = (n: number) => n.toLocaleString();

export default function Page() {
  const rows = aiSystems.filter((s) => s.status !== 'Approved');
  const requests = rows.reduce((a, s) => a + s.requests24h, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Registry · AI Systems"
        title="Discover AI Systems"
        description="Systems surfaced through telemetry, shadow-AI scans and self-registration that have not yet completed governance approval."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Discovered" value={rows.length} icon={Radar} accent="sky" />
        <StatCard label="Pending" value={rows.filter((s) => s.status === 'Pending').length} icon={Search} accent="amber" />
        <StatCard label="Registered" value={rows.filter((s) => s.status === 'Registered').length} icon={Workflow} accent="cyan" />
        <StatCard label="Requests / 24h" value={fmt(requests)} icon={Bot} accent="violet" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader title="Gateway Telemetry" subtitle="Automatic detection" />
          <CardBody>
            <p className="text-xs leading-5 text-slate-400">
              Requests routed to unregistered endpoints are flagged and attributed to a candidate system record.
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.65rem] font-semibold text-slate-300">
              <Server className="h-3 w-3 text-sentinel-400" /> {rows.length} candidates in queue
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Shadow AI Scan" subtitle="Weekly sweep" />
          <CardBody>
            <p className="text-xs leading-5 text-slate-400">
              Scans code repositories and browser telemetry for AI usage that bypasses the gateway.
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.65rem] font-semibold text-slate-300">
              <Search className="h-3 w-3 text-sentinel-400" /> Last sweep 2026-08-13
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Self-Registration" subtitle="Developer workflow" />
          <CardBody>
            <p className="text-xs leading-5 text-slate-400">
              Developers register new systems before production rollout; records flow into the approval queue.
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.65rem] font-semibold text-slate-300">
              <Workflow className="h-3 w-3 text-sentinel-400" /> SLA review &lt; 48h
            </p>
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Discovered AI Systems" subtitle="Not yet approved for production" />
        <CardBody>
          <SystemsTable rows={rows} />
        </CardBody>
      </Card>
    </div>
  );
}