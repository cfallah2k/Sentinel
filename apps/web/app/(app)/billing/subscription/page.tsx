'use client';

import { useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { SectionCard, Field, SelectInput, SaveButton } from '@/components/platform/settings-form';
import { currentOrg } from '@/lib/mock-data';

export default function Page() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [renewal, setRenewal] = useState('auto');

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Billing"
        title="Subscription"
        description="Renewal schedule, seats and billing cycle for your plan."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Status" value="Active" icon={CalendarDays} accent="green" sub="Renews Sep 1, 2026" />
        <StatCard label="Cycle" value="Monthly" icon={CalendarDays} accent="sky" sub="$1,499 / mo" />
        <StatCard label="Seats" value={`${currentOrg.seats} / 100`} icon={CalendarDays} accent="violet" sub="Enterprise limit" />
        <StatCard label="Next charge" value="$1,499" icon={CalendarDays} accent="amber" sub="Sep 1, 2026" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Renewal progress" subtitle="Days remaining in this cycle" />
          <CardBody>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">18</span>
              <span className="text-xs text-slate-500">days left of 30</span>
            </div>
            <ProgressBar value={(12 / 30) * 100} color="bg-sky-400" className="mt-3" />
            <p className="mt-3 text-[0.65rem] text-slate-500">Cycle started Aug 1. Autopay will charge the primary card.</p>
          </CardBody>
        </Card>

        <SectionCard title="Cycle preferences" description="How your subscription renews.">
          <div className="space-y-4">
            <Field label="Billing cycle">
              <SelectInput value={billingCycle} onChange={setBillingCycle} options={[{ value: 'monthly', label: 'Monthly — $1,499/mo' }, { value: 'annual', label: 'Annual — save 20%' }]} />
            </Field>
            <Field label="Renewal">
              <SelectInput value={renewal} onChange={setRenewal} options={[{ value: 'auto', label: 'Auto-renew' }, { value: 'manual', label: 'Manual renew' }, { value: 'cancel', label: 'Cancel at cycle end' }]} />
            </Field>
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 text-xs text-slate-400">
              Plan: <span className="font-semibold text-slate-200">{currentOrg.plan}</span> · started {currentOrg.created}
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="flex justify-end">
        <SaveButton />
      </div>
    </div>
  );
}