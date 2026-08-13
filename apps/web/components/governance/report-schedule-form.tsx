'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, CalendarClock, Check, ChevronRight, Save } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Report } from '@/lib/mock-data';

const inputCls =
  'w-full rounded-xl border border-white/10 bg-slate-950/75 px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15';

const frequencies = ['On-demand', 'Daily', 'Weekly', 'Monthly'] as const;

function nextRunDate(frequency: string, report: Report): string {
  if (frequency === 'On-demand') return 'Manually triggered';
  const d = new Date(`${report.lastRun}T00:00:00Z`);
  if (frequency === 'Daily') d.setUTCDate(d.getUTCDate() + 1);
  if (frequency === 'Weekly') d.setUTCDate(d.getUTCDate() + 7);
  if (frequency === 'Monthly') d.setUTCMonth(d.getUTCMonth() + 1);
  return `Next run ${d.toISOString().slice(0, 10)}`;
}

export default function ReportScheduleForm({ report }: { report: Report }) {
  const [frequency, setFrequency] = useState<string>(report.schedule);
  const [time, setTime] = useState('06:00');
  const [timezone, setTimezone] = useState('UTC (US-East)');
  const [active, setActive] = useState(report.status !== 'Failed');
  const [notifyOnFailure, setNotifyOnFailure] = useState(true);
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader title="Schedule" subtitle="Define how often this report is generated and delivered" />
        <CardBody className="space-y-6">
          <div>
            <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Frequency</label>
            <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:grid-cols-4">
              {frequencies.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFrequency(f)}
                  className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-xs font-semibold transition ${
                    frequency === f ? 'border-sentinel-500/50 bg-sentinel-500/10 text-white' : 'border-white/10 bg-white/[0.02] text-slate-400 hover:bg-white/[0.05]'
                  }`}
                >
                  {frequency === f ? <Check className="h-3.5 w-3.5 text-sentinel-300" /> : null}
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Delivery time</label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={`${inputCls} mt-2`} />
            </div>
            <div>
              <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Timezone</label>
              <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className={`${inputCls} mt-2 appearance-none`}>
                {['UTC (US-East)', 'UTC (US-West)', 'UTC (EU)', 'UTC (APAC)'].map((t) => (
                  <option key={t} value={t} className="bg-slate-950">{t}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-sky-500/25 bg-sky-500/10 text-sky-300">
                <CalendarClock className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Schedule active</p>
                <p className="mt-0.5 text-[0.65rem] text-slate-500">
                  {active ? nextRunDate(frequency, report) : 'Schedule paused — report runs on demand'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActive((v) => !v)}
              aria-label="Toggle schedule"
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${active ? 'bg-sentinel-500' : 'bg-white/10'}`}
            >
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${active ? 'left-[22px]' : 'left-0.5'}`} />
            </button>
          </div>
          <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-500/25 bg-amber-500/10 text-amber-300">
                <Bell className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Notify on failure</p>
                <p className="mt-0.5 text-[0.65rem] text-slate-500">Email the recipients when a run fails</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setNotifyOnFailure((v) => !v)}
              aria-label="Toggle failure notifications"
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${notifyOnFailure ? 'bg-sentinel-500' : 'bg-white/10'}`}
            >
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${notifyOnFailure ? 'left-[22px]' : 'left-0.5'}`} />
            </button>
          </div>
          <div className="flex items-center justify-between border-t border-white/5 pt-5">
            <p className={`text-[0.65rem] ${saved ? 'font-semibold text-emerald-300' : 'text-slate-500'}`}>
              {saved ? 'Schedule saved' : 'Changes apply to future runs'}
            </p>
            <button
              type="button"
              onClick={() => setSaved(true)}
              className="inline-flex items-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
            >
              <Save className="h-3.5 w-3.5" /> Save schedule
            </button>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Current configuration" subtitle="Active delivery settings" action={<Badge label={active ? 'Active' : 'Paused'} tone={active ? 'green' : 'slate'} />} />
        <CardBody>
          <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-3">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Frequency</p>
              <p className="mt-1 text-sm text-white">{frequency}</p>
            </div>
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Delivery time</p>
              <p className="mt-1 text-sm text-white">{time} {timezone}</p>
            </div>
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Last run</p>
              <p className="mt-1 text-sm text-white">{report.lastRun}</p>
            </div>
          </div>
          <Link href={`/reports/${report.id}/history`} className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-sky-300 transition hover:text-sky-200">
            View run history <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}
