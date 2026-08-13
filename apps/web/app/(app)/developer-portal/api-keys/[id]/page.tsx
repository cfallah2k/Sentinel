import { notFound } from 'next/navigation';
import { ArrowLeft, KeyRound } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { ScopeList } from '@/components/platform/shared';
import { apiKeys, fmtRelative } from '@/components/platform/developer-data';

type Row = {
  id: string;
  timestamp: string;
  decision: string;
  latencyMs: number;
  tokens: number;
  ip: string;
  category: string;
};

const recentRequests: Row[] = [
  { id: 'req-10032', timestamp: '2026-08-13T09:02:00Z', decision: 'Allowed', latencyMs: 212, tokens: 1840, ip: '10.0.4.22', category: 'Customer' },
  { id: 'req-10031', timestamp: '2026-08-13T08:58:00Z', decision: 'Allowed', latencyMs: 244, tokens: 2102, ip: '10.0.4.22', category: 'Internal' },
  { id: 'req-10030', timestamp: '2026-08-13T08:51:00Z', decision: 'Redacted', latencyMs: 980, tokens: 1204, ip: '10.0.4.22', category: 'PII' },
  { id: 'req-10029', timestamp: '2026-08-13T08:47:00Z', decision: 'Blocked', latencyMs: 41, tokens: 0, ip: '10.0.4.22', category: 'PII' },
  { id: 'req-10028', timestamp: '2026-08-13T08:40:00Z', decision: 'Allowed', latencyMs: 231, tokens: 940, ip: '10.0.4.22', category: 'Public' },
  { id: 'req-10027', timestamp: '2026-08-13T08:35:00Z', decision: 'Allowed', latencyMs: 258, tokens: 3300, ip: '10.0.4.22', category: 'Internal' }
];

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const key = apiKeys.find((k) => k.id === id);
  if (!key) notFound();

  const columns: Column<Row>[] = [
    { key: 'id', label: 'Request', render: (r) => <span className="font-mono text-slate-400">{r.id}</span> },
    { key: 'timestamp', label: 'Time', sortValue: (r) => r.timestamp, render: (r) => fmtRelative(r.timestamp) },
    { key: 'decision', label: 'Decision', tone: (r) => toneForStatus(r.decision) },
    { key: 'category', label: 'Category' },
    { key: 'latencyMs', label: 'Latency', sortValue: (r) => r.latencyMs, render: (r) => `${r.latencyMs}ms` },
    { key: 'tokens', label: 'Tokens', sortValue: (r) => r.tokens, render: (r) => r.tokens.toLocaleString() }
  ];

  return (
    <div className="space-y-6">
      <Link href="/developer-portal/api-keys" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition hover:text-slate-200">
        <ArrowLeft className="h-3.5 w-3.5" /> API Keys
      </Link>
      <PageHeader
        eyebrow="Platform"
        title={key.name}
        description={`API key for ${key.environment.toLowerCase()} environment.`}
        actions={<Badge label={key.status} tone={toneForStatus(key.status)} />}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Key details" />
          <CardBody>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2">
              {[
                { label: 'Key', value: key.prefix },
                { label: 'Created', value: key.created },
                { label: 'Last Used', value: fmtRelative(key.lastUsed) },
                { label: 'Environment', value: key.environment }
              ].map((r) => (
                <div key={r.label} className="bg-slate-950/80 px-4 py-3">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">{r.label}</p>
                  <p className="mt-1 font-mono text-sm text-slate-200">{r.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">Scopes</p>
              <div className="mt-2"><ScopeList scopes={key.scopes} /></div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Usage" subtitle="Rolling 30-day window" />
          <CardBody className="space-y-4">
            <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-sentinel-500/20 bg-sentinel-500/10 text-sentinel-300">
                <KeyRound className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-200">1,284,902 requests</p>
                <p className="text-[0.65rem] text-slate-500">42.8M tokens · $8,412 cost</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Recent requests" subtitle="Last requests made with this key" />
        <CardBody>
          <DataTable columns={columns} rows={recentRequests} searchable={false} pageSize={6} />
        </CardBody>
      </Card>
    </div>
  );
}