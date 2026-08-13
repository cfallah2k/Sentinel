import Link from 'next/link';
import { CalendarClock, CheckCircle2, FileText, FolderOpen } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { ModuleNav } from './module-nav';
import { ReportPreview } from './report-preview';
import { reportsNavItems } from './reports-home';
import { reports } from '@/lib/mock-data';

export default function ReportCategoryPage({
  active,
  title,
  description,
  types
}: {
  active: string;
  title: string;
  description: string;
  types: string[];
}) {
  const filtered = reports.filter((r) => types.includes(r.type));
  const latest = [...filtered].sort((a, b) => b.lastRun.localeCompare(a.lastRun))[0];
  const rows = filtered.map((r) => ({ ...r }));
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
    { key: 'type', label: 'Type', sortValue: (r) => r.type },
    { key: 'schedule', label: 'Schedule', sortValue: (r) => r.schedule },
    { key: 'format', label: 'Format', sortValue: (r) => r.format },
    {
      key: 'status',
      label: 'Status',
      sortValue: (r) => r.status,
      render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} />
    },
    { key: 'lastRun', label: 'Last run', sortValue: (r) => r.lastRun },
    { key: 'recipients', label: 'Recipients', sortValue: (r) => r.recipients }
  ];

  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Governance" title={title} description={description} />
      <ModuleNav items={reportsNavItems} active={active} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Reports" value={filtered.length} delta={Math.round((filtered.length / reports.length) * 100)} deltaLabel="of catalog" icon={FolderOpen} accent="sky" />
        <StatCard label="Scheduled" value={filtered.filter((r) => r.schedule !== 'On-demand').length} delta={0} deltaLabel="automated" icon={CalendarClock} accent="violet" />
        <StatCard label="Ready" value={filtered.filter((r) => r.status === 'Ready').length} delta={0} deltaLabel="delivered" icon={CheckCircle2} accent="green" />
        <StatCard label="Latest run" value={latest ? latest.lastRun.slice(5) : '—'} delta={0} deltaLabel={latest ? latest.name : 'no runs'} icon={FileText} accent="amber" />
      </div>
      <Card>
        <CardHeader title={`${title} reports`} subtitle="Reports in this category" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search reports..." initialSort={{ key: 'lastRun', dir: 'desc' }} />
        </CardBody>
      </Card>
      {latest ? (
        <Card>
          <CardHeader
            title={`Latest: ${latest.name}`}
            subtitle="Preview of the most recently generated report"
            action={
              <Link href={`/reports/${latest.id}`} className="text-xs font-semibold text-sky-300 transition hover:text-sky-200">
                Open report →
              </Link>
            }
          />
          <CardBody>
            <ReportPreview report={latest} />
          </CardBody>
        </Card>
      ) : null}
    </div>
  );
}