import { Gauge } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress';
import { BarSeries, DonutChart, AreaTrend } from '@/components/ui/charts';
import { dailySeries, usageByApp, usageByProvider } from '@/lib/mock-data';

export default function Page() {
  const totalRequests = usageByApp.reduce((s, u) => s + u.requests, 0);
  const totalCost = usageByApp.reduce((s, u) => s + u.cost, 0);
  const totalTokens = usageByApp.reduce((s, u) => s + u.tokens, 0);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Billing"
        title="Usage"
        description="Consumption that drives your bill, broken down by app and provider."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Requests (30d)" value={totalRequests.toLocaleString()} icon={Gauge} accent="sky" sub="8.2% of quota" />
        <StatCard label="Tokens" value={`${(totalTokens / 1e6).toFixed(0)}M`} icon={Gauge} accent="violet" sub="Prompt + completion" />
        <StatCard label="Cost" value={`$${(totalCost / 100).toFixed(0)}`} icon={Gauge} accent="amber" sub="Provider spend" />
        <StatCard label="Cost per request" value="$0.0009" icon={Gauge} accent="green" sub="Blended rate" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Daily request volume" subtitle="Gateway traffic over the last 30 days" />
          <CardBody>
            <AreaTrend data={dailySeries} dataKey="requests" xKey="date" color="#38bdf8" height={220} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Share by provider" subtitle="Request mix" />
          <CardBody>
            <DonutChart data={usageByProvider.map((p) => ({ name: p.name, value: p.requests }))} height={210} />
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="By application" subtitle="Requests, tokens and cost per app" />
        <CardBody>
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <BarSeries data={usageByApp.map((a) => ({ name: a.name.length > 16 ? `${a.name.slice(0, 15)}…` : a.name, value: a.requests }))} dataKey="value" color="#34d399" height={220} />
            <div className="space-y-4">
              {usageByApp.map((a) => (
                <div key={a.name}>
                  <div className="mb-1 flex items-center justify-between text-[0.7rem]">
                    <span className="font-medium text-slate-300">{a.name}</span>
                    <span className="font-mono text-slate-500">{a.requests.toLocaleString()} req · ${(a.cost / 100).toFixed(0)}</span>
                  </div>
                  <ProgressBar value={(a.requests / Math.max(...usageByApp.map((u) => u.requests))) * 100} color="bg-emerald-400" />
                </div>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}