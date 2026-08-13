'use client';

import { useState } from 'react';
import { SelectCard, OnboardingShell } from '@/components/onboarding/onboarding-shell';

const categories = [
  { id: 'ai-providers', name: 'AI Providers', body: 'OpenAI, Anthropic, Google and any OpenAI-compatible endpoint.' },
  { id: 'cloud', name: 'Cloud Platforms', body: 'AWS, Azure and GCP for data sources and model hosting.' },
  { id: 'databases', name: 'Databases & Warehouses', body: 'PostgreSQL, Snowflake, BigQuery and lake storage.' },
  { id: 'identity', name: 'Identity & SSO', body: 'Okta, Entra ID and SCIM provisioning for your org.' },
  { id: 'siem', name: 'SIEM & Security', body: 'Splunk, Datadog and Sentinel event forwarding.' },
  { id: 'monitoring', name: 'Monitoring & Observability', body: 'Metrics and tracing for gateway health.' },
  { id: 'devtools', name: 'Developer Tools', body: 'GitHub, Slack and CI pipelines for developer workflows.' },
  { id: 'webhooks', name: 'Webhooks & Custom', body: 'Custom event sinks and REST endpoints.' }
];

export default function Page() {
  const [selected, setSelected] = useState<string[]>(['identity', 'siem']);

  const toggle = (id: string) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  return (
    <OnboardingShell
      step={10}
      title="Choose integrations"
      description="Pick the categories you want surfaced in the integrations hub. Every category ships with connector templates."
      prev="/onboarding/policies"
      next="/onboarding/security"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {categories.map((c) => (
          <SelectCard
            key={c.id}
            selected={selected.includes(c.id)}
            onSelect={() => toggle(c.id)}
            title={c.name}
            subtitle={c.body}
          />
        ))}
      </div>
    </OnboardingShell>
  );
}
