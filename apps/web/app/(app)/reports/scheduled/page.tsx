import Link from 'next/link';
import { CalendarClock, CheckCircle2, Clock3, RefreshCw } from 'lucide-react';
import { PageHeader, PrimaryButton, SecondaryButton } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { ModuleNav } from '@/components/governance/module-nav';
import { reportsNavItems } from '@/components/governance/reports-home';
import { reports } from '@/lib/mock-data';
import type { Report } from '@/lib/mock-data';

function nextRun(report: Report): string {
  if (report.schedule === 'On-demand') return '—';
  if (report.status === 'Failed') return 'Today — retry queued';
  const d = new Date(`${report.lastRun}T00:00:00Z`);
  if (report.schedule === 'Daily') d.setUTCDate(d.getUTCDate() + 1);
  if (report.schedule === 'Weekly') d.setUTCDate(d.getUTCDate() + 7);
  if (report.schedule === 'Monthly') d.setUTCMonth(d.getUTCMonth() + 1);
  return d.toISOString().slice(0, 10);
}

const scheduledReports = reports.filter((r) => r.schedule !== 'On-demand');
const rows = scheduledReports.map((r) => ({ ...r, nextRun: nextRun(r) }));
const columns: Column<(typeof rows)[number]>[] = [
  {
    key: 'name',
    label: 'Report',
    sortValue: (r) => r.name,
    render: (r) => (
      <Link href={`/reports/${r.id}`} className="font-medium text-sky-300 transition hover:text-sky-200">
        {r.name}
      </Link>
    )
  },
  { key: 'schedule', label: 'Schedule', sortValue: (r) => r.schedule, render: (r) => <Badge label={r.schedule} tone={toneForStatus(r.schedule)} /> },
  { key: 'format', label: 'Format', sortValue: (r) => r.format },
  {
    key: 'status',
    label: 'Status',
    sortValue: (r) => r.status,
    render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} />
  },
  { key: 'nextRun', label: 'Next run', sortValue: (r) => r.nextRun },
  { key: 'lastRun', label: 'Last run', sortValue: (r) => r.lastRun },
  { key: 'recipients', label: 'Recipients', sortValue: (r) => r.recipients }
];

export default function Page() {
  const daily = scheduledReports.filter((r) => r.schedule === 'Daily').length;
  const weekly = scheduledReports.filter((r) => r.schedule === 'Weekly').length;
  const monthly = scheduledReports.filter((r) => r.schedule === 'Monthly').length;
  const failing = scheduledReports.filter((r) => r.status === 'Failed').length;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Governance"
        title="Scheduled Reports"
        description="Automated report deliveries with their next expected run across the organization."
        actions={
          <>
            <PrimaryButton href="/reports/create">Create Report</PrimaryButton>
            <SecondaryButton href="/reports/custom">Custom Builder</SecondaryButton>
          </>
        }
      />
      <ModuleNav items={reportsNavItems} active="/reports/scheduled" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Scheduled reports" value={scheduledReports.length} delta={20} deltaLabel="of catalog" icon={CalendarClock} accent="sky" />
        <StatCard label="Daily runs" value={daily} delta={0} deltaLabel="every day" icon={Clock3} accent="cyan" />
        <StatCard label="Weekly / monthly" value={weekly + monthly} delta={0} deltaLabel="cadence" icon={RefreshCw} accent="violet" />
        <StatCard label="Needs attention" value={failing} delta={0} deltaLabel="failed runs" icon={CheckCircle2} accent="rose" />
      </div>
      <Card>
        <CardHeader title="Delivery schedule" subtitle="Upcoming runs for automated reports" action={<Badge label={`${scheduledReports.length} active`} tone="green" />} />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search scheduled reports..." initialSort={{ key: 'nextRun', dir: 'asc' }} />
        </CardBody>
      </Card>
    </div>
  );
}
