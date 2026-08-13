import { AlertTriangle, CheckCircle2, Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AttrGrid } from '@/components/registry/attr-grid';
import { SeverityBadge } from '@/components/enforcement/badges';
import { Timeline } from '@/components/enforcement/timeline';
import { incidentById, incidentNav, incidentTimeline, policyById, systemName, systemRisk } from '@/components/enforcement/helpers';
import { incidents } from '@/lib/mock-data';
import Link from 'next/link';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const inc = incidentById(id) ?? incidents[0];
  const timeline = incidentTimeline(inc);
  const policy = inc.policyId ? policyById(inc.policyId) : null;
  const slaPct = Math.min(100, Math.round((inc.slaHours / 24) * 100));

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Incidents"
        title={inc.title}
        id={inc.id}
        description={inc.description}
        badges={[
          <SeverityBadge key="sev" label={inc.severity} />,
          <Badge key="s" label={inc.status} tone={inc.status === 'Resolved' ? 'green' : inc.status === 'Investigating' ? 'sky' : 'amber'} />,
          <Badge key="t" label={inc.type} tone="violet" />
        ]}
        meta={[
          { label: 'Assignee', value: inc.assignee },
          { label: 'Opened', value: inc.openedAt.slice(0, 10) },
          { label: 'SLA', value: `${inc.slaHours}h` }
        ]}
      />
      <DetailNav base={`/incidents/${id}`} items={incidentNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Severity" value={inc.severity} icon={AlertTriangle} accent={inc.severity === 'Critical' ? 'red' : inc.severity === 'High' ? 'rose' : inc.severity === 'Medium' ? 'amber' : 'blue'} />
        <StatCard label="Status" value={inc.status} icon={inc.status === 'Resolved' ? CheckCircle2 : Clock} accent={inc.status === 'Resolved' ? 'green' : inc.status === 'Investigating' ? 'sky' : 'amber'} />
        <StatCard label="SLA Window" value={`${inc.slaHours}h`} icon={Clock} accent="violet" />
        <StatCard label="Assignee" value={inc.assignee.split(' ')[0]} icon={User} accent="cyan" />
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="space-y-5 xl:col-span-2">
          <Card>
            <CardHeader title="Summary" subtitle="Incident attributes" />
            <CardBody>
              <AttrGrid
                items={[
                  { label: 'Type', value: inc.type },
                  { label: 'Status', value: inc.status },
                  { label: 'Severity', value: inc.severity },
                  { label: 'Opened', value: inc.openedAt },
                  { label: 'SLA Hours', value: `${inc.slaHours}h` },
                  { label: 'Assignee', value: inc.assignee },
                  { label: 'AI System', value: systemName(inc.systemId) },
                  { label: 'System Risk', value: systemRisk(inc.systemId) },
                  { label: 'Policy', value: policy ? policy.name : '—' }
                ]}
              />
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Timeline" subtitle="Key events so far" />
            <CardBody>
              <Timeline items={timeline.map((t) => ({ time: t.time, title: t.title, description: t.detail }))} />
            </CardBody>
          </Card>
        </div>
        <Card>
          <CardHeader title="SLA status" subtitle="Response window" />
          <CardBody className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between text-[0.65rem]">
                <span className="uppercase tracking-wider text-slate-500">Window elapsed</span>
                <span className="font-semibold text-slate-300">{slaPct}%</span>
              </div>
              <ProgressBar value={slaPct} color={slaPct > 75 ? 'bg-rose-400' : slaPct > 50 ? 'bg-amber-400' : 'bg-emerald-400'} />
            </div>
            <p className="text-xs leading-5 text-slate-400">
              {inc.status === 'Resolved'
                ? 'Incident closed. No further SLA action required.'
                : inc.slaHours <= 8
                  ? 'This incident is inside a tight SLA window — response is expected imminently.'
                  : 'Standard SLA window. Keep the assignee informed of progress.'}
            </p>
            {policy ? (
              <Link
                href={`/policies/${policy.id}`}
                className="block rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-sentinel-500/40"
              >
                <p className="text-[0.65rem] uppercase tracking-wider text-slate-500">Triggering policy</p>
                <p className="mt-1 text-xs font-semibold text-white">{policy.name}</p>
                <p className="mt-0.5 text-[0.65rem] text-slate-500">{policy.id} · {policy.status}</p>
              </Link>
            ) : null}
            <Link
              href={`/ai-systems/${inc.systemId}`}
              className="block rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-sentinel-500/40"
            >
              <p className="text-[0.65rem] uppercase tracking-wider text-slate-500">Affected AI system</p>
              <p className="mt-1 text-xs font-semibold text-white">{systemName(inc.systemId)}</p>
              <p className="mt-0.5 text-[0.65rem] text-slate-500">{inc.systemId} · {systemRisk(inc.systemId)} risk</p>
            </Link>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}