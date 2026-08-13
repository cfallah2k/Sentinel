'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Save } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';

export interface SettingsField {
  key: string;
  label: string;
  description?: string;
  type: 'toggle' | 'select' | 'text';
  options?: string[];
  defaultValue?: string | boolean;
}

const inputCls =
  'w-full rounded-xl border border-white/10 bg-slate-950/75 px-3.5 py-2.5 text-xs text-slate-200 outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15';

export function SettingsForm({ sections, backHref }: { sections: { title: string; description?: string; fields: SettingsField[] }[]; backHref: string }) {
  const [values, setValues] = useState<Record<string, string | boolean>>(() => {
    const v: Record<string, string | boolean> = {};
    for (const s of sections) {
      for (const f of s.fields) {
        v[f.key] = f.defaultValue ?? (f.type === 'toggle' ? true : '');
      }
    }
    return v;
  });
  const [saved, setSaved] = useState(false);

  const set = (key: string, value: string | boolean) => {
    setValues((v) => ({ ...v, [key]: value }));
    setSaved(false);
  };

  return (
    <div>
      <div className="space-y-5">
        {sections.map((section) => (
          <Card key={section.title}>
            <CardHeader title={section.title} subtitle={section.description} />
            <CardBody className="space-y-5">
              {section.fields.map((f) => (
                <div key={f.key} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-200">{f.label}</p>
                    {f.description ? <p className="mt-0.5 text-[0.65rem] text-slate-500">{f.description}</p> : null}
                  </div>
                  {f.type === 'toggle' ? (
                    <button
                      type="button"
                      onClick={() => set(f.key, !values[f.key])}
                      className={`relative h-6 w-11 shrink-0 rounded-full transition ${values[f.key] ? 'bg-sentinel-500' : 'bg-white/10'}`}
                      aria-label={f.label}
                    >
                      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${values[f.key] ? 'left-[22px]' : 'left-0.5'}`} />
                    </button>
                  ) : f.type === 'select' ? (
                    <select className={`${inputCls} max-w-56`} value={String(values[f.key])} onChange={(e) => set(f.key, e.target.value)}>
                      {f.options?.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  ) : (
                    <input className={`${inputCls} max-w-56`} type="text" value={String(values[f.key])} onChange={(e) => set(f.key, e.target.value)} />
                  )}
                </div>
              ))}
            </CardBody>
          </Card>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setSaved(true)}
          className="inline-flex items-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
        >
          <Save className="h-3.5 w-3.5" /> Save changes
        </button>
        <Link href={backHref} className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10">
          Cancel
        </Link>
        {saved ? <span className="text-[0.65rem] font-semibold text-emerald-300">Settings saved</span> : null}
      </div>
    </div>
  );
}