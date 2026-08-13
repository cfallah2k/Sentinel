import Link from 'next/link';
import { DataTable, type Column } from '@/components/ui/data-table';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DecisionBadge, SeverityBadge } from './badges';
import { fmt, policyName, requestView, systemName, timeOnly } from './helpers';
import type { Approval, GatewayRequest, Incident, Policy } from '@/lib/mock-data';

const linkCell = (href: string, label: string) => (
  <Link href={href} className="font-medium text-sentinel-300 transition hover:text-sentinel-200 hover:underline">
    {label}
  </Link>
);

export function RequestTable({ rows, searchPlaceholder = 'Search requests...', pageSize }: { rows: GatewayRequest[]; searchPlaceholder?: string; pageSize?: number }) {
  const view = rows.map(requestView);
  const columns: Column<(typeof view)[number]>[] = [
    { key: 'id', label: 'Request', sortValue: (r) => r.id, render: (r) => linkCell(`/gateway/requests/${r.id}`, r.id) },
    { key: 'timestamp', label: 'Time', sortValue: (r) => r.timestamp, render: (r) => <span className="whitespace-nowrap text-slate-500">{timeOnly(r.timestamp)}</span> },
    { key: 'system', label: 'System', sortValue: (r) => r.system },
    { key: 'app', label: 'Application', sortValue: (r) => r.app },
    { key: 'model', label: 'Model', sortValue: (r) => r.model, render: (r) => <span className="text-slate-400">{r.model}</span> },
    { key: 'category', label: 'Category', sortValue: (r) => r.category },
    { key: 'decision', label: 'Decision', sortValue: (r) => r.decision, render: (r) => <DecisionBadge label={r.decision} /> },
    { key: 'risk', label: 'Risk', sortValue: (r) => r.risk, render: (r) => <SeverityBadge label={r.risk} /> },
    { key: 'latencyMs', label: 'Latency', sortValue: (r) => r.latencyMs, render: (r) => <span className="text-slate-200">{r.latencyMs} ms</span> },
    { key: 'tokens', label: 'Tokens', sortValue: (r) => r.tokens, render: (r) => <span className="text-slate-200">{fmt(r.tokens)}</span> }
  ];
  return <DataTable columns={columns} rows={view} searchPlaceholder={searchPlaceholder} pageSize={pageSize} initialSort={{ key: 'timestamp', dir: 'desc' }} />;
}

export function IncidentTable({ rows, searchPlaceholder = 'Search incidents...', pageSize = 8 }: { rows: Incident[]; searchPlaceholder?: string; pageSize?: number }) {
  const view = rows.map((r) => ({ ...r, source: systemName(r.systemId) }));
  const columns: Column<(typeof view)[number]>[] = [
    { key: 'id', label: 'Incident', sortValue: (r) => r.id, render: (r) => linkCell(`/incidents/${r.id}`, r.id) },
    { key: 'title', label: 'Title', sortValue: (r) => r.title },
    { key: 'severity', label: 'Severity', sortValue: (r) => r.severity, render: (r) => <SeverityBadge label={r.severity} /> },
    { key: 'type', label: 'Type', sortValue: (r) => r.type },
    { key: 'source', label: 'Source', sortValue: (r) => r.source },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> },
    { key: 'assignee', label: 'Assignee', sortValue: (r) => r.assignee },
    { key: 'openedAt', label: 'Opened', sortValue: (r) => r.openedAt, render: (r) => <span className="whitespace-nowrap text-slate-500">{r.openedAt.slice(0, 10)}</span> },
    { key: 'slaHours', label: 'SLA', sortValue: (r) => r.slaHours, render: (r) => <span className="text-slate-200">{r.slaHours}h</span> }
  ];
  return <DataTable columns={columns} rows={view} searchPlaceholder={searchPlaceholder} pageSize={pageSize} initialSort={{ key: 'openedAt', dir: 'desc' }} />;
}

