import { ScrollText } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { gatewayRequests, models, providers } from '@/lib/mock-data';

type Row = {
  id: string;
  timestamp: string;
  model: string;
  provider: string;
  decision: string;
  category: string;
  latencyMs: number;
  tokens: number;
  ip: string;
};

export default function Page() {
  const rows: Row[] = gatewayRequests.map((r) => ({
    id: r.id,
    timestamp: r.timestamp,
    model: models.find((m) => m.id === r.modelId)?.name ?? r.modelId,
    provider: providers.find((p) => p.id === r.providerId)?.name ?? r.providerId,
    decision: r.decision,
    category: r.category,
    latencyMs: r.latencyMs,
    tokens: r.tokens,
    ip: r.ip
  }));

  const columns: Column<Row>[] = [
    { key: 'id', label: 'Request', render: (r) => <span className="font-mono text-slate-400">{r.id}</span> },
    { key: 'timestamp', label: 'Time', sortValue: (r) => r.timestamp, render: (r) => r.timestamp.slice(11, 16) },
    { key: 'model', label: 'Model' },
    { key: 'provider', label: 'Provider' },
    { key: 'decision', label: 'Decision', tone: (r) => toneForStatus(r.decision) },
    { key: 'category', label: 'Category' },
    { key: 'latencyMs', label: 'Latency', sortValue: (r) => r.latencyMs, render: (r) => `${r.latencyMs}ms` },
    { key: 'tokens', label: 'Tokens', sortValue: (r) => r.tokens, render: (r) => r.tokens.toLocaleString() },
    { key: 'ip', label: 'Source IP', render: (r) => <span className="font-mono text-slate-500">{r.ip}</span> }
  ];

  const blocked = gatewayRequests.filter((r) => r.decision === 'Blocked').length;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Request Logs"
        description="Live gateway decisions for requests made with your API keys."
        actions={<Badge label="Streaming" tone="green" />}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Requests (24h)" value={gatewayRequests.length} icon={ScrollText} accent="sky" sub="In this sample window" />
        <StatCard label="Blocked" value={blocked} icon={ScrollText} accent="rose" sub="Enforced by policy" />
        <StatCard label="Redacted" value={gatewayRequests.filter((r) => r.decision === 'Redacted').length} icon={ScrollText} accent="amber" sub="Sensitive data masked" />
        <StatCard label="Avg Latency" value="912ms" icon={ScrollText} accent="cyan" sub="Across all decisions" />
      </div>

      <Card>
        <CardHeader title="Request log" subtitle="Most recent gateway decisions" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search requests..." pageSize={10} initialSort={{ key: 'timestamp', dir: 'desc' }} />
        </CardBody>
      </Card>
    </div>
  );
}