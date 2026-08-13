import { Coins, Gauge, Layers, Zap } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { AreaTrend, BarSeries } from '@/components/ui/charts';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { gatewayRequests, hourlySeries, models, providers, usageByApp, usageByProvider } from '@/lib/mock-data';

const totalRequests = hourlySeries.reduce((s, h) => s + h.allowed + h.blocked + h.redacted + h.pending, 0);
const totalTokens = gatewayRequests.reduce((s, r) => s + r.tokens, 0);
const estCost = usageByApp.reduce((s, a) => s + a.cost, 0);
const avgLatency = Math.round(hourlySeries.reduce((s, h) => s + h.latency, 0) / hourlySeries.length);

const hourlyTotal = hourlySeries.map((h) => ({ hour: h.hour, total: h.allowed + h.blocked + h.redacted + h.pending }));

const providerName = new Map(providers.map((p) => [p.id, p.name]));

const modelRows = [...models]
  .sort((a, b) => b.requests24h - a.requests24h)
  .map((m) => ({
    id: m.id,
    name: m.name,
    provider: providerName.get(m.providerId) ?? m.providerId,
    modality: m.modality,
    status: m.status,
    risk: m.risk,
    contextWindow: m.contextWindow,
    requests24h: m.requests24h
  }));
type ModelRow = (typeof modelRows)[number];

const modelColumns: Column<ModelRow>[] = [
  { key: 'name', label: 'Model', render: (r) => <span className="font-medium text-slate-200">{r.name}</span> },
  { key: 'provider', label: 'Provider' },
  { key: 'modality', label: 'Modality' },
  { key: 'status', label: 'Status', tone: (r) => toneForStatus(r.status) },
  { key: 'risk', label: 'Risk', tone: (r) => toneForStatus(r.risk) },
  { key: 'contextWindow', label: 'Context' },
  { key: 'requests24h', label: 'Requests 24h', sortValue: (r) => r.requests24h, render: (r) => r.requests24h.toLocaleString() }
];

export default function Page() {
  return (
    <div>
      <PageHeader
        eyebrow="AI Usage"
        title="AI Usage Analytics"
        description="How your organization consumes AI — requests, tokens, and spend broken down by application, provider, and model."
      />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Requests 24h" value={totalRequests.toLocaleString()} delta={12} deltaLabel="vs yesterday" icon={Zap} accent="sky" spark={hourlyTotal.map((h) => h.total)} sub="Across all providers" />
        <StatCard label="Tokens 24h" value={totalTokens.toLocaleString()} icon={Layers} accent="cyan" sub={`From ${gatewayRequests.length} sampled calls`} />
        <StatCard label="Est. monthly spend" value={`$${estCost.toLocaleString()}`} delta={8} deltaLabel="vs last month" icon={Coins} accent="violet" sub="Across top applications" />
        <StatCard label="Avg latency" value={`${avgLatency}ms`} icon={Gauge} accent="green" sub="24h rolling mean" />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Requests by application" subtitle="Last 24h request volume" />
          <CardBody>
            <BarSeries data={usageByApp} dataKey="requests" color="#38bdf8" height={200} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Requests by provider" subtitle="Last 24h request volume" />
          <CardBody>
            <BarSeries data={usageByProvider} dataKey="requests" color="#a78bfa" height={200} />
          </CardBody>
        </Card>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader title="Hourly request volume" subtitle="Total gateway requests per hour" />
          <CardBody>
            <AreaTrend data={hourlyTotal} dataKey="total" xKey="hour" color="#34d399" height={200} />
          </CardBody>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader title="Model usage" subtitle="Requests per model, last 24h" />
          <CardBody>
            <DataTable columns={modelColumns} rows={modelRows} searchable={false} pageSize={8} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}