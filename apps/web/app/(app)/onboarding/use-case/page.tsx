'use client';

import { useState } from 'react';
import { SelectCard, OnboardingShell } from '@/components/onboarding/onboarding-shell';

const useCases = [
  { id: 'governance', name: 'AI governance & oversight', body: 'Register systems, models and providers in a single inventory of record.' },
  { id: 'privacy', name: 'Data privacy & redaction', body: 'Detect and redact PII before it reaches external model providers.' },
  { id: 'compliance', name: 'Compliance & audit readiness', body: 'Map controls to SOC 2, ISO 27001, GDPR and EU AI Act evidence.' },
  { id: 'security', name: 'Security monitoring & response', body: 'Block high-risk requests and investigate incidents from one console.' },
  { id: 'cost', name: 'Usage & cost control', body: 'Route requests to approved models and cap spend per application.' },
  { id: 'risk', name: 'Model risk management', body: 'Score and review high-risk deployments before they reach production.' }
];

export default function Page() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  return (
    <OnboardingShell
      step={5}
      title="What will you use Sentinel for?"
      description="Pick the outcomes that matter most — they tune the default modules surfaced in your workspace."
      prev="/onboarding/industry"
      next="/onboarding/ai-providers"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {useCases.map((u) => (
          <SelectCard
            key={u.id}
            selected={selected.includes(u.id)}
            onSelect={() => toggle(u.id)}
            title={u.name}
            subtitle={u.body}
          />
        ))}
      </div>
    </OnboardingShell>
  );
}
