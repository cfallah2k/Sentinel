'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { SectionCard, Field, TextInput, SelectInput, Toggle, SaveButton } from '@/components/platform/settings-form';

const templates = [
  { id: 'tp-1', name: 'Invitation email', subject: 'You have been invited to {org}', status: 'Active' },
  { id: 'tp-2', name: 'Access request pending', subject: 'Access request from {requester} needs review', status: 'Active' },
  { id: 'tp-3', name: 'Incident escalation', subject: 'CRITICAL: {title}', status: 'Active' },
  { id: 'tp-4', name: 'Weekly digest', subject: 'Your AI governance digest', status: 'Draft' }
];

export default function Page() {
  const [host, setHost] = useState('smtp.sendgrid.net');
  const [port, setPort] = useState('587');
  const [username, setUsername] = useState('apikey');
  const [from, setFrom] = useState('no-reply@nexora.io');
  const [secure, setSecure] = useState(true);
  const [digestEnabled, setDigestEnabled] = useState(true);
  const [digestSchedule, setDigestSchedule] = useState('monday');
  const [archiveBcc, setArchiveBcc] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Platform"
        title="Email Settings"
        description="Outbound email configuration for invites, alerts and digests."
        actions={<Badge label="Delivering" tone="green" />}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <SectionCard title="SMTP relay" description="Used for all transactional email.">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Host">
                <TextInput value={host} onChange={setHost} />
              </Field>
              <Field label="Port">
                <TextInput value={port} onChange={setPort} />
              </Field>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Username">
                <TextInput value={username} onChange={setUsername} />
              </Field>
              <Field label="From address">
                <TextInput value={from} onChange={setFrom} type="email" />
              </Field>
            </div>
            <Toggle label="Require TLS" hint="STARTTLS enforced for all relays" checked={secure} onChange={setSecure} />
          </div>
        </SectionCard>

        <SectionCard title="Delivery behavior" description="How email is sent and batched.">
          <div className="space-y-4">
            <Field label="Digest schedule">
              <SelectInput value={digestSchedule} onChange={setDigestSchedule} options={[{ value: 'monday', label: 'Mondays 08:00' }, { value: 'friday', label: 'Fridays 08:00' }, { value: 'daily', label: 'Daily 08:00' }]} />
            </Field>
            <Toggle label="Send weekly digest" hint="Summarizes incidents, approvals and usage" checked={digestEnabled} onChange={setDigestEnabled} />
            <Toggle label="BCC compliance archive" hint="Archive every outbound email" checked={archiveBcc} onChange={setArchiveBcc} />
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Templates" description="Transactional email templates.">
        <div className="space-y-2.5">
          {templates.map((t) => (
            <div key={t.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-sentinel-500/20 bg-sentinel-500/10 text-sentinel-300">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-200">{t.name}</p>
                  <p className="truncate text-[0.65rem] text-slate-500">{t.subject}</p>
                </div>
              </div>
              <Badge label={t.status} tone={t.status === 'Active' ? 'green' : 'amber'} />
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="flex justify-end">
        <SaveButton />
      </div>
    </div>
  );
}