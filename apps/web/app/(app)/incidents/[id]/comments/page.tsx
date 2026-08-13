import { MessageSquare, ShieldCheck, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { SeverityBadge } from '@/components/enforcement/badges';
import { incidentById, incidentComments, incidentNav } from '@/components/enforcement/helpers';
import { incidents } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const inc = incidentById(id) ?? incidents[0];
  const comments = incidentComments(inc);

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Incidents"
        title={inc.title}
        id={inc.id}
        description="Discussion thread for the response team."
        badges={[
          <SeverityBadge key="sev" label={inc.severity} />,
          <Badge key="s" label={inc.status} tone={inc.status === 'Resolved' ? 'green' : inc.status === 'Investigating' ? 'sky' : 'amber'} />
        ]}
      />
      <DetailNav base={`/incidents/${id}`} items={incidentNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Comments" value={comments.length} icon={MessageSquare} accent="violet" />
        <StatCard label="Participants" value={new Set(comments.map((c) => c.author)).size} icon={Users} accent="sky" />
        <StatCard label="System Posts" value={comments.filter((c) => c.author === 'system').length} icon={ShieldCheck} accent="green" />
        <StatCard label="Thread Locked" value="No" icon={MessageSquare} accent="amber" />
      </div>
      <Card>
        <CardHeader title="Comments" subtitle="Newest updates from the response team" />
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
  );
}