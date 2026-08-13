import { agencyBadges } from '@/components/government/agency-content';
import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { agencyNav, findAgency, systemsForAgency } from '@/components/government/profile-shell';
import { SystemsTable } from '@/components/government/sections';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agency = findAgency(id);
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={agency.name} subtitle="AI systems under this agency's oversight." badges={agencyBadges(agency)} nav={agencyNav} base={`/government/agencies/${agency.id}`} active="ai-systems">
        <SystemsTable rows={systemsForAgency(agency.id)} title="Systems Under Oversight" subtitle="Systems attributed to this agency's portfolio" />
      </ProfileShell>
    </GovShell>
  );
}