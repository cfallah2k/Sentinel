'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { SelectCard, OnboardingShell } from '@/components/onboarding/onboarding-shell';
import { classificationCategories } from '@/lib/mock-data';

const toneMap: Record<string, 'green' | 'blue' | 'amber' | 'rose'> = {
  emerald: 'green',
  sky: 'blue',
  amber: 'amber',
  rose: 'rose'
};

export default function Page() {
  const [selected, setSelected] = useState<string[]>(['CONFIDENTIAL', 'RESTRICTED']);

  const toggle = (name: string) => {
    setSelected((s) => (s.includes(name) ? s.filter((x) => x !== name) : [...s, name]));
  };

  return (
    <OnboardingShell
      step={8}
      title="Data classification"
      description="Choose the classification categories your detectors should watch for when data moves into AI systems."
      prev="/onboarding/applications"
      next="/onboarding/policies"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {classificationCategories.map((c) => (
          <SelectCard
            key={c.name}
            selected={selected.includes(c.name)}
            onSelect={() => toggle(c.name)}
            title={c.name}
            subtitle={`${c.description} · sensitivity ${c.sensitivity}/4 · ${c.systems} registered systems`}
            badge={<Badge label={c.name} tone={toneMap[c.color]} />}
          />
        ))}
      </div>
      <p className="mt-4 text-[0.7rem] text-slate-500">{selected.length} categor{selected.length === 1 ? 'y' : 'ies'} under detection</p>
    </OnboardingShell>
  );
}
