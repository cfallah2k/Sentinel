import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { policyNav, findPolicy, policyVersionHistory } from '@/components/government/policies-shared';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const policy = findPolicy(id);
  const versions = policyVersionHistory(policy);
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={`Versions — ${policy.name}`} subtitle="Revision history of the policy definition." nav={policyNav} base={`/government/policies/${policy.id}`} active="versions">
        <Card>
          <CardHeader title="Revision History" subtitle={`${versions.length} published revisions`} />
          <CardBody className="divide-y divide-white/5">
            {[...versions].reverse().map((v) => (
              <div key={v.version} className="flex items-center justify-between gap-3 py-3 text-xs">
                <div>
                  <p className="font-mono font-semibold text-sky-300">{v.version}</p>
                  <p className="mt-0.5 text-slate-400">{v.changes}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">published {v.published}</span>
                  {v.version === policy.version ? <Badge label="Current" tone="green" /> : <Badge label="Superseded" tone="slate" />}
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </ProfileShell>
    </GovShell>
  );
}