import Link from 'next/link';
import { CheckCircle2, ListChecks, ShieldAlert, XCircle } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { ModuleNav } from './module-nav';
import { auditNavItems, countBy, logsFor, type AuditCategory } from './audit-helpers';

export default function AuditCategoryPage({
  active,
  title,
  description,
  category
}: {
  active: string;
  title: string;
  description: string;
  category?: AuditCategory;
}) {
  const counts = countBy(category);
  const rows = logsFor(category).map((l) => ({ ...l }));
  const columns: {
    key: string;
    label: string;
    sortValue?: (row: (typeof rows)[number]) => string | number;
    render?: (row: (typeof rows)[number]) => React.ReactNode;
  }[] = [
    {
      key: 'timestamp',
      label: 'Timestamp',
      sortValue: (r) => r.timestamp,
      render: (r) => <span className="whitespace-nowrap">{r.timestamp.slice(0, 16).replace('T', ' ')}</span>
    },
    { key: 'actor', label: 'Actor', sortValue: (r) => r.actor },
    {
      key: 'id',
      label: 'Event',
      sortValue: (r) => r.id,
      render: (r) => (
        <Link href={`/audit/${r.id}`} className="font-medium text-sky-300 transition hover:text-sky-200">
          {r.id}
        </Link>
      )
    },
    { key: 'action', label: 'Action', sortValue: (r) => r.action, render: (r) => <span className="font-mono text-[0.7rem]">{r.action}</span> },
    { key: 'resource', label: 'Resource', sortValue: (r) => r.resource },
    { key: 'ip', label: 'IP', sortValue: (r) => r.ip },
    {
      key: 'result',
      label: 'Result',
      sortValue: (r) => r.result,
      render: (r) => <Badge label={r.result} tone={toneForStatus(r.result)} />
    }
  ];

  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Governance" title={title} description={description} />
      <ModuleNav items={auditNavItems} active={active} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Events" value={counts.total} delta={12} deltaLabel="vs yesterday" icon={ListChecks} accent="sky" />
        <StatCard label="Successful" value={counts.success} delta={Math.round((counts.success / Math.max(1, counts.total)) * 100)} deltaLabel="of events" icon={CheckCircle2} accent="green" />
        <StatCard label="Denied" value={counts.denied} delta={-8} deltaLabel="this week" icon={ShieldAlert} accent="amber" />
        <StatCard label="Errors" value={counts.error} delta={0} deltaLabel="unchanged" icon={XCircle} accent="rose" />
      </div>
      <Card>
        <CardHeader title={title} subtitle="Filtered audit events with full context" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search events, actors, resources..." initialSort={{ key: 'timestamp', dir: 'desc' }} />
        </CardBody>
      </Card>
    </div>
  );
}