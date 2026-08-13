import { Layers, ScanSearch } from 'lucide-react';
import { PageHeader, PrimaryButton, SecondaryButton } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ClassificationNav } from '@/components/data-intel/classification-shared';
import { classRows, detectorRows } from '@/components/data-intel/derived';

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="Create Classification"
        description="Define a new classification label or attach a detector to an existing category."
        actions={
          <>
            <SecondaryButton href="/data-classification/test">Test detectors</SecondaryButton>
            <PrimaryButton href="/data-classification/rules">Review rules</PrimaryButton>
          </>
        }
      />
      <ClassificationNav active="Create" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Step 1 — Choose a base category" subtitle="New labels inherit controls from a level" />
          <CardBody className="space-y-2">
            {classRows.map((c) => (
              <div key={c.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 rounded-full ${c.color === 'emerald' ? 'bg-emerald-400' : c.color === 'sky' ? 'bg-sky-400' : c.color === 'amber' ? 'bg-amber-400' : 'bg-rose-400'}`} />
                  <div>
                    <p className="text-xs font-semibold text-white">{c.name}</p>
                    <p className="text-[0.65rem] text-slate-400">{c.systems} systems · S{c.sensitivity}</p>
                  </div>
                </div>
                <Badge label="Base" tone="slate" />
              </div>
            ))}
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Step 2 — Attach a detector" subtitle="Detection engines available to the new label" />
          <CardBody className="space-y-2">
            {detectorRows.slice(0, 6).map((d) => (
              <div key={d.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-slate-950 text-sky-300">
                    <ScanSearch className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-white">{d.name}</p>
                    <p className="font-mono text-[0.65rem] text-slate-500">{d.detector}</p>
                  </div>
                </div>
                <Badge label={`${d.accuracy}%`} tone="green" />
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Step 3 — Configure enforcement" subtitle="How the gateway treats payloads matching the new label" />
        <CardBody>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { name: 'Block', note: 'Reject the request before it reaches any model', tone: 'rose' },
              { name: 'Redact', note: 'Strip matched values, then allow the payload', tone: 'amber' },
              { name: 'Require Approval', note: 'Queue the request for human review', tone: 'violet' }
            ].map((o) => (
              <div key={o.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-semibold text-white">{o.name}</p>
                <p className="mt-1 text-[0.65rem] leading-5 text-slate-400">{o.note}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-slate-300">
                  <Layers className="h-3 w-3" />
                  Enforcement
                </span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}