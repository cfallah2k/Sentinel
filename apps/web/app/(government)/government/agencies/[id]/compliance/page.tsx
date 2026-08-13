import { agencyBadges } from '@/components/government/agency-content';
import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { agencyNav, findAgency } from '@/components/government/profile-shell';
import { FrameworksTable } from '@/components/government/sections';
import { complianceFrameworks } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agency = findAgency(id);
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={agency.name} subtitle="Compliance posture of the agency portfolio." badges={agencyBadges(agency)} nav={agencyNav} base={`/government/agencies/${agency.id}`} active="compliance">
        <FrameworksTable rows={complianceFrameworks} title="Compliance Posture" subtitle="Framework readiness across the portfolio" />
      </ProfileShell>
    </GovShell>
  );
}