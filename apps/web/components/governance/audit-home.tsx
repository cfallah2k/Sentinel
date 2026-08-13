import Link from 'next/link';
import { Activity, CheckCircle2, FolderSearch, ShieldAlert, Download } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { AreaTrend, DonutChart } from '@/components/ui/charts';
import { ModuleNav } from './module-nav';
import { auditNavItems, eventSeries24h, resultDonut, countBy, logsFor } from './audit-helpers';

export default function AuditHome({ active }: { active: string }) {
  const counts = countBy();
  const rows = logsFor().map((l) => ({ ...l }));
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
      <PageHeader
        eyebrow="Governance"
        title="Audit Trail"
        description="Immutable event history across the control plane — policy changes, system approvals, data access and administrative actions."
      />
      <ModuleNav items={auditNavItems} active={active} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Events 24h" value={counts.total} delta={12} deltaLabel="vs yesterday" icon={FolderSearch} accent="sky" />
        <StatCard label="Security events" value={countBy('security').total} delta={-15} deltaLabel="this week" icon={ShieldAlert} accent="amber" />
        <StatCard label="Policy events" value={countBy('policy-events').total} delta={8} deltaLabel="this week" icon={Activity} accent="violet" />
        <StatCard label="Export runs" value={countBy('data-access').total} delta={0} deltaLabel="scheduled next" icon={Download} accent="green" />
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Event volume" subtitle="All control plane events over the last 24 hours" />
          <CardBody>
            <AreaTrend data={eventSeries24h()} dataKey="events" xKey="hour" color="#38bdf8" height={220} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Outcome distribution" subtitle="Result breakdown across events" />
          <CardBody>
            <DonutChart data={resultDonut()} />
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Recent events" subtitle="Latest activity across the organization" action={<Badge label={`${counts.success} succeeded`} tone="green" />} />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search events, actors, resources..." initialSort={{ key: 'timestamp', dir: 'desc' }} />
        </CardBody>
      </Card>
    </div>
  );
}