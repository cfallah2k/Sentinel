import { Badge, type BadgeTone } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { ProgressBar } from '@/components/ui/progress';
import { formatMrr, planTone } from './orgs-table';
import {
  aiSystems,
  auditLogs,
  incidents,
  invoices,
  models,
  platformUsers,
  providers,
  queueStats,
  systemJobs
} from '@/lib/mock-data';

export type UserRow = (typeof platformUsers)[number];
export type InvoiceRow = (typeof invoices)[number];
export type JobRow = (typeof systemJobs)[number];
export type QueueRow = (typeof queueStats)[number];
export type AiSystemRow = (typeof aiSystems)[number];
export type ProviderRow = (typeof providers)[number];
export type ModelRow = (typeof models)[number];
export type IncidentRow = (typeof incidents)[number];
export type AuditRow = (typeof auditLogs)[number];

export function userTone(status: string): BadgeTone {
  return status === 'Active' ? 'green' : status === 'Suspended' ? 'rose' : 'amber';
}

export function jobTone(status: string): BadgeTone {
  switch (status) {
    case 'Running':
    case 'Completed':
      return 'green';
    case 'Queued':
      return 'amber';
    case 'Failed':
      return 'rose';
    default:
      return 'slate';
  }
}

export function SectionTable<T>({
  title,
  subtitle,
  columns,
  rows,
  searchPlaceholder = 'Search...'
}: {
  title: string;
  subtitle?: string;
  columns: Column<T>[];
  rows: T[];
  searchPlaceholder?: string;
}) {
  return (
    <Card>
      <CardHeader title={title} subtitle={subtitle} />
      <CardBody>
        <DataTable columns={columns} rows={rows} searchPlaceholder={searchPlaceholder} />
      </CardBody>
    </Card>
  );
}

export function riskTone(risk: string): BadgeTone {
  if (risk === 'Critical') return 'rose';
  if (risk === 'High') return 'red';
  if (risk === 'Medium') return 'amber';
  return 'green';
}

export function severityTone(severity: string): BadgeTone {
  if (severity === 'Critical') return 'rose';
  if (severity === 'High') return 'red';
  if (severity === 'Medium') return 'amber';
  return 'blue';
}

export function resultTone(result: string): BadgeTone {
  if (result === 'Success') return 'green';
  if (result === 'Error') return 'rose';
  return 'amber';
}

export const usersColumns: Column<UserRow>[] = [
  { key: 'name', label: 'Name', render: (r) => <span className="font-semibold text-white">{r.name}</span> },
  { key: 'email', label: 'Email', className: 'text-slate-400' },
  { key: 'orgId', label: 'Organization', className: 'text-slate-400' },
  { key: 'role', label: 'Role', render: (r) => <span className="text-slate-300">{r.role}</span> },
  { key: 'status', label: 'Status', render: (r) => <Badge label={r.status} tone={userTone(r.status)} /> },
  { key: 'lastSeen', label: 'Last Seen', className: 'text-slate-400' }
];

export function UsersTable({ rows = platformUsers, title = 'Platform Users', subtitle }: { rows?: UserRow[]; title?: string; subtitle?: string }) {
  return <SectionTable title={title} subtitle={subtitle} columns={usersColumns} rows={rows} searchPlaceholder="Search users..." />;
}

export const invoiceColumns: Column<InvoiceRow>[] = [
  { key: 'number', label: 'Invoice', render: (r) => <span className="font-mono text-sky-300">{r.number}</span> },
  { key: 'date', label: 'Date', className: 'text-slate-400' },
  {
    key: 'amount',
    label: 'Amount',
    sortValue: (r) => r.amount,
    render: (r) => <span className="font-semibold text-emerald-300">{formatMrr(r.amount)}</span>
  },
  { key: 'status', label: 'Status', render: (r) => <Badge label={r.status} tone={r.status === 'Paid' ? 'green' : r.status === 'Pending' ? 'amber' : 'rose'} /> }
];

export function InvoicesTable({ rows = invoices, title = 'Invoices', subtitle }: { rows?: InvoiceRow[]; title?: string; subtitle?: string }) {
  return <SectionTable title={title} subtitle={subtitle} columns={invoiceColumns} rows={rows} />;
}

