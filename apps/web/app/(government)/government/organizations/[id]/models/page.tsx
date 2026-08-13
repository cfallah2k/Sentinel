import { orgBadges } from '@/components/government/org-content';
import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { organizationNav, findOrg, circularSlice } from '@/components/government/profile-shell';
import { ModelsTable } from '@/components/government/sections';
import { models } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const org = findOrg(id);
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={org.name} subtitle="Models in use across this operator's systems." badges={orgBadges(org)} nav={organizationNav} base={`/government/organizations/${org.id}`} active="models">
        <ModelsTable rows={circularSlice(models, org.users % models.length, 5)} title="Model Usage" subtitle="Foundation models referenced by this operator" />
      </ProfileShell>
    </GovShell>
  );
}