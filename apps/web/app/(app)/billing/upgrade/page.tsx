'use client';

import { useState } from 'react';
import { ArrowUp, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlanCard } from '@/components/platform/plan-card';
import { billingPlans, currentOrg } from '@/lib/mock-data';
import ConfirmDialog from '@/components/ui/confirm-dialog';
import Modal from '@/components/ui/modal';

export default function Page() {
  const current = billingPlans.find((p) => p.id === 'plan-enterprise')!;
  const alternatives = billingPlans.filter((p) => p.id !== 'plan-enterprise');
  const [pendingPlan, setPendingPlan] = useState<string | null>(null);
  const [switched, setSwitched] = useState<string | null>(null);
  const [salesOpen, setSalesOpen] = useState(false);
  const [salesSent, setSalesSent] = useState(false);

  const targetPlan = alternatives.find((p) => p.id === pendingPlan);

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
          <div key={p.id} className="relative">
            {switched === p.id ? (
              <div className="absolute inset-x-0 top-3 z-10 mx-auto w-fit">
                <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[0.65rem] font-semibold text-emerald-300">
                  <CheckCircle2 className="h-3 w-3" /> Switched
                </span>
              </div>
            ) : null}
            <PlanCard plan={p} actionOnClick={() => setPendingPlan(p.id)} />
          </div>
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
          <button
            type="button"
            onClick={() => {
              setSalesOpen(true);
              setSalesSent(false);
            }}
            className="mt-5 rounded-full bg-sentinel-500 px-6 py-3 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
          >
            Talk to sales
          </button>
        </CardBody>
      </Card>

      <ConfirmDialog
        open={pendingPlan !== null}
        onClose={() => setPendingPlan(null)}
        onConfirm={() => {
          if (pendingPlan) setSwitched(pendingPlan);
          setPendingPlan(null);
        }}
        title={`Switch to ${targetPlan?.name ?? 'this plan'}?`}
        description={`will be charged a prorated amount today at $${targetPlan?.price ?? 0}/mo.`}
        confirmLabel={`Switch to ${targetPlan?.name ?? 'plan'}`}
      />

      <Modal
        open={salesOpen}
        onClose={() => setSalesOpen(false)}
        title="Talk to sales"
        description="Our team will reach out within one business day."
        size="sm"
        footer={
          <>
            <button
              type="button"
              onClick={() => setSalesOpen(false)}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => setSalesSent(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-sentinel-500 px-4 py-2 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
            >
              {salesSent ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}
              {salesSent ? 'Request sent' : 'Request a call'}
            </button>
          </>
        }
      >
        <p className="text-xs leading-5 text-slate-400">
          Tell us about your scale and requirements — volume pricing, custom retention, dedicated infrastructure.
        </p>
      </Modal>
    </div>
  );
}