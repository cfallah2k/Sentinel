'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { SectionCard, Field, TextInput, SelectInput, SaveButton } from '@/components/platform/settings-form';
import { currentOrg } from '@/lib/mock-data';

export default function Page() {
  const [name, setName] = useState(currentOrg.name);
  const [slug, setSlug] = useState(currentOrg.slug);
  const [region, setRegion] = useState(currentOrg.region);
  const [industry, setIndustry] = useState(currentOrg.industry);
  const [timezone, setTimezone] = useState('America/New_York');
  const [supportEmail, setSupportEmail] = useState('support@nexora.io');

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Platform"
        title="General Settings"
        description="Basic organization-wide preferences and identifiers."
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <SectionCard title="Organization identity" description="How your organization appears across the product.">
          <div className="space-y-4">
            <Field label="Organization name">
              <TextInput value={name} onChange={setName} />
            </Field>
            <Field label="Slug" hint="Used in URLs and API webhooks. Lowercase letters, numbers and hyphens.">
              <TextInput value={slug} onChange={setSlug} />
            </Field>
            <Field label="Industry">
              <SelectInput value={industry} onChange={setIndustry} options={[
                { value: 'Financial Services', label: 'Financial Services' },
                { value: 'Healthcare', label: 'Healthcare' },
                { value: 'Technology', label: 'Technology' },
                { value: 'Retail', label: 'Retail' },
                { value: 'Government', label: 'Government' }
              ]} />
            </Field>
          </div>
        </SectionCard>

        <SectionCard title="Regional defaults" description="Where data processing happens by default.">
          <div className="space-y-4">
            <Field label="Data region">
              <SelectInput value={region} onChange={setRegion} options={[
                { value: 'US-East (Virginia)', label: 'US-East (Virginia)' },
                { value: 'US-West (Oregon)', label: 'US-West (Oregon)' },
                { value: 'EU-West (Frankfurt)', label: 'EU-West (Frankfurt)' },
                { value: 'AP (Singapore)', label: 'AP (Singapore)' }
              ]} />
            </Field>
            <Field label="Timezone">
              <SelectInput value={timezone} onChange={setTimezone} options={[
                { value: 'America/New_York', label: 'America/New_York (UTC-5)' },
                { value: 'America/Los_Angeles', label: 'America/Los_Angeles (UTC-8)' },
                { value: 'Europe/London', label: 'Europe/London (UTC+0)' },
                { value: 'Europe/Berlin', label: 'Europe/Berlin (UTC+1)' },
                { value: 'Asia/Singapore', label: 'Asia/Singapore (UTC+8)' }
              ]} />
            </Field>
            <Field label="Support email">
              <TextInput value={supportEmail} onChange={setSupportEmail} type="email" />
            </Field>
          </div>
        </SectionCard>
      </div>

      <div className="flex justify-end">
        <SaveButton />
      </div>
    </div>
  );
}