import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { policyNav, findPolicy } from '@/components/government/policies-shared';
import { approvals } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const policy = findPolicy(id);
  const exceptions = approvals.filter((a) => a.policyId === policy.id);
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={`Exceptions — ${policy.name}`} subtitle="Approved, denied, and pending exceptions to this policy." nav={policyNav} base={`/government/policies/${policy.id}`} active="exceptions">
        <Card>
          <CardHeader title="Exception Requests" subtitle={`${exceptions.length} requests referencing this policy`} />
          <CardBody className="divide-y divide-white/5">
            {(exceptions.length ? exceptions : approvals.slice(0, 4)).map((a) => (
              <div key={a.id} className="flex items-start justify-between gap-3 py-3 text-xs">
                <div>
                  <p className="font-semibold text-white">{a.type} — {a.requester}</p>
                  <p className="mt-0.5 text-slate-400">{a.note}</p>
                  <p className="mt-0.5 text-[0.65rem] text-slate-500">{a.id} · requested {a.requestedAt} · expires {a.expiresAt}</p>
                </div>
                <Badge label={a.status} tone={a.status === 'Approved' ? 'green' : a.status === 'Denied' ? 'rose' : a.status === 'Expired' ? 'slate' : 'amber'} />
              </div>
            ))}
          </CardBody>
        </Card>
      </ProfileShell>
    </GovShell>
  );
}