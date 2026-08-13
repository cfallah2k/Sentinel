'use client';

import { useState } from 'react';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { SelectCard, OnboardingShell } from '@/components/onboarding/onboarding-shell';
import { providers } from '@/lib/mock-data';

export default function Page() {
  const [selected, setSelected] = useState<string[]>(['prv-1', 'prv-2']);

  const toggle = (id: string) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  return (
    <OnboardingShell
      step={6}
      title="Connect AI providers"
      description="Authorize the model providers your teams may call through the gateway. You can change this anytime."
      prev="/onboarding/use-case"
      next="/onboarding/applications"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {providers.map((p) => (
          <SelectCard
            key={p.id}
            selected={selected.includes(p.id)}
            onSelect={() => toggle(p.id)}
            title={p.name}
            subtitle={`${p.type} · ${p.region} · ${p.models} models`}
            badge={<Badge label={p.status} tone={toneForStatus(p.status)} />}
          />
        ))}
      </div>
      <p className="mt-4 text-[0.7rem] text-slate-500">{selected.length} provider{selected.length === 1 ? '' : 's'} selected</p>
    </OnboardingShell>
  );
}
