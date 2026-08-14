'use client';

import { useState } from 'react';
import { Coins } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionCard, Field, TextInput } from '@/components/platform/settings-form';
import ConfirmDialog from '@/components/ui/confirm-dialog';

type Credit = {
  id: string;
  source: string;
  amount: number;
  added: string;
  expires: string;
  status: string;
};

const initialCredits: Credit[] = [
  { id: 'cr-1', source: 'Top-up', amount: 500, added: '2026-07-14', expires: '2026-10-14', status: 'Available' },
  { id: 'cr-2', source: 'Promotional', amount: 120, added: '2026-06-01', expires: '2026-09-01', status: 'Available' },
  { id: 'cr-3', source: 'Overage refund', amount: 200, added: '2026-05-12', expires: '2026-08-12', status: 'Partially used' }
];

export default function Page() {
  const [topup, setTopup] = useState('500');
  const [credits, setCredits] = useState<Credit[]>(initialCredits);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const amount = parseInt(topup, 10);
  const valid = !Number.isNaN(amount) && amount >= 50 && amount % 50 === 0;
  const available = credits.filter((c) => c.status !== 'Expired').reduce((s, c) => s + c.amount, 0);
  const used = 400;

  const handleTopUp = () => {
    setCredits((prev) => [
      ...prev,
      {
        id: `cr-${Date.now()}`,
        source: 'Top-up',
        amount,
        added: new Date().toISOString().slice(0, 10),
        expires: '2027-08-13',
        status: 'Available'
      }
    ]);
    setConfirmOpen(false);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Billing"
        title="Credits"
        description="Prepaid balances that offset future invoices automatically."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Available" value={`$${available}`} icon={Coins} accent="green" sub={`$${available} usable`} />
        <StatCard label="Used this cycle" value={`$${used}`} icon={Coins} accent="sky" sub="Applied to Aug invoice" />
        <StatCard label="Expiring soon" value="$120" icon={Coins} accent="amber" sub="Within 30 days" />
        <StatCard label="Lifetime" value={`$${1200 + credits.reduce((s, c) => s + c.amount, 0)}`} icon={Coins} accent="violet" sub="Credits granted" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Balance timeline" subtitle="How credits were consumed" />
          <CardBody>
            <div className="space-y-3">
              {[
                { label: 'Aug 1 — monthly invoice', amount: -280, date: '2026-08-01' },
                { label: 'Jul 1 — monthly invoice', amount: -120, date: '2026-07-01' },
                { label: 'Jul 14 — top-up', amount: 500, date: '2026-07-14' },
                { label: 'Jun 1 — promotional grant', amount: 120, date: '2026-06-01' },
                { label: 'May 12 — overage refund', amount: 200, date: '2026-05-12' }
              ].map((t) => (
                <div key={t.label} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-200">{t.label}</p>
                    <p className="text-[0.65rem] text-slate-500">{t.date}</p>
                  </div>
                  <span className={`font-mono text-sm font-semibold ${t.amount > 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                    {t.amount > 0 ? '+' : ''}{t.amount}
                  </span>
                </div>
              ))}
              {credits
                .filter((c) => c.source === 'Top-up' && c.added === new Date().toISOString().slice(0, 10))
                .map((c) => (
                  <div key={c.id} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                    <div>
                      <p className="text-xs font-semibold text-slate-200">Today — top-up</p>
                      <p className="text-[0.65rem] text-slate-500">{c.added}</p>
                    </div>
                    <span className="font-mono text-sm font-semibold text-emerald-300">+{c.amount}</span>
                  </div>
                ))}
            </div>
          </CardBody>
        </Card>

        <SectionCard title="Top up" description="Add balance in $50 increments. Never expires while the account is active.">
          <Field label="Amount">
            <TextInput value={topup} onChange={setTopup} type="number" />
          </Field>
          <button
            type="button"
            disabled={!valid}
            onClick={() => setConfirmOpen(true)}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Coins className="h-4 w-4" /> Add ${topup}
          </button>
          {!valid && topup ? <p className="mt-2 text-[0.65rem] text-rose-300">Enter a multiple of $50 (min $50).</p> : null}
        </SectionCard>
      </div>

      <Card>
        <CardHeader title="Credit ledger" subtitle="All balances and their expiry" />
        <CardBody>
          <div className="space-y-2.5">
            {credits.map((c) => (
              <div key={c.id} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                <div>
                  <p className="text-xs font-semibold text-slate-200">{c.source}</p>
                  <p className="text-[0.65rem] text-slate-500">Added {c.added} · expires {c.expires}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-semibold text-emerald-300">${c.amount}</span>
                  <Badge label={c.status} tone={c.status === 'Available' ? 'green' : 'amber'} />
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleTopUp}
        title={`Add $${amount} in credits?`}
        description={`will be charged to your primary card and available immediately.`}
        confirmLabel={`Add $${amount}`}
      />
    </div>
  );
}