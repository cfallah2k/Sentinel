import { CheckCircle2, FileText, XCircle } from 'lucide-react';
import { ComplianceModuleHeader } from '@/components/governance/compliance-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { complianceControls, complianceFrameworks } from '@/lib/mock-data';

export default function Page() {
  const rows = complianceControls.map((c) => ({
    ...c,
    framework: complianceFrameworks.find((f) => f.id === c.frameworkId)?.name ?? c.frameworkId
  }));

  const implemented = rows.filter((r) => r.status === 'Implemented').length;
  const partial = rows.filter((r) => r.status === 'Partially Implemented').length;
  const notImplemented = rows.filter((r) => r.status === 'Not Implemented').length;

  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'code', label: 'Code', sortValue: (r) => r.code, render: (r) => <span className="font-medium text-sky-300">{r.code}</span> },
    { key: 'name', label: 'Requirement', sortValue: (r) => r.name },
    { key: 'framework', label: 'Framework', sortValue: (r) => r.framework },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> },
    { key: 'evidence', label: 'Evidence', sortValue: (r) => r.evidence },
    { key: 'owner', label: 'Owner', sortValue: (r) => r.owner }
  ];

  return (
    <div className="space-y-8">
      <ComplianceModuleHeader
        title="Compliance Requirements"
        description="The controls and obligations each framework imposes, tracked against implementation status."
        active="/compliance/requirements"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Implemented" value={implemented} sub="fully satisfied" icon={CheckCircle2} accent="green" />
        <StatCard label="Partially implemented" value={partial} sub="in progress" icon={FileText} accent="amber" />
        <StatCard label="Not implemented" value={notImplemented} sub="needs work" icon={XCircle} accent="rose" />
      </div>
      <Card>
        <CardHeader title="Requirements register" subtitle="All mapped controls across frameworks" action={<Badge label={`${rows.length} requirements`} tone="blue" />} />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search requirements..." initialSort={{ key: 'status', dir: 'asc' }} />
        </CardBody>
      </Card>
    </div>
  );
}
