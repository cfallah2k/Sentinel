import { agencyBadges } from '@/components/government/agency-content';
import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { agencyNav, findAgency, circularSlice, agencyIdx } from '@/components/government/profile-shell';
import { SourcesTable } from '@/components/government/sections';
import { dataSources } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agency = findAgency(id);
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={agency.name} subtitle="Data sources relevant to this agency's portfolio." badges={agencyBadges(agency)} nav={agencyNav} base={`/government/agencies/${agency.id}`} active="data">
        <SourcesTable rows={circularSlice(dataSources, agencyIdx(agency.id) * 2, 5)} title="Data Inventory" subtitle="Sources feeding systems under oversight" />
      </ProfileShell>
    </GovShell>
  );
}