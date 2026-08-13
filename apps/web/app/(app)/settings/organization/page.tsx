'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { SectionCard, Field, TextInput, TextAreaInput, SaveButton } from '@/components/platform/settings-form';
import { currentOrg, currentUser } from '@/lib/mock-data';

export default function Page() {
  const [description, setDescription] = useState('Nexora Industries builds AI-powered financial services. Sentinel governs all AI traffic across 12 production systems.');
  const [website, setWebsite] = useState('https://nexora.io');
  const [billingEmail, setBillingEmail] = useState('finance@nexora.io');

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Platform"
        title="Organization"
        description="Profile details, seats and ownership for your organization."
        actions={<Badge label={`Plan: ${currentOrg.plan}`} tone="green" />}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          <SectionCard title="Profile" description="Public-facing organization information.">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sentinel-500/25 bg-sentinel-500/10 text-base font-bold text-sentinel-300">
                  {currentOrg.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{currentOrg.name}</p>
                  <p className="text-[0.65rem] text-slate-500">Organization ID: {currentOrg.id}</p>
                </div>
              </div>
              <Field label="Description">
                <TextAreaInput value={description} onChange={setDescription} rows={3} />
              </Field>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Website">
                  <TextInput value={website} onChange={setWebsite} type="url" />
                </Field>
                <Field label="Billing email">
                  <TextInput value={billingEmail} onChange={setBillingEmail} type="email" />
                </Field>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Ownership" description="Who owns this organization.">
            <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-sentinel-500/20 bg-sentinel-500/10 text-xs font-bold text-sentinel-300">
                {currentUser.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">{currentUser.name}</p>
                <p className="text-[0.65rem] text-slate-500">{currentUser.email} · {currentUser.title}</p>
              </div>
              <Badge label={currentUser.role} tone="blue" />
            </div>
          </SectionCard>
        </div>

        <div className="space-y-4">
          <SectionCard title="Account facts" description="Read-only identifiers.">
            <dl className="space-y-3">
              {[
                { label: 'Organization ID', value: currentOrg.id },
                { label: 'Created', value: currentOrg.created },
                { label: 'Region', value: currentOrg.region },
                { label: 'Seats', value: String(currentOrg.seats) },
                { label: 'Trial', value: currentOrg.trial ? 'Active' : 'Not applicable' }
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between text-xs">
                  <dt className="text-slate-500">{r.label}</dt>
                  <dd className="font-mono text-slate-200">{r.value}</dd>
                </div>
              ))}
            </dl>
          </SectionCard>
          <div className="flex justify-end">
            <SaveButton />
          </div>
        </div>
      </div>
    </div>
  );
}