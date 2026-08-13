'use client';

import { useState, type FormEvent } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

const initialConfig = {
  siteName: 'Sentinel Cloud',
  supportEmail: 'platform@sentinel.dev',
  region: 'us-east-1',
  sessionTimeoutHours: '24',
  maxLoginAttempts: '5',
  passwordMinLength: '12',
  auditRetentionDays: '365',
  mfaRequired: true,
  ssoOnly: false
};

function Field({ label, value, onChange, hint }: { label: string; value: string; onChange: (v: string) => void; hint?: string }) {
  return (
    <label className="block">
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-2.5 text-xs text-slate-200 outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15"
      />
      {hint ? <span className="mt-1 block text-[0.65rem] text-slate-500">{hint}</span> : null}
    </label>
  );
}

function Switch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left"
    >
      <span className="text-xs font-semibold text-slate-200">{label}</span>
      <span className={`relative h-6 w-11 shrink-0 rounded-full border transition ${checked ? 'border-sentinel-500/50 bg-sentinel-500/80' : 'border-white/10 bg-white/10'}`}>
        <span className={`absolute top-0.5 h-[18px] w-[18px] rounded-full bg-white shadow transition-all ${checked ? 'left-[22px]' : 'left-0.5'}`} />
      </span>
    </button>
  );
}

export function ConfigForm() {
  const [cfg, setCfg] = useState(initialConfig);
  const [saved, setSaved] = useState(false);

  const patch = <K extends keyof typeof cfg>(key: K, value: (typeof cfg)[K]) => {
    setCfg((c) => ({ ...c, [key]: value }));
    setSaved(false);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Card>
        <CardHeader title="Platform Profile" subtitle="Public identity of the Sentinel platform" />
        <CardBody className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Platform Name" value={cfg.siteName} onChange={(v) => patch('siteName', v)} />
          <Field label="Support Email" value={cfg.supportEmail} onChange={(v) => patch('supportEmail', v)} />
          <Field label="Primary Region" value={cfg.region} onChange={(v) => patch('region', v)} />
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Authentication" subtitle="Login hardening and session policy" />
        <CardBody className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Session Timeout (hours)" value={cfg.sessionTimeoutHours} onChange={(v) => patch('sessionTimeoutHours', v)} />
          <Field label="Max Login Attempts" value={cfg.maxLoginAttempts} onChange={(v) => patch('maxLoginAttempts', v)} />
          <Field label="Password Min Length" value={cfg.passwordMinLength} onChange={(v) => patch('passwordMinLength', v)} />
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Compliance & Data" subtitle="Retention and security toggles" />
        <CardBody className="space-y-4">
          <Field label="Audit Retention (days)" value={cfg.auditRetentionDays} onChange={(v) => patch('auditRetentionDays', v)} hint="Rolling retention window applied nightly" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Switch label="Require MFA for all admins" checked={cfg.mfaRequired} onChange={(v) => patch('mfaRequired', v)} />
            <Switch label="Enforce SSO-only sign-in" checked={cfg.ssoOnly} onChange={(v) => patch('ssoOnly', v)} />
          </div>
        </CardBody>
      </Card>

      <div className="flex items-center gap-3">
        <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 sm:text-sm">
          Save Configuration
        </button>
        {saved ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
            <CheckCircle2 className="h-4 w-4" /> Saved
          </span>
        ) : null}
      </div>
    </form>
  );
}