'use client';

import { useState } from 'react';
import { Check, ScanFace, ShieldCheck, Smartphone } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { SectionCard, Field, TextInput, SaveButton } from '@/components/platform/settings-form';
import { CodeBlock } from '@/components/platform/code-block';

const steps = ['Choose method', 'Verify device', 'Save recovery codes'];

export default function Page() {
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState<'authenticator' | 'sms' | null>(null);
  const [code, setCode] = useState('');

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Platform"
        title="MFA Setup"
        description="Add a second factor to your account to protect against credential theft."
        actions={<Badge label="Not configured" tone="amber" />}
      />

      <SectionCard title="Setup wizard" description={`Step ${step + 1} of ${steps.length} — ${steps[step]}`}>
        <div className="mb-6 flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-bold ${i < step ? 'bg-emerald-500/15 text-emerald-300' : i === step ? 'bg-sentinel-500/15 text-sentinel-300 ring-1 ring-sentinel-500/40' : 'bg-white/5 text-slate-500'}`}>
                {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span className={`hidden text-[0.65rem] font-semibold sm:block ${i === step ? 'text-slate-200' : 'text-slate-500'}`}>{s}</span>
              {i < steps.length - 1 ? <div className="h-px flex-1 bg-white/10" /> : null}
            </div>
          ))}
        </div>

        {step === 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => { setMethod('authenticator'); setStep(1); }}
              className={`flex flex-col items-start gap-3 rounded-3xl border p-5 text-left transition ${method === 'authenticator' ? 'border-sentinel-500/50 bg-sentinel-500/10' : 'border-white/10 bg-white/[0.02] hover:border-sentinel-500/30'}`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-sentinel-500/20 bg-sentinel-500/10 text-sentinel-300">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Authenticator app</p>
                <p className="mt-1 text-xs text-slate-400">TOTP codes from Google Authenticator, 1Password or Authy. Works offline.</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => { setMethod('sms'); setStep(1); }}
              className={`flex flex-col items-start gap-3 rounded-3xl border p-5 text-left transition ${method === 'sms' ? 'border-sentinel-500/50 bg-sentinel-500/10' : 'border-white/10 bg-white/[0.02] hover:border-sentinel-500/30'}`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-sentinel-500/20 bg-sentinel-500/10 text-sentinel-300">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">SMS verification</p>
                <p className="mt-1 text-xs text-slate-400">Codes delivered by text message. Requires a verified phone number.</p>
              </div>
            </button>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="space-y-4">
            <p className="text-xs leading-5 text-slate-400">
              {method === 'authenticator'
                ? 'Scan the code below with your authenticator app, or enter the key manually. Codes rotate every 30 seconds.'
                : 'We sent a one-time code to +1 ••• ••• 4821. Enter it below within 10 minutes.'}
            </p>
            {method === 'authenticator' ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
                  <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <ScanFace className="h-16 w-16 text-slate-600" />
                  </div>
                  <p className="mt-2 text-center text-[0.65rem] text-slate-500">sentinel://totp?org=nexora</p>
                </div>
                <div className="space-y-3">
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">Manual key</p>
                    <CodeBlock code="JBSWY3DPEHPK3PXP4EF5Y6ZQ7FSU5IUA" />
                  </div>
                  <Field label="Verification code">
                    <TextInput value={code} onChange={setCode} placeholder="6-digit code" />
                  </Field>
                </div>
              </div>
            ) : (
              <Field label="SMS code">
                <TextInput value={code} onChange={setCode} placeholder="6-digit code" />
              </Field>
            )}
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-4">
            <p className="text-xs leading-5 text-slate-400">Store these recovery codes somewhere safe. Each code can be used once if you lose your device.</p>
            <CodeBlock code={'7F4K-2Q9X\n3M8N-A1P6\n9C2D-5R7T\n6H3J-B4V8\n2X5W-8L9N\n4P1Q-6S3T'} label="Recovery codes" />
            <div className="flex items-center gap-2 text-xs text-emerald-300">
              <ShieldCheck className="h-4 w-4" />
              Multi-factor authentication is now active on your account
            </div>
          </div>
        ) : null}

        <div className="mt-6 flex items-center justify-between">
          {step > 0 ? (
            <button type="button" onClick={() => setStep((s) => s - 1)} className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-white/10">
              Back
            </button>
          ) : <span />}
          {step < 2 ? (
            <button
              type="button"
              disabled={step === 1 && code.length < 6}
              onClick={() => setStep((s) => s + 1)}
              className="rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 disabled:opacity-40"
            >
              Continue
            </button>
          ) : (
            <SaveButton label="Done" />
          )}
        </div>
      </SectionCard>
    </div>
  );
}