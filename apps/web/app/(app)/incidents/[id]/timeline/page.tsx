import { History, MessageSquare, ShieldAlert, UserCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { Timeline } from '@/components/enforcement/timeline';
import { SeverityBadge } from '@/components/enforcement/badges';
import { incidentById, incidentComments, incidentNav, incidentTimeline } from '@/components/enforcement/helpers';
import { incidents } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const inc = incidentById(id) ?? incidents[0];
  const timeline = incidentTimeline(inc);
  const comments = incidentComments(inc);

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Incidents"
        title={inc.title}
        id={inc.id}
        description="Event log and commentary for this incident."
        badges={[
          <SeverityBadge key="sev" label={inc.severity} />,
          <Badge key="s" label={inc.status} tone={inc.status === 'Resolved' ? 'green' : inc.status === 'Investigating' ? 'sky' : 'amber'} />
        ]}
      />
      <DetailNav base={`/incidents/${id}`} items={incidentNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Events" value={timeline.length} icon={History} accent="sky" />
        <StatCard label="Comments" value={comments.length} icon={MessageSquare} accent="violet" />
        <StatCard label="Responders" value={3} icon={UserCheck} accent="green" />
        <StatCard label="SLA" value={`${inc.slaHours}h`} icon={ShieldAlert} accent="amber" />
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader title="Timeline" subtitle="System and responder events" />
          <CardBody>
            <Timeline items={timeline.map((t) => ({ time: t.time, title: t.title, description: t.detail }))} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Comments" subtitle="Discussion from the response team" />
          <CardBody className="space-y-3">
            {comments.map((c) => (
              <div key={c.id} className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold text-white">{c.author === 'system' ? 'System' : c.author}</p>
                  <span className="text-[0.65rem] text-slate-500">{c.time}</span>
                </div>
                <p className="mt-1.5 text-xs leading-5 text-slate-400">{c.body}</p>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}