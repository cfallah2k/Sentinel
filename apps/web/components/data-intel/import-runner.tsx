'use client';

import { useState } from 'react';
import { CheckCircle2, Upload } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ImportRunner() {
  const [fileName, setFileName] = useState('');
  const [format, setFormat] = useState('CSV');
  const [ran, setRan] = useState(false);

  return (
    <div className="rounded-3xl border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl">
      {ran ? (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold text-white">Import staged — 0 rejected</p>
              <p className="mt-0.5 text-[0.65rem] text-slate-500">{fileName} validated against the declaration schema and staged as drafts.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge label="3 rows staged" tone="green" />
            <button
              type="button"
              onClick={() => {
                setRan(false);
                setFileName('');
              }}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/10"
            >
              Import another
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="mb-1 block text-[0.65rem] font-semibold uppercase tracking-wider text-slate-500">File</label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="declarations-2026-08.csv"
              className="w-full rounded-xl border border-white/10 bg-slate-950/75 px-3.5 py-2.5 text-xs text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15"
            />
          </div>
          <div className="sm:w-44">
            <label className="mb-1 block text-[0.65rem] font-semibold uppercase tracking-wider text-slate-500">Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-950/75 px-3.5 py-2.5 text-xs text-slate-200 outline-none transition focus:border-sentinel-500/60"
            >
              <option>CSV</option>
              <option>JSON</option>
              <option>Registry export</option>
            </select>
          </div>
          <button
            type="button"
            disabled={!fileName.trim()}
            onClick={() => setRan(true)}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Upload className="h-3.5 w-3.5" /> Run import
          </button>
        </div>
      )}
    </div>
  );
}