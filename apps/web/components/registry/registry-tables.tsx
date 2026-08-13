import Link from 'next/link';
import { toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { aiSystems, applications, dataSources, models, providers } from '@/lib/mock-data';
import type { AiSystem, Application, DataSource, Model, Provider } from '@/lib/mock-data';

function linkCell(href: string, label: string) {
  return (
    <Link href={href} className="font-medium text-sentinel-300 transition hover:text-sentinel-200 hover:underline">
      {label}
    </Link>
  );
}

const fmt = (n: number) => n.toLocaleString();

const providerName = (id: string) => providers.find((p) => p.id === id)?.name ?? id;
const modelName = (id: string) => models.find((m) => m.id === id)?.name ?? id;

export function SystemsTable({ rows }: { rows: AiSystem[] }) {
  const columns: Column<AiSystem>[] = [
    { key: 'name', label: 'System', sortValue: (r) => r.name, render: (r) => linkCell(`/ai-systems/${r.id}`, r.name) },
    { key: 'type', label: 'Type', sortValue: (r) => r.type },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, tone: (r) => toneForStatus(r.status) },
    { key: 'risk', label: 'Risk', sortValue: (r) => r.risk, tone: (r) => toneForStatus(r.risk) },
    { key: 'owner', label: 'Owner', sortValue: (r) => r.owner },
    { key: 'providerId', label: 'Provider', sortValue: (r) => providerName(r.providerId), render: (r) => <span className="text-slate-200">{providerName(r.providerId)}</span> },
    { key: 'requests24h', label: 'Requests / 24h', sortValue: (r) => r.requests24h, render: (r) => <span className="text-slate-200">{fmt(r.requests24h)}</span> },
    { key: 'lastActivity', label: 'Last Activity', sortValue: (r) => r.lastActivity, render: (r) => <span className="whitespace-nowrap text-slate-500">{r.lastActivity}</span> }
  ];
  return <DataTable columns={columns} rows={rows} searchPlaceholder="Search systems..." initialSort={{ key: 'name', dir: 'asc' }} />;
}

export function ApplicationsTable({ rows }: { rows: Application[] }) {
  const columns: Column<Application>[] = [
    { key: 'name', label: 'Application', sortValue: (r) => r.name, render: (r) => linkCell(`/applications/${r.id}`, r.name) },
    { key: 'type', label: 'Type', sortValue: (r) => r.type },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, tone: (r) => toneForStatus(r.status) },
    { key: 'risk', label: 'Risk', sortValue: (r) => r.risk, tone: (r) => toneForStatus(r.risk) },
    { key: 'owner', label: 'Owner', sortValue: (r) => r.owner },
    { key: 'aiSystemIds', label: 'AI Systems', sortValue: (r) => r.aiSystemIds.length, render: (r) => <span className="text-slate-200">{r.aiSystemIds.length}</span> },
    { key: 'apiKeys', label: 'API Keys', sortValue: (r) => r.apiKeys, render: (r) => <span className="text-slate-200">{r.apiKeys}</span> },
    { key: 'lastActivity', label: 'Last Activity', sortValue: (r) => r.lastActivity, render: (r) => <span className="whitespace-nowrap text-slate-500">{r.lastActivity}</span> }
  ];
  return <DataTable columns={columns} rows={rows} searchPlaceholder="Search applications..." initialSort={{ key: 'name', dir: 'asc' }} />;
}

export function ProvidersTable({ rows }: { rows: Provider[] }) {
  const columns: Column<Provider>[] = [
    { key: 'name', label: 'Provider', sortValue: (r) => r.name, render: (r) => linkCell(`/providers/${r.id}`, r.name) },
    { key: 'type', label: 'Type', sortValue: (r) => r.type },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, tone: (r) => toneForStatus(r.status) },
    { key: 'region', label: 'Region', sortValue: (r) => r.region },
    { key: 'models', label: 'Models', sortValue: (r) => r.models, render: (r) => <span className="text-slate-200">{r.models}</span> },
    { key: 'requests24h', label: 'Requests / 24h', sortValue: (r) => r.requests24h, render: (r) => <span className="text-slate-200">{fmt(r.requests24h)}</span> },
    { key: 'latencyMs', label: 'Latency', sortValue: (r) => r.latencyMs, render: (r) => <span className="text-slate-200">{r.latencyMs} ms</span> },
    { key: 'uptime', label: 'Uptime', sortValue: (r) => r.uptime, render: (r) => <span className="text-slate-200">{r.uptime.toFixed(2)}%</span> },
    { key: 'risk', label: 'Risk', sortValue: (r) => r.risk, tone: (r) => toneForStatus(r.risk) }
  ];
  return <DataTable columns={columns} rows={rows} searchPlaceholder="Search providers..." initialSort={{ key: 'name', dir: 'asc' }} />;
}

export function ModelsTable({ rows }: { rows: Model[] }) {
  const columns: Column<Model>[] = [
    { key: 'name', label: 'Model', sortValue: (r) => r.name, render: (r) => linkCell(`/models/${r.id}`, r.name) },
    { key: 'providerId', label: 'Provider', sortValue: (r) => providerName(r.providerId), render: (r) => <span className="text-slate-200">{providerName(r.providerId)}</span> },
    { key: 'modality', label: 'Modality', sortValue: (r) => r.modality },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, tone: (r) => toneForStatus(r.status) },
    { key: 'risk', label: 'Risk', sortValue: (r) => r.risk, tone: (r) => toneForStatus(r.risk) },
    { key: 'contextWindow', label: 'Context', sortValue: (r) => r.contextWindow, render: (r) => <span className="text-slate-200">{r.contextWindow}</span> },
    { key: 'pricing', label: 'Pricing', render: (r) => <span className="text-slate-400">{r.pricing}</span> },
    { key: 'requests24h', label: 'Requests / 24h', sortValue: (r) => r.requests24h, render: (r) => <span className="text-slate-200">{fmt(r.requests24h)}</span> }
  ];
  return <DataTable columns={columns} rows={rows} searchPlaceholder="Search models..." initialSort={{ key: 'name', dir: 'asc' }} />;
}

export function SourcesTable({ rows }: { rows: DataSource[] }) {
  const columns: Column<DataSource>[] = [
    { key: 'name', label: 'Source', sortValue: (r) => r.name, render: (r) => linkCell(`/data-sources/${r.id}`, r.name) },
    { key: 'type', label: 'Type', sortValue: (r) => r.type },
    { key: 'connector', label: 'Connector', sortValue: (r) => r.connector, render: (r) => <span className="font-mono text-slate-400">{r.connector}</span> },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, tone: (r) => toneForStatus(r.status) },
    { key: 'categories', label: 'Categories', render: (r) => <span className="text-slate-400">{r.categories.join(', ')}</span> },
    { key: 'records', label: 'Records', sortValue: (r) => r.records, render: (r) => <span className="text-slate-200">{r.records === 0 ? 'Live' : fmt(r.records)}</span> },
    { key: 'lastSync', label: 'Last Sync', sortValue: (r) => r.lastSync, render: (r) => <span className="whitespace-nowrap text-slate-500">{r.lastSync}</span> },
    { key: 'risk', label: 'Risk', sortValue: (r) => r.risk, tone: (r) => toneForStatus(r.risk) }
  ];
  return <DataTable columns={columns} rows={rows} searchPlaceholder="Search data sources..." initialSort={{ key: 'name', dir: 'asc' }} />;
}

export { aiSystems, applications, models, providers, dataSources, modelName, providerName, fmt };