import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { policyNav, findPolicy, ViolationsTable, violationsForPolicy } from '@/components/government/policies-shared';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const policy = findPolicy(id);
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={`Violations — ${policy.name}`} subtitle={`${policy.violations} violations recorded for this policy.`} nav={policyNav} base={`/government/policies/${policy.id}`} active="violations">
        <ViolationsTable rows={violationsForPolicy(policy.id)} />
      </ProfileShell>
    </GovShell>
  );
}