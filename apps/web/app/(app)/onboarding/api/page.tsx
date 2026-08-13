'use client';

import { useState } from 'react';
import { Check, Copy, RefreshCw, ShieldCheck } from 'lucide-react';
import { OnboardingShell, labelCls } from '@/components/onboarding/onboarding-shell';

function generateKey() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let seed = '';
  for (let i = 0; i < 32; i += 1) {
    seed += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `sk_live_${seed}`;
}

export default function Page() {
  const [key, setKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const masked = key ? `${key.slice(0, 8)}${'\u2022'.repeat(12)}` : '';

  const copy = async () => {
    if (!key) return;
    await navigator.clipboard?.writeText(key);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <OnboardingShell
      step={12}
      title="Create an API key"
      description="Your workspace key authenticates gateway requests. The secret is only shown once — store it securely."
      prev="/onboarding/security"
      next="/onboarding/team"
    >
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-300">
            <ShieldCheck className="h-4.5 w-4.5" size={18} />
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Workspace API key</p>
            <p className="mt-0.5 text-[0.65rem] text-slate-500">scoped to org-nexora · never expires</p>
          </div>
        </div>
        <div className="mt-4">
          <label className={labelCls}>Secret</label>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-white/10 bg-slate-950/75 px-3.5 py-2.5">
              {key ? (
                <span className="truncate font-mono text-xs text-slate-200">{masked}</span>
              ) : (
                <span className="text-xs text-slate-500">No key generated yet</span>
              )}
            </div>
            <div className="flex gap-2">
              {key ? (
                <button
                  type="button"
                  onClick={copy}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => {
                  setKey(generateKey());
                  setCopied(false);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-sentinel-500 px-4 py-2 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
              >
                <RefreshCw className="h-3.5 w-3.5" /> {key ? 'Regenerate' : 'Generate key'}
              </button>
            </div>
          </div>
          {key ? <p className="mt-2 text-[0.65rem] text-slate-500">Regenerating revokes the previous key immediately.</p> : null}
        </div>
      </div>
    </OnboardingShell>
  );
}
