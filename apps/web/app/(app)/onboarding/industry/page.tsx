'use client';

import { useState } from 'react';
import { SelectCard, OnboardingShell } from '@/components/onboarding/onboarding-shell';

const industries = [
  { id: 'financial', name: 'Financial Services', body: 'Banking, payments and capital markets with strict data handling rules.' },
  { id: 'healthcare', name: 'Healthcare', body: 'Providers and life sciences with PHI and regulatory obligations.' },
  { id: 'retail', name: 'Retail & E-commerce', body: 'Customer intelligence and personalization at scale.' },
  { id: 'manufacturing', name: 'Manufacturing', body: 'Industrial data, supply chain analytics and automation.' },
  { id: 'technology', name: 'Technology & SaaS', body: 'Product-led AI features and developer platforms.' },
  { id: 'government', name: 'Government & Public Sector', body: 'Citizen services with transparency and audit requirements.' },
  { id: 'education', name: 'Education', body: 'Institutional research and learning tooling.' },
  { id: 'energy', name: 'Energy & Utilities', body: 'Operational intelligence across grid and field assets.' }
];

export default function Page() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <OnboardingShell
      step={4}
      title="Select your industry"
      description="Industry presets shape the data classification schemes and policy templates recommended for your workspace."
      prev="/onboarding/organization"
      next="/onboarding/use-case"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {industries.map((i) => (
          <SelectCard
            key={i.id}
            selected={selected === i.id}
            onSelect={() => setSelected(selected === i.id ? null : i.id)}
            title={i.name}
            subtitle={i.body}
          />
        ))}
      </div>
    </OnboardingShell>
  );
}
