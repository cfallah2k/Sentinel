import { History, MessageSquare, UserCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { Timeline } from '@/components/enforcement/timeline';
import { approvalAuditRows, approvalById, approvalNav, approvalTimeline } from '@/components/enforcement/helpers';
import { approvals } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const apr = approvalById(id) ?? approvals[0];
  const timeline = approvalTimeline(apr);
  const rows = approvalAuditRows(apr);

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Approvals"
        title={`${apr.type} · ${apr.id}`}
        id={apr.id}
        description="Lifecycle and decision history for this request."
        badges={[
          <Badge key="s" label={apr.status} tone={apr.status === 'Approved' ? 'green' : apr.status === 'Denied' ? 'rose' : apr.status === 'Expired' ? 'slate' : 'amber'} />,
          <Badge key="r" label={`${apr.risk} risk`} tone={apr.risk === 'Critical' ? 'red' : apr.risk === 'High' ? 'rose' : 'amber'} />
        ]}
      />
      <DetailNav base={`/approvals/${id}`} items={approvalNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Events" value={timeline.length} icon={History} accent="sky" />
        <StatCard label="Reviewers" value={2} icon={UserCheck} accent="green" />
        <StatCard label="Decisions" value={rows.filter((r) => r.action === 'approval.decide').length} icon={MessageSquare} accent="violet" />
        <StatCard label="State" value={apr.status} icon={History} accent="amber" />
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader title="Status timeline" subtitle="Lifecycle events" />
          <CardBody>
            <Timeline items={timeline.map((t) => ({ time: t.time, title: t.title, description: t.detail }))} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Review history" subtitle="Actions recorded against the request" />
          <CardBody className="space-y-2">
            {rows.map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-white">{r.action}</p>
                  <p className="mt-0.5 text-[0.65rem] text-slate-500">{r.actor} · {r.result}</p>
                </div>
                <span className="shrink-0 text-[0.65rem] text-slate-500">{r.timestamp}</span>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}