export const jobColumns: Column<JobRow>[] = [
  { key: 'name', label: 'Job', render: (r) => <span className="font-mono text-sky-300">{r.name}</span> },
  { key: 'queue', label: 'Queue', render: (r) => <Badge label={r.queue} tone="blue" /> },
  { key: 'status', label: 'Status', render: (r) => <Badge label={r.status} tone={jobTone(r.status)} /> },
  {
    key: 'progress',
    label: 'Progress',
    render: (r) => (
      <div className="flex items-center gap-3">
        <div className="w-28">
          <ProgressBar value={r.progress} color={r.status === 'Failed' ? 'bg-rose-400' : 'bg-sky-400'} />
        </div>
        <span className="text-xs text-slate-400">{r.progress}%</span>
      </div>
    ),
    sortValue: (r) => r.progress
  },
  { key: 'startedAt', label: 'Started', render: (r) => <span className="text-slate-400">{r.startedAt ?? '—'}</span> }
];

export function JobsTable({ rows = systemJobs, title = 'System Jobs', subtitle }: { rows?: JobRow[]; title?: string; subtitle?: string }) {
  return <SectionTable title={title} subtitle={subtitle} columns={jobColumns} rows={rows} searchPlaceholder="Search jobs..." />;
}

export function queueLoad(q: QueueRow) {
  return Math.min(100, Math.round(((q.pending + q.active) / 200) * 100));
}

export const queueColumns: Column<QueueRow>[] = [
  { key: 'name', label: 'Queue', render: (r) => <span className="font-mono text-sky-300">{r.name}</span> },
  { key: 'pending', label: 'Pending', sortValue: (r) => r.pending, className: 'text-slate-400' },
  { key: 'active', label: 'Active', className: 'text-slate-400' },
  { key: 'rate', label: 'Rate', className: 'text-slate-400' },
  { key: 'latencyMs', label: 'Latency', sortValue: (r) => r.latencyMs, className: 'text-slate-400' },
  {
    key: 'load',
    label: 'Load',
    render: (r) => (
      <div className="flex items-center gap-3">
        <div className="w-28">
          <ProgressBar value={queueLoad(r)} color={queueLoad(r) > 70 ? 'bg-rose-400' : queueLoad(r) > 40 ? 'bg-amber-400' : 'bg-emerald-400'} />
        </div>
        <span className="text-xs text-slate-400">{queueLoad(r)}%</span>
      </div>
    )
  }
];

export function QueuesTable({ rows = queueStats, title = 'Queues', subtitle }: { rows?: QueueRow[]; title?: string; subtitle?: string }) {
  return <SectionTable title={title} subtitle={subtitle} columns={queueColumns} rows={rows} />;
}

export const systemsColumns: Column<AiSystemRow>[] = [
  { key: 'name', label: 'System', render: (r) => <span className="font-semibold text-white">{r.name}</span> },
  { key: 'type', label: 'Type', className: 'text-slate-400' },
  { key: 'status', label: 'Status', render: (r) => <Badge label={r.status} tone={r.status === 'Approved' ? 'green' : r.status === 'Pending' ? 'amber' : r.status === 'Registered' ? 'blue' : 'rose'} /> },
  { key: 'risk', label: 'Risk', render: (r) => <Badge label={r.risk} tone={riskTone(r.risk)} /> },
  { key: 'owner', label: 'Owner', className: 'text-slate-400' },
  { key: 'requests24h', label: 'Req / 24h', sortValue: (r) => r.requests24h, className: 'text-slate-400' }
];

export function SystemsTable({ rows = aiSystems, title = 'AI Systems', subtitle }: { rows?: AiSystemRow[]; title?: string; subtitle?: string }) {
  return <SectionTable title={title} subtitle={subtitle} columns={systemsColumns} rows={rows} searchPlaceholder="Search systems..." />;
}