export function ApprovalTable({ rows, searchPlaceholder = 'Search approvals...', pageSize = 8 }: { rows: Approval[]; searchPlaceholder?: string; pageSize?: number }) {
  const view = rows.map((r) => ({
    ...r,
    resource: r.systemId ? r.systemId : r.policyId ? r.policyId : '—',
    policy: policyName(r.policyId)
  }));
  const columns: Column<(typeof view)[number]>[] = [
    { key: 'id', label: 'Approval', sortValue: (r) => r.id, render: (r) => linkCell(`/approvals/${r.id}`, r.id) },
    { key: 'requester', label: 'Requester', sortValue: (r) => r.requester },
    { key: 'type', label: 'Type', sortValue: (r) => r.type },
    { key: 'resource', label: 'Resource', sortValue: (r) => r.resource, render: (r) => <span className="text-slate-400">{r.resource} · {r.policy}</span> },
    { key: 'note', label: 'Reason', render: (r) => <span className="max-w-56 truncate text-slate-400">{r.note}</span> },
    { key: 'risk', label: 'Risk', sortValue: (r) => r.risk, render: (r) => <SeverityBadge label={r.risk} /> },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> },
    { key: 'requestedAt', label: 'Requested', sortValue: (r) => r.requestedAt, render: (r) => <span className="whitespace-nowrap text-slate-500">{r.requestedAt.slice(0, 10)}</span> },
    { key: 'expiresAt', label: 'Expires', sortValue: (r) => r.expiresAt, render: (r) => <span className="whitespace-nowrap text-slate-500">{r.expiresAt.slice(0, 10)}</span> }
  ];
  return <DataTable columns={columns} rows={view} searchPlaceholder={searchPlaceholder} pageSize={pageSize} initialSort={{ key: 'requestedAt', dir: 'desc' }} />;
}

export function PolicyTable({ rows, searchPlaceholder = 'Search policies...', pageSize = 8 }: { rows: Policy[]; searchPlaceholder?: string; pageSize?: number }) {
  const columns: Column<Policy>[] = [
    { key: 'name', label: 'Policy', sortValue: (r) => r.name, render: (r) => linkCell(`/policies/${r.id}`, r.name) },
    { key: 'scope', label: 'Scope', sortValue: (r) => r.scope },
    { key: 'decisions', label: 'Decisions', render: (r) => <span className="text-slate-400">{r.decisions.join(', ')}</span> },
    { key: 'conditions', label: 'Rules', sortValue: (r) => r.conditions, render: (r) => <span className="text-slate-200">{r.conditions}</span> },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> },
    { key: 'violations', label: 'Violations', sortValue: (r) => r.violations, render: (r) => <span className={r.violations > 0 ? 'font-semibold text-rose-300' : 'text-slate-200'}>{fmt(r.violations)}</span> },
    { key: 'enforcements', label: 'Enforcements', sortValue: (r) => r.enforcements, render: (r) => <span className="text-slate-200">{fmt(r.enforcements)}</span> },
    { key: 'updatedAt', label: 'Updated', sortValue: (r) => r.updatedAt, render: (r) => <span className="text-slate-500">{r.updatedAt}</span> }
  ];
  return <DataTable columns={columns} rows={rows} searchPlaceholder={searchPlaceholder} pageSize={pageSize} initialSort={{ key: 'name', dir: 'asc' }} />;
}

export function GatewayApiKeyTable({ rows }: { rows: { id: string; name: string; key: string; scopes: string[]; created: string; lastUsed: string; status: string }[] }) {
  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'name', label: 'Name', sortValue: (r) => r.name, render: (r) => <span className="font-medium text-white">{r.name}</span> },
    { key: 'key', label: 'Key', render: (r) => <span className="font-mono text-xs text-slate-400">{r.key.slice(0, 12)}••••••••••{r.key.slice(-4)}</span> },
    { key: 'scopes', label: 'Scopes', render: (r) => <span className="text-slate-400">{r.scopes.join(', ')}</span> },
    { key: 'created', label: 'Created', sortValue: (r) => r.created, render: (r) => <span className="text-slate-500">{r.created}</span> },
    { key: 'lastUsed', label: 'Last Used', sortValue: (r) => r.lastUsed, render: (r) => <span className="whitespace-nowrap text-slate-500">{r.lastUsed.slice(0, 10)}</span> },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> }
  ];
  return <DataTable columns={columns} rows={rows} searchPlaceholder="Search API keys..." pageSize={6} />;
}

