'use client';

import { useState } from 'react';
import { CreditCard, Plus } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { SectionCard, Field, TextInput, SelectInput, SaveButton } from '@/components/platform/settings-form';
import ConfirmDialog from '@/components/ui/confirm-dialog';

type Card = {
  id: string;
  brand: string;
  last4: string;
  expiry: string;
  holder: string;
  primary: boolean;
  status: string;
};

const initialCards: Card[] = [
  { id: 'card-1', brand: 'Visa', last4: '4242', expiry: '08/28', holder: 'Amara Okafor', primary: true, status: 'Active' },
  { id: 'card-2', brand: 'Mastercard', last4: '1188', expiry: '03/27', holder: 'Nexora Industries', primary: false, status: 'Active' }
];

export default function Page() {
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [holder, setHolder] = useState('');
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [removeId, setRemoveId] = useState<string | null>(null);

  const handleAdd = () => {
    const digits = number.replace(/\D/g, '');
    if (digits.length < 4) return;
    setCards((prev) => [
      ...prev,
      {
        id: `card-${Date.now()}`,
        brand: digits.startsWith('5') ? 'Mastercard' : 'Visa',
        last4: digits.slice(-4),
        expiry: expiry || '—',
        holder: holder || 'Cardholder',
        primary: prev.length === 0,
        status: 'Active'
      }
    ]);
    setNumber('');
    setExpiry('');
    setHolder('');
  };

  const handleRemove = (id: string) => {
    setCards((prev) => {
      const next = prev.filter((c) => c.id !== id);
      if (prev.find((c) => c.id === id)?.primary && next.length > 0) {
        next[0].primary = true;
      }
      return next;
    });
    setRemoveId(null);
  };

  const handleMakePrimary = (id: string) => {
    setCards((prev) => prev.map((c) => ({ ...c, primary: c.id === id })));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Billing"
        title="Payment Methods"
        description="Cards and billing details used for your subscription."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((c) => (
          <div key={c.id} className="rounded-3xl border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl">
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
                <button
                  type="button"
                  onClick={() => handleMakePrimary(c.id)}
                  className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[0.65rem] font-semibold text-slate-300 transition hover:bg-white/10"
                >
                  Make primary
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => setRemoveId(c.id)}
                className="rounded-full border border-rose-500/25 bg-rose-500/10 px-3.5 py-1.5 text-[0.65rem] font-semibold text-rose-300 transition hover:bg-rose-500/20"
              >
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
          <button
            type="button"
            disabled={number.replace(/\D/g, '').length < 4}
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
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

      <ConfirmDialog
        open={removeId !== null}
        onClose={() => setRemoveId(null)}
        onConfirm={() => removeId && handleRemove(removeId)}
        title="Remove payment method?"
        description="will be removed from your account immediately."
        confirmLabel="Remove card"
      />
    </div>
  );
}