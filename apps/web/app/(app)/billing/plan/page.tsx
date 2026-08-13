import { Layers } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { PlanCard } from '@/components/platform/plan-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { billingPlans, currentOrg } from '@/lib/mock-data';

export default function Page() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Billing"
        title="Plan"
        description="Your current tier and the options available."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Current plan" value={currentOrg.plan} icon={Layers} accent="sky" sub="Enterprise tier" />
        <StatCard label="Seats" value={`${currentOrg.seats} / 100`} icon={Layers} accent="violet" sub="42 used" />
        <StatCard label="Renewal" value="Sep 1, 2026" icon={Layers} accent="amber" sub="Monthly billing" />
        <StatCard label="Contract" value="Monthly" icon={Layers} accent="green" sub="No lock-in" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {billingPlans.map((p) => (
          <PlanCard key={p.id} plan={p} current={p.id === 'plan-enterprise'} featured={p.id === 'plan-enterprise'} />
        ))}
      </div>

      <Card>
        <CardHeader title="Enterprise extras" subtitle="Available on request for the Enterprise tier" />
        <CardBody>
          <div className="flex flex-wrap gap-2">
            {['Custom contract terms', 'Data residency in EU', 'Multi-org workspaces', 'Usage-based overage', 'Priority SLA 99.95%', 'Dedicated CSM'].map((f) => (
              <Badge key={f} label={f} tone="blue" />
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}