export function WebhookTable({ rows }: { rows: { id: string; name: string; url: string; events: string[]; deliveries24h: number; successRate: number; lastDelivery: string; status: string }[] }) {
  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'name', label: 'Endpoint', sortValue: (r) => r.name, render: (r) => <span className="font-medium text-white">{r.name}</span> },
    { key: 'url', label: 'URL', render: (r) => <span className="font-mono text-xs text-slate-400">{r.url}</span> },
    { key: 'events', label: 'Events', render: (r) => <span className="text-slate-400">{r.events.join(', ')}</span> },
    { key: 'deliveries24h', label: 'Deliveries / 24h', sortValue: (r) => r.deliveries24h, render: (r) => <span className="text-slate-200">{fmt(r.deliveries24h)}</span> },
    { key: 'successRate', label: 'Success', sortValue: (r) => r.successRate, render: (r) => <span className={r.successRate < 95 ? 'font-semibold text-rose-300' : 'text-slate-200'}>{r.successRate.toFixed(1)}%</span> },
    { key: 'lastDelivery', label: 'Last Delivery', sortValue: (r) => r.lastDelivery, render: (r) => <span className="whitespace-nowrap text-slate-500">{r.lastDelivery.slice(0, 10)}</span> },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> }
  ];
  return <DataTable columns={columns} rows={rows} searchPlaceholder="Search webhooks..." pageSize={6} />;
}

export function GatewayLogTable({ rows }: { rows: { id: string; timestamp: string; level: string; component: string; message: string; requestId: string | null }[] }) {
  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'timestamp', label: 'Time', sortValue: (r) => r.timestamp, render: (r) => <span className="whitespace-nowrap font-mono text-[0.65rem] text-slate-500">{r.timestamp.slice(11, 19)}</span> },
    { key: 'level', label: 'Level', sortValue: (r) => r.level, render: (r) => <Badge label={r.level} tone={toneForStatus(r.level)} /> },
    { key: 'component', label: 'Component', sortValue: (r) => r.component, render: (r) => <span className="font-mono text-xs text-sentinel-300">{r.component}</span> },
    { key: 'message', label: 'Message', render: (r) => <span className="text-slate-300">{r.message}</span> },
    { key: 'requestId', label: 'Request', sortValue: (r) => r.requestId ?? '', render: (r) => (r.requestId ? linkCell(`/gateway/requests/${r.requestId}`, r.requestId) : <span className="text-slate-600">—</span>) }
  ];
  return <DataTable columns={columns} rows={rows} searchPlaceholder="Search log entries..." pageSize={10} />;
}

export function AuditTable({ rows, searchPlaceholder = 'Search audit trail...' }: { rows: { id: string; timestamp: string; actor: string; action: string; resource: string; result: string; ip?: string; context?: string }[]; searchPlaceholder?: string }) {
  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'timestamp', label: 'Timestamp', sortValue: (r) => r.timestamp, render: (r) => <span className="whitespace-nowrap text-slate-500">{r.timestamp}</span> },
    { key: 'actor', label: 'Actor', sortValue: (r) => r.actor },
    { key: 'action', label: 'Action', render: (r) => <span className="font-mono text-xs text-sentinel-300">{r.action}</span> },
    { key: 'resource', label: 'Resource', render: (r) => <span className="text-slate-400">{r.resource}</span> },
    { key: 'result', label: 'Result', sortValue: (r) => r.result, render: (r) => <Badge label={r.result} tone={toneForStatus(r.result)} /> },
    { key: 'ip', label: 'IP', render: (r) => <span className="font-mono text-xs text-slate-500">{r.ip ?? '—'}</span> },
    { key: 'context', label: 'Context', render: (r) => <span className="text-slate-500">{r.context ?? '—'}</span> }
  ];
  return <DataTable columns={columns} rows={rows} searchPlaceholder={searchPlaceholder} pageSize={8} />;
}
