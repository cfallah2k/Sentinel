import { GitBranch, History, RotateCcw, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { policyById, policyNav, policyVersions } from '@/components/enforcement/helpers';
import { policies } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const policy = policyById(id) ?? policies[0];
  const versions = policyVersions(policy);

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Policies"
        title={policy.name}
        id={policy.id}
        description="Revision history of this policy — every change is recorded."
        badges={[
          <Badge key="s" label={policy.status} tone={policy.status === 'Active' ? 'green' : policy.status === 'Draft' ? 'amber' : 'slate'} />,
          <Badge key="v" label={policy.version} tone="blue" />
        ]}
      />
      <DetailNav base={`/policies/${id}`} items={policyNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Versions" value={versions.length} icon={GitBranch} accent="violet" />
        <StatCard label="Current" value={policy.version} icon={ShieldCheck} accent="green" />
        <StatCard label="Rollbacks" value={versions.filter((v) => v.summary.toLowerCase().includes('rollback')).length} icon={RotateCcw} accent="amber" />
        <StatCard label="History Span" value="90 days" icon={History} accent="sky" />
      </div>
      <Card>
        <CardHeader title="Version history" subtitle="Newest first — current version is marked" />
        <CardBody>
          <div className="space-y-2">
            {versions.map((v) => (
              <div key={v.version} className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                <div className="flex items-center gap-4">
                  <span className="w-16 shrink-0 font-mono text-xs font-semibold text-sentinel-300">{v.version}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-white">{v.summary}</p>
                    <p className="mt-0.5 text-[0.65rem] text-slate-500">{v.author} · {v.date}</p>
                  </div>
                </div>
                <Badge label={v.status} tone={v.status === 'Current' ? 'green' : 'slate'} />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}