import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import InvoiceActions from '@/components/billing/invoice-actions';
import { invoices, currentOrg } from '@/lib/mock-data';

type Params = Promise<{ id: string }>;

const lineItems = [
  { id: 'li-1', label: 'Enterprise plan — monthly subscription', qty: '1 month', amount: 1499, period: 'Aug 1 – Sep 1, 2026' },
  { id: 'li-2', label: 'Overage requests (0 — under quota)', qty: '0', amount: 0, period: 'Aug 2026' },
  { id: 'li-3', label: 'Tax (0%)', qty: '—', amount: 0, period: 'Exempt' }
];

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;
  const invoice = invoices.find((i) => i.id === id) ?? invoices[0];
  const subTotal = lineItems.reduce((s, l) => s + l.amount, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Billing"
        title={invoice.number}
        description={`Issued ${invoice.date} · ${invoice.status}`}
        actions={
          <div className="flex items-center gap-2">
            <Badge label={invoice.status} tone={toneForStatus(invoice.status)} />
            <InvoiceActions number={invoice.number} amount={invoice.amount} date={invoice.date} />
          </div>
        }
      />

      <Card>
        <CardHeader title="Invoice details" subtitle="Billed to Nexora Industries" />
        <CardBody>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Invoice number', value: invoice.number },
              { label: 'Billing period', value: 'Aug 1 – Sep 1, 2026' },
              { label: 'Due date', value: invoice.date },
              { label: 'Customer', value: currentOrg.name }
            ].map((d) => (
              <div key={d.label} className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                <p className="text-[0.65rem] text-slate-500">{d.label}</p>
                <p className="mt-1 text-sm font-semibold text-slate-200">{d.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03] text-[0.65rem] uppercase tracking-[0.15em] text-slate-500">
                  <th className="px-4 py-2.5 font-medium">Description</th>
                  <th className="px-4 py-2.5 font-medium">Qty</th>
                  <th className="px-4 py-2.5 font-medium">Period</th>
                  <th className="px-4 py-2.5 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {lineItems.map((l) => (
                  <tr key={l.id}>
                    <td className="px-4 py-3 text-slate-300">{l.label}</td>
                    <td className="px-4 py-3 font-mono text-slate-400">{l.qty}</td>
                    <td className="px-4 py-3 text-slate-500">{l.period}</td>
                    <td className="px-4 py-3 text-right font-mono text-slate-200">${l.amount.toLocaleString()}.00</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-end">
            <div className="w-full max-w-xs space-y-2 text-xs">
              <div className="flex justify-between text-slate-400"><span>Subtotal</span><span className="font-mono">${subTotal.toLocaleString()}.00</span></div>
              <div className="flex justify-between text-slate-400"><span>Tax</span><span className="font-mono">$0.00</span></div>
              <div className="flex justify-between border-t border-white/10 pt-2 text-sm font-semibold text-white"><span>Total due</span><span className="font-mono">${invoice.amount.toLocaleString()}.00</span></div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
            <p className="text-[0.65rem] text-slate-500">Payment status</p>
            <Badge label={invoice.status} tone={toneForStatus(invoice.status)} />
          </div>

          {invoice.status === 'Failed' ? (
            <div className="mt-4 rounded-2xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-xs text-rose-300">
              This invoice could not be charged. Update your payment method or retry the charge.
              <Link href="/billing/payment-methods" className="ml-2 font-semibold underline underline-offset-2">Payment methods</Link>
            </div>
          ) : null}
        </CardBody>
      </Card>
    </div>
  );
}