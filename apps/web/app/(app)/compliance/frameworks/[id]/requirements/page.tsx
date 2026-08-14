import { ComplianceFrameworkHeader } from '@/components/governance/compliance-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { complianceControls, complianceFrameworks } from '@/lib/mock-data';

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

  const rows = complianceControls.filter((c) => c.frameworkId === id).map((c) => ({ ...c }));

  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'code', label: 'Code', sortValue: (r) => r.code, render: (r) => <span className="font-medium text-sky-300">{r.code}</span> },
    { key: 'name', label: 'Requirement', sortValue: (r) => r.name },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> },
    { key: 'evidence', label: 'Evidence', sortValue: (r) => r.evidence },
    { key: 'owner', label: 'Owner', sortValue: (r) => r.owner },
    { key: 'updated', label: 'Updated', sortValue: (r) => r.updated }
  ];

  return (
    <div className="space-y-8">
      <ComplianceFrameworkHeader framework={framework} active={`/compliance/frameworks/${id}/requirements`} />
      <Card>
        <CardHeader title="Framework requirements" subtitle={`Requirements imposed by ${framework.name}`} action={<Badge label={`${rows.length} requirements`} tone="blue" />} />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search requirements..." initialSort={{ key: 'code', dir: 'asc' }} />
        </CardBody>
      </Card>
    </div>
  );
}
