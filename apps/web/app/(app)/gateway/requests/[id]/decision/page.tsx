import { Gavel, Zap, ShieldCheck, Timer } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { DecisionBadge, SeverityBadge } from '@/components/enforcement/badges';
import { fmt, policyById, requestById, requestNav, requestView } from '@/components/enforcement/helpers';

const actionDetail: Record<string, string> = {
  Allowed: 'Request forwarded to the provider with a full audit record.',
  Blocked: 'Request terminated at the gateway before reaching the provider.',
  Redacted: 'Sensitive fields scrubbed before the request was transmitted.',
  'Approval Required': 'Request queued for human approval — provider not contacted.',
  Logged: 'Request passed through and recorded for governance review.'
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const req = requestById(id);
  const v = requestView(req);
  const policy = policyById(req.policyId);

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Gateway"
        title={`${req.id} · Decision`}
        id={req.id}
        description="Final enforcement decision and the reasoning behind it."
        badges={[
          <DecisionBadge key="d" label={req.decision} />,
          <SeverityBadge key="r" label={v.risk} />,
          <Badge key="c" label={req.category} tone="blue" />
        ]}
      />
      <DetailNav base={`/gateway/requests/${id}`} items={requestNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Decision" value={req.decision} icon={Gavel} accent={req.decision === 'Allowed' ? 'green' : req.decision === 'Blocked' ? 'rose' : req.decision === 'Redacted' ? 'violet' : 'amber'} />
        <StatCard label="Decision Time" value="18 ms" icon={Timer} accent="cyan" />
        <StatCard label="Tokens" value={fmt(req.tokens)} icon={Zap} accent="sky" />
        <StatCard label="System Risk" value={v.risk} icon={ShieldCheck} accent={v.risk === 'High' || v.risk === 'Critical' ? 'rose' : 'green'} />
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader title="Enforcement action" subtitle="What the gateway did" />
          <CardBody className="flex flex-col items-center gap-4 py-10 text-center">
            <DecisionBadge label={req.decision} />
            <p className="max-w-md text-sm leading-6 text-slate-400">{actionDetail[req.decision]}</p>
            <p className="text-[0.65rem] text-slate-500">Evaluated in 18 ms · policy engine v3.2</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Decision inputs" subtitle="Signals used by the policy engine" />
          <CardBody className="space-y-2">
            {[
              { label: 'Data category', value: req.category },
              { label: 'System risk', value: v.risk },
              { label: 'Matched policy', value: policy ? policy.name : 'None' },
              { label: 'Destination', value: v.provider },
              { label: 'Model', value: v.model }
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-slate-500">{row.label}</span>
                <span className="text-xs text-slate-200">{row.value}</span>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}