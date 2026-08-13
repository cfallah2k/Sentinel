import { agencyBadges } from '@/components/government/agency-content';
import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { agencyNav, findAgency, incidentsForAgency } from '@/components/government/profile-shell';
import { IncidentsTable } from '@/components/government/sections';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agency = findAgency(id);
  const rows = incidentsForAgency(agency.id);
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={agency.name} subtitle="Incidents across this agency's portfolio." badges={agencyBadges(agency)} nav={agencyNav} base={`/government/agencies/${agency.id}`} active="incidents">
        <IncidentsTable rows={rows} title="Incident History" subtitle={`${rows.length} incidents on record`} />
      </ProfileShell>
    </GovShell>
  );
}