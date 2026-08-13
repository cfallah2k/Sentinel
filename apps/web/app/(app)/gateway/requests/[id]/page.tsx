import { Activity, Clock, Fingerprint, ShieldAlert } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AttrGrid } from '@/components/registry/attr-grid';
import { Timeline } from '@/components/enforcement/timeline';
import { DecisionBadge, SeverityBadge } from '@/components/enforcement/badges';
import {
  fmt,
  policyById,
  policyName,
  requestById,
  requestNav,
  requestTimeline,
  requestView,
  rulesForPolicy
} from '@/components/enforcement/helpers';
import { models, providers } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const req = requestById(id);
  const v = requestView(req);
  const policy = policyById(req.policyId);
  const provider = providers.find((p) => p.id === req.providerId);
  const model = models.find((m) => m.id === req.modelId);
  const redactionFields = req.decision === 'Redacted' ? ['email', 'phone', 'SSN', 'card number'] : [];

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Gateway"
        title={req.id}
        id={req.id}
        description={`${v.app} → ${v.system} · evaluated ${req.timestamp}`}
        badges={[
          <DecisionBadge key="d" label={req.decision} />,
          <SeverityBadge key="r" label={v.risk} />,
          <Badge key="c" label={req.category} tone="blue" />,
          <Badge key="ip" label={`IP ${req.ip}`} tone="slate" />
        ]}
        meta={[
          { label: 'Application', value: v.app },
          { label: 'System', value: v.system },
          { label: 'Provider', value: provider?.name ?? '—' },
          { label: 'Model', value: model?.name ?? '—' }
        ]}
      />
      <DetailNav base={`/gateway/requests/${id}`} items={requestNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Latency" value={`${req.latencyMs} ms`} icon={Clock} accent="cyan" />
        <StatCard label="Tokens" value={fmt(req.tokens)} icon={Activity} accent="sky" />
        <StatCard label="Risk Level" value={v.risk} icon={ShieldAlert} accent={v.risk === 'High' || v.risk === 'Critical' ? 'rose' : v.risk === 'Medium' ? 'amber' : 'green'} />
        <StatCard label="Policy" value={req.policyId ? policyName(req.policyId).slice(0, 18) : 'Default flow'} icon={Fingerprint} accent="violet" />
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader title="Request details" subtitle="Full evaluation attributes" />
          <CardBody>
            <AttrGrid
              items={[
                { label: 'Application', value: v.app },
                { label: 'AI System', value: v.system },
                { label: 'Model', value: v.model },
                { label: 'Provider', value: v.provider },
                { label: 'Data Category', value: req.category },
                { label: 'Tokens', value: fmt(req.tokens) },
                { label: 'Latency', value: `${req.latencyMs} ms` },
                { label: 'Source IP', value: req.ip },
                { label: 'Policy', value: req.policyId ? policyName(req.policyId) : 'None — default flow' },
                { label: 'Timestamp', value: req.timestamp, full: true }
              ]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Policy evaluation" subtitle={policy ? `${policy.name} · ${policy.version}` : 'No policy constraint matched'} />
          <CardBody>
            {policy ? (
              <div className="divide-y divide-white/5">
                {rulesForPolicy(policy).map((r) => (
                  <div key={r.id} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-white">{r.name}</p>
                      <p className="mt-0.5 font-mono text-[0.65rem] text-slate-500">{r.field} {r.operator} {r.value}</p>
                    </div>
                    <DecisionBadge label={r.action} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-6 text-center text-sm text-slate-400">
                Request was not matched by any policy rule and used the default gateway flow.
              </p>
            )}
          </CardBody>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader title="Redaction summary" subtitle={req.decision === 'Redacted' ? 'Fields scrubbed before transmission' : 'No redaction applied'} />
          <CardBody>
            {req.decision === 'Redacted' ? (
              <div className="space-y-2">
                {redactionFields.map((f) => (
                  <div key={f} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-2.5">
                    <span className="text-xs text-slate-300">{f}</span>
                    <span className="font-mono text-xs text-violet-300">[REDACTED]</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-6 text-center text-sm text-slate-400">
                {req.decision === 'Blocked' ? 'Request was blocked — nothing reached the provider.' : 'No sensitive fields detected in the payload.'}
              </p>
            )}
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Evaluation timeline" subtitle="Stages the request passed through" />
          <CardBody>
            <Timeline items={requestTimeline(req)} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}