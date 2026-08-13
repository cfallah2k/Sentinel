'use client';

import { notFound } from 'next/navigation';
import { use, useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { SectionCard, Field, TextInput, SelectInput, Toggle, SaveButton } from '@/components/platform/settings-form';
import { IntegrationHeader, IntegrationNav } from '@/components/platform/integration-detail';
import { integrationById } from '@/components/platform/integration-data';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const integration = integrationById(id);
  if (!integration) notFound();

  const [displayName, setDisplayName] = useState(integration.name);
  const [description, setDescription] = useState(integration.description);
  const [owner, setOwner] = useState('Amara Okafor');
  const [region, setRegion] = useState('US-East (Virginia)');
  const [notifyOnFailure, setNotifyOnFailure] = useState(true);
  const [notifyOnDrift, setNotifyOnDrift] = useState(true);
  const [pauseOnError, setPauseOnError] = useState(false);
  const [maintenance, setMaintenance] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Platform" title={`${integration.name} Settings`} description="Ownership, notifications and lifecycle controls for this connector." />
      <IntegrationNav id={id} active="settings" />
      <IntegrationHeader integration={integration} />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <SectionCard title="Identity" description="How this connector is labeled and governed.">
          <div className="space-y-4">
            <Field label="Display Name">
              <TextInput value={displayName} onChange={setDisplayName} />
            </Field>
            <Field label="Description">
              <TextInput value={description} onChange={setDescription} />
            </Field>
            <Field label="Owner">
              <SelectInput value={owner} onChange={setOwner} options={[{ value: 'Amara Okafor', label: 'Amara Okafor' }, { value: 'Devon Clarke', label: 'Devon Clarke' }, { value: 'Maya Chen', label: 'Maya Chen' }, { value: 'Jordan Patel', label: 'Jordan Patel' }]} />
            </Field>
          </div>
        </SectionCard>

        <SectionCard title="Notifications" description="Alert routing for connector health events.">
          <div className="space-y-2.5">
            <Toggle label="Notify on sync failure" hint="Send to the owner and #security-ops" checked={notifyOnFailure} onChange={setNotifyOnFailure} />
            <Toggle label="Notify on schema drift" hint="Classification changes require review" checked={notifyOnDrift} onChange={setNotifyOnDrift} />
            <Toggle label="Pause connector on repeated errors" hint="After 5 consecutive failures" checked={pauseOnError} onChange={setPauseOnError} />
            <Toggle label="Maintenance mode" hint="Stops syncs without revoking credentials" checked={maintenance} onChange={setMaintenance} />
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Lifecycle" description="Decommission and ownership controls.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
            <p className="text-xs font-semibold text-slate-200">Created</p>
            <p className="mt-1 text-[0.7rem] text-slate-500">2026-01-15</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
            <p className="text-xs font-semibold text-slate-200">Last modified</p>
            <p className="mt-1 text-[0.7rem] text-slate-500">2026-08-05</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
            <p className="text-xs font-semibold text-slate-200">Region</p>
            <p className="mt-1 text-[0.7rem] text-slate-500">{region}</p>
          </div>
        </div>
      </SectionCard>

      <div className="flex justify-end">
        <SaveButton />
      </div>
    </div>
  );
}