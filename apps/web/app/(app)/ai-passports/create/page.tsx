'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { PageHeader, SecondaryButton } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { SectionCard, Field, TextInput, SelectInput } from '@/components/platform/settings-form';
import { PassportNav } from '@/components/data-intel/passport-shared';
import { passports } from '@/components/data-intel/derived';

export default function Page() {
  const [system, setSystem] = useState(passports[0]?.name ?? '');
  const [purpose, setPurpose] = useState('');
  const [retention, setRetention] = useState('90');
  const [owner, setOwner] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const valid = system && purpose.trim() && owner.trim();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="Create Passport"
        description="Issue a data-handling declaration for a new AI system. The passport captures purpose, data types, retention and accountable owner."
        actions={
          <>
            <SecondaryButton href="/ai-passports/import">Import instead</SecondaryButton>
            <SecondaryButton href="/ai-passports">Back to registry</SecondaryButton>
          </>
        }
      />
      <PassportNav active="Create" />

      {submitted ? (
        <div className="rounded-3xl border border-emerald-500/25 bg-emerald-500/10 px-6 py-8 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" size={40} />
          <h2 className="mt-4 text-lg font-semibold text-white">Passport created</h2>
          <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-400">
            The passport for <span className="font-semibold text-slate-200">{system}</span> is now in <span className="font-semibold text-emerald-300">Pending Review</span>.
            The accountable owner will be asked to certify it before it becomes active.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-5 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
          >
            Create another
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <SectionCard title="System identity" description="Link the passport to a registered system.">
              <Field label="System">
                <SelectInput
                  value={system}
                  onChange={setSystem}
                  options={passports.map((p) => ({ value: p.name, label: `${p.name} (${p.version})` }))}
                />
              </Field>
              <Field label="Purpose & scope" hint="Statement of why the system processes data">
                <TextInput value={purpose} onChange={setPurpose} placeholder="e.g. Fraud detection on payment history" />
              </Field>
            </SectionCard>

            <SectionCard title="Declaration" description="Retention and accountability.">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Retention policy">
                  <SelectInput
                    value={retention}
                    onChange={setRetention}
                    options={[{ value: '30', label: '30 days' }, { value: '90', label: '90 days' }, { value: '365', label: '365 days' }, { value: 'custom', label: 'Custom' }]}
                  />
                </Field>
                <Field label="Accountable owner">
                  <TextInput value={owner} onChange={setOwner} placeholder="e.g. Maya Chen" />
                </Field>
              </div>
            </SectionCard>
          </div>

          <Card className="h-fit">
            <CardHeader title="Ready to certify?" subtitle="Review the declaration before submitting" />
            <CardBody className="space-y-3">
              {[
                { label: 'System', value: system || '—' },
                { label: 'Purpose', value: purpose || '—' },
                { label: 'Retention', value: retention === 'custom' ? 'Custom' : `${retention} days` },
                { label: 'Owner', value: owner || '—' }
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-2.5">
                  <span className="text-[0.65rem] uppercase tracking-wider text-slate-500">{row.label}</span>
                  <span className="max-w-[60%] truncate text-xs font-semibold text-slate-200">{row.value}</span>
                </div>
              ))}
              <div className="flex flex-wrap gap-2 pt-1">
                <Badge label="Draft" tone="amber" />
                <Badge label="GDPR" tone="blue" />
                <Badge label="EU AI Act" tone="blue" />
              </div>
              <button
                type="button"
                disabled={!valid}
                onClick={() => setSubmitted(true)}
                className="w-full rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Create passport
              </button>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}