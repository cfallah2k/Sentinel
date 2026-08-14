import { FileText, SearchCheck, FileCheck2 } from 'lucide-react';
import { ComplianceModuleHeader } from '@/components/governance/compliance-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import ExportCsvButton from '@/components/ui/export-button';
import { complianceEvidence } from '@/lib/mock-data';

export default function Page() {
  const rows = complianceEvidence.map((e) => ({ ...e }));
  const valid = rows.filter((r) => r.status === 'Valid').length;
  const needsReview = rows.filter((r) => r.status === 'Needs Review').length;
  const expired = rows.filter((r) => r.status === 'Expired').length;

  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'id', label: 'Item', sortValue: (r) => r.id, render: (r) => <span className="font-medium text-sky-300">{r.id}</span> },
    { key: 'title', label: 'Title', sortValue: (r) => r.title },
    { key: 'type', label: 'Type', sortValue: (r) => r.type, render: (r) => <Badge label={r.type} tone="slate" /> },
    { key: 'uploadedBy', label: 'Uploaded by', sortValue: (r) => r.uploadedBy },
    { key: 'date', label: 'Date', sortValue: (r) => r.date },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> }
  ];

  return (
    <div className="space-y-8">
      <ComplianceModuleHeader
        title="Compliance Evidence"
        description="Artifacts collected to demonstrate control implementation — policy exports, reports, configurations and audit records."
        active="/compliance/evidence"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Evidence items" value={rows.length} sub="in the library" icon={FileText} accent="sky" />
        <StatCard label="Valid" value={valid} sub="ready for audit" icon={FileCheck2} accent="green" />
        <StatCard label="Needs review" value={needsReview} sub={`${expired} expired`} icon={SearchCheck} accent="amber" />
      </div>
      <Card>
        <CardHeader
          title="Evidence library"
          subtitle="All artifacts linked to mapped controls"
          action={
            <ExportCsvButton
              label="Export evidence"
              filename="compliance-evidence"
              rows={rows.map((e) => ({ id: e.id, title: e.title, type: e.type, uploadedBy: e.uploadedBy, date: e.date, status: e.status }))}
            />
          }
        />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search evidence..." initialSort={{ key: 'date', dir: 'desc' }} />
        </CardBody>
      </Card>
    </div>
  );
}
