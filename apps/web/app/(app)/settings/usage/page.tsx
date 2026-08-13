'use client';

import { useState } from 'react';
import { Gauge } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { SectionCard, Field, SelectInput, SaveButton } from '@/components/platform/settings-form';
import { ProgressBar } from '@/components/ui/progress';
import { dailySeries, hourlySeries, usageByApp } from '@/lib/mock-data';

export default function Page() {
  const [window, setWindow] = useState('30');
  const [app, setApp] = useState('all');

  const today = dailySeries[dailySeries.length - 1];
  const yesterday = dailySeries[dailySeries.length - 2];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Usage Settings"
        description="How Sentinel measures and reports consumption."
        actions={<Badge label={window === '30' ? '30-day view' : '7-day view'} tone="blue" />}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        <div className="rounded-3xl border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl">
          <p className="text-xs text-slate-400">Requests today</p>
          <p className="mt-1 text-2xl font-bold text-white">{(today?.requests ?? 0).toLocaleString()}</p>
          <p className="mt-1 text-[0.65rem] text-slate-500">Peak {hourlySeries.reduce((m, h) => Math.max(m, h.allowed + h.blocked), 0).toLocaleString()}/hr</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl">
          <p className="text-xs text-slate-400">Requests yesterday</p>
          <p className="mt-1 text-2xl font-bold text-white">{(yesterday?.requests ?? 0).toLocaleString()}</p>
          <p className="mt-1 text-[0.65rem] text-slate-500">Δ {(Math.abs((today?.requests ?? 0) - (yesterday?.requests ?? 0)) / Math.max(1, yesterday?.requests ?? 1) * 100).toFixed(1)}% vs today</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl">
          <p className="text-xs text-slate-400">Active apps</p>
          <p className="mt-1 text-2xl font-bold text-white">4</p>
          <p className="mt-1 text-[0.65rem] text-slate-500">2 more than last month</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl">
          <p className="text-xs text-slate-400">Tokens billed</p>
          <p className="mt-1 text-2xl font-bold text-white">418M</p>
          <p className="mt-1 text-[0.65rem] text-slate-500">All in monthly quota</p>
        </div>
      </div>

      <SectionCard title="Breakdown" description="Consumption by application and provider.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">By app</p>
            <div className="space-y-3">
              {usageByApp.map((a) => (
                <div key={a.name}>
                  <div className="mb-1 flex items-center justify-between text-[0.7rem]">
                    <span className="text-slate-300">{a.name}</span>
                    <span className="font-mono text-slate-500">{a.requests.toLocaleString()}</span>
                  </div>
                  <ProgressBar value={a.requests / Math.max(...usageByApp.map((u) => u.requests)) * 100} color="bg-sky-400" />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Time window">
                <SelectInput value={window} onChange={setWindow} options={[{ value: '7', label: '7 days' }, { value: '30', label: '30 days' }]} />
              </Field>
              <Field label="Application">
                <SelectInput value={app} onChange={setApp} options={[{ value: 'all', label: 'All apps' }, ...usageByApp.map((a) => ({ value: a.name, label: a.name }))]} />
              </Field>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 text-xs text-slate-400">
              Quota consumed this cycle: <span className="font-semibold text-sky-300">82%</span>
              <ProgressBar value={82} color="bg-sky-400" className="mt-2" />
            </div>
          </div>
        </div>
      </SectionCard>

      <div className="flex justify-end">
        <SaveButton />
      </div>
    </div>
  );
}