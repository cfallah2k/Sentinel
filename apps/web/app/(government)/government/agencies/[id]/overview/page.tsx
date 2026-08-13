import { agencyBadges, agencyProfileContent } from '@/components/government/agency-content';
import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { agencyNav, findAgency } from '@/components/government/profile-shell';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agency = findAgency(id);
  return (
    <GovShell>
      <ProfileShell
        eyebrow="Government"
        title={agency.name}
        subtitle={`${agency.type} agency — ${agency.systems} systems overseen · contact ${agency.contact}`}
        badges={agencyBadges(agency)}
        nav={agencyNav}
        base={`/government/agencies/${agency.id}`}
        active="overview"
      >
        {agencyProfileContent(agency)}
      </ProfileShell>
    </GovShell>
  );
}