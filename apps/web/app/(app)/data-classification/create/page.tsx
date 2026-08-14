'use client';

import { useState } from 'react';
import { CheckCircle2, Layers, ScanSearch } from 'lucide-react';
import { PageHeader, SecondaryButton } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { SectionCard, Field, TextInput } from '@/components/platform/settings-form';
import { ClassificationNav } from '@/components/data-intel/classification-shared';
import { classRows, detectorRows } from '@/components/data-intel/derived';

export default function Page() {
  const [category, setCategory] = useState(classRows[0]?.name ?? '');
  const [detector, setDetector] = useState(detectorRows[0]?.name ?? '');
  const [name, setName] = useState('');
  const [action, setAction] = useState('Redact');
  const [submitted, setSubmitted] = useState(false);

  const valid = name.trim().length > 0;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="Create Classification"
        description="Define a new classification label or attach a detector to an existing category."
        actions={
          <>
            <SecondaryButton href="/data-classification/test">Test detectors</SecondaryButton>
            <SecondaryButton href="/data-classification/rules">Review rules</SecondaryButton>
          </>
        }
      />
      <ClassificationNav active="Create" />

      {submitted ? (
        <div className="rounded-3xl border border-emerald-500/25 bg-emerald-500/10 px-6 py-8 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" size={40} />
          <h2 className="mt-4 text-lg font-semibold text-white">Classification created</h2>
          <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-400">
            <span className="font-semibold text-slate-200">{name}</span> was created under {category} with the {detector} detector and{' '}
            <span className="font-semibold text-slate-200">{action}</span> enforcement.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setName('');
            }}
            className="mt-5 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
          >
            Create another
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <SectionCard title="Step 1 — Choose a base category" description="New labels inherit controls from a level.">
              <Field label="Base category">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950/75 px-3.5 py-2.5 text-xs text-slate-200 outline-none transition focus:border-sentinel-500/60"
                >
                  {classRows.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name} (S{c.sensitivity})
                    </option>
                  ))}
                </select>
              </Field>
            </SectionCard>

            <SectionCard title="Step 2 — Attach a detector" description="Detection engine used to match payloads.">
              <Field label="Detector">
                <select
                  value={detector}
                  onChange={(e) => setDetector(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950/75 px-3.5 py-2.5 text-xs text-slate-200 outline-none transition focus:border-sentinel-500/60"
                >
                  {detectorRows.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} — {d.accuracy}% accuracy
                    </option>
                  ))}
                </select>
              </Field>
            </SectionCard>

            <SectionCard title="Step 3 — Configure enforcement" description="How the gateway treats payloads matching the new label.">
              <Field label="Classification label">
                <TextInput value={name} onChange={setName} placeholder="e.g. Financial statements" />
              </Field>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { name: 'Block', note: 'Reject the request before it reaches any model', color: 'border-rose-500/30 bg-rose-500/10 text-rose-300' },
                  { name: 'Redact', note: 'Strip matched values, then allow the payload', color: 'border-amber-500/30 bg-amber-500/10 text-amber-300' },
                  { name: 'Require Approval', note: 'Queue the request for human review', color: 'border-violet-500/30 bg-violet-500/10 text-violet-300' }
                ].map((o) => (
                  <button
                    key={o.name}
                    type="button"
                    onClick={() => setAction(o.name)}
                    className={`rounded-2xl border p-4 text-left transition ${action === o.name ? `${o.color} ring-1 ring-current` : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]'}`}
                  >
                    <p className="text-xs font-semibold text-white">{o.name}</p>
                    <p className="mt-1 text-[0.65rem] leading-5 text-slate-400">{o.note}</p>
                  </button>
                ))}
              </div>
            </SectionCard>
          </div>

          <Card className="h-fit">
            <CardHeader title="Summary" subtitle="The label as it will be configured" />
            <CardBody className="space-y-3">
              {[
                { label: 'Category', value: category },
                { label: 'Detector', value: detector },
                { label: 'Label', value: name || '—' },
                { label: 'Enforcement', value: action }
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-2.5">
                  <span className="text-[0.65rem] uppercase tracking-wider text-slate-500">{row.label}</span>
                  <span className="max-w-[60%] truncate text-xs font-semibold text-slate-200">{row.value}</span>
                </div>
              ))}
              <div className="flex flex-wrap gap-2 pt-1">
                <Badge label="Draft" tone="amber" />
                <Badge label="Gateway enforcement" tone="blue" />
              </div>
              <button
                type="button"
                disabled={!valid}
                onClick={() => setSubmitted(true)}
                className="w-full rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Create classification
              </button>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}