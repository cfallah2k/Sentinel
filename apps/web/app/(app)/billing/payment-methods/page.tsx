'use client';

import { useState } from 'react';
import { CreditCard, Plus } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { SectionCard, Field, TextInput, SelectInput, SaveButton } from '@/components/platform/settings-form';

const cards = [
  { id: 'card-1', brand: 'Visa', last4: '4242', expiry: '08/28', holder: 'Amara Okafor', primary: true, status: 'Active' },
  { id: 'card-2', brand: 'Mastercard', last4: '1188', expiry: '03/27', holder: 'Nexora Industries', primary: false, status: 'Active' }
];

export default function Page() {
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [holder, setHolder] = useState('');

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Billing"
        title="Payment Methods"
        description="Cards and billing details used for your subscription."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((c) => (
          <div key={c.id} className="rounded-3xl border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 shadow-panel backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sentinel-500/20 bg-sentinel-500/10 text-sentinel-300">
                <CreditCard className="h-5 w-5" />
              </div>
              {c.primary ? <Badge label="Primary" tone="green" /> : <Badge label="Backup" tone="slate" />}
            </div>
            <p className="mt-4 font-mono text-lg tracking-widest text-white">•••• {c.last4}</p>
            <p className="mt-1 text-[0.65rem] text-slate-500">{c.brand} · expires {c.expiry} · {c.holder}</p>
            <div className="mt-4 flex gap-2">
              {!c.primary ? (
                <button type="button" className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[0.65rem] font-semibold text-slate-300 transition hover:bg-white/10">
                  Make primary
                </button>
              ) : null}
              <button type="button" className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[0.65rem] font-semibold text-slate-300 transition hover:bg-white/10">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <SectionCard title="Add a card" description="New cards are validated immediately with a $1 hold.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Card number">
            <TextInput value={number} onChange={setNumber} placeholder="4242 4242 4242 4242" />
          </Field>
          <Field label="Expiry">
            <TextInput value={expiry} onChange={setExpiry} placeholder="MM/YY" />
          </Field>
          <Field label="Cardholder">
            <TextInput value={holder} onChange={setHolder} placeholder="Name on card" />
          </Field>
        </div>
        <div className="mt-4 flex justify-end">
          <button type="button" className="inline-flex items-center gap-1.5 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400">
            <Plus className="h-3.5 w-3.5" /> Add card
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Billing details" description="Legal entity and address for invoices.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Legal entity">
            <TextInput value="Nexora Industries, Inc." onChange={() => {}} />
          </Field>
          <Field label="Country">
            <SelectInput value="US" onChange={() => {}} options={[{ value: 'US', label: 'United States' }, { value: 'GB', label: 'United Kingdom' }, { value: 'DE', label: 'Germany' }]} />
          </Field>
        </div>
        <div className="mt-4 flex justify-end">
          <SaveButton label="Save details" />
        </div>
      </SectionCard>
    </div>
  );
}