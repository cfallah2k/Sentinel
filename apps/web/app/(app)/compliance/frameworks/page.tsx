import { ComplianceModuleHeader } from '@/components/governance/compliance-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { ProgressBar } from '@/components/ui/progress';
import FrameworkCard from '@/components/governance/framework-card';
import { complianceFrameworks } from '@/lib/mock-data';

export default function Page() {
  const rows = complianceFrameworks.map((f) => ({
    id: f.id,
    name: f.name,
    standard: f.standard,
    status: f.status,
    progress: f.progress,
    controls: f.controls,
    passed: f.passed,
    evidence: f.evidence,
    gaps: f.gaps,
    nextAudit: f.nextAudit
  }));
  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'name', label: 'Framework', sortValue: (r) => r.name, render: (r) => <span className="font-medium text-white">{r.name}</span> },
    { key: 'standard', label: 'Standard', sortValue: (r) => r.standard },
    {
      key: 'progress',
      label: 'Implementation',
      sortValue: (r) => r.progress,
      render: (r) => (
        <div className="flex w-32 items-center gap-2">
          <ProgressBar value={r.progress} color={r.status === 'Behind' ? 'bg-rose-400' : r.status === 'At Risk' ? 'bg-amber-400' : 'bg-sky-400'} />
          <span className="text-xs font-semibold text-white">{r.progress}%</span>
        </div>
      )
    },
    { key: 'controls', label: 'Controls', sortValue: (r) => r.controls },
    { key: 'passed', label: 'Passed', sortValue: (r) => r.passed },
    { key: 'gaps', label: 'Gaps', sortValue: (r) => r.gaps },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> },
    { key: 'nextAudit', label: 'Next audit', sortValue: (r) => r.nextAudit }
  ];

  return (
    <div className="space-y-8">
      <ComplianceModuleHeader
        title="Compliance Frameworks"
        description="Every standard Sentinel is aligning to, with live implementation coverage and audit schedules."
        active="/compliance/frameworks"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {complianceFrameworks.map((f) => (
          <FrameworkCard key={f.id} framework={f} />
        ))}
      </div>
      <Card>
        <CardHeader
          title="Framework register"
          subtitle="Coverage summary across all standards"
          action={<Badge label={`${rows.length} mapped`} tone="blue" />}
        />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search frameworks..." initialSort={{ key: 'progress', dir: 'desc' }} />
        </CardBody>
      </Card>
    </div>
  );
}
