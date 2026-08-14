import { CalendarDays, ShieldCheck, ClipboardList } from 'lucide-react';
import { ComplianceModuleHeader } from '@/components/governance/compliance-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { complianceFrameworks } from '@/lib/mock-data';

export default function Page() {
  const rows = complianceFrameworks
    .map((f) => ({
      id: f.id,
      name: f.name,
      standard: f.standard,
      status: f.status,
      nextAudit: f.nextAudit,
      passed: f.passed,
      failed: f.failed,
      evidence: f.evidence
    }))
    .sort((a, b) => a.nextAudit.localeCompare(b.nextAudit));

  const upcoming = rows.length;
  const onTrack = rows.filter((r) => r.status === 'On Track').length;
  const atRisk = rows.filter((r) => r.status !== 'On Track').length;

  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'name', label: 'Framework', sortValue: (r) => r.name, render: (r) => <span className="font-medium text-white">{r.name}</span> },
    { key: 'standard', label: 'Standard', sortValue: (r) => r.standard },
    { key: 'nextAudit', label: 'Next audit', sortValue: (r) => r.nextAudit },
    { key: 'passed', label: 'Passed', sortValue: (r) => r.passed },
    { key: 'failed', label: 'Failed', sortValue: (r) => r.failed },
    { key: 'evidence', label: 'Evidence', sortValue: (r) => r.evidence },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> }
  ];

  return (
    <div className="space-y-8">
      <ComplianceModuleHeader
        title="Compliance Audits"
        description="Upcoming audit schedule per framework, with pass/fail posture and evidence readiness."
        active="/compliance/audits"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Scheduled audits" value={upcoming} sub="across frameworks" icon={CalendarDays} accent="sky" />
        <StatCard label="On track" value={onTrack} sub="ready for audit" icon={ShieldCheck} accent="green" />
        <StatCard label="At risk" value={atRisk} sub="posture gaps remain" icon={ClipboardList} accent="amber" />
      </div>
      <Card>
        <CardHeader title="Audit schedule" subtitle="Ordered by next audit date" action={<Badge label={`${rows.length} scheduled`} tone="blue" />} />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search audits..." initialSort={{ key: 'nextAudit', dir: 'asc' }} />
        </CardBody>
      </Card>
    </div>
  );
}
