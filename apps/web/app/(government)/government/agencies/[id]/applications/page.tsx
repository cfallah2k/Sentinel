import { agencyBadges } from '@/components/government/agency-content';
import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { agencyNav, findAgency, circularSlice, agencyIdx } from '@/components/government/profile-shell';
import { ApplicationsTable } from '@/components/government/sections';
import { applications } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agency = findAgency(id);
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={agency.name} subtitle="Applications touching this agency's systems." badges={agencyBadges(agency)} nav={agencyNav} base={`/government/agencies/${agency.id}`} active="applications">
        <ApplicationsTable rows={circularSlice(applications, agencyIdx(agency.id) * 2, 5)} title="Applications" subtitle="Applications in the agency's oversight scope" />
      </ProfileShell>
    </GovShell>
  );
}