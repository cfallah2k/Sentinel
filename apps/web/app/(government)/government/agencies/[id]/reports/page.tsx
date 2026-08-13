import { agencyBadges } from '@/components/government/agency-content';
import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { agencyNav, findAgency, circularSlice, agencyIdx } from '@/components/government/profile-shell';
import { ReportsTable } from '@/components/government/sections';
import { reports } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agency = findAgency(id);
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={agency.name} subtitle="Reports filed for this agency." badges={agencyBadges(agency)} nav={agencyNav} base={`/government/agencies/${agency.id}`} active="reports">
        <ReportsTable rows={circularSlice(reports, agencyIdx(agency.id) * 2, 6)} title="Agency Reports" subtitle="Filing history for this agency" />
      </ProfileShell>
    </GovShell>
  );
}