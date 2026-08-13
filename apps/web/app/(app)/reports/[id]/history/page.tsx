import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import ReportHeader from '@/components/governance/report-header';
import { hashOf } from '@/components/governance/risk-helpers';
import { reports } from '@/lib/mock-data';
import type { Report } from '@/lib/mock-data';

function runHistory(report: Report) {
  const seed = hashOf(report.id);
  const statuses = ['Success', 'Success', 'Failed', 'Success', 'Success', 'Running'];
  const triggers = ['Scheduled', 'Manual', 'Scheduled', 'Scheduled', 'Scheduled', 'Manual'];
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(`${report.lastRun}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() - i * 7);
    return {
      id: `${report.id}-run-${String(100 + i)}`,
      started: `${d.toISOString().slice(0, 10)}T06:00:00Z`,
      status: statuses[(seed + i) % statuses.length],
      trigger: triggers[(seed + i) % triggers.length],
      duration: `${(seed % 45) + 15 + i * 4}s`,
      rows: ((seed % 12) + 3 + i * 2) * 1000,
      size: `${(seed % 40) + 18 + i * 6} MB`
    };
  });
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = reports.find((r) => r.id === id);
  if (!report) {
    return (
      <Card>
        <CardBody className="py-14 text-center">
          <p className="text-sm font-semibold text-white">Report not found</p>
          <p className="mt-1 text-xs text-slate-500">No report exists with id {id}.</p>
        </CardBody>
      </Card>
    );
  }
  const rows = runHistory(report);
  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'id', label: 'Run ID', sortValue: (r) => r.id },
    {
      key: 'started',
      label: 'Started',
      sortValue: (r) => r.started,
      render: (r) => <span className="whitespace-nowrap">{r.started.replace('T', ' ')}</span>
    },
    {
      key: 'status',
      label: 'Status',
      sortValue: (r) => r.status,
      render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} />
    },
    { key: 'trigger', label: 'Trigger', sortValue: (r) => r.trigger },
    { key: 'duration', label: 'Duration', sortValue: (r) => r.duration },
    { key: 'rows', label: 'Rows', sortValue: (r) => r.rows },
    { key: 'size', label: 'Size', sortValue: (r) => r.size }
  ];

  return (
    <div className="space-y-5">
      <ReportHeader report={report} active={`/reports/${id}/history`} />
      <Card>
        <CardHeader
          title="Run history"
          subtitle={`Last 6 runs of ${report.name}`}
          action={<Badge label={`${report.recipients}`} tone="slate" />}
        />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search runs..." initialSort={{ key: 'started', dir: 'desc' }} />
        </CardBody>
      </Card>
    </div>
  );
}
