import { FileCheck2, Link2, ShieldAlert, ShieldX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { DecisionBadge, SeverityBadge } from '@/components/enforcement/badges';
import { incidentById, incidentNav, policyById, rulesForPolicy } from '@/components/enforcement/helpers';
import { incidents } from '@/lib/mock-data';
import Link from 'next/link';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const inc = incidentById(id) ?? incidents[0];
  const policy = inc.policyId ? policyById(inc.policyId) : null;
  const rules = policy ? rulesForPolicy(policy) : [];

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Incidents"
        title={inc.title}
        id={inc.id}
        description="The policy this incident is linked to."
        badges={[
          <SeverityBadge key="sev" label={inc.severity} />,
          <Badge key="s" label={inc.status} tone={inc.status === 'Resolved' ? 'green' : inc.status === 'Investigating' ? 'sky' : 'amber'} />
        ]}
      />
      <DetailNav base={`/incidents/${id}`} items={incidentNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Policy Linked" value={policy ? 'Yes' : 'None'} icon={Link2} accent={policy ? 'green' : 'slate'} />
        <StatCard label="Policy Status" value={policy?.status ?? '—'} icon={FileCheck2} accent="sky" />
        <StatCard label="Rule Hits" value={rules.length} icon={ShieldAlert} accent="amber" />
        <StatCard label="Violations" value={policy ? policy.violations : 0} icon={ShieldX} accent="rose" />
      </div>
      {policy ? (
        <>
          <Card>
            <CardHeader title={policy.name} subtitle={`${policy.id} · ${policy.status}`} />
            <CardBody>
              <p className="text-xs leading-5 text-slate-400">{policy.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Badge label={policy.scope} tone="blue" />
                <Badge label={policy.version} tone="slate" />
                {policy.decisions.map((d) => (
                  <DecisionBadge key={d} label={d} />
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/5 pt-4">
                <p className="text-[0.65rem] text-slate-500">Open full policy record</p>
                <Link href={`/policies/${policy.id}`} className="inline-flex items-center justify-center rounded-full bg-sentinel-500 px-4 py-2 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400">
                  View policy
                </Link>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Evaluated rules" subtitle="Rule set that applies to this traffic" />
            <CardBody className="space-y-2">
              {rules.map((r) => (
                <div key={r.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-white">{r.name}</p>
                    <p className="mt-0.5 font-mono text-[0.65rem] text-slate-500">{r.field} {r.operator} {r.value}</p>
                  </div>
                  <DecisionBadge label={r.action} />
                </div>
              ))}
            </CardBody>
          </Card>
        </>
      ) : (
        <Card>
          <CardBody className="py-10 text-center">
            <p className="text-xs text-slate-400">No policy is linked to this incident. It was detected by behavioral monitoring rather than policy enforcement.</p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}