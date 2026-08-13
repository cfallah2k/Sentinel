import { AdminShell } from '@/components/admin/page-shell';
import { SystemShell } from '@/components/admin/system-shell';
import { MetricBar, StatusDot } from '@/components/admin/infra';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress';

export default function Page() {
  return (
    <AdminShell>
      <SystemShell active="database">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader title="Database Metrics" subtitle="Primary control plane database" />
            <CardBody className="p-0 divide-y divide-white/5">
              <MetricBar label="Connections" value={72} detail="184 / 200 pool" />
              <MetricBar label="Query Latency p95" value={34} detail="12ms" />
              <MetricBar label="Replication Lag" value={18} detail="0.4s" />
              <MetricBar label="Storage" value={58} detail="41 / 70 GB" />
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Replica Status" subtitle="Read replicas across regions" />
            <CardBody className="space-y-3">
              {[
                { region: 'us-east-1 (primary)', status: 'Healthy', tone: 'green' as const, lag: 0 },
                { region: 'eu-west-1', status: 'Healthy', tone: 'green' as const, lag: 0.2 },
                { region: 'ap-southeast-1', status: 'Healthy', tone: 'green' as const, lag: 0.3 },
                { region: 'us-west-2', status: 'Degraded', tone: 'amber' as const, lag: 2.4 }
              ].map((r) => (
                <div key={r.region} className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3 text-xs">
                  <StatusDot tone={r.tone} />
                  <span className="font-semibold text-white">{r.region}</span>
                  <span className={`font-medium ${r.tone === 'green' ? 'text-emerald-300' : 'text-amber-300'}`}>{r.status}</span>
                  <span className="ml-auto text-slate-400">{r.lag}s lag</span>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </SystemShell>
    </AdminShell>
  );
}