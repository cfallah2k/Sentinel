import { agencyBadges } from '@/components/government/agency-content';
import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { agencyNav, findAgency, circularSlice, agencyIdx } from '@/components/government/profile-shell';
import { ProvidersTable } from '@/components/government/sections';
import { providers } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agency = findAgency(id);
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={agency.name} subtitle="Providers supplying this agency's portfolio." badges={agencyBadges(agency)} nav={agencyNav} base={`/government/agencies/${agency.id}`} active="providers">
        <ProvidersTable rows={circularSlice(providers, agencyIdx(agency.id) * 2, 4)} title="Provider Oversight" subtitle="Providers in the agency's supply chain" />
      </ProfileShell>
    </GovShell>
  );
}