import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { ProgressBar } from '@/components/ui/progress';
import { riskTone, severityTone } from './registry-table';
import {
  aiSystems,
  applications,
  auditLogs,
  complianceFrameworks,
  dataSources,
  incidents,
  models,
  policies,
  providers,
  reports
} from '@/lib/mock-data';

export type AiSystemRow = (typeof aiSystems)[number];
export type ApplicationRow = (typeof applications)[number];
export type ProviderRow = (typeof providers)[number];
export type ModelRow = (typeof models)[number];
export type SourceRow = (typeof dataSources)[number];
export type IncidentRow = (typeof incidents)[number];
export type AuditRow = (typeof auditLogs)[number];
export type FrameworkRow = (typeof complianceFrameworks)[number];
export type ReportRow = (typeof reports)[number];
export type PolicyRow = (typeof policies)[number];

export function statusTone(status: string): ReturnType<typeof riskTone> {
  if (status === 'Active' || status === 'Approved' || status === 'Connected' || status === 'Resolved' || status === 'On Track' || status === 'Ready') return 'green';
  if (status === 'Pending' || status === 'In Review' || status === 'Investigating' || status === 'At Risk' || status === 'Scheduled') return 'amber';
  if (status === 'Failed' || status === 'Restricted' || status === 'Blocked') return 'rose';
  return 'slate';
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

export const systemsColumns: Column<AiSystemRow>[] = [
  {
    key: 'name',
    label: 'System',
    render: (r) => (
      <Link href={`/government/ai-systems/${r.id}`} className="font-semibold text-white transition hover:text-sentinel-300">
        {r.name}
      </Link>
    )
  },
  { key: 'type', label: 'Type', className: 'text-slate-400' },
  { key: 'status', label: 'Status', render: (r) => <Badge label={r.status} tone={statusTone(r.status)} /> },
  { key: 'risk', label: 'Risk', render: (r) => <Badge label={r.risk} tone={riskTone(r.risk)} /> },
  { key: 'owner', label: 'Owner', className: 'text-slate-400' },
  { key: 'purpose', label: 'Purpose', className: 'text-slate-400' }
];

export function SystemsTable({ rows = aiSystems, title = 'AI Systems', subtitle }: { rows?: AiSystemRow[]; title?: string; subtitle?: string }) {
  return <SectionTable title={title} subtitle={subtitle} columns={systemsColumns} rows={rows} searchPlaceholder="Search systems..." />;
}

export const applicationsColumns: Column<ApplicationRow>[] = [
  {
    key: 'name',
    label: 'Application',
    render: (r) => <span className="font-semibold text-white">{r.name}</span>
  },
  { key: 'type', label: 'Type', className: 'text-slate-400' },
  { key: 'environment', label: 'Environment', className: 'text-slate-400' },
  { key: 'status', label: 'Status', render: (r) => <Badge label={r.status} tone={statusTone(r.status)} /> },
  { key: 'owner', label: 'Owner', className: 'text-slate-400' },
  { key: 'risk', label: 'Risk', render: (r) => <Badge label={r.risk} tone={riskTone(r.risk)} /> }
];

export function ApplicationsTable({ rows = applications, title = 'Applications', subtitle }: { rows?: ApplicationRow[]; title?: string; subtitle?: string }) {
  return <SectionTable title={title} subtitle={subtitle} columns={applicationsColumns} rows={rows} />;
}

export const providersColumns: Column<ProviderRow>[] = [
  { key: 'name', label: 'Provider', render: (r) => <span className="font-semibold text-white">{r.name}</span> },
  { key: 'type', label: 'Type', className: 'text-slate-400' },
  { key: 'status', label: 'Status', render: (r) => <Badge label={r.status} tone={statusTone(r.status)} /> },
  { key: 'region', label: 'Region', className: 'text-slate-400' },
  { key: 'models', label: 'Models', className: 'text-slate-400' },
  { key: 'risk', label: 'Risk', render: (r) => <Badge label={r.risk} tone={riskTone(r.risk)} /> },
  { key: 'requests24h', label: 'Req / 24h', sortValue: (r) => r.requests24h, className: 'text-slate-400' }
];

export function ProvidersTable({ rows = providers, title = 'Providers', subtitle }: { rows?: ProviderRow[]; title?: string; subtitle?: string }) {
  return <SectionTable title={title} subtitle={subtitle} columns={providersColumns} rows={rows} searchPlaceholder="Search providers..." />;
}

export const modelsColumns: Column<ModelRow>[] = [
  { key: 'name', label: 'Model', render: (r) => <span className="font-semibold text-white">{r.name}</span> },
  { key: 'modality', label: 'Modality', className: 'text-slate-400' },
  { key: 'status', label: 'Status', render: (r) => <Badge label={r.status} tone={statusTone(r.status)} /> },
  { key: 'risk', label: 'Risk', render: (r) => <Badge label={r.risk} tone={riskTone(r.risk)} /> },
  { key: 'contextWindow', label: 'Context', className: 'text-slate-400' },
  { key: 'pricing', label: 'Pricing', className: 'text-slate-400' }
];

export function ModelsTable({ rows = models, title = 'Models', subtitle }: { rows?: ModelRow[]; title?: string; subtitle?: string }) {
  return <SectionTable title={title} subtitle={subtitle} columns={modelsColumns} rows={rows} />;
}

export const sourcesColumns: Column<SourceRow>[] = [
  { key: 'name', label: 'Source', render: (r) => <span className="font-semibold text-white">{r.name}</span> },
  { key: 'type', label: 'Type', className: 'text-slate-400' },
  { key: 'status', label: 'Status', render: (r) => <Badge label={r.status} tone={statusTone(r.status)} /> },
  { key: 'records', label: 'Records', sortValue: (r) => r.records, className: 'text-slate-400' },
  { key: 'categories', label: 'Categories', render: (r) => <span className="text-slate-400">{r.categories.join(', ')}</span> },
  { key: 'risk', label: 'Risk', render: (r) => <Badge label={r.risk} tone={riskTone(r.risk)} /> }
];

export function SourcesTable({ rows = dataSources, title = 'Data Sources', subtitle }: { rows?: SourceRow[]; title?: string; subtitle?: string }) {
  return <SectionTable title={title} subtitle={subtitle} columns={sourcesColumns} rows={rows} />;
}

export const incidentsColumns: Column<IncidentRow>[] = [
  { key: 'id', label: 'ID', render: (r) => <span className="font-mono text-sky-300">{r.id}</span> },
  { key: 'title', label: 'Title', render: (r) => <span className="font-semibold text-white">{r.title}</span> },
  { key: 'severity', label: 'Severity', render: (r) => <Badge label={r.severity} tone={severityTone(r.severity)} /> },
  { key: 'status', label: 'Status', render: (r) => <Badge label={r.status} tone={statusTone(r.status)} /> },
  { key: 'type', label: 'Type', className: 'text-slate-400' },
  { key: 'assignee', label: 'Assignee', className: 'text-slate-400' },
  { key: 'openedAt', label: 'Opened', className: 'text-slate-400' }
];

export function IncidentsTable({ rows = incidents, title = 'Incidents', subtitle }: { rows?: IncidentRow[]; title?: string; subtitle?: string }) {
  return <SectionTable title={title} subtitle={subtitle} columns={incidentsColumns} rows={rows} searchPlaceholder="Search incidents..." />;
}

export const auditColumns: Column<AuditRow>[] = [
  { key: 'timestamp', label: 'Timestamp', className: 'font-mono text-slate-400' },
  { key: 'actor', label: 'Actor', className: 'text-slate-400' },
  { key: 'action', label: 'Action', render: (r) => <span className="font-mono text-sky-300">{r.action}</span> },
  { key: 'resource', label: 'Resource', className: 'text-slate-400' },
  { key: 'result', label: 'Result', render: (r) => <Badge label={r.result} tone={statusTone(r.result)} /> },
  { key: 'context', label: 'Context', className: 'text-slate-400' }
];

export function AuditTable({ rows = auditLogs, title = 'Audit Log', subtitle }: { rows?: AuditRow[]; title?: string; subtitle?: string }) {
  return <SectionTable title={title} subtitle={subtitle} columns={auditColumns} rows={rows} searchPlaceholder="Search audit log..." />;
}

export const frameworkColumns: Column<FrameworkRow>[] = [
  { key: 'name', label: 'Framework', render: (r) => <span className="font-semibold text-white">{r.name}</span> },
  { key: 'standard', label: 'Standard', className: 'text-slate-400' },
  {
    key: 'progress',
    label: 'Progress',
    render: (r) => (
      <div className="flex items-center gap-3">
        <div className="w-32">
          <ProgressBar value={r.progress} />
        </div>
        <span className="text-xs text-slate-400">{r.progress}%</span>
      </div>
    ),
    sortValue: (r) => r.progress
  },
  { key: 'controls', label: 'Controls', className: 'text-slate-400' },
  { key: 'gaps', label: 'Gaps', className: 'text-slate-400' },
  { key: 'status', label: 'Status', render: (r) => <Badge label={r.status} tone={statusTone(r.status)} /> },
  { key: 'nextAudit', label: 'Next Audit', className: 'text-slate-400' }
];

export function FrameworksTable({ rows = complianceFrameworks, title = 'Compliance Frameworks', subtitle }: { rows?: FrameworkRow[]; title?: string; subtitle?: string }) {
  return <SectionTable title={title} subtitle={subtitle} columns={frameworkColumns} rows={rows} />;
}

export const reportColumns: Column<ReportRow>[] = [
  { key: 'name', label: 'Report', render: (r) => <span className="font-semibold text-white">{r.name}</span> },
  { key: 'type', label: 'Type', className: 'text-slate-400' },
  { key: 'schedule', label: 'Schedule', className: 'text-slate-400' },
  { key: 'format', label: 'Format', className: 'text-slate-400' },
  { key: 'status', label: 'Status', render: (r) => <Badge label={r.status} tone={statusTone(r.status)} /> },
  { key: 'lastRun', label: 'Last Run', className: 'text-slate-400' },
  { key: 'recipients', label: 'Recipients', className: 'text-slate-400' }
];

export function ReportsTable({ rows = reports, title = 'Regulatory Reports', subtitle }: { rows?: ReportRow[]; title?: string; subtitle?: string }) {
  return <SectionTable title={title} subtitle={subtitle} columns={reportColumns} rows={rows} searchPlaceholder="Search reports..." />;
}

export const policyColumns: Column<PolicyRow>[] = [
  {
    key: 'name',
    label: 'Policy',
    render: (r) => (
      <Link href={`/government/policies/${r.id}`} className="font-semibold text-white transition hover:text-sentinel-300">
        {r.name}
      </Link>
    )
  },
  { key: 'status', label: 'Status', render: (r) => <Badge label={r.status} tone={statusTone(r.status)} /> },
  { key: 'version', label: 'Version', className: 'text-slate-400' },
  { key: 'decisions', label: 'Decisions', render: (r) => <span className="text-slate-400">{r.decisions.join(' · ')}</span> },
  { key: 'violations', label: 'Violations', sortValue: (r) => r.violations, className: 'text-slate-400' },
  { key: 'enforcements', label: 'Enforcements', sortValue: (r) => r.enforcements, className: 'text-slate-400' },
  { key: 'updatedAt', label: 'Updated', className: 'text-slate-400' }
];

export function PolicyTable({ rows = policies, title = 'Policies', subtitle }: { rows?: PolicyRow[]; title?: string; subtitle?: string }) {
  return <SectionTable title={title} subtitle={subtitle} columns={policyColumns} rows={rows} searchPlaceholder="Search policies..." />;
}