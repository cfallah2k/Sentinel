import { Activity, Ban, CircleCheck, FileText, Zap } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { aiSystems, auditLogs, gatewayRequests, hourlySeries, models, providers } from '@/lib/mock-data';

const requests24h = hourlySeries.reduce((s, h) => s + h.allowed + h.blocked + h.redacted + h.pending, 0);
const blocked24h = hourlySeries.reduce((s, h) => s + h.blocked, 0);
const successRate = Math.round((auditLogs.filter((l) => l.result === 'Success').length / auditLogs.length) * 100);

const feed = [...auditLogs].sort((a, b) => b.timestamp.localeCompare(a.timestamp)).slice(0, 10);
const resultTone = (r: string) => (r === 'Success' ? 'green' : r === 'Denied' ? 'rose' : 'amber');

const systemName = new Map(aiSystems.map((s) => [s.id, s.name]));
const providerName = new Map(providers.map((p) => [p.id, p.name]));
const modelName = new Map(models.map((m) => [m.id, m.name]));

const requestRows = [...gatewayRequests]
  .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
  .map((r) => ({
    id: r.id,
    timestamp: r.timestamp,
    system: systemName.get(r.systemId) ?? r.systemId,
    provider: providerName.get(r.providerId) ?? r.providerId,
    model: modelName.get(r.modelId) ?? r.modelId,
    decision: r.decision,
    category: r.category,
    latencyMs: r.latencyMs,
    tokens: r.tokens
  }));
type RequestRow = (typeof requestRows)[number];

const requestColumns: Column<RequestRow>[] = [
  { key: 'id', label: 'Request', render: (r) => <span className="font-mono text-sentinel-300">{r.id}</span> },
  { key: 'timestamp', label: 'Time', render: (r) => r.timestamp.slice(5, 16).replace('T', ' ') },
  { key: 'system', label: 'AI system', render: (r) => <span className="font-medium text-slate-200">{r.system}</span> },
  { key: 'provider', label: 'Provider' },
  { key: 'model', label: 'Model' },
  { key: 'decision', label: 'Decision', tone: (r) => toneForStatus(r.decision) },
  { key: 'category', label: 'Category' },
  { key: 'latencyMs', label: 'Latency', sortValue: (r) => r.latencyMs, render: (r) => `${r.latencyMs}ms` },
  { key: 'tokens', label: 'Tokens', sortValue: (r) => r.tokens, render: (r) => r.tokens.toLocaleString() }
];

export default function Page() {
  return (
    <div>
      <PageHeader
        eyebrow="Activity"
        title="Activity Stream"
        description="Audit events and gateway request activity across the control plane, updated in real time."
      />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Gateway requests 24h" value={requests24h.toLocaleString()} icon={Zap} accent="sky" sub="Across all providers" />
        <StatCard label="Blocked 24h" value={blocked24h.toLocaleString()} icon={Ban} accent="rose" sub="Policy enforcement events" />
        <StatCard label="Audit events 24h" value={auditLogs.length} icon={FileText} accent="cyan" sub="Control plane actions" />
        <StatCard label="Audit success rate" value={`${successRate}%`} icon={CircleCheck} accent="green" sub="Successful operations" />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Audit feed" subtitle="Latest control plane events" />
          <CardBody className="space-y-4">
            {feed.map((log) => (
              <div key={log.id} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400">
                  <Activity size={13} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="break-words text-xs text-slate-200">
                    <span className="font-semibold">{log.actor}</span>{' '}
                    <span className="text-slate-400">{log.action}</span>{' '}
                    <span className="font-mono text-[0.65rem] text-sentinel-300">{log.resource}</span>
                  </p>
                  <p className="mt-0.5 break-words text-[0.65rem] text-slate-500">
                    {log.timestamp.slice(5, 16).replace('T', ' ')} · {log.context} · {log.ip}
                  </p>
                </div>
                <Badge label={log.result} tone={resultTone(log.result)} />
              </div>
            ))}
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Gateway request activity" subtitle={`${gatewayRequests.length} sampled requests, latest first`} />
          <CardBody>
            <DataTable columns={requestColumns} rows={requestRows} searchable={false} pageSize={9} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}