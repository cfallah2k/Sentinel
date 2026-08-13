import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { policyNav, findPolicy } from '@/components/government/policies-shared';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const policy = findPolicy(id);
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={`Scope — ${policy.name}`} subtitle="Where this policy applies and what it binds." nav={policyNav} base={`/government/policies/${policy.id}`} active="scope">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader title="Bound Scope" />
            <CardBody className="space-y-3">
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Target</p>
                <p className="mt-1 text-sm font-semibold text-white">{policy.scope}</p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Description</p>
                <p className="mt-1 text-sm leading-5 text-slate-300">{policy.description}</p>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Conditions" subtitle={`${policy.conditions} active match conditions`} />
            <CardBody className="space-y-2">
              {['Source application', 'Data category', 'Destination provider', 'Risk tier', 'Environment'].slice(0, policy.conditions).map((c) => (
                <div key={c} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-2.5 text-xs">
                  <span className="text-slate-400">{c}</span>
                  <Badge label="Matched" tone="green" />
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </ProfileShell>
    </GovShell>
  );
}