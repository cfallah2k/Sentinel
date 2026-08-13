import { CreditCard } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { PlanCard } from '@/components/platform/plan-card';
import { currentOrg } from '@/lib/mock-data';

const modules = [
  { title: 'Overview', desc: 'Spend, quota and invoice summary', href: '/billing/overview', metric: 'Last invoice $1,499' },
  { title: 'Plan', desc: 'Current tier, features and seat limits', href: '/billing/plan', metric: 'Enterprise' },
  { title: 'Usage', desc: 'Requests, tokens and cost by app and provider', href: '/billing/usage', metric: '82% of quota' },
  { title: 'Invoices', desc: 'Payment history and receipts', href: '/billing/invoices', metric: '1 failed' },
  { title: 'Payment methods', desc: 'Cards and billing details on file', href: '/billing/payment-methods', metric: 'Visa •••• 4242' },
  { title: 'Subscription', desc: 'Renewal schedule and seat management', href: '/billing/subscription', metric: 'Renews Sep 1' },
  { title: 'Credits', desc: 'Prepaid balances and top-ups', href: '/billing/credits', metric: '$420 available' },
  { title: 'Limits', desc: 'Soft and hard caps for requests and spend', href: '/billing/limits', metric: '10M req/mo' },
  { title: 'Upgrade', desc: 'Compare tiers and request a quote', href: '/billing/upgrade', metric: '2 upgrades' },
  { title: 'Downgrade', desc: 'Move to a lower tier safely', href: '/billing/downgrade', metric: 'Available Sep 1' }
];

export default function Page() {
  const current = currentOrg.plan;
  const plan = { id: 'plan-enterprise', name: current, price: 1499, monthlyRequests: 10000000, users: 100, features: ['Everything in Growth', 'SSO + SCIM', 'Custom retention', 'Dedicated support', 'SLA 99.9%'] };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Billing"
        title="Billing"
        description="Manage your plan, payments, credits and usage limits."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Current plan" value={current} icon={CreditCard} accent="sky" sub="Enterprise tier" />
        <StatCard label="Monthly cost" value="$1,499" icon={CreditCard} accent="violet" sub="Renews Sep 1, 2026" />
        <StatCard label="Quota used" value="82%" icon={CreditCard} accent="amber" sub="8.2M of 10M requests" />
        <StatCard label="Credit balance" value="$420" icon={CreditCard} accent="green" sub="2.8% of MRR" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-1">
          <PlanCard plan={plan} current />
        </div>
        <div className="xl:col-span-2">
          <Card className="h-full">
            <CardHeader title="Billing areas" subtitle="Everything about your account's money" />
            <CardBody>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {modules.map((m) => (
                  <a key={m.title} href={m.href} className="group rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3.5 transition hover:border-sentinel-500/30 hover:bg-sentinel-500/5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-200 transition group-hover:text-sentinel-300">{m.title}</p>
                      <span className="text-[0.65rem] text-slate-500">{m.metric}</span>
                    </div>
                    <p className="mt-1 text-[0.7rem] text-slate-500">{m.desc}</p>
                  </a>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}