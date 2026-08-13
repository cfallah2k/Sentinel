'use client';

import { useState, type ReactNode } from 'react';
import { Check, Copy } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';

export function SectionCard({
  title,
  description,
  children,
  action
}: {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <Card>
      <CardHeader title={title} subtitle={description} action={action} />
      <CardBody>{children}</CardBody>
    </Card>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">{label}</span>
      <div className="mt-2">{children}</div>
      {hint ? <span className="mt-1.5 block text-[0.7rem] text-slate-500">{hint}</span> : null}
    </label>
  );
}

const inputCls =
  'w-full rounded-xl border border-white/10 bg-slate-950/75 px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15';

export function TextInput({
  value,
  onChange,
  placeholder,
  type = 'text',
  disabled
}: {
  value: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      className={`${inputCls} disabled:opacity-50`}
    />
  );
}

export function TextAreaInput({
  value,
  onChange,
  placeholder,
  rows = 3
}: {
  value: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      rows={rows}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      className={`${inputCls} resize-y`}
    />
  );
}

export function SelectInput({
  value,
  onChange,
  options
}: {
  value: string;
  onChange?: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select value={value} onChange={(e) => onChange?.(e.target.value)} className={`${inputCls} appearance-none`}>
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-slate-950">
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function Toggle({
  label,
  hint,
  checked,
  onChange
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange?.(!checked)}
      className="flex w-full items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 text-left transition hover:bg-white/[0.05]"
    >
      <span>
        <span className="block text-sm font-medium text-slate-200">{label}</span>
        {hint ? <span className="mt-0.5 block text-[0.7rem] text-slate-500">{hint}</span> : null}
      </span>
      <span
        className={`relative h-6 w-11 shrink-0 rounded-full border transition ${
          checked ? 'border-sentinel-500/50 bg-sentinel-500/30' : 'border-white/10 bg-white/10'
        }`}
      >
        <span
          className={`absolute top-0.5 h-4.5 w-4.5 rounded-full bg-white transition-all ${checked ? 'left-[22px]' : 'left-0.5'}`}
        />
      </span>
    </button>
  );
}

export function SaveButton({ label = 'Save Changes', onSaved }: { label?: string; onSaved?: () => void }) {
  const [saved, setSaved] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        onSaved?.();
        setSaved(true);
        setTimeout(() => setSaved(false), 1600);
      }}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold transition sm:text-sm ${
        saved
          ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/40'
          : 'bg-sentinel-500 text-white shadow-glow hover:bg-sentinel-400'
      }`}
    >
      {saved ? <Check className="h-4 w-4" /> : null}
      {saved ? 'Saved' : label}
    </button>
  );
}

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[0.65rem] font-semibold text-slate-300 transition hover:bg-white/10"
    >
      {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}