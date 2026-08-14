import { Ticket } from 'lucide-react';
import Link from 'next/link';
import { PageHeader, PrimaryButton } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { supportTickets, type SupportTicket } from '@/components/platform/support-data';

type Row = SupportTicket & Record<string, unknown>;

export default function Page() {
  const rows: Row[] = supportTickets.map((t) => ({ ...t }));
  const open = supportTickets.filter((t) => !['Resolved', 'Closed'].includes(t.status)).length;

  const columns: Column<Row>[] = [
    {
      key: 'subject',
      label: 'Ticket',
      sortValue: (r) => r.subject,
      render: (r) => (
        <div>
          <Link href={`/support/tickets/${r.id}`} className="font-medium text-slate-200 transition hover:text-sentinel-300">
            {r.subject}
          </Link>
          <p className="mt-0.5 text-[0.65rem] text-slate-500">{r.id} · {r.category}</p>
        </div>
      )
    },
    { key: 'priority', label: 'Priority', tone: (r) => (r.priority === 'Critical' ? 'rose' : r.priority === 'High' ? 'amber' : r.priority === 'Medium' ? 'blue' : 'slate'), render: (r) => <Badge label={r.priority} tone={(r.priority === 'Critical' ? 'rose' : r.priority === 'High' ? 'amber' : r.priority === 'Medium' ? 'blue' : 'slate')} /> },
    { key: 'status', label: 'Status', tone: (r) => toneForStatus(r.status), render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> },
    { key: 'assignee', label: 'Assignee' },
    { key: 'updated', label: 'Updated', sortValue: (r) => r.updated, render: (r) => r.updated.slice(0, 10) }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Support"
        title="Tickets"
        description="Track every request your organization has sent."
        actions={<PrimaryButton href="/support/contact">New ticket</PrimaryButton>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total" value={supportTickets.length} icon={Ticket} accent="sky" sub="All requests" />
        <StatCard label="Open" value={open} icon={Ticket} accent="amber" sub="In active queue" />
        <StatCard label="Critical" value={supportTickets.filter((t) => t.priority === 'Critical' && !['Resolved', 'Closed'].includes(t.status)).length} icon={Ticket} accent="rose" sub="Priority response" />
        <StatCard label="Resolved" value={supportTickets.filter((t) => t.status === 'Resolved').length} icon={Ticket} accent="green" sub="Last 30 days" />
      </div>

      <Card>
        <CardHeader title="All tickets" subtitle="Searchable request history" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search subject, category or assignee..." initialSort={{ key: 'updated', dir: 'desc' }} />
        </CardBody>
      </Card>
    </div>
  );
}