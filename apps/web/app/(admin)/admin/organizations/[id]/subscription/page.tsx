import { AdminShell } from '@/components/admin/page-shell';
import { OrgShell, findAdminOrg } from '@/components/admin/org-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress';
import { orgStatusTone, planTone } from '@/components/admin/orgs-table';
import { billingPlans, invoices } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const org = findAdminOrg(id);
  const plan = billingPlans.find((p) => p.name === org.plan) ?? billingPlans[2];
  return (
    <AdminShell>
      <OrgShell id={org.id} active="subscription">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader title="Current Plan" subtitle={`${plan.name} — $${plan.price}/month`} />
            <CardBody className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge label={plan.name} tone={planTone(plan.name)} />
                <Badge label={org.status} tone={orgStatusTone(org.status)} />
              </div>
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Monthly request allowance</span>
                  <span className="font-semibold text-white">{plan.monthlyRequests.toLocaleString()}</span>
                </div>
                <div className="mt-1.5">
                  <ProgressBar value={72} />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {plan.features.map((f) => (
                  <div key={f} className="rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-2.5 text-xs text-slate-300">
                    {f}
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Billing" subtitle="Recent invoices" />
            <CardBody className="divide-y divide-white/5">
              {invoices.slice(0, 4).map((inv) => (
                <div key={inv.id} className="flex items-center justify-between gap-3 py-3 text-xs">
                  <div>
                    <p className="font-mono text-sky-300">{inv.number}</p>
                    <p className="mt-0.5 text-slate-500">{inv.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">${inv.amount.toLocaleString()}</span>
                    <Badge label={inv.status} tone={inv.status === 'Paid' ? 'green' : inv.status === 'Pending' ? 'amber' : 'rose'} />
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </OrgShell>
    </AdminShell>
  );
}