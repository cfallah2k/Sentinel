import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { AdminShell } from '@/components/admin/page-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { BarSeries } from '@/components/ui/charts';
import { InvoicesTable, revenueSeries } from '@/components/admin/sections';
import { CreditCard, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { invoices, platformOrganizations } from '@/lib/mock-data';

export default function Page() {
  const paid = invoices.filter((i) => i.status === 'Paid').reduce((s, i) => s + i.amount, 0);
  const failed = invoices.filter((i) => i.status === 'Failed').reduce((s, i) => s + i.amount, 0);
  return (
    <AdminShell>
      <PageHeader
        eyebrow="Admin"
        title="Billing"
        description="Revenue collection, invoice history, and payment health."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Collected" value={`$${paid.toLocaleString()}`} icon={CreditCard} accent="green" />
        <StatCard label="Failed Payments" value={`$${failed.toLocaleString()}`} icon={AlertCircle} accent="rose" />
        <StatCard label="MRR" value={`$${platformOrganizations.filter((o) => o.status === 'Active').reduce((s, o) => s + o.mrr, 0).toLocaleString()}`} icon={TrendingUp} accent="sky" />
        <StatCard label="Paid Invoices" value={`${invoices.filter((i) => i.status === 'Paid').length}/${invoices.length}`} icon={CheckCircle2} accent="cyan" />
      </div>
      <Card>
        <CardHeader title="Monthly Revenue" subtitle="Invoice amounts by billing period" />
        <CardBody>
          <BarSeries data={revenueSeries()} dataKey="revenue" xKey="name" height={220} />
        </CardBody>
      </Card>
      <InvoicesTable rows={invoices} title="Invoice History" subtitle="All platform invoices" />
    </AdminShell>
  );
}