export const providersColumns: Column<ProviderRow>[] = [
  { key: 'name', label: 'Provider', render: (r) => <span className="font-semibold text-white">{r.name}</span> },
  { key: 'type', label: 'Type', className: 'text-slate-400' },
  { key: 'status', label: 'Status', render: (r) => <Badge label={r.status} tone={r.status === 'Approved' ? 'green' : r.status === 'Pending' ? 'amber' : 'rose'} /> },
  { key: 'region', label: 'Region', className: 'text-slate-400' },
  { key: 'risk', label: 'Risk', render: (r) => <Badge label={r.risk} tone={riskTone(r.risk)} /> },
  { key: 'uptime', label: 'Uptime', sortValue: (r) => r.uptime, className: 'text-slate-400' },
  { key: 'requests24h', label: 'Req / 24h', sortValue: (r) => r.requests24h, className: 'text-slate-400' }
];

export function ProvidersTable({ rows = providers, title = 'Providers', subtitle }: { rows?: ProviderRow[]; title?: string; subtitle?: string }) {
  return <SectionTable title={title} subtitle={subtitle} columns={providersColumns} rows={rows} searchPlaceholder="Search providers..." />;
}

export const modelsColumns: Column<ModelRow>[] = [
  { key: 'name', label: 'Model', render: (r) => <span className="font-semibold text-white">{r.name}</span> },
  { key: 'modality', label: 'Modality', className: 'text-slate-400' },
  { key: 'status', label: 'Status', render: (r) => <Badge label={r.status} tone={r.status === 'Approved' ? 'green' : 'rose'} /> },
  { key: 'risk', label: 'Risk', render: (r) => <Badge label={r.risk} tone={riskTone(r.risk)} /> },
  { key: 'contextWindow', label: 'Context', className: 'text-slate-400' },
  { key: 'pricing', label: 'Pricing', className: 'text-slate-400' }
];

export function ModelsTable({ rows = models, title = 'Models', subtitle }: { rows?: ModelRow[]; title?: string; subtitle?: string }) {
  return <SectionTable title={title} subtitle={subtitle} columns={modelsColumns} rows={rows} />;
}

export const incidentsColumns: Column<IncidentRow>[] = [
  { key: 'id', label: 'ID', render: (r) => <span className="font-mono text-sky-300">{r.id}</span> },
  { key: 'title', label: 'Title', render: (r) => <span className="font-semibold text-white">{r.title}</span> },
  { key: 'severity', label: 'Severity', render: (r) => <Badge label={r.severity} tone={severityTone(r.severity)} /> },
  { key: 'status', label: 'Status', render: (r) => <Badge label={r.status} tone={r.status === 'Resolved' ? 'green' : r.status === 'Investigating' ? 'amber' : 'rose'} /> },
  { key: 'type', label: 'Type', className: 'text-slate-400' },
  { key: 'assignee', label: 'Assignee', className: 'text-slate-400' }
];

export function IncidentsTable({ rows = incidents, title = 'Incidents', subtitle }: { rows?: IncidentRow[]; title?: string; subtitle?: string }) {
  return <SectionTable title={title} subtitle={subtitle} columns={incidentsColumns} rows={rows} searchPlaceholder="Search incidents..." />;
}

export const auditColumns: Column<AuditRow>[] = [
  { key: 'timestamp', label: 'Timestamp', className: 'font-mono text-slate-400' },
  { key: 'actor', label: 'Actor', className: 'text-slate-400' },
  { key: 'action', label: 'Action', render: (r) => <span className="font-mono text-sky-300">{r.action}</span> },
  { key: 'resource', label: 'Resource', className: 'text-slate-400' },
  { key: 'result', label: 'Result', render: (r) => <Badge label={r.result} tone={resultTone(r.result)} /> },
  { key: 'context', label: 'Context', className: 'text-slate-400' }
];

export function AuditTable({ rows = auditLogs, title = 'Audit Log', subtitle }: { rows?: AuditRow[]; title?: string; subtitle?: string }) {
  return <SectionTable title={title} subtitle={subtitle} columns={auditColumns} rows={rows} searchPlaceholder="Search audit log..." />;
}

export function revenueSeries() {
  return invoices.map((i) => ({ name: i.date.slice(0, 7), revenue: i.amount }));
}