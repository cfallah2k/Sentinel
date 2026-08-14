import { ComplianceFrameworkHeader } from '@/components/governance/compliance-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { complianceFrameworks, complianceGaps } from '@/lib/mock-data';

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

  const rows = complianceGaps.filter((g) => g.frameworkId === id).map((g) => ({ ...g }));

  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'id', label: 'Gap', sortValue: (r) => r.id, render: (r) => <span className="font-medium text-sky-300">{r.id}</span> },
    { key: 'title', label: 'Description', sortValue: (r) => r.title },
    { key: 'severity', label: 'Severity', sortValue: (r) => r.severity, render: (r) => <Badge label={r.severity} tone={toneForStatus(r.severity)} /> },
    { key: 'owner', label: 'Owner', sortValue: (r) => r.owner },
    { key: 'due', label: 'Due', sortValue: (r) => r.due },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> }
  ];

  return (
    <div className="space-y-8">
      <ComplianceFrameworkHeader framework={framework} active={`/compliance/frameworks/${id}/gaps`} />
      <Card>
        <CardHeader title="Gaps" subtitle={`Open gaps against ${framework.name}`} action={<Badge label={`${rows.length} gaps`} tone="amber" />} />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search gaps..." initialSort={{ key: 'severity', dir: 'desc' }} />
        </CardBody>
      </Card>
    </div>
  );
}
