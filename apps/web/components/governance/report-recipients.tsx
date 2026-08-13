'use client';

import { useState } from 'react';
import { Check, Mail, Plus, Save, Trash2, Users } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Report } from '@/lib/mock-data';

const inputCls =
  'w-full rounded-xl border border-white/10 bg-slate-950/75 px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15';

export default function ReportRecipientsForm({ report }: { report: Report }) {
  const [groups, setGroups] = useState<string[]>(report.recipients.split(', '));
  const [draft, setDraft] = useState('');
  const [attachments, setAttachments] = useState(true);
  const [digest, setDigest] = useState(false);
  const [saved, setSaved] = useState(false);

  const addGroup = () => {
    const name = draft.trim();
    if (!name) return;
    if (groups.some((g) => g.toLowerCase() === name.toLowerCase())) return;
    setGroups((g) => [...g, name]);
    setDraft('');
    setSaved(false);
  };

  const removeGroup = (name: string) => {
    setGroups((g) => g.filter((x) => x !== name));
    setSaved(false);
  };

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader title="Recipient groups" subtitle="Groups and email addresses that receive this report" action={<Badge label={`${groups.length} groups`} tone="blue" />} />
        <CardBody>
          <div className="space-y-3">
            {groups.map((g) => (
              <div key={g} className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-sky-500/25 bg-sky-500/10 text-sky-300">
                    <Users className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-white">{g}</p>
                    <p className="mt-0.5 text-[0.65rem] text-slate-500">{g.includes('(') ? 'Team group' : 'Email address'}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeGroup(g)}
                  aria-label={`Remove ${g}`}
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition hover:border-rose-500/30 hover:text-rose-300"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            {groups.length === 0 ? (
              <p className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-8 text-center text-xs text-slate-500">
                No recipients configured for this report.
              </p>
            ) : null}
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addGroup();
                  }
                }}
                placeholder="Group name or email address"
                className={`${inputCls} pl-10`}
              />
            </div>
            <button
              type="button"
              onClick={addGroup}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
            >
              <Plus className="h-3.5 w-3.5" /> Add recipient
            </button>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Delivery options" subtitle="How recipients receive each run" />
        <CardBody className="space-y-3">
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
            <div>
              <p className="text-xs font-semibold text-white">Attach report files</p>
              <p className="mt-0.5 text-[0.65rem] text-slate-500">Include the PDF / CSV / JSON artifact in the delivery email</p>
            </div>
            <button
              type="button"
              onClick={() => setAttachments((v) => !v)}
              aria-label="Toggle attachments"
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${attachments ? 'bg-sentinel-500' : 'bg-white/10'}`}
            >
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${attachments ? 'left-[22px]' : 'left-0.5'}`} />
            </button>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
            <div>
              <p className="text-xs font-semibold text-white">Weekly digest</p>
              <p className="mt-0.5 text-[0.65rem] text-slate-500">Combine multiple runs into a single Monday digest</p>
            </div>
            <button
              type="button"
              onClick={() => setDigest((v) => !v)}
              aria-label="Toggle digest"
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${digest ? 'bg-sentinel-500' : 'bg-white/10'}`}
            >
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${digest ? 'left-[22px]' : 'left-0.5'}`} />
            </button>
          </div>
          <div className="flex items-center justify-between border-t border-white/5 pt-5">
            <p className={`text-[0.65rem] ${saved ? 'font-semibold text-emerald-300' : 'text-slate-500'}`}>
              {saved ? 'Recipients updated' : 'Changes apply to the next run'}
            </p>
            <button
              type="button"
              onClick={() => setSaved(true)}
              className="inline-flex items-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
            >
              {saved ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />} {saved ? 'Saved' : 'Save recipients'}
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
