import { PageHeader } from '@/components/ui/page-header';
import { AdminShell } from '@/components/admin/page-shell';
import { StatCard } from '@/components/ui/stat-card';
import { QueuesTable, queueLoad } from '@/components/admin/sections';
import { Layers, Loader2, Gauge, Timer } from 'lucide-react';
import { queueStats } from '@/lib/mock-data';

export default function Page() {
  const totalPending = queueStats.reduce((s, q) => s + q.pending, 0);
  const totalActive = queueStats.reduce((s, q) => s + q.active, 0);
  const maxLoad = Math.max(...queueStats.map((q) => queueLoad(q)));
  const avgLatency = Math.round(queueStats.reduce((s, q) => s + q.latencyMs, 0) / queueStats.length);
  return (
    <AdminShell>
      <PageHeader
        eyebrow="Admin"
        title="Queues"
        description="Message queues and their throughput across the platform."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pending Messages" value={totalPending} icon={Layers} accent="sky" />
        <StatCard label="Active" value={totalActive} icon={Loader2} accent="cyan" />
        <StatCard label="Max Queue Load" value={`${maxLoad}%`} icon={Gauge} accent="violet" />
        <StatCard label="Avg Latency" value={`${avgLatency}ms`} icon={Timer} accent="green" />
      </div>
      <QueuesTable rows={queueStats} title="Queue State" subtitle="Pending, active, rate, and latency per queue" />
    </AdminShell>
  );
}