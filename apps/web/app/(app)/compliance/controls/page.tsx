import { ComplianceModuleHeader } from '@/components/governance/compliance-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { ShieldCheck, ClipboardCheck, UserCog } from 'lucide-react';
import { complianceControls, complianceFrameworks } from '@/lib/mock-data';

export default function Page() {
  const rows = complianceControls.map((c) => ({
    ...c,
    framework: complianceFrameworks.find((f) => f.id === c.frameworkId)?.name ?? c.frameworkId
  }));

  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'code', label: 'Code', sortValue: (r) => r.code, render: (r) => <span className="font-medium text-sky-300">{r.code}</span> },
    { key: 'name', label: 'Control', sortValue: (r) => r.name },
    { key: 'framework', label: 'Framework', sortValue: (r) => r.framework },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> },
    { key: 'evidence', label: 'Evidence', sortValue: (r) => r.evidence },
    { key: 'owner', label: 'Owner', sortValue: (r) => r.owner },
    { key: 'updated', label: 'Updated', sortValue: (r) => r.updated }
  ];

  const owners = new Set(rows.map((r) => r.owner));

  return (
    <div className="space-y-8">
      <ComplianceModuleHeader
        title="Compliance Controls"
        description="Every control mapped across frameworks, with implementation state, evidence count and owner."
        active="/compliance/controls"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Controls mapped" value={rows.length} sub={`${owners.size} owners`} icon={ShieldCheck} accent="sky" />
        <StatCard label="Implemented" value={rows.filter((r) => r.status === 'Implemented').length} sub="evidence-backed" icon={ClipboardCheck} accent="green" />
        <StatCard label="Needs attention" value={rows.filter((r) => r.status !== 'Implemented').length} sub="partial or not started" icon={UserCog} accent="amber" />
      </div>
      <Card>
        <CardHeader
          title="Control register"
          subtitle="Implementation status for all mapped controls"
          action={
            <div className="flex items-center gap-2">
              <Badge label={`${rows.length} controls`} tone="blue" />
            </div>
          }
        />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search controls..." initialSort={{ key: 'status', dir: 'asc' }} />
        </CardBody>
      </Card>
    </div>
  );
}
