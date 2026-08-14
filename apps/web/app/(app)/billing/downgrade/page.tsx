'use client';

import { useState } from 'react';
import { ArrowDown, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlanCard } from '@/components/platform/plan-card';
import { billingPlans } from '@/lib/mock-data';
import ConfirmDialog from '@/components/ui/confirm-dialog';

const losses = [
  'SSO + SCIM provisioning',
  'Custom data retention',
  'SLA 99.9% with credits',
  'Dedicated support (shift to email)'
];

export default function Page() {
  const growth = billingPlans.find((p) => p.id === 'plan-growth')!;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [scheduled, setScheduled] = useState(false);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Billing"
        title="Downgrade"
        description="Move to a smaller tier. Changes take effect at the next cycle."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Current" value="Enterprise" icon={ArrowDown} accent="slate" sub="$1,499 / mo" />
        <StatCard label="After downgrade" value="Growth" icon={ArrowDown} accent="sky" sub="$249 / mo" />
        <StatCard label="Savings" value="$1,250/mo" icon={ArrowDown} accent="green" sub="Effective Sep 1" />
        <StatCard label="Seat impact" value="17 seats" icon={ArrowDown} accent="rose" sub="25-seat limit" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div>
          <PlanCard plan={growth} />
        </div>
        <Card>
          <CardHeader title="You will lose" subtitle="Features that go away on Sep 1" />
          <CardBody>
            <ul className="space-y-2.5">
              {losses.map((l) => (
                <li key={l} className="flex items-center gap-2 text-xs text-rose-300">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                  {l}
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-xs text-amber-200">
              17 members exceed the Growth seat limit. You'll need to remove or reassign them before the change.
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="flex justify-end">
        {scheduled ? (
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-5 py-3 text-xs font-semibold text-emerald-300">
            <CheckCircle2 className="h-4 w-4" /> Downgrade to Growth scheduled for Sep 1
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="rounded-full border border-amber-500/30 bg-amber-500/10 px-6 py-3 text-xs font-semibold text-amber-300 transition hover:bg-amber-500/20"
          >
            Schedule downgrade for Sep 1
          </button>
        )}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          setScheduled(true);
          setConfirmOpen(false);
        }}
        title="Schedule downgrade to Growth?"
        description="will take effect on Sep 1. Features above are disabled at that time."
        confirmLabel="Schedule downgrade"
      />
    </div>
  );
}