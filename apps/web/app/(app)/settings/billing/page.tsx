'use client';

import { useState } from 'react';
import { Receipt } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { SectionCard, Field, TextInput, SelectInput, Toggle, SaveButton } from '@/components/platform/settings-form';
import { billingPlans, currentOrg } from '@/lib/mock-data';
import { formatRequests, PlanCard } from '@/components/platform/plan-card';

export default function Page() {
  const [billingEmail, setBillingEmail] = useState('billing@nexora.io');
  const [currency, setCurrency] = useState('usd');
  const [invoiceEmail, setInvoiceEmail] = useState('finance@nexora.io');
  const [autopay, setAutopay] = useState(true);
  const [threshold, setThreshold] = useState('80');

  const current = billingPlans.find((p) => p.id === currentOrg.plan) ?? billingPlans[0];
  const recommended = billingPlans.find((p) => p.id === 'scale');

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Billing Settings"
        description="Plan, payment method and invoicing preferences."
        actions={<Badge label={currentOrg.plan} tone="blue" />}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <PlanCard plan={current} current />
        {recommended ? <PlanCard plan={recommended} /> : null}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <SectionCard title="Invoicing" description="Where invoices are sent.">
          <div className="space-y-4">
            <Field label="Billing contact">
              <TextInput value={billingEmail} onChange={setBillingEmail} type="email" />
            </Field>
            <Field label="Invoice recipients">
              <TextInput value={invoiceEmail} onChange={setInvoiceEmail} type="email" />
            </Field>
            <Field label="Currency">
              <SelectInput value={currency} onChange={setCurrency} options={[{ value: 'usd', label: 'USD ($)' }, { value: 'eur', label: 'EUR (€)' }, { value: 'gbp', label: 'GBP (£)' }]} />
            </Field>
          </div>
        </SectionCard>

        <SectionCard title="Payments" description="Autopay and budget alerts.">
          <div className="space-y-4">
            <Toggle label="Autopay enabled" hint="Card on file, renewed automatically" checked={autopay} onChange={setAutopay} />
            <Field label="Budget alert at">
              <SelectInput value={threshold} onChange={setThreshold} options={[{ value: '50', label: '50% of quota' }, { value: '80', label: '80% of quota' }, { value: '95', label: '95% of quota' }]} />
            </Field>
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 text-xs text-slate-400">
              Current plan quota: <span className="font-semibold text-slate-200">{formatRequests(current.monthlyRequests)}</span> requests/mo
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