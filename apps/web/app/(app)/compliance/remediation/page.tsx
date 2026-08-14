import { Wrench, CheckCircle2, CalendarClock } from 'lucide-react';
import { ComplianceModuleHeader } from '@/components/governance/compliance-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { ProgressBar } from '@/components/ui/progress';
import { complianceFrameworks, complianceGaps, riskFindings } from '@/lib/mock-data';

export default function Page() {
  const today = '2026-08-14';
  const remediation = [
    ...complianceGaps.map((g) => ({
      id: g.id,
      title: g.title,
      source: complianceFrameworks.find((f) => f.id === g.frameworkId)?.name ?? g.frameworkId,
      severity: g.severity,
      owner: g.owner,
      due: g.due,
      status: g.status
    })),
    ...riskFindings
      .filter((f) => f.status !== 'Resolved')
      .map((f) => ({ id: f.id, title: f.title, source: f.assessmentId, severity: f.severity, owner: f.owner, due: f.due, status: f.status }))
  ].sort((a, b) => (a.due < b.due ? -1 : 1));

  const open = remediation.filter((r) => r.status === 'Open').length;
  const inProgress = remediation.filter((r) => r.status === 'In Progress').length;
  const overdue = remediation.filter((r) => r.status === 'Open' && r.due < today).length;
  const resolved = remediation.filter((r) => r.status === 'Resolved').length;
  const progress = remediation.length ? Math.round((resolved / remediation.length) * 100) : 0;

  const columns: Column<(typeof remediation)[number]>[] = [
    { key: 'id', label: 'Item', sortValue: (r) => r.id, render: (r) => <span className="font-medium text-sky-300">{r.id}</span> },
    { key: 'title', label: 'Action', sortValue: (r) => r.title },
    { key: 'source', label: 'Source', sortValue: (r) => r.source },
    { key: 'severity', label: 'Severity', sortValue: (r) => r.severity, render: (r) => <Badge label={r.severity} tone={toneForStatus(r.severity)} /> },
    { key: 'owner', label: 'Owner', sortValue: (r) => r.owner },
    { key: 'due', label: 'Due', sortValue: (r) => r.due, render: (r) => (
        <span className={r.status === 'Open' && r.due < today ? 'font-semibold text-rose-300' : ''}>
          {r.due}
          {r.status === 'Open' && r.due < today ? ' · overdue' : ''}
        </span>
      ) },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> }
  ];

  return (
    <div className="space-y-8">
      <ComplianceModuleHeader
        title="Compliance Remediation"
        description="Consolidated remediation queue for gaps and findings, tracked to closure with owners and due dates."
        active="/compliance/remediation"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Remediation queue" value={remediation.length} sub={`${inProgress} in progress`} icon={Wrench} accent="sky" />
        <StatCard label="Overdue" value={overdue} sub="past due date" icon={CalendarClock} accent="rose" />
        <StatCard label="Closure rate" value={`${progress}%`} sub={`${resolved} resolved`} icon={CheckCircle2} accent="green" />
      </div>
      <Card>
        <CardHeader
          title="Remediation queue"
          subtitle="Gaps and findings ordered by due date"
          action={
            <div className="flex w-40 items-center gap-2">
              <ProgressBar value={progress} color="bg-emerald-400" />
            </div>
          }
        />
        <CardBody>
          <DataTable columns={columns} rows={remediation} searchPlaceholder="Search remediation items..." initialSort={{ key: 'due', dir: 'asc' }} />
        </CardBody>
      </Card>
    </div>
  );
}
