import { orgBadges } from '@/components/government/org-content';
import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { organizationNav, findOrg, circularSlice } from '@/components/government/profile-shell';
import { SourcesTable } from '@/components/government/sections';
import { dataSources } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const org = findOrg(id);
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={org.name} subtitle="Data sources feeding this operator's AI systems." badges={orgBadges(org)} nav={organizationNav} base={`/government/organizations/${org.id}`} active="data">
        <SourcesTable rows={circularSlice(dataSources, org.users % dataSources.length, 5)} title="Data Inventory" subtitle="Sources connected to this operator's estate" />
      </ProfileShell>
    </GovShell>
  );
}