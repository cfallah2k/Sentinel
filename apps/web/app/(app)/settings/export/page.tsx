'use client';

import { useState } from 'react';
import { Download, FileJson } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { SectionCard, Field, SelectInput } from '@/components/platform/settings-form';
import { ProgressBar } from '@/components/ui/progress';

const exports = [
  { id: 'ex-1', name: 'audit-logs-2026-08.ndjson', type: 'NDJSON', requested: '2026-08-12 09:14', status: 'Ready', size: '4.2 MB' },
  { id: 'ex-2', name: 'org-config-2026-08.json', type: 'JSON', requested: '2026-08-11 16:02', status: 'Ready', size: '1.8 MB' },
  { id: 'ex-3', name: 'usage-2026-07.csv', type: 'CSV', requested: '2026-08-01 07:30', status: 'Ready', size: '860 KB' },
  { id: 'ex-4', name: 'full-export-2026-07.zip', type: 'ZIP', requested: '2026-07-28 11:45', status: 'Processing', size: '—' }
];

export default function Page() {
  const [scope, setScope] = useState('all');
  const [format, setFormat] = useState('zip');

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Export"
        description="Download your organization's data for backups or migration."
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <SectionCard title="Request an export" description="Delivered to the requesting member's email within 48 hours.">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Scope">
              <SelectInput value={scope} onChange={setScope} options={[{ value: 'all', label: 'Everything' }, { value: 'audit', label: 'Audit logs only' }, { value: 'usage', label: 'Usage metrics' }, { value: 'config', label: 'Org configuration' }]} />
            </Field>
            <Field label="Format">
              <SelectInput value={format} onChange={setFormat} options={[{ value: 'zip', label: 'ZIP archive' }, { value: 'ndjson', label: 'NDJSON' }, { value: 'csv', label: 'CSV' }]} />
            </Field>
          </div>
          <button
            type="button"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
          >
            <Download className="h-4 w-4" /> Request export
          </button>
        </SectionCard>

        <SectionCard title="Current export" description="Active job progress.">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-slate-300"><FileJson className="h-4 w-4 text-sentinel-300" /> full-export-2026-07.zip</span>
              <Badge label="Processing" tone="amber" />
            </div>
            <ProgressBar value={64} color="bg-amber-400" />
            <p className="text-[0.65rem] text-slate-500">Estimated completion in ~1h 20m · you'll be emailed when ready</p>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Previous exports" description="Available for 30 days after generation.">
        <div className="space-y-2.5">
          {exports.map((e) => (
            <div key={e.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-sentinel-500/20 bg-sentinel-500/10 text-sentinel-300">
                  <FileJson className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-slate-200">{e.name}</p>
                  <p className="text-[0.65rem] text-slate-500">{e.requested} · {e.size}</p>
                </div>
              </div>
              <Badge label={e.status} tone={e.status === 'Ready' ? 'green' : 'amber'} />
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}