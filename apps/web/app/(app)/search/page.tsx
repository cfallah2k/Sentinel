'use client';

import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { ArrowRightLeft, Search } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { Tabs } from '@/components/ui/tabs';
import { aiSystems, dataFlows, incidents, policies, teamMembers } from '@/lib/mock-data';

const systemName = new Map(aiSystems.map((s) => [s.id, s.name]));

function matchQuery(q: string, ...fields: (string | undefined)[]) {
  if (!q) return true;
  const needle = q.toLowerCase();
  return fields.some((f) => f?.toLowerCase().includes(needle));
}

type Section = { id: string; label: string; count: number; body: ReactNode };

export default function Page() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('all');

  const systems = useMemo(
    () => aiSystems.filter((s) => matchQuery(query, s.name, s.purpose, s.owner, s.type, s.status)),
    [query]
  );
  const matchedPolicies = useMemo(
    () => policies.filter((p) => matchQuery(query, p.name, p.description, p.scope, p.status)),
    [query]
  );
  const matchedIncidents = useMemo(
    () => incidents.filter((i) => matchQuery(query, i.title, i.description, i.type, i.severity, i.status)),
    [query]
  );
  const flows = useMemo(
    () =>
      dataFlows.filter((f) =>
        matchQuery(query, f.source, f.category, f.decision, f.status, systemName.get(f.systemId))
      ),
    [query]
  );
  const people = useMemo(
    () => teamMembers.filter((m) => matchQuery(query, m.name, m.email, m.role)),
    [query]
  );

  const sections: Section[] = [
    {
      id: 'systems',
      label: 'Systems',
      count: systems.length,
      body: (
        <div className="space-y-3">
          {systems.map((s) => (
            <Link key={s.id} href={`/ai-systems/${s.id}`} className="flex items-start justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-sentinel-500/30 hover:bg-white/[0.04]">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white">{s.name}</p>
                <p className="mt-0.5 line-clamp-1 text-[0.65rem] text-slate-400">{s.purpose}</p>
                <p className="mt-0.5 text-[0.65rem] text-slate-500">{s.owner} · {s.environment}</p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
                <Badge label={s.type} tone="slate" />
                <Badge label={s.status} tone={toneForStatus(s.status)} />
                <Badge label={s.risk} tone={toneForStatus(s.risk)} />
              </div>
            </Link>
          ))}
        </div>
      )
    },
    {
      id: 'policies',
      label: 'Policies',
      count: matchedPolicies.length,
      body: (
        <div className="space-y-3">
          {matchedPolicies.map((p) => (
            <Link key={p.id} href={`/policies/${p.id}`} className="flex items-start justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-sentinel-500/30 hover:bg-white/[0.04]">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white">{p.name}</p>
                <p className="mt-0.5 line-clamp-1 text-[0.65rem] text-slate-400">{p.description}</p>
                <p className="mt-0.5 text-[0.65rem] text-slate-500">{p.scope} · {p.decisions.join(' + ')}</p>
              </div>
              <Badge label={p.status} tone={toneForStatus(p.status)} />
            </Link>
          ))}
        </div>
      )
    },
    {
      id: 'incidents',
      label: 'Incidents',
      count: matchedIncidents.length,
      body: (
        <div className="space-y-3">
          {matchedIncidents.map((i) => (
            <Link key={i.id} href={`/incidents/${i.id}`} className="flex items-start justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-sentinel-500/30 hover:bg-white/[0.04]">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white">
                  <span className="font-mono text-sentinel-300">{i.id}</span> · {i.title}
                </p>
                <p className="mt-0.5 line-clamp-1 text-[0.65rem] text-slate-400">{i.description}</p>
                <p className="mt-0.5 text-[0.65rem] text-slate-500">{i.assignee}</p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
                <Badge label={i.type} tone="slate" />
                <Badge label={i.severity} tone={toneForStatus(i.severity)} />
                <Badge label={i.status} tone={toneForStatus(i.status)} />
              </div>
            </Link>
          ))}
        </div>
      )
    },
    {
      id: 'flows',
      label: 'Flows',
      count: flows.length,
      body: (
        <div className="space-y-3">
          {flows.map((f) => (
            <Link key={f.id} href={`/data-flows/${f.id}`} className="flex items-start justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-sentinel-500/30 hover:bg-white/[0.04]">
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  {f.source}
                  <ArrowRightLeft className="h-3 w-3 shrink-0 text-slate-500" />
                  {systemName.get(f.systemId) ?? f.systemId}
                </p>
                <p className="mt-0.5 text-[0.65rem] text-slate-500">{f.category} · {f.volumeMb} MB</p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
                <Badge label={f.decision} tone={toneForStatus(f.decision)} />
                <Badge label={f.risk} tone={toneForStatus(f.risk)} />
              </div>
            </Link>
          ))}
        </div>
      )
    },
    {
      id: 'people',
      label: 'People',
      count: people.length,
      body: (
        <div className="space-y-3">
          {people.map((m) => (
            <Link key={m.id} href={`/team/members/${m.id}`} className="flex items-start justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-sentinel-500/30 hover:bg-white/[0.04]">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white">{m.name}</p>
                <p className="mt-0.5 text-[0.65rem] text-slate-400">{m.email}</p>
                <p className="mt-0.5 text-[0.65rem] text-slate-500">{m.lastActive === '—' ? 'Never active' : `Last active ${m.lastActive.slice(5, 16).replace('T', ' ')}`}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <Badge label={m.role.replace('_', ' ')} tone="slate" />
                <Badge label={m.status} tone={toneForStatus(m.status)} />
              </div>
            </Link>
          ))}
        </div>
      )
    }
  ];

  const visible = active === 'all' ? sections : sections.filter((s) => s.id === active);
  const totalResults = sections.reduce((s, x) => s + x.count, 0);

  return (
    <div>
      <PageHeader
        eyebrow="Search"
        title="Global Search"
        description="Search across AI systems, policies, incidents, data flows, and team members."
      />
      <div className="mt-8">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search systems, policies, incidents, flows, people..."
            className="w-full rounded-full border border-white/10 bg-slate-950/75 py-3 pl-11 pr-4 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15"
          />
        </div>
        <div className="mt-5">
          <Tabs
            tabs={[
              { id: 'all', label: `All (${totalResults})` },
              ...sections.map((s) => ({ id: s.id, label: `${s.label} (${s.count})` }))
            ]}
            defaultValue="all"
            onChange={(id) => setActive(id)}
          />
        </div>
        <div className="mt-6 space-y-6">
          {visible.map((s) => (
            <Card key={s.id}>
              <CardHeader title={s.label} subtitle={`${s.count} result${s.count === 1 ? '' : 's'}`} />
              <CardBody>
                {s.count === 0 ? (
                  <p className="py-8 text-center text-sm text-slate-500">No {s.label.toLowerCase()} match your search.</p>
                ) : (
                  s.body
                )}
              </CardBody>
            </Card>
          ))}
          {query && totalResults === 0 ? (
            <Card>
              <CardBody>
                <p className="py-10 text-center text-sm text-slate-500">No results found for &quot;{query}&quot;.</p>
              </CardBody>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}