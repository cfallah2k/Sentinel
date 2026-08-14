'use client';

import { use, useState } from 'react';
import { Send } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { supportTickets, ticketConversations } from '@/components/platform/support-data';

type Params = Promise<{ id: string }>;

export default function Page({ params }: { params: Params }) {
  const { id } = use(params);
  const ticket = supportTickets.find((t) => t.id === id) ?? supportTickets[0];
  const [messages, setMessages] = useState(ticketConversations[ticket.id] ?? []);
  const [draft, setDraft] = useState('');

  const handleSend = () => {
    const body = draft.trim();
    if (!body) return;
    setMessages((prev) => [
      ...prev,
      {
        author: 'Amara Okafor',
        role: 'Member',
        time: new Date().toISOString(),
        body
      }
    ]);
    setDraft('');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Support"
        title={ticket.subject}
        description={`${ticket.id} · opened ${ticket.created.slice(0, 10)} by ${ticket.requester}`}
        actions={
          <div className="flex items-center gap-2">
            <Badge label={ticket.priority} tone={ticket.priority === 'Critical' ? 'rose' : ticket.priority === 'High' ? 'amber' : 'blue'} />
            <Badge label={ticket.status} tone={toneForStatus(ticket.status)} />
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          <Card>
            <CardHeader title="Conversation" subtitle={`Assigned to ${ticket.assignee}`} />
            <CardBody>
              <div className="space-y-4">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'Support' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[85%] rounded-3xl px-4 py-3 ${m.role === 'Support' ? 'border border-white/10 bg-white/[0.03]' : 'border border-sentinel-500/25 bg-sentinel-500/10'}`}>
                      <div className="mb-1 flex items-center gap-2 text-[0.65rem]">
                        <span className="font-semibold text-slate-200">{m.author}</span>
                        <span className="text-slate-500">{m.role}</span>
                        <span className="text-slate-600">{m.time.slice(5, 10)} {m.time.slice(11, 16)}Z</span>
                      </div>
                      <p className="text-xs leading-5 text-slate-300">{m.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-end gap-3">
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  rows={3}
                  placeholder="Reply to this ticket..."
                  className="flex-1 resize-y rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 text-xs text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15"
                />
                <button
                  type="button"
                  disabled={!draft.trim()}
                  onClick={handleSend}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-sentinel-500 px-5 py-3 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 disabled:opacity-40"
                >
                  <Send className="h-4 w-4" /> Send
                </button>
              </div>
            </CardBody>
          </Card>
        </div>

        <Card className="h-fit">
          <CardHeader title="Details" />
          <CardBody className="space-y-3">
            {[
              { label: 'Status', value: ticket.status },
              { label: 'Priority', value: ticket.priority },
              { label: 'Category', value: ticket.category },
              { label: 'Created', value: ticket.created.slice(0, 10) },
              { label: 'Updated', value: ticket.updated.slice(0, 10) }
            ].map((d) => (
              <div key={d.label} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-2.5">
                <span className="text-[0.65rem] text-slate-500">{d.label}</span>
                <span className="text-xs font-semibold text-slate-200">{d.value}</span>
              </div>
            ))}
            <div className="pt-1">
              <p className="mb-2 text-[0.65rem] text-slate-500">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {ticket.tags.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[0.65rem] text-slate-300">{t}</span>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}