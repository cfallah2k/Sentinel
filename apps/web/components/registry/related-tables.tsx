import Link from 'next/link';
import { toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { maskKey } from './helpers';
import type { Approval, DataFlow, Incident, Policy } from '@/lib/mock-data';

const fmt = (n: number) => n.toLocaleString();

export function IncidentsTable({ rows }: { rows: Incident[] }) {
  const columns: Column<Incident>[] = [
    { key: 'id', label: 'Incident', sortValue: (r) => r.id, render: (r) => <Link href={`/incidents/${r.id}`} className="font-medium text-sentinel-300 transition hover:text-sentinel-200 hover:underline">{r.id}</Link> },
    { key: 'title', label: 'Title', sortValue: (r) => r.title },
    { key: 'severity', label: 'Severity', sortValue: (r) => r.severity, tone: (r) => toneForStatus(r.severity) },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, tone: (r) => toneForStatus(r.status) },
    { key: 'type', label: 'Type', sortValue: (r) => r.type },
    { key: 'assignee', label: 'Assignee', sortValue: (r) => r.assignee },
    { key: 'openedAt', label: 'Opened', sortValue: (r) => r.openedAt, render: (r) => <span className="whitespace-nowrap text-slate-500">{r.openedAt}</span> }
  ];
  return <DataTable columns={columns} rows={rows} searchPlaceholder="Search incidents..." initialSort={{ key: 'openedAt', dir: 'desc' }} />;
}

export function FlowsTable({ rows }: { rows: DataFlow[] }) {
  const columns: Column<DataFlow>[] = [
    { key: 'id', label: 'Flow', sortValue: (r) => r.id },
    { key: 'source', label: 'Source', sortValue: (r) => r.source },
    { key: 'category', label: 'Category', sortValue: (r) => r.category },
    { key: 'decision', label: 'Decision', sortValue: (r) => r.decision, tone: (r) => toneForStatus(r.decision) },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, tone: (r) => toneForStatus(r.status) },
    { key: 'risk', label: 'Risk', sortValue: (r) => r.risk, tone: (r) => toneForStatus(r.risk) },
    { key: 'volumeMb', label: 'Volume', sortValue: (r) => r.volumeMb, render: (r) => <span className="text-slate-200">{fmt(r.volumeMb)} MB</span> },
    { key: 'timestamp', label: 'Timestamp', sortValue: (r) => r.timestamp, render: (r) => <span className="whitespace-nowrap text-slate-500">{r.timestamp}</span> }
  ];
  return <DataTable columns={columns} rows={rows} searchPlaceholder="Search flows..." initialSort={{ key: 'timestamp', dir: 'desc' }} />;
}

export function ApprovalsTable({ rows }: { rows: Approval[] }) {
  const columns: Column<Approval>[] = [
    { key: 'id', label: 'Approval', sortValue: (r) => r.id },
    { key: 'requester', label: 'Requester', sortValue: (r) => r.requester },
    { key: 'type', label: 'Type', sortValue: (r) => r.type },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, tone: (r) => toneForStatus(r.status) },
    { key: 'risk', label: 'Risk', sortValue: (r) => r.risk, tone: (r) => toneForStatus(r.risk) },
    { key: 'requestedAt', label: 'Requested', sortValue: (r) => r.requestedAt, render: (r) => <span className="whitespace-nowrap text-slate-500">{r.requestedAt}</span> },
    { key: 'expiresAt', label: 'Expires', sortValue: (r) => r.expiresAt, render: (r) => <span className="whitespace-nowrap text-slate-500">{r.expiresAt}</span> }
  ];
  return <DataTable columns={columns} rows={rows} searchPlaceholder="Search approvals..." initialSort={{ key: 'requestedAt', dir: 'desc' }} />;
}

export function PolicyTable({ rows }: { rows: Policy[] }) {
  const columns: Column<Policy>[] = [
    { key: 'name', label: 'Policy', sortValue: (r) => r.name, render: (r) => <Link href={`/policies/${r.id}`} className="font-medium text-sentinel-300 transition hover:text-sentinel-200 hover:underline">{r.name}</Link> },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, tone: (r) => toneForStatus(r.status) },
    { key: 'scope', label: 'Scope', sortValue: (r) => r.scope },
    { key: 'decisions', label: 'Decisions', render: (r) => <span className="text-slate-400">{r.decisions.join(', ')}</span> },
    { key: 'violations', label: 'Violations', sortValue: (r) => r.violations, render: (r) => <span className="text-slate-200">{fmt(r.violations)}</span> },
    { key: 'enforcements', label: 'Enforcements', sortValue: (r) => r.enforcements, render: (r) => <span className="text-slate-200">{fmt(r.enforcements)}</span> },
    { key: 'updatedAt', label: 'Updated', sortValue: (r) => r.updatedAt, render: (r) => <span className="text-slate-500">{r.updatedAt}</span> }
  ];
  return <DataTable columns={columns} rows={rows} searchPlaceholder="Search policies..." initialSort={{ key: 'name', dir: 'asc' }} />;
}

export interface ApiKeyRow {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  scopes: string[];
}

export function ApiKeyTable({ rows }: { rows: ApiKeyRow[] }) {
  const columns: Column<ApiKeyRow>[] = [
    { key: 'name', label: 'Name', sortValue: (r) => r.name },
    { key: 'key', label: 'Key', render: (r) => <span className="font-mono text-slate-300">{maskKey(r.key)}</span> },
    { key: 'created', label: 'Created', sortValue: (r) => r.created, render: (r) => <span className="text-slate-500">{r.created}</span> },
    { key: 'lastUsed', label: 'Last Used', sortValue: (r) => r.lastUsed, render: (r) => <span className="whitespace-nowrap text-slate-500">{r.lastUsed}</span> },
    { key: 'scopes', label: 'Scopes', render: (r) => <span className="text-slate-400">{r.scopes.join(', ')}</span> }
  ];
  return <DataTable columns={columns} rows={rows} searchPlaceholder="Search keys..." pageSize={6} />;
}