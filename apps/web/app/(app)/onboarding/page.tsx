'use client';

import { useState } from 'react';
import { FileSearch, LockKeyhole, ScanSearch, ShieldCheck } from 'lucide-react';
import { OnboardingShell, inputCls, labelCls } from '@/components/onboarding/onboarding-shell';
import { currentOrg } from '@/lib/mock-data';

const valueProps = [
  { icon: ShieldCheck, title: 'Gateway controls', body: 'Every AI request is evaluated against policy before it leaves your perimeter.' },
  { icon: LockKeyhole, title: 'Data protection', body: 'PII and sensitive categories are detected, redacted or blocked in real time.' },
  { icon: ScanSearch, title: 'Risk registry', body: 'Continuous risk posture across systems, providers, models and data flows.' },
  { icon: FileSearch, title: 'Immutable audit', body: 'Every policy change and approval is recorded in a tamper-evident audit trail.' }
];

export default function Page() {
  const [goal, setGoal] = useState('compliance');
  const [timezone, setTimezone] = useState('UTC');

  return (
    <OnboardingShell
      step={1}
      title="Welcome to Sentinel"
      description={`The AI data governance and control plane for ${currentOrg.name}. A few short steps will connect your workspace and tune governance to your needs.`}
      prev={null}
      next="/onboarding/profile"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {valueProps.map((v) => (
          <div key={v.title} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <v.icon className="h-4.5 w-4.5 shrink-0 text-sentinel-300" size={18} />
            <div>
              <p className="text-xs font-semibold text-white">{v.title}</p>
              <p className="mt-1 text-[0.7rem] leading-5 text-slate-500">{v.body}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 border-t border-white/5 pt-5 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Primary goal</label>
          <select value={goal} onChange={(e) => setGoal(e.target.value)} className={`${inputCls} mt-2 appearance-none`}>
            <option value="compliance" className="bg-slate-950">Compliance & audit readiness</option>
            <option value="protection" className="bg-slate-950">Data protection & redaction</option>
            <option value="risk" className="bg-slate-950">AI risk management</option>
            <option value="observability" className="bg-slate-950">Usage visibility & cost control</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Workspace timezone</label>
          <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className={`${inputCls} mt-2 appearance-none`}>
            <option value="UTC" className="bg-slate-950">UTC</option>
            <option value="US/Eastern" className="bg-slate-950">US Eastern</option>
            <option value="US/Pacific" className="bg-slate-950">US Pacific</option>
            <option value="Europe/London" className="bg-slate-950">Europe / London</option>
            <option value="Europe/Berlin" className="bg-slate-950">Europe / Berlin</option>
            <option value="Asia/Tokyo" className="bg-slate-950">Asia / Tokyo</option>
          </select>
        </div>
      </div>
    </OnboardingShell>
  );
}
