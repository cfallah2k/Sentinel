'use client';

import { Check, Rocket } from 'lucide-react';
import { PrimaryButton, SecondaryButton } from '@/components/ui/page-header';
import { OnboardingShell } from '@/components/onboarding/onboarding-shell';
import { currentOrg } from '@/lib/mock-data';

const checklist = [
  'Workspace configured for Nexora Industries',
  'Gateway policies enabled and evaluating traffic',
  'Data classification detectors armed',
  'API key generated for gateway access',
  'Team invites queued for delivery'
];

export default function Page() {
  return (
    <OnboardingShell
      step={14}
      title="Setup complete"
      description="Your workspace is ready. Head to the dashboard to see live posture, or tune settings at your own pace."
      prev="/onboarding/team"
      next="/dashboard"
      nextLabel="Open dashboard"
    >
      <div className="flex flex-col items-center gap-5 py-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/30">
          <Check className="h-7 w-7" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">{currentOrg.name} is live on Sentinel</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
            The gateway is up, policies are enforcing, and your first audit trail is already being written.
          </p>
        </div>
        <ul className="w-full max-w-md space-y-2 text-left">
          {checklist.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-xs text-slate-300">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-sentinel-500/15 text-sentinel-300">
                <Check className="h-2.5 w-2.5" />
              </span>
              {item}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <PrimaryButton href="/dashboard">
            <Rocket className="h-3.5 w-3.5" /> Go to dashboard
          </PrimaryButton>
          <SecondaryButton href="/settings">Review settings</SecondaryButton>
        </div>
      </div>
    </OnboardingShell>
  );
}
