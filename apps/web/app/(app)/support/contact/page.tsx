'use client';

import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { SectionCard, Field, TextInput, SelectInput, SaveButton } from '@/components/platform/settings-form';

export default function Page() {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Gateway');
  const [body, setBody] = useState('');

  const channels = [
    { id: 'ch-1', name: 'Email', detail: 'support@sentinel.ai', note: 'Tickets created instantly' },
    { id: 'ch-2', name: 'Slack', detail: '#sentinel-support in nexora workspace', note: 'Shared channel, live replies' },
    { id: 'ch-3', name: 'Phone', detail: '+1 (415) 555-0134', note: 'Enterprise priority, 9–5 PT' }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Support"
        title="Contact"
        description="Reach the Sentinel support team through any channel."
        actions={<Badge label="Enterprise priority" tone="blue" />}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {channels.map((c) => (
          <div key={c.id} className="rounded-3xl border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 shadow-panel backdrop-blur-xl">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sentinel-500/20 bg-sentinel-500/10 text-sentinel-300">
              <MessageSquare className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-white">{c.name}</h3>
            <p className="mt-0.5 text-[0.7rem] text-slate-400">{c.detail}</p>
            <p className="mt-2 text-[0.65rem] text-slate-500">{c.note}</p>
          </div>
        ))}
      </div>

      <SectionCard title="Send a message" description="A ticket is created and a specialist picks it up.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Subject">
            <TextInput value={subject} onChange={setSubject} placeholder="Brief description of the issue" />
          </Field>
          <Field label="Category">
            <SelectInput value={category} onChange={setCategory} options={['Gateway', 'Redaction', 'Identity', 'Billing', 'SDK', 'Integrations', 'API', 'Reporting'].map((c) => ({ value: c, label: c }))} />
          </Field>
        </div>
        <div className="mt-4">
          <p className="mb-1.5 text-[0.7rem] font-medium text-slate-400">Details</p>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={5}
            placeholder="What happened, what you expected, and anything you already tried..."
            className="w-full resize-y rounded-xl border border-white/10 bg-slate-950/75 px-3.5 py-2.5 text-xs text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15"
          />
        </div>
        <div className="mt-5 flex justify-end">
          <SaveButton label="Submit ticket" />
        </div>
      </SectionCard>
    </div>
  );
}