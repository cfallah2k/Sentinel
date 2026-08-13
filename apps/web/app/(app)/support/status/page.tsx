import { Activity } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress';
import { queueStats, systemJobs } from '@/lib/mock-data';

const services = [
  { name: 'Gateway', status: 'Operational', p99: '42ms', region: 'US-East' },
  { name: 'Redaction engine', status: 'Operational', p99: '38ms', region: 'US-East' },
  { name: 'Audit store', status: 'Operational', p99: '12ms', region: 'US-East' },
  { name: 'Webhook dispatcher', status: 'Operational', p99: '55ms', region: 'US-East' },
  { name: 'Reports worker', status: 'Degraded', p99: '1.2s', region: 'US-East' },
  { name: 'Analytics DB', status: 'Operational', p99: '24ms', region: 'US-East' }
];

export default function Page() {
  const operational = services.filter((s) => s.status === 'Operational').length;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Support"
        title="System Status"
        description="Live health of the Sentinel platform."
        actions={<div className="flex items-center gap-2 text-xs text-emerald-300"><Activity className="h-4 w-4" /> All systems operational</div>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Operational" value={`${operational} / ${services.length}`} icon={Activity} accent="green" sub="Services healthy" />
        <StatCard label="Incidents (30d)" value="2" icon={Activity} accent="amber" sub="Both resolved" />
        <StatCard label="Uptime (90d)" value="99.98%" icon={Activity} accent="sky" sub="SLA 99.9%" />
        <StatCard label="Active queues" value={queueStats.length} icon={Activity} accent="violet" sub="All consuming" />
      </div>

      <Card>
        <CardHeader title="Services" subtitle="Component status right now" />
        <CardBody>
          <div className="space-y-2.5">
            {services.map((s) => (
              <div key={s.name} className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                <div>
                  <p className="text-xs font-semibold text-slate-200">{s.name}</p>
                  <p className="text-[0.65rem] text-slate-500">{s.region} · p99 {s.p99}</p>
                </div>
                <Badge label={s.status} tone={s.status === 'Operational' ? 'green' : 'amber'} />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Queues" subtitle="Worker queue depth and throughput" />
          <CardBody>
            <div className="space-y-4">
              {queueStats.map((q) => (
                <div key={q.name}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-300">{q.name}</span>
                    <span className="text-slate-500">{q.pending} pending · {q.rate} · {q.latencyMs}ms</span>
                  </div>
                  <ProgressBar value={Math.min(100, (q.pending / 1300) * 100)} color={q.pending > 1000 ? 'bg-amber-400' : 'bg-emerald-400'} />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Background jobs" subtitle="Maintenance and report workers" />
          <CardBody>
            <div className="space-y-3">
              {systemJobs.map((j) => (
                <div key={j.id} className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                  <div className="mb-1.5 flex items-center justify-between">
                    <p className="font-mono text-xs text-slate-200">{j.name}</p>
                    <Badge label={j.status} tone={j.status === 'Completed' ? 'green' : j.status === 'Failed' ? 'rose' : j.status === 'Running' ? 'blue' : 'amber'} />
                  </div>
                  <ProgressBar value={j.progress} color={j.status === 'Failed' ? 'bg-rose-400' : 'bg-sky-400'} />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}