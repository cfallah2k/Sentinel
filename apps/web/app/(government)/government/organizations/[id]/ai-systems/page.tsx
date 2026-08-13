import { orgBadges } from '@/components/government/org-content';
import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { organizationNav, findOrg, registryRowsForOrg } from '@/components/government/profile-shell';
import { RegistryTable } from '@/components/government/registry-table';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const org = findOrg(id);
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={org.name} subtitle="Registered systems for this operator." badges={orgBadges(org)} nav={organizationNav} base={`/government/organizations/${org.id}`} active="ai-systems">
        <RegistryTable title="Registered Systems" subtitle="Systems registered under this operator" rows={registryRowsForOrg(org.id)} />
      </ProfileShell>
    </GovShell>
  );
}