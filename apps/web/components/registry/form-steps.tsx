'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { Card, CardBody } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'select' | 'textarea';
  options?: string[];
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
}

export interface FormStep {
  title: string;
  description: string;
  fields: FormField[];
}

const inputCls =
  'w-full rounded-xl border border-white/10 bg-slate-950/75 px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15';

function FieldControl({ field, value, invalid, onChange }: { field: FormField; value: string; invalid: boolean; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
        {field.label}
        {field.required ? <span className="ml-1 text-sentinel-300">*</span> : null}
      </label>
      {field.type === 'select' ? (
        <select className={`${inputCls} mt-1.5 appearance-none ${value ? '' : 'text-slate-500'}`} value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="" disabled>Select {field.label.toLowerCase()}...</option>
          {field.options?.map((o) => (
            <option key={o} value={o} className="text-slate-200">{o}</option>
          ))}
        </select>
      ) : field.type === 'textarea' ? (
        <textarea className={`${inputCls} mt-1.5 min-h-24 resize-y`} value={value} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className={`${inputCls} mt-1.5`} type="text" value={value} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />
      )}
      {invalid ? <p className="mt-1 text-[0.65rem] text-rose-400">This field is required before continuing.</p> : null}
    </div>
  );
}

export function StepperForm({
  eyebrow,
  title,
  description,
  steps,
  submitLabel,
  backHref
}: {
  eyebrow: string;
  title: string;
  description: string;
  steps: FormStep[];
  submitLabel: string;
  backHref: string;
}) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>(() => {
    const v: Record<string, string> = {};
    for (const s of steps) {
      for (const f of s.fields) v[f.name] = f.defaultValue ?? '';
    }
    return v;
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);

  const set = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    setTouched((t) => ({ ...t, [name]: true }));
  };

  const current = steps[step];
  const invalid = current.fields.filter((f) => f.required && !values[f.name].trim()).map((f) => f.name);

  const next = () => {
    if (invalid.length) {
      setTouched((t) => ({ ...t, ...Object.fromEntries(current.fields.map((f) => [f.name, true])) }));
      return;
    }
    if (step < steps.length - 1) setStep(step + 1);
    else setDone(true);
  };

  if (done) {
    return (
      <Card>
        <CardBody className="flex flex-col items-center gap-4 py-14 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/30">
            <Check className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-semibold text-white">{title} submitted</h2>
          <p className="max-w-md text-sm text-slate-400">
            The record has been queued for review. A security analyst will validate it before it appears in the registry.
          </p>
          <Link href={backHref} className="mt-2 inline-flex items-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400">
            Back to registry
          </Link>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-6 flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s.title} className="flex flex-1 items-center gap-2">
            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-bold ${i < step ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/40' : i === step ? 'bg-sentinel-500/15 text-sentinel-300 ring-1 ring-sentinel-500/40' : 'bg-white/5 text-slate-500 ring-1 ring-white/10'}`}>
              {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </div>
            <span className={`hidden text-[0.65rem] font-semibold uppercase tracking-wide sm:block ${i === step ? 'text-white' : 'text-slate-500'}`}>{s.title}</span>
            {i < steps.length - 1 ? <div className="h-px flex-1 bg-white/10" /> : null}
          </div>
        ))}
      </div>

      <Card className="mt-5">
        <CardBody className="space-y-5">
          <div>
            <h2 className="text-sm font-semibold text-white">{current.title}</h2>
            <p className="mt-0.5 text-xs text-slate-400">{current.description}</p>
          </div>
          {current.fields.length ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {current.fields.map((f) => (
                <div key={f.name} className={f.type === 'textarea' ? 'sm:col-span-2' : ''}>
                  <FieldControl field={f} value={values[f.name]} invalid={touched[f.name] && !values[f.name].trim()} onChange={(v) => set(f.name, v)} />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Review</p>
              <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {steps.flatMap((s) => s.fields).map((f) => (
                  <div key={f.name}>
                    <dt className="text-[0.65rem] uppercase tracking-wide text-slate-500">{f.label}</dt>
                    <dd className="mt-0.5 text-xs text-slate-200">{values[f.name] || '—'}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          <div className="flex items-center justify-between border-t border-white/5 pt-4">
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
              onClick={next}
              className="inline-flex items-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
            >
              {step === steps.length - 1 ? (
                <>
                  <ShieldCheck className="h-3.5 w-3.5" /> {submitLabel}
                </>
              ) : (
                <>
                  Continue <ChevronRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}