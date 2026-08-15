import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress';
import { StatCard } from '@/components/ui/stat-card';
import { BarSeries } from '@/components/ui/charts';
import type { LucideIcon } from 'lucide-react';
import { Activity, Database, HardDrive, ServerCog, ShieldCheck, Zap } from 'lucide-react';
import { auditLogs, systemMetrics } from '@/lib/mock-data';

export const infraNav = [
  { href: 'health', label: 'Health' },
  { href: 'services', label: 'Services' },
  { href: 'database', label: 'Database' },
  { href: 'cache', label: 'Cache' },
  { href: 'queues', label: 'Queues' },
  { href: 'workers', label: 'Workers' },
  { href: 'providers', label: 'Providers' },
  { href: 'storage', label: 'Storage' },
  { href: 'metrics', label: 'Metrics' },
  { href: 'logs', label: 'Logs' }
];

export function MetricCards() {
  const iconFor: Record<string, LucideIcon> = {
    CPU: ServerCog,
    Memory: Database,
    'Disk I/O': HardDrive,
    Network: Activity
  };
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {systemMetrics.map((m) => (
        <StatCard key={m.label} label={m.label} value={`${m.value}%`} icon={iconFor[m.label]} accent={m.value > 70 ? 'rose' : m.value > 50 ? 'amber' : 'green'} spark={m.series} sub="24h rolling average" />
      ))}
    </div>
  );
}

const dotTone: Record<string, string> = {
  green: 'bg-emerald-400',
  amber: 'bg-amber-400',
  rose: 'bg-rose-400'
};

export function StatusDot({ tone }: { tone: 'green' | 'amber' | 'rose' }) {
  return <span className={`h-2 w-2 shrink-0 rounded-full ${dotTone[tone]}`} />;
}

export const defaultServices = [
  { name: 'Gateway API', status: 'Operational', tone: 'green' as const, detail: 'p95 84ms' },
  { name: 'Policy Engine', status: 'Operational', tone: 'green' as const, detail: 'evaluating 410 req/s' },
  { name: 'Redaction Service', status: 'Operational', tone: 'green' as const, detail: 'v2 transformer active' },
  { name: 'Audit Stream', status: 'Degraded', tone: 'amber' as const, detail: 'write lag 2.1s' },
  { name: 'Notification Worker', status: 'Operational', tone: 'green' as const, detail: '30 msg/s' },
  { name: 'Report Generator', status: 'Degraded', tone: 'amber' as const, detail: 'queue backlog 7 jobs' },
  { name: 'Incident Escalator', status: 'Operational', tone: 'green' as const, detail: 'SLA checks on time' },
  { name: 'Provider Health Checker', status: 'Down', tone: 'rose' as const, detail: 'last probe failed 08:20Z' }
];

export function ServiceList({ services = defaultServices }: { services?: { name: string; status: string; tone: 'green' | 'amber' | 'rose'; detail: string }[] }) {
  return (
    <div className="divide-y divide-white/5">
      {services.map((s) => (
        <div key={s.name} className="flex flex-wrap items-center gap-x-3 gap-y-1 px-5 py-3.5 text-xs sm:px-6">
          <StatusDot tone={s.tone} />
          <span className="min-w-0 flex-1 truncate font-semibold text-white">{s.name}</span>
          <span className={`shrink-0 font-medium ${s.tone === 'green' ? 'text-emerald-300' : s.tone === 'amber' ? 'text-amber-300' : 'text-rose-300'}`}>{s.status}</span>
          <span className="shrink-0 text-slate-400">{s.detail}</span>
        </div>
      ))}
    </div>
  );
}

export function MetricBar({ label, value, detail }: { label: string; value: number; detail: string }) {
  return (
    <div className="px-5 py-4 sm:px-6">
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="font-semibold text-white">{label}</span>
        <span className="text-slate-400">{detail}</span>
      </div>
      <div className="mt-2">
        <ProgressBar value={value} color={value > 75 ? 'bg-rose-400' : value > 50 ? 'bg-amber-400' : 'bg-emerald-400'} />
      </div>
    </div>
  );
}

