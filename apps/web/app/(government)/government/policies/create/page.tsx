import { PageHeader } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FilePlus2, Save } from 'lucide-react';

const steps = [
  { label: 'Define intent', detail: 'State the data protection or risk outcome the policy must enforce.' },
  { label: 'Select decisions', detail: 'Choose from Allow, Block, Redact, Require Approval, or Log.' },
  { label: 'Bind scope', detail: 'Target systems, providers, data categories, or environments.' },
  { label: 'Set conditions', detail: 'Add match conditions such as region, risk tier, or application.' },
  { label: 'Simulate & review', detail: 'Preview enforcement impact before publishing to the gateway.' }
];

export default function Page() {
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="Create Policy"
        description="Author a new regulatory policy for the AI gateway."
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Policy Definition" subtitle="Fields required to draft a new policy" />
          <CardBody className="space-y-4">
            <label className="block">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Name</span>
              <input type="text" placeholder="e.g. Block Health Data Outside EU" className="mt-1.5 w-full rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-sentinel-500/60" />
            </label>
            <label className="block">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Description</span>
              <textarea rows={3} placeholder="What this policy prevents or permits" className="mt-1.5 w-full rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-2.5 text-xs leading-5 text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-sentinel-500/60" />
            </label>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Decision</span>
                <select className="mt-1.5 w-full rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-2.5 text-xs text-slate-200 outline-none transition focus:border-sentinel-500/60">
                  {['Block', 'Redact', 'Require Approval', 'Allow', 'Log'].map((d) => <option key={d}>{d}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Scope</span>
                <select className="mt-1.5 w-full rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-2.5 text-xs text-slate-200 outline-none transition focus:border-sentinel-500/60">
                  {['All AI systems', 'External providers', 'High/Critical risk systems', 'Health data', 'Employee data'].map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" className="inline-flex items-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 sm:text-sm">
                <Save className="h-4 w-4" /> Save Draft
              </button>
              <button type="button" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10 sm:text-sm">
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
    </GovShell>
  );
}