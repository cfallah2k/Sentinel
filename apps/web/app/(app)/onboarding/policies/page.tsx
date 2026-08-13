'use client';

import { useState } from 'react';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { SelectCard, OnboardingShell } from '@/components/onboarding/onboarding-shell';
import { policies } from '@/lib/mock-data';

export default function Page() {
  const [enabled, setEnabled] = useState<string[]>(['pol-1', 'pol-2', 'pol-4', 'pol-7']);

  const toggle = (id: string) => {
    setEnabled((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  return (
    <OnboardingShell
      step={9}
      title="Enable policy templates"
      description="Start with recommended guardrails already tuned for governance. Policies evaluate every gateway request."
      prev="/onboarding/data-classification"
      next="/onboarding/integrations"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {policies.filter((p) => p.status === 'Active').map((p) => (
          <SelectCard
            key={p.id}
            selected={enabled.includes(p.id)}
            onSelect={() => toggle(p.id)}
            title={p.name}
            subtitle={`${p.description} · ${p.conditions} conditions`}
            badge={
              <>
                {p.decisions.map((d) => (
                  <Badge key={d} label={d} tone="slate" />
                ))}
                <Badge label={p.status} tone={toneForStatus(p.status)} />
              </>
            }
          />
        ))}
      </div>
      <p className="mt-4 text-[0.7rem] text-slate-500">{enabled.length} polic{enabled.length === 1 ? 'y' : 'ies'} enabled</p>
    </OnboardingShell>
  );
}
