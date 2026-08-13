'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, ChevronLeft, LayoutTemplate, Rocket } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/ui/page-header';

const inputCls =
  'w-full rounded-xl border border-white/10 bg-slate-950/75 px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15';

const templates = [
  { id: 'executive', name: 'Executive AI Governance Summary', blurb: 'Board-ready posture summary for executive stakeholders.', format: 'PDF' },
  { id: 'policy', name: 'Policy Enforcement Weekly', blurb: 'Enforcement and violation metrics across active policies.', format: 'CSV' },
  { id: 'incidents', name: 'Incident Response Metrics', blurb: 'Severity mix, SLA adherence and resolution trends.', format: 'PDF' },
  { id: 'compliance', name: 'Data Flow Compliance Report', blurb: 'Flow decisions and category coverage by data source.', format: 'PDF' },
  { id: 'usage', name: 'Provider Spend & Usage', blurb: 'Requests, tokens and cost broken down by provider.', format: 'JSON' },
  { id: 'risk', name: 'Risk Register Snapshot', blurb: 'Residual risk scores and open findings for the registry.', format: 'PDF' }
];

const stepLabels = ['Template', 'Details', 'Schedule', 'Review'];

export default function ReportWizard() {
  const [step, setStep] = useState(0);
  const [template, setTemplate] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [type, setType] = useState('Executive');
  const [description, setDescription] = useState('');
  const [format, setFormat] = useState('PDF');
  const [schedule, setSchedule] = useState('Monthly');
  const [time, setTime] = useState('06:00');
  const [recipients, setRecipients] = useState('');
  const [done, setDone] = useState(false);

  const canContinue = step === 0 ? template !== null : step === 1 ? name.trim().length > 0 : step === 2 ? recipients.trim().length > 0 : true;

  const pickTemplate = (id: string) => {
    const t = templates.find((x) => x.id === id);
    setTemplate(id);
    if (t) {
      setName(t.name);
      setFormat(t.format);
    }
  };

  if (done) {
    return (
      <Card>
        <CardBody className="flex flex-col items-center gap-4 py-14 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/30">
            <Check className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-semibold text-white">Report created</h2>
          <p className="max-w-md text-sm text-slate-400">
            {name} is scheduled for {schedule.toLowerCase()} delivery in {format} format. The first run will appear in the reports hub.
          </p>
          <Link href="/reports" className="mt-2 inline-flex items-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400">
            Back to reports
          </Link>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        eyebrow="Governance"
        title="Create Report"
        description="Start from a template and configure details, scheduling and delivery for a new report."
      />
      <div className="mt-6 flex items-center gap-2">
        {stepLabels.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-bold ${i < step ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/40' : i === step ? 'bg-sentinel-500/15 text-sentinel-300 ring-1 ring-sentinel-500/40' : 'bg-white/5 text-slate-500 ring-1 ring-white/10'}`}>
              {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </div>
            <span className={`hidden text-[0.65rem] font-semibold uppercase tracking-wide sm:block ${i === step ? 'text-white' : 'text-slate-500'}`}>{s}</span>
            {i < stepLabels.length - 1 ? <div className="h-px flex-1 bg-white/10" /> : null}
          </div>
        ))}
      </div>

      <Card className="mt-5">
        <CardHeader title={step === 0 ? 'Choose a template' : step === 1 ? 'Report details' : step === 2 ? 'Schedule & delivery' : 'Review'} subtitle={step === 0 ? 'A starting point you can customize' : step === 1 ? 'How this report is named and presented' : step === 2 ? 'Cadence and recipients for delivery' : 'Confirm the configuration before publishing'} />
        <CardBody>
          {step === 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {templates.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => pickTemplate(t.id)}
                  className={`flex flex-col gap-3 rounded-2xl border p-4 text-left transition ${
                    template === t.id ? 'border-sentinel-500/50 bg-sentinel-500/10' : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <LayoutTemplate className={`h-4 w-4 shrink-0 ${template === t.id ? 'text-sentinel-300' : 'text-slate-500'}`} />
                    {template === t.id ? <Check className="h-4 w-4 text-sentinel-300" /> : null}
                  </div>
                  <div>
                    <p className={`text-xs font-semibold ${template === t.id ? 'text-white' : 'text-slate-200'}`}>{t.name}</p>
                    <p className="mt-1 text-[0.7rem] leading-5 text-slate-500">{t.blurb}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge label={t.format} tone="slate" />
                  </div>
                </button>
              ))}
            </div>
          ) : null}

          {step === 1 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Report name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Executive AI Governance Summary" className={`${inputCls} mt-2`} />
              </div>
              <div>
                <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Category</label>
                <select value={type} onChange={(e) => setType(e.target.value)} className={`${inputCls} mt-2 appearance-none`}>
                  {['Executive', 'Governance', 'Policy', 'Incidents', 'Compliance', 'Usage', 'Risk'].map((t) => (
                    <option key={t} value={t} className="bg-slate-950">{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Format</label>
                <select value={format} onChange={(e) => setFormat(e.target.value)} className={`${inputCls} mt-2 appearance-none`}>
                  {['PDF', 'CSV', 'JSON'].map((f) => (
                    <option key={f} value={f} className="bg-slate-950">{f}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="What this report covers and who it is for" className={`${inputCls} mt-2 resize-y`} />
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Schedule</label>
                <select value={schedule} onChange={(e) => setSchedule(e.target.value)} className={`${inputCls} mt-2 appearance-none`}>
                  {['On-demand', 'Daily', 'Weekly', 'Monthly'].map((s) => (
                    <option key={s} value={s} className="bg-slate-950">{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Delivery time</label>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={`${inputCls} mt-2`} />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Recipients</label>
                <input value={recipients} onChange={(e) => setRecipients(e.target.value)} placeholder="Exec team, Security (6), finance@nexora.io" className={`${inputCls} mt-2`} />
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Configuration</p>
              <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <div>
                  <dt className="text-[0.65rem] uppercase tracking-wide text-slate-500">Name</dt>
                  <dd className="mt-0.5 text-xs text-slate-200">{name}</dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] uppercase tracking-wide text-slate-500">Category</dt>
                  <dd className="mt-0.5 text-xs text-slate-200">{type}</dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] uppercase tracking-wide text-slate-500">Format</dt>
                  <dd className="mt-0.5 text-xs text-slate-200">{format}</dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] uppercase tracking-wide text-slate-500">Schedule</dt>
                  <dd className="mt-0.5 text-xs text-slate-200">{schedule} at {time}</dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] uppercase tracking-wide text-slate-500">Recipients</dt>
                  <dd className="mt-0.5 text-xs text-slate-200">{recipients}</dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] uppercase tracking-wide text-slate-500">Template</dt>
                  <dd className="mt-0.5 text-xs text-slate-200">{templates.find((t) => t.id === template)?.name ?? 'Custom'}</dd>
                </div>
                {description ? (
                  <div className="sm:col-span-2">
                    <dt className="text-[0.65rem] uppercase tracking-wide text-slate-500">Description</dt>
                    <dd className="mt-0.5 text-xs leading-5 text-slate-200">{description}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
          ) : null}

          <div className="flex items-center justify-between border-t border-white/5 pt-5">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10 disabled:opacity-40"
            >
              <ChevronLeft className="h-3.5 w-3.5" /> Back
            </button>
            <button
              type="button"
              disabled={!canContinue}
              onClick={() => (step === stepLabels.length - 1 ? setDone(true) : setStep((s) => s + 1))}
              className="inline-flex items-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 disabled:opacity-40"
            >
              {step === stepLabels.length - 1 ? (
                <>
                  <Rocket className="h-3.5 w-3.5" /> Create report
                </>
              ) : (
                <>
                  Continue <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
