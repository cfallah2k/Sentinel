'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import Modal from './modal';

export interface QuickCreateField {
  name: string;
  label: string;
  type?: 'text' | 'select';
  options?: string[];
  placeholder?: string;
  defaultValue?: string;
}

export default function QuickCreateModal({
  open,
  onClose,
  title,
  description,
  fields,
  submitLabel = 'Create',
  onCreate
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  fields: QuickCreateField[];
  submitLabel?: string;
  onCreate: (values: Record<string, string>) => void;
}) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.name, f.defaultValue ?? '']))
  );

  const valid = fields.every((f) => (values[f.name] ?? '').trim().length > 0);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      size="sm"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!valid}
            onClick={() => {
              onCreate(values);
              setValues(Object.fromEntries(fields.map((f) => [f.name, f.defaultValue ?? ''])));
              onClose();
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-sentinel-500 px-4 py-2 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus className="h-3.5 w-3.5" size={14} />
            {submitLabel}
          </button>
        </>
      }
    >
      <div className="space-y-3">
        {fields.map((f) =>
          f.type === 'select' ? (
            <label key={f.name} className="block">
              <span className="mb-1 block text-[0.65rem] font-semibold uppercase tracking-wider text-slate-500">{f.label}</span>
              <select
                value={values[f.name] ?? ''}
                onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-slate-950/75 px-3 py-2 text-xs text-slate-200 outline-none transition focus:border-sentinel-500/60"
              >
                <option value="" disabled>
                  Select...
                </option>
                {f.options?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <label key={f.name} className="block">
              <span className="mb-1 block text-[0.65rem] font-semibold uppercase tracking-wider text-slate-500">{f.label}</span>
              <input
                type="text"
                value={values[f.name] ?? ''}
                onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                placeholder={f.placeholder}
                className="w-full rounded-xl border border-white/10 bg-slate-950/75 px-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 outline-none transition focus:border-sentinel-500/60"
              />
            </label>
          )
        )}
      </div>
    </Modal>
  );
}