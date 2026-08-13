import { AdminShell } from '@/components/admin/page-shell';
import { SystemShell } from '@/components/admin/system-shell';
import { InfraIconCards, MetricCards, StatusDot } from '@/components/admin/infra';
import { Card, CardBody, CardHeader } from '@/components/ui/card';

export default function Page() {
  return (
    <AdminShell>
      <SystemShell active="health">
        <InfraIconCards />
        <MetricCards />
        <Card>
          <CardHeader title="Service Health Checks" subtitle="Last probe results across all services" />
          <CardBody>
            <div className="space-y-3">
              {[
                { name: 'Gateway API', status: 'Operational', tone: 'green' as const, detail: 'p95 84ms · uptime 99.99%' },
                { name: 'Policy Engine', status: 'Operational', tone: 'green' as const, detail: '410 req/s · uptime 99.99%' },
                { name: 'Audit Stream', status: 'Degraded', tone: 'amber' as const, detail: 'write lag 2.1s · investigating' },
                { name: 'Report Generator', status: 'Degraded', tone: 'amber' as const, detail: 'queue backlog 7 jobs' },
                { name: 'Provider Health Checker', status: 'Down', tone: 'rose' as const, detail: 'last probe failed 08:20Z · paging on-call' }
              ].map((s) => (
                <div key={s.name} className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3 text-xs">
                  <StatusDot tone={s.tone} />
                  <span className="font-semibold text-white">{s.name}</span>
                  <span className={`font-medium ${s.tone === 'green' ? 'text-emerald-300' : s.tone === 'amber' ? 'text-amber-300' : 'text-rose-300'}`}>{s.status}</span>
                  <span className="ml-auto text-slate-400">{s.detail}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </SystemShell>
    </AdminShell>
  );
}