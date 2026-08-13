import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { policyNav, findPolicy } from '@/components/government/policies-shared';

const detail = [
  'Scope binding',
  'Data category match',
  'Region match',
  'Risk tier match'
];

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const policy = findPolicy(id);
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={`Rules — ${policy.name}`} subtitle="Enforcement decisions and conditions in effect." nav={policyNav} base={`/government/policies/${policy.id}`} active="rules">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {policy.decisions.map((d) => (
            <Card key={d}>
              <CardHeader title={d} />
              <CardBody>
                <p className="text-xs leading-5 text-slate-400">
                  {d === 'Allow' ? 'Requests matching this policy are permitted and logged.' :
                    d === 'Block' ? 'Requests matching this policy are terminated at the gateway.' :
                      d === 'Redact' ? 'Sensitive values are stripped before transmission.' :
                        d === 'Require Approval' ? 'Requests are queued for human approval before release.' :
                          'Every matching request is recorded for audit.'}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {detail.slice(0, policy.conditions).map((c) => <Badge key={c} label={c} tone="slate" />)}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </ProfileShell>
    </GovShell>
  );
}