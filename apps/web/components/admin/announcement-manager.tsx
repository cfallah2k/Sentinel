'use client';

import { useState, type FormEvent } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Megaphone } from 'lucide-react';

const initialAnnouncements = [
  { id: 'ann-1', title: 'Gateway v3 proxy rollout', audience: 'All customers', body: 'The v3 proxy layer is rolling out across regions this week with no expected downtime.', published: '2026-08-12', pinned: true },
  { id: 'ann-2', title: 'Scheduled maintenance window', audience: 'EU region', body: 'EU region will undergo maintenance on 2026-08-16 02:00-04:00 UTC.', published: '2026-08-10', pinned: false },
  { id: 'ann-3', title: 'New redaction transformer', audience: 'Enterprise', body: 'Transformer-based redaction v2 is now GA for Enterprise plans.', published: '2026-08-05', pinned: false }
];

export function AnnouncementManager() {
  const [items, setItems] = useState(initialAnnouncements);
  const [title, setTitle] = useState('');
  const [audience, setAudience] = useState('All customers');
  const [body, setBody] = useState('');

  const publish = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setItems((prev) => [{ id: `ann-${Date.now()}`, title, audience, body, published: '2026-08-13', pinned: false }, ...prev]);
    setTitle('');
    setBody('');
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader title="Compose Announcement" subtitle="Publish a platform-wide notice" />
        <CardBody>
          <form onSubmit={publish} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Title</span>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Maintenance window notice"
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15"
                />
              </label>
              <label className="block">
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Audience</span>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="mt-1.5 w-full rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-2.5 text-xs text-slate-200 outline-none transition focus:border-sentinel-500/60"
                >
                  {['All customers', 'Enterprise', 'EU region', 'US region', 'Self-serve'].map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="block">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Message</span>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={4}
                placeholder="What should customers know?"
                className="mt-1.5 w-full rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-2.5 text-xs leading-5 text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15"
              />
            </label>
            <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 sm:text-sm">
              <Megaphone className="h-4 w-4" /> Publish
            </button>
          </form>
        </CardBody>
      </Card>

      <div className="space-y-4">
        {items.map((a) => (
          <Card key={a.id}>
            <CardBody>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">{a.title}</h3>
                    <Badge label={a.audience} tone={a.pinned ? 'violet' : 'blue'} />
                    {a.pinned ? <Badge label="Pinned" tone="amber" /> : null}
                  </div>
                  <p className="mt-1.5 text-xs leading-5 text-slate-400">{a.body}</p>
                  <p className="mt-2 text-[0.65rem] text-slate-500">Published {a.published}</p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(a.id)}
                  className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[0.65rem] font-semibold text-slate-300 transition hover:bg-rose-500/15 hover:text-rose-300"
                >
                  Archive
                </button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}