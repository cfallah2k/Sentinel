'use client';

import { useState } from 'react';
import { Database } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { SectionCard, SelectInput, SaveButton } from '@/components/platform/settings-form';
import { ProgressBar } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const policies = [
  { id: 'ret-1', name: 'Audit logs', description: 'Every policy check, decision and admin action.', window: 90, current: 42, unit: 'days', color: 'bg-sky-400' },
  { id: 'ret-2', name: 'Request payloads', description: 'Stored prompts and responses when content logging is on.', window: 30, current: 18, unit: 'days', color: 'bg-violet-400' },
  { id: 'ret-3', name: 'Redacted samples', description: 'Anonymized samples used for detector training.', window: 180, current: 96, unit: 'days', color: 'bg-emerald-400' },
  { id: 'ret-4', name: 'Usage telemetry', description: 'Aggregated request, token and cost metrics.', window: 365, current: 210, unit: 'days', color: 'bg-amber-400' }
];

export default function Page() {
  const [windows, setWindows] = useState<Record<string, number>>(() =>
    policies.reduce<Record<string, number>>((acc, p) => { acc[p.id] = p.window; return acc; }, {})
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Platform"
        title="Data Retention"
        description="How long each category of data is kept before deletion."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {policies.map((p) => (
          <div key={p.id} className="rounded-3xl border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 shadow-panel backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-white">{p.name}</p>
              <Badge label={`${windows[p.id]}d`} tone="blue" />
            </div>
            <p className="mt-1.5 min-h-8 text-[0.7rem] leading-4 text-slate-500">{p.description}</p>
            <div className="mt-3 flex items-center gap-2 text-[0.65rem] text-slate-500">
              <span className="font-semibold text-slate-300">{p.current}{p.unit}</span>
              <span>of</span>
              <span>{windows[p.id]}{p.unit}</span>
            </div>
            <ProgressBar value={(p.current / windows[p.id]) * 100} color={p.color} className="mt-2" />
          </div>
        ))}
      </div>

      <SectionCard title="Retention windows" description="Adjust how long data is retained. Deletion is automatic and unrecoverable.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {policies.map((p) => (
            <div key={p.id} className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-4">
              <p className="text-xs font-semibold text-slate-200">{p.name}</p>
              <p className="mt-0.5 text-[0.65rem] text-slate-500">{p.description}</p>
              <div className="mt-3">
                <SelectInput
                  value={String(windows[p.id])}
                  onChange={(v) => setWindows((s) => ({ ...s, [p.id]: Number(v) }))}
                  options={[
                    { value: '7', label: '7 days' },
                    { value: '30', label: '30 days' },
                    { value: '90', label: '90 days' },
                    { value: '180', label: '180 days' },
                    { value: '365', label: '365 days' }
                  ]}
                />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="flex justify-end">
        <SaveButton />
      </div>
    </div>
  );
}