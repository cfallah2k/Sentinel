import { Boxes, ScrollText, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AttrGrid } from '@/components/registry/attr-grid';
import { RequestTable } from '@/components/enforcement/tables';
import { DecisionBadge } from '@/components/enforcement/badges';
import { fmt, policyById, policyNav, policyVersions, policyViolations, rulesForPolicy } from '@/components/enforcement/helpers';
import { policies } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const policy = policyById(id) ?? policies[0];
  const rules = rulesForPolicy(policy);
  const versions = policyVersions(policy);
  const violations = policyViolations(policy.id);

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Policies"
        title={policy.name}
        id={policy.id}
        description={policy.description}
        badges={[
          <Badge key="s" label={policy.status} tone={policy.status === 'Active' ? 'green' : policy.status === 'Draft' ? 'amber' : 'slate'} />,
          <Badge key="v" label={policy.version} tone="blue" />,
          <Badge key="m" label={`${policy.conditions} rules`} tone="slate" />
        ]}
        meta={[
          { label: 'Scope', value: policy.scope },
          { label: 'Updated', value: policy.updatedAt },
          { label: 'Enforcement mode', value: 'Enforce' }
        ]}
      />
      <DetailNav base={`/policies/${id}`} items={policyNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Violations" value={fmt(policy.violations)} delta={policy.violations > 0 ? -8.3 : 0} deltaLabel="vs last 30d" icon={ShieldAlert} accent="rose" />
        <StatCard label="Enforcements" value={fmt(policy.enforcements)} icon={ScrollText} accent="sky" />
        <StatCard label="Rules" value={policy.conditions} icon={Boxes} accent="violet" />
        <StatCard label="Status" value={policy.status} icon={ShieldCheck} accent={policy.status === 'Active' ? 'green' : 'amber'} />
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader title="Policy summary" subtitle="Core attributes" />
          <CardBody>
            <AttrGrid
              items={[
                { label: 'Status', value: policy.status },
                { label: 'Version', value: policy.version },
                { label: 'Scope', value: policy.scope },
                { label: 'Rules', value: String(policy.conditions) },
                { label: 'Violations', value: fmt(policy.violations) },
                { label: 'Enforcements', value: fmt(policy.enforcements) },
                { label: 'Updated', value: policy.updatedAt },
                {
                  label: 'Decisions',
                  value: (
                    <div className="flex flex-wrap gap-1.5">
                      {policy.decisions.map((d) => (
                        <DecisionBadge key={d} label={d} />
                      ))}
                    </div>
                  )
                }
              ]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Rule set" subtitle={`${rules.length} rules evaluated in order`} />
          <CardBody className="space-y-2">
            {rules.map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-white">{r.name}</p>
                  <p className="mt-0.5 font-mono text-[0.65rem] text-slate-500">{r.field} {r.operator} {r.value}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Badge label={`${r.hits.toLocaleString()} hits`} tone="slate" />
                  <DecisionBadge label={r.action} />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader title="Recent violations" subtitle={`${violations.length} requests blocked or redacted by this policy`} />
          <CardBody>
            <RequestTable rows={violations} searchPlaceholder="Search violations..." pageSize={6} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Versions" subtitle={`${versions.length} revisions of this policy`} />
          <CardBody className="space-y-2">
            {versions.map((v) => (
              <div key={v.version} className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white">{v.version}</p>
                  <p className="mt-0.5 text-[0.65rem] text-slate-500">{v.summary} · {v.author}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-[0.65rem] text-slate-500">{v.date}</span>
                  <Badge label={v.status} tone={v.status === 'Current' ? 'green' : 'slate'} />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}