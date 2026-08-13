import { Activity, Clock, ShieldAlert } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AttrGrid } from '@/components/registry/attr-grid';
import { Timeline } from '@/components/enforcement/timeline';
import { DecisionBadge, SeverityBadge } from '@/components/enforcement/badges';
import { fmt, policyName, requestById, requestNav, requestTimeline, requestView } from '@/components/enforcement/helpers';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const req = requestById(id);
  const v = requestView(req);

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Gateway"
        title={req.id}
        id={req.id}
        description="Summary of the request evaluation and outcome."
        badges={[
          <DecisionBadge key="d" label={req.decision} />,
          <SeverityBadge key="r" label={v.risk} />,
          <Badge key="c" label={req.category} tone="blue" />
        ]}
        meta={[
          { label: 'Application', value: v.app },
          { label: 'System', value: v.system },
          { label: 'Timestamp', value: req.timestamp }
        ]}
      />
      <DetailNav base={`/gateway/requests/${id}`} items={requestNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Decision" value={req.decision} icon={Activity} accent={req.decision === 'Allowed' ? 'green' : req.decision === 'Blocked' ? 'rose' : 'amber'} />
        <StatCard label="Latency" value={`${req.latencyMs} ms`} icon={Clock} accent="cyan" />
        <StatCard label="Tokens" value={fmt(req.tokens)} icon={Activity} accent="sky" />
        <StatCard label="System Risk" value={v.risk} icon={ShieldAlert} accent={v.risk === 'High' || v.risk === 'Critical' ? 'rose' : 'green'} />
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader title="Evaluation attributes" subtitle="Metadata captured for this request" />
          <CardBody>
            <AttrGrid
              items={[
                { label: 'Application', value: v.app },
                { label: 'AI System', value: v.system },
                { label: 'Model', value: v.model },
                { label: 'Provider', value: v.provider },
                { label: 'Data Category', value: req.category },
                { label: 'Source IP', value: req.ip },
                { label: 'Policy', value: req.policyId ? policyName(req.policyId) : 'None — default flow' },
                { label: 'Timestamp', value: req.timestamp, full: true }
              ]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Timeline" subtitle="Request lifecycle" />
          <CardBody>
            <Timeline items={requestTimeline(req)} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}