export function QueueOverview() {
  return (
    <Card>
      <CardHeader title="Queue Throughput" subtitle="24h aggregated queue activity" />
      <CardBody>
        <BarSeries data={[{ name: 'gateway', value: 214 }, { name: 'redaction', value: 62 }, { name: 'audit', value: 1240 }, { name: 'notify', value: 41 }, { name: 'reports', value: 7 }, { name: 'incidents', value: 3 }]} dataKey="value" height={180} />
      </CardBody>
    </Card>
  );
}

export const defaultWorkers = [
  { name: 'gateway-eval-worker', queue: 'gateway-eval', jobs: 6, status: 'healthy', tone: 'green' as const },
  { name: 'redaction-worker', queue: 'redaction', jobs: 3, status: 'healthy', tone: 'green' as const },
  { name: 'audit-writer', queue: 'audit-write', jobs: 8, status: 'lagging', tone: 'amber' as const },
  { name: 'notification-sender', queue: 'notifications', jobs: 2, status: 'healthy', tone: 'green' as const },
  { name: 'report-builder', queue: 'reports', jobs: 1, status: 'healthy', tone: 'green' as const },
  { name: 'incident-escalator', queue: 'incidents', jobs: 1, status: 'healthy', tone: 'green' as const }
];

export function WorkerList({ workers = defaultWorkers }: { workers?: { name: string; queue: string; jobs: number; status: string; tone: 'green' | 'amber' | 'rose' }[] }) {
  return (
    <div className="divide-y divide-white/5">
      {workers.map((w) => (
        <div key={w.name} className="flex flex-wrap items-center gap-x-3 gap-y-1 px-5 py-3.5 text-xs sm:px-6">
          <StatusDot tone={w.tone} />
          <span className="min-w-0 flex-1 truncate font-mono text-sky-300">{w.name}</span>
          <span className="shrink-0 text-slate-400">{w.queue}</span>
          <span className="ml-auto shrink-0 text-slate-400">{w.jobs} active jobs</span>
          <span className={`shrink-0 font-medium ${w.tone === 'green' ? 'text-emerald-300' : w.tone === 'amber' ? 'text-amber-300' : 'text-rose-300'}`}>{w.status}</span>
        </div>
      ))}
    </div>
  );
}

export function LogFeed({ rows = 18 }: { rows?: number }) {
  const lines = auditLogs.slice(0, rows).map((l) => ({
    time: l.timestamp,
    level: l.result === 'Error' ? 'ERROR' : l.result === 'Denied' ? 'WARN' : 'INFO',
    source: l.context,
    message: `${l.action} on ${l.resource} by ${l.actor}`
  }));
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[640px] space-y-1 px-5 py-4 sm:px-6">
        {lines.map((l, i) => (
          <div key={i} className="flex items-baseline gap-3 font-mono text-[0.7rem] leading-6">
            <span className="shrink-0 text-slate-500">{l.time}</span>
            <span className={`w-12 shrink-0 font-semibold ${l.level === 'ERROR' ? 'text-rose-400' : l.level === 'WARN' ? 'text-amber-400' : 'text-emerald-400'}`}>{l.level}</span>
            <span className="shrink-0 text-slate-500">{l.source}</span>
            <span className="truncate text-slate-300">{l.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StorageBreakdown() {
  const rows = [
    { label: 'Gateway request logs', value: 1420, tone: 'bg-sky-400' },
    { label: 'Audit trail archive', value: 890, tone: 'bg-violet-400' },
    { label: 'Redaction cache', value: 340, tone: 'bg-amber-400' },
    { label: 'Report artifacts', value: 210, tone: 'bg-emerald-400' },
    { label: 'Queue payloads', value: 96, tone: 'bg-rose-400' }
  ];
  const total = rows.reduce((s, r) => s + r.value, 0);
  return (
    <div className="space-y-4">
      {rows.map((r) => (
        <div key={r.label}>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300">{r.label}</span>
            <span className="text-slate-400">{r.value} GB</span>
          </div>
          <div className="mt-1.5">
            <ProgressBar value={(r.value / total) * 100} color={r.tone} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function InfraIconCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="DB Connections" value="184" icon={Database} accent="cyan" sub="pool 200 max" />
      <StatCard label="Cache Hits" value="94.2%" icon={Zap} accent="violet" sub="redis 3.1ms" />
      <StatCard label="Health Score" value="98.4%" icon={ShieldCheck} accent="green" sub="last 30 days" />
      <StatCard label="Error Rate" value="0.04%" icon={Activity} accent="amber" sub="gateway p95" />
    </div>
  );
}