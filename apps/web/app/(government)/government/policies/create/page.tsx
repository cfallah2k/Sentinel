'use client';

import { useState } from 'react';
import { CheckCircle2, FilePlus2, Save } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ConfirmDialog from '@/components/ui/confirm-dialog';

const steps = [
  { label: 'Define intent', detail: 'State the data protection or risk outcome the policy must enforce.' },
  { label: 'Select decisions', detail: 'Choose from Allow, Block, Redact, Require Approval, or Log.' },
  { label: 'Bind scope', detail: 'Target systems, providers, data categories, or environments.' },
  { label: 'Set conditions', detail: 'Add match conditions such as region, risk tier, or application.' },
  { label: 'Simulate & review', detail: 'Preview enforcement impact before publishing to the gateway.' }
];

export default function Page() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [decision, setDecision] = useState('Block');
  const [scope, setScope] = useState('All AI systems');
  const [confirmPublish, setConfirmPublish] = useState(false);
  const [done, setDone] = useState<{ kind: 'Draft' | 'Published' } | null>(null);

  const valid = name.trim().length > 0 && description.trim().length > 0;

  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="Create Policy"
        description="Author a new regulatory policy for the AI gateway."
      />

      {done ? (
        <div className="rounded-3xl border border-emerald-500/25 bg-emerald-500/10 px-6 py-8 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" size={40} />
          <h2 className="mt-4 text-lg font-semibold text-white">Policy {done.kind === 'Draft' ? 'saved as draft' : 'published'}</h2>
          <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-400">
            <span className="font-semibold text-slate-200">{name}</span> — <span className="font-semibold text-slate-200">{decision}</span> on{' '}
            <span className="font-semibold text-slate-200">{scope}</span>.{' '}
            {done.kind === 'Draft'
              ? 'It is listed under draft policies and can be published from there.'
              : 'It is now enforced by the gateway across its bound scope.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setDone(null);
              setName('');
              setDescription('');
            }}
            className="mt-5 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
          >
            Create another
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader title="Policy Definition" subtitle="Fields required to draft a new policy" />
            <CardBody className="space-y-4">
              <label className="block">
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Block Health Data Outside EU"
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-sentinel-500/60"
                />
              </label>
              <label className="block">
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Description</span>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What this policy prevents or permits"
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-2.5 text-xs leading-5 text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-sentinel-500/60"
                />
              </label>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Decision</span>
                  <select
                    value={decision}
                    onChange={(e) => setDecision(e.target.value)}
                    className="mt-1.5 w-full rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-2.5 text-xs text-slate-200 outline-none transition focus:border-sentinel-500/60"
                  >
                    {['Block', 'Redact', 'Require Approval', 'Allow', 'Log'].map((d) => <option key={d}>{d}</option>)}
                  </select>
                </label>
                <label className="block">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Scope</span>
                  <select
                    value={scope}
                    onChange={(e) => setScope(e.target.value)}
                    className="mt-1.5 w-full rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-2.5 text-xs text-slate-200 outline-none transition focus:border-sentinel-500/60"
                  >
                    {['All AI systems', 'External providers', 'High/Critical risk systems', 'Health data', 'Employee data'].map((s) => <option key={s}>{s}</option>)}
                  </select>
                </label>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={!valid}
                  onClick={() => setDone({ kind: 'Draft' })}
                  className="inline-flex items-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
                >
                  <Save className="h-4 w-4" /> Save Draft
                </button>
                <button
                  type="button"
                  disabled={!valid}
                  onClick={() => setConfirmPublish(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
                >
                  <FilePlus2 className="h-4 w-4" /> Publish
                </button>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Authoring Flow" subtitle="Draft lifecycle" />
            <CardBody className="space-y-4">
              {steps.map((s, i) => (
                <div key={s.label} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-sky-500/30 bg-sky-500/10 text-[0.65rem] font-bold text-sky-300">{i + 1}</span>
                  <div>
                    <p className="text-xs font-semibold text-white">{s.label}</p>
                    <p className="mt-0.5 text-[0.65rem] leading-4 text-slate-400">{s.detail}</p>
                  </div>
                </div>
              ))}
              <Badge label="Draft v1" tone="amber" />
            </CardBody>
          </Card>
        </div>
      )}

      <ConfirmDialog
        open={confirmPublish}
        title="Publish policy"
        description="Publishing enforces this policy on the gateway immediately across its bound scope. This cannot be undone."
        confirmLabel="Publish"
        onClose={() => setConfirmPublish(false)}
        onConfirm={() => {
          setConfirmPublish(false);
          setDone({ kind: 'Published' });
        }}
      />
    </GovShell>
  );
}