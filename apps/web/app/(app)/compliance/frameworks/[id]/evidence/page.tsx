import { ComplianceFrameworkHeader } from '@/components/governance/compliance-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import ExportCsvButton from '@/components/ui/export-button';
import { complianceControls, complianceEvidence, complianceFrameworks } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const framework = complianceFrameworks.find((f) => f.id === id);
  if (!framework) {
    return (
      <Card>
        <CardBody className="py-14 text-center">
          <p className="text-sm font-semibold text-white">Framework not found</p>
          <p className="mt-1 text-xs text-slate-500">No framework exists with id {id}.</p>
        </CardBody>
      </Card>
    );
  }

  const controlIds = new Set(complianceControls.filter((c) => c.frameworkId === id).map((c) => c.id));
  const rows = complianceEvidence.filter((e) => controlIds.has(e.controlId)).map((e) => ({ ...e }));

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
      <ComplianceFrameworkHeader framework={framework} active={`/compliance/frameworks/${id}/evidence`} />
      <Card>
        <CardHeader
          title="Evidence"
          subtitle={`Artifacts supporting ${framework.name} controls`}
          action={
            <ExportCsvButton
              label="Export evidence"
              filename={`evidence-${framework.id}`}
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
