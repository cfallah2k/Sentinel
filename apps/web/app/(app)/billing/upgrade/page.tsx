import { ArrowUp } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlanCard } from '@/components/platform/plan-card';
import { billingPlans, currentOrg } from '@/lib/mock-data';

export default function Page() {
  const current = billingPlans.find((p) => p.id === 'plan-enterprise')!;
  const alternatives = billingPlans.filter((p) => p.id !== 'plan-enterprise');

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Billing"
        title="Upgrade"
        description="More capacity, longer retention and enterprise controls."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Current" value={currentOrg.plan} icon={ArrowUp} accent="slate" sub="$1,499 / mo" />
        <StatCard label="Seats used" value="42 / 100" icon={ArrowUp} accent="amber" sub="42% of capacity" />
        <StatCard label="Requests used" value="82%" icon={ArrowUp} accent="amber" sub="of 10M quota" />
        <StatCard label="Prorated upgrade" value="Today" icon={ArrowUp} accent="green" sub="No annual commitment" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {alternatives.map((p) => (
          <PlanCard key={p.id} plan={p} actionHref="/billing/upgrade" />
        ))}
      </div>

      <Card>
        <CardHeader title="Custom enterprise" subtitle="For requirements beyond the published tiers" />
        <CardBody>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-4">
              <Badge label="Volume pricing" tone="blue" />
              <p className="mt-3 text-xs leading-5 text-slate-400">Over 100M requests per month qualifies for negotiated per-request pricing.</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-4">
              <Badge label="Custom retention" tone="blue" />
              <p className="mt-3 text-xs leading-5 text-slate-400">Extend audit and payload retention beyond 365 days to meet regulatory needs.</p>
            </div>
          </div>
          <button type="button" className="mt-5 rounded-full bg-sentinel-500 px-6 py-3 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400">
            Talk to sales
          </button>
        </CardBody>
      </Card>
    </div>
  );
}