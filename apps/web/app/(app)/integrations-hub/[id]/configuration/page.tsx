'use client';

import { notFound } from 'next/navigation';
import { use, useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { SectionCard, Field, TextInput, TextAreaInput, SelectInput, Toggle, SaveButton } from '@/components/platform/settings-form';
import { IntegrationHeader, IntegrationNav } from '@/components/platform/integration-detail';
import { integrationById } from '@/components/platform/integration-data';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const integration = integrationById(id);
  if (!integration) notFound();

  const [endpoint, setEndpoint] = useState(`https://api.${integration.name.toLowerCase().replace(/[^a-z0-9]+/g, '')}.example.com/v1`);
  const [apiVersion, setApiVersion] = useState('v1');
  const [interval, setInterval] = useState('5');
  const [region, setRegion] = useState('US-East (Virginia)');
  const [timeout, setTimeoutMs] = useState('30');
  const [autoRetry, setAutoRetry] = useState(true);
  const [redactPayloads, setRedactPayloads] = useState(true);
  const [logFullPayload, setLogFullPayload] = useState(false);
  const [notes, setNotes] = useState('Managed by the platform team. Rotation every 90 days.');

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Platform" title={`${integration.name} Configuration`} description="Connection settings for this connector." />
      <IntegrationNav id={id} active="configuration" />
      <IntegrationHeader integration={integration} />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <SectionCard title="Endpoint" description="Where Sentinel reaches the connector service.">
          <div className="space-y-4">
            <Field label="Base URL">
              <TextInput value={endpoint} onChange={setEndpoint} placeholder="https://api.example.com/v1" />
            </Field>
            <Field label="API Version">
              <SelectInput value={apiVersion} onChange={setApiVersion} options={[{ value: 'v1', label: 'v1 — stable' }, { value: 'v2', label: 'v2 — beta' }]} />
            </Field>
          </div>
        </SectionCard>

        <SectionCard title="Sync behavior" description="Cadence and failure handling.">
          <div className="space-y-4">
            <Field label="Sync Interval">
              <SelectInput value={interval} onChange={setInterval} options={[{ value: '5', label: '5 minutes' }, { value: '15', label: '15 minutes' }, { value: '60', label: 'Hourly' }]} />
            </Field>
            <Field label="Timeout (seconds)">
              <TextInput value={timeout} onChange={setTimeoutMs} type="number" />
            </Field>
            <div className="space-y-2.5">
              <Toggle label="Auto-retry on transient failures" hint="Up to 3 retries with exponential backoff" checked={autoRetry} onChange={setAutoRetry} />
              <Toggle label="Redact sensitive payloads" hint="Strip PII before forwarding to the connector" checked={redactPayloads} onChange={setRedactPayloads} />
              <Toggle label="Log full request payloads" hint="Audit retention policy applies" checked={logFullPayload} onChange={setLogFullPayload} />
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Advanced" description="Regional routing and operator notes.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Region">
            <SelectInput value={region} onChange={setRegion} options={[{ value: 'US-East (Virginia)', label: 'US-East (Virginia)' }, { value: 'EU-West (Frankfurt)', label: 'EU-West (Frankfurt)' }, { value: 'AP (Singapore)', label: 'AP (Singapore)' }]} />
          </Field>
          <Field label="Notes">
            <TextAreaInput value={notes} onChange={setNotes} rows={2} />
          </Field>
        </div>
      </SectionCard>

      <div className="flex justify-end">
        <SaveButton />
      </div>
    </div>
  );
}