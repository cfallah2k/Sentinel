import { AlertTriangle, CalendarClock, CircleDot } from 'lucide-react';
import { ComplianceModuleHeader } from '@/components/governance/compliance-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { complianceFrameworks, complianceGaps } from '@/lib/mock-data';

export default function Page() {
  const today = '2026-08-14';
  const rows = complianceGaps
    .map((g) => ({
      ...g,
      framework: complianceFrameworks.find((f) => f.id === g.frameworkId)?.name ?? g.frameworkId,
      overdue: g.status === 'Open' && g.due < today
    }))
    .sort((a, b) => (a.overdue === b.overdue ? 0 : a.overdue ? -1 : 1));

  const open = rows.filter((r) => r.status === 'Open').length;
  const critical = rows.filter((r) => r.severity === 'Critical').length;
  const overdue = rows.filter((r) => r.overdue).length;

  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'id', label: 'Gap', sortValue: (r) => r.id, render: (r) => <span className="font-medium text-sky-300">{r.id}</span> },
    { key: 'title', label: 'Description', sortValue: (r) => r.title },
    { key: 'framework', label: 'Framework', sortValue: (r) => r.framework },
    { key: 'severity', label: 'Severity', sortValue: (r) => r.severity, render: (r) => <Badge label={r.severity} tone={toneForStatus(r.severity)} /> },
    { key: 'owner', label: 'Owner', sortValue: (r) => r.owner },
    { key: 'due', label: 'Due', sortValue: (r) => r.due, render: (r) => (
        <span className={r.overdue ? 'font-semibold text-rose-300' : ''}>
          {r.due}
          {r.overdue ? ' · overdue' : ''}
        </span>
      ) },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> }
  ];

  return (
    <div className="space-y-8">
      <ComplianceModuleHeader
        title="Compliance Gaps"
        description="Gap register across all frameworks — open, in-progress and overdue items requiring remediation."
        active="/compliance/gaps"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Open gaps" value={open} sub="awaiting remediation" icon={CircleDot} accent="amber" />
        <StatCard label="Critical" value={critical} sub="requires immediate action" icon={AlertTriangle} accent="rose" />
        <StatCard label="Overdue" value={overdue} sub="past their due date" icon={CalendarClock} accent="red" />
      </div>
      <Card>
        <CardHeader title="Gap register" subtitle="All open and in-progress gaps across standards" action={<Badge label={`${rows.length} tracked`} tone="blue" />} />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search gaps..." initialSort={{ key: 'severity', dir: 'desc' }} />
        </CardBody>
      </Card>
    </div>
  );
}
