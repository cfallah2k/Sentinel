import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { policyNav, findPolicy } from '@/components/government/policies-shared';
import { auditLogs } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const policy = findPolicy(id);
  const events = auditLogs.filter((l) => l.resource.includes(policy.id)).length ? auditLogs.filter((l) => l.resource.includes(policy.id)) : auditLogs.slice(0, 8);
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={`Audit — ${policy.name}`} subtitle="Administrative events touching this policy." nav={policyNav} base={`/government/policies/${policy.id}`} active="audit">
        <Card>
          <CardHeader title="Policy Audit Trail" />
          <CardBody className="divide-y divide-white/5">
            {events.map((l) => (
              <div key={l.id} className="flex items-center justify-between gap-3 py-3 text-xs">
                <div className="min-w-0">
                  <p className="font-mono text-sky-300">{l.action}</p>
                  <p className="mt-0.5 truncate text-slate-400">{l.resource} · {l.actor}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="font-mono text-slate-500">{l.timestamp}</span>
                  <Badge label={l.result} tone={l.result === 'Success' ? 'green' : l.result === 'Error' ? 'rose' : 'amber'} />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </ProfileShell>
    </GovShell>
  );
}