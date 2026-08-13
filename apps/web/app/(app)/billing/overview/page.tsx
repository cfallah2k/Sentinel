import { CreditCard } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AreaTrend, BarSeries, DonutChart } from '@/components/ui/charts';
import { dailySeries, usageByApp, usageByProvider, invoices, currentOrg } from '@/lib/mock-data';

export default function Page() {
  const monthlyCost = 1499;
  const used = 82;
  const usageCost = usageByApp.reduce((s, u) => s + u.cost, 0);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Billing"
        title="Billing Overview"
        description="Your spend, quota and payment posture at a glance."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Spend (30d)" value={`$${usageCost.toLocaleString()}`} icon={CreditCard} accent="sky" sub="Across all providers" />
        <StatCard label="Plan cost" value={`$${monthlyCost}/mo`} icon={CreditCard} accent="violet" sub={currentOrg.plan} />
        <StatCard label="Invoice" value={invoices[0].status} icon={CreditCard} accent="green" sub={invoices[0].number} />
        <StatCard label="Balance" value="$0.00" icon={CreditCard} accent="emerald" sub="No outstanding charges" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Request volume" subtitle="Daily gateway requests, last 30 days" />
          <CardBody>
            <AreaTrend data={dailySeries} dataKey="requests" xKey="date" color="#38bdf8" height={230} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Cost by provider" subtitle="Estimated monthly spend" />
          <CardBody>
            <DonutChart data={usageByProvider.map((p) => ({ name: p.name, value: p.cost }))} height={210} />
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Quota utilization" subtitle="Monthly request allowance" />
          <CardBody>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">82%</span>
              <span className="text-xs text-slate-500">of 10M requests</span>
            </div>
            <ProgressBar value={used} color="bg-amber-400" className="mt-3" />
            <p className="mt-3 text-[0.65rem] text-slate-500">Projected to hit 100% on Aug 28 at current pace.</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Cost by application" subtitle="Top consuming apps" />
          <CardBody>
            <BarSeries data={usageByApp.map((a) => ({ name: a.name.length > 14 ? `${a.name.slice(0, 13)}…` : a.name, value: a.cost }))} dataKey="value" color="#a78bfa" height={200} />
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Billing health" subtitle="Automated checks" />
        <CardBody>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { label: 'Card on file', status: 'Active', tone: 'green' },
              { label: 'Autopay', status: 'Enabled', tone: 'green' },
              { label: 'Next invoice', status: 'Sep 1, 2026', tone: 'blue' }
            ].map((c) => (
              <div key={c.label} className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3.5">
                <p className="text-[0.65rem] text-slate-500">{c.label}</p>
                <div className="mt-1"><Badge label={c.status} tone={c.tone as 'green' | 'blue'} /></div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}