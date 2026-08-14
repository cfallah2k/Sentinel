import { FileSearch, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { ComplianceModuleHeader } from '@/components/governance/compliance-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { riskFindings } from '@/lib/mock-data';

export default function Page() {
  const rows = riskFindings.map((f) => ({ ...f }));
  const open = rows.filter((r) => r.status !== 'Resolved').length;
  const high = rows.filter((r) => r.severity === 'High' || r.severity === 'Critical').length;
  const resolved = rows.filter((r) => r.status === 'Resolved').length;

  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'id', label: 'Finding', sortValue: (r) => r.id, render: (r) => <span className="font-medium text-sky-300">{r.id}</span> },
    { key: 'title', label: 'Title', sortValue: (r) => r.title },
    { key: 'assessmentId', label: 'Assessment', sortValue: (r) => r.assessmentId },
    { key: 'severity', label: 'Severity', sortValue: (r) => r.severity, render: (r) => <Badge label={r.severity} tone={toneForStatus(r.severity)} /> },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> },
    { key: 'owner', label: 'Owner', sortValue: (r) => r.owner },
    { key: 'due', label: 'Due', sortValue: (r) => r.due }
  ];

  return (
    <div className="space-y-8">
      <ComplianceModuleHeader
        title="Compliance Findings"
        description="Findings raised from risk assessments that impact compliance posture, with owners and due dates."
        active="/compliance/findings"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total findings" value={rows.length} sub="from assessments" icon={FileSearch} accent="sky" />
        <StatCard label="Open" value={open} sub={`${high} high or critical`} icon={AlertTriangle} accent="amber" />
        <StatCard label="Resolved" value={resolved} sub="closed out" icon={CheckCircle2} accent="green" />
      </div>
      <Card>
        <CardHeader title="Findings register" subtitle="All findings mapped to assessments and owners" action={<Badge label={`${rows.length} findings`} tone="blue" />} />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search findings..." initialSort={{ key: 'severity', dir: 'desc' }} />
        </CardBody>
      </Card>
    </div>
  );
}
