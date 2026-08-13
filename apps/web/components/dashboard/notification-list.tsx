'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { AlertTriangle, ClipboardCheck, FileText, Server, ShieldCheck, Zap } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';

export type NotificationFilter = 'all' | 'unread' | 'security' | 'incidents' | 'approvals' | 'system';

const filterMeta: { id: NotificationFilter; label: string; path: string }[] = [
  { id: 'all', label: 'All', path: '/notifications' },
  { id: 'unread', label: 'Unread', path: '/notifications/unread' },
  { id: 'incidents', label: 'Incidents', path: '/notifications/incidents' },
  { id: 'approvals', label: 'Approvals', path: '/notifications/approvals' },
  { id: 'security', label: 'Security', path: '/notifications/security' },
  { id: 'system', label: 'System', path: '/notifications/system' }
];

const typeMeta: Record<string, { icon: LucideIcon; cls: string }> = {
  Incident: { icon: AlertTriangle, cls: 'border-rose-500/25 bg-rose-500/10 text-rose-300' },
  Approval: { icon: ClipboardCheck, cls: 'border-amber-500/25 bg-amber-500/10 text-amber-300' },
  Security: { icon: ShieldCheck, cls: 'border-sky-500/25 bg-sky-500/10 text-sky-300' },
  System: { icon: Server, cls: 'border-violet-500/25 bg-violet-500/10 text-violet-300' },
  Policy: { icon: FileText, cls: 'border-cyan-500/25 bg-cyan-500/10 text-cyan-300' },
  Usage: { icon: Zap, cls: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300' }
};

export function NotificationList({
  notifications,
  filter
}: {
  notifications: { id: string; type: string; title: string; detail: string; time: string; unread: boolean }[];
  filter: NotificationFilter;
}) {
  const [items, setItems] = useState(notifications);
  const typeFilter: Partial<Record<NotificationFilter, string>> = {
    security: 'Security',
    incidents: 'Incident',
    approvals: 'Approval',
    system: 'System'
  };

  const visible = items.filter((n) => {
    if (filter === 'unread') return n.unread;
    const t = typeFilter[filter];
    return t ? n.type === t : true;
  });
  const unread = items.filter((n) => n.unread).length;

  return (
    <Card>
      <CardHeader
        title="Notification center"
        subtitle={unread > 0 ? `${unread} unread notification${unread > 1 ? 's' : ''}` : 'All caught up'}
        action={
          unread > 0 ? (
            <button
              type="button"
              onClick={() => setItems((prev) => prev.map((n) => ({ ...n, unread: false })))}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[0.65rem] font-semibold text-slate-200 transition hover:bg-white/10"
            >
              Mark all as read
            </button>
          ) : null
        }
      />
      <div className="border-b border-white/5 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-1.5">
          {filterMeta.map((f) => (
            <Link
              key={f.id}
              href={f.path}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[0.7rem] font-semibold transition ${
                filter === f.id
                  ? 'bg-sentinel-500/15 text-sentinel-300 ring-1 ring-sentinel-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {f.label}
              {f.id === 'unread' && unread > 0 ? (
                <span className="rounded-full bg-sentinel-500/20 px-1.5 text-[0.6rem] text-sentinel-300">{unread}</span>
              ) : null}
            </Link>
          ))}
        </div>
      </div>
      <CardBody className="space-y-1">
        {visible.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-500">No notifications match this filter.</p>
        ) : (
          visible.map((n) => {
            const meta = typeMeta[n.type] ?? typeMeta.System;
            const Icon = meta.icon;
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => setItems((prev) => prev.map((p) => (p.id === n.id ? { ...p, unread: false } : p)))}
                className={`flex w-full items-start gap-4 rounded-2xl border border-transparent p-3 text-left transition hover:border-white/10 hover:bg-white/[0.03] ${
                  n.unread ? 'bg-white/[0.03]' : 'opacity-60'
                }`}
              >
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border ${meta.cls}`}>
                  <Icon size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-xs font-semibold text-white">{n.title}</span>
                    {n.unread ? <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sentinel-400" /> : null}
                  </span>
                  <span className="mt-0.5 block truncate text-[0.65rem] text-slate-400">{n.detail}</span>
                </span>
                <span className="shrink-0 text-[0.65rem] text-slate-500">{n.time}</span>
              </button>
            );
          })
        )}
      </CardBody>
    </Card>
  );
}