import { orgBadges } from '@/components/government/org-content';
import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { organizationNav, findOrg } from '@/components/government/profile-shell';
import { FrameworksTable } from '@/components/government/sections';
import { complianceFrameworks } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const org = findOrg(id);
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={org.name} subtitle="Standards compliance posture for this operator." badges={orgBadges(org)} nav={organizationNav} base={`/government/organizations/${org.id}`} active="compliance">
        <FrameworksTable rows={complianceFrameworks} title="Compliance Posture" subtitle="Framework readiness attributed to this operator" />
      </ProfileShell>
    </GovShell>
  );
}