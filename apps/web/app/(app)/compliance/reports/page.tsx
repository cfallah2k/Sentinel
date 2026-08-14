import { FileBarChart, FileText, FileCheck2 } from 'lucide-react';
import { ComplianceModuleHeader } from '@/components/governance/compliance-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import ExportCsvButton from '@/components/ui/export-button';
import { reports } from '@/lib/mock-data';

export default function Page() {
  const rows = reports
    .filter((r) => r.type === 'Compliance')
    .map((r) => ({ ...r }));

  const ready = rows.filter((r) => r.status === 'Ready').length;
  const scheduled = rows.filter((r) => r.status === 'Scheduled').length;

  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'name', label: 'Report', sortValue: (r) => r.name, render: (r) => <span className="font-medium text-white">{r.name}</span> },
    { key: 'type', label: 'Type', sortValue: (r) => r.type, render: (r) => <Badge label={r.type} tone="slate" /> },
    { key: 'schedule', label: 'Schedule', sortValue: (r) => r.schedule },
    { key: 'format', label: 'Format', sortValue: (r) => r.format },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> },
    { key: 'lastRun', label: 'Last run', sortValue: (r) => r.lastRun },
    { key: 'recipients', label: 'Recipients', sortValue: (r) => r.recipients }
  ];

  return (
    <div className="space-y-8">
      <ComplianceModuleHeader
        title="Compliance Reports"
        description="Audit-ready reports covering framework coverage, evidence and gap posture across the organization."
        active="/compliance/reports"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Compliance reports" value={rows.length} sub="in the library" icon={FileBarChart} accent="sky" />
        <StatCard label="Ready" value={ready} sub="available now" icon={FileCheck2} accent="green" />
        <StatCard label="Scheduled" value={scheduled} sub="on a cadence" icon={FileText} accent="amber" />
      </div>
      <Card>
        <CardHeader
          title="Report library"
          subtitle="Compliance reports and their delivery schedules"
          action={
            <ExportCsvButton
              label="Export report list"
              filename="compliance-reports"
              rows={rows.map((r) => ({ name: r.name, type: r.type, schedule: r.schedule, format: r.format, status: r.status, lastRun: r.lastRun, recipients: r.recipients }))}
            />
          }
        />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search reports..." initialSort={{ key: 'name', dir: 'asc' }} />
        </CardBody>
      </Card>
    </div>
  );
}
