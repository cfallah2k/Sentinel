import { AdminShell } from '@/components/admin/page-shell';
import { SystemShell } from '@/components/admin/system-shell';
import { StatusDot } from '@/components/admin/infra';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress';

export default function Page() {
  return (
    <AdminShell>
      <SystemShell active="cache">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader title="Cache Health" subtitle="Redis cluster across regions" />
            <CardBody className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">Hit rate</span>
                  <span className="font-semibold text-white">94.2%</span>
                </div>
                <div className="mt-1.5">
                  <ProgressBar value={94.2} color="bg-emerald-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">Memory utilization</span>
                  <span className="font-semibold text-white">61%</span>
                </div>
                <div className="mt-1.5">
                  <ProgressBar value={61} color="bg-sky-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">Evictions</span>
                  <span className="font-semibold text-white">2.1 / min</span>
                </div>
                <div className="mt-1.5">
                  <ProgressBar value={12} color="bg-amber-400" />
                </div>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Cache Nodes" subtitle="Cluster members and their state" />
            <CardBody className="space-y-3">
              {[
                { name: 'redis-cache-01', region: 'us-east-1', status: 'Healthy', tone: 'green' as const },
                { name: 'redis-cache-02', region: 'us-east-1', status: 'Healthy', tone: 'green' as const },
                { name: 'redis-cache-03', region: 'eu-west-1', status: 'Healthy', tone: 'green' as const },
                { name: 'redis-cache-04', region: 'ap-southeast-1', status: 'Degraded', tone: 'amber' as const }
              ].map((n) => (
                <div key={n.name} className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3 text-xs">
                  <StatusDot tone={n.tone} />
                  <span className="font-mono text-sky-300">{n.name}</span>
                  <span className="text-slate-400">{n.region}</span>
                  <span className={`ml-auto font-medium ${n.tone === 'green' ? 'text-emerald-300' : 'text-amber-300'}`}>{n.status}</span>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </SystemShell>
    </AdminShell>
  );
}