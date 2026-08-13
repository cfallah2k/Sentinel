import { Fingerprint, ShieldCheck, ShieldX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { DecisionBadge, SeverityBadge } from '@/components/enforcement/badges';
import { policyById, requestById, requestNav, rulesForPolicy } from '@/components/enforcement/helpers';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const req = requestById(id);
  const policy = policyById(req.policyId);

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Gateway"
        title={`${req.id} · Policy`}
        id={req.id}
        description="Policy evaluation that produced the final decision."
        badges={[
          <DecisionBadge key="d" label={req.decision} />,
          <Badge key="p" label={policy ? policy.version : 'No policy'} tone={policy ? 'blue' : 'slate'} />
        ]}
      />
      <DetailNav base={`/gateway/requests/${id}`} items={requestNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Policy Matched" value={policy ? 'Yes' : 'No'} icon={Fingerprint} accent={policy ? 'green' : 'rose'} />
        <StatCard label="Rules Evaluated" value={policy ? policy.conditions : 0} icon={ShieldCheck} accent="sky" />
        <StatCard label="Policy Violations" value={policy ? policy.violations : 0} icon={ShieldX} accent="amber" />
        <StatCard label="Enforcements" value={policy ? policy.enforcements.toLocaleString() : '0'} icon={ShieldCheck} accent="violet" />
      </div>
      <Card>
        <CardHeader title="Matched policy" subtitle={policy ? `${policy.name} · ${policy.version} · ${policy.scope}` : 'Default flow'} />
        <CardBody>
          {policy ? (
            <div className="space-y-4">
              <p className="text-xs leading-6 text-slate-400">{policy.description}</p>
              <div className="flex flex-wrap gap-2">
                {policy.decisions.map((d) => (
                  <DecisionBadge key={d} label={d} />
                ))}
              </div>
              <div className="divide-y divide-white/5">
                {rulesForPolicy(policy).map((r) => (
                  <div key={r.id} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-white">{r.name}</p>
                      <p className="mt-0.5 font-mono text-[0.65rem] text-slate-500">{r.field} {r.operator} {r.value}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge label={`${r.hits.toLocaleString()} hits`} tone="slate" />
                      <DecisionBadge label={r.action} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <Fingerprint className="h-8 w-8 text-slate-600" />
              <p className="max-w-md text-sm leading-6 text-slate-400">
                No policy rule matched this request. It was handled by the default gateway flow and recorded in the audit log.
              </p>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}