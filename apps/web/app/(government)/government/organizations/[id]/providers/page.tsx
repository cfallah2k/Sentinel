import { orgBadges } from '@/components/government/org-content';
import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { organizationNav, findOrg, circularSlice } from '@/components/government/profile-shell';
import { ProvidersTable } from '@/components/government/sections';
import { providers } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const org = findOrg(id);
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={org.name} subtitle="Providers supplying this operator." badges={orgBadges(org)} nav={organizationNav} base={`/government/organizations/${org.id}`} active="providers">
        <ProvidersTable rows={circularSlice(providers, org.users % providers.length, 4)} title="Provider Oversight" subtitle="Providers in this operator's supply chain" />
      </ProfileShell>
    </GovShell>
  );
}