import { Receipt } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { invoices } from '@/lib/mock-data';

type Row = {
  id: string;
  number: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Failed';
};

export default function Page() {
  const rows: Row[] = invoices.map((i) => ({ ...i }));

  const columns: Column<Row>[] = [
    {
      key: 'number',
      label: 'Invoice',
      sortValue: (r) => r.number,
      render: (r) => (
        <Link href={`/billing/invoices/${r.id}`} className="font-medium text-slate-200 transition hover:text-sentinel-300">
          {r.number}
        </Link>
      )
    },
    { key: 'date', label: 'Date', sortValue: (r) => r.date },
    { key: 'amount', label: 'Amount', sortValue: (r) => r.amount, render: (r) => <span className="font-mono text-slate-200">${r.amount.toLocaleString()}.00</span> },
    { key: 'status', label: 'Status', tone: (r) => toneForStatus(r.status), render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Billing"
        title="Invoices"
        description="Payment history and receipts for your subscription."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="All time" value={`$${invoices.reduce((s, i) => s + i.amount, 0).toLocaleString()}`} icon={Receipt} accent="sky" sub={`${invoices.length} invoices`} />
        <StatCard label="Paid" value={invoices.filter((i) => i.status === 'Paid').length} icon={Receipt} accent="green" sub="Successful" />
        <StatCard label="Pending" value={invoices.filter((i) => i.status === 'Pending').length} icon={Receipt} accent="amber" sub="Awaiting payment" />
        <StatCard label="Failed" value={invoices.filter((i) => i.status === 'Failed').length} icon={Receipt} accent="rose" sub="Card declined" />
      </div>

      <Card>
        <CardHeader title="Payment history" subtitle="Chronological list of invoices" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search invoice number..." initialSort={{ key: 'date', dir: 'desc' }} />
        </CardBody>
      </Card>
    </div>
  );
}