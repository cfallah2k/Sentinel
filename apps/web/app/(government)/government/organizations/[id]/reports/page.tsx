import { orgBadges } from '@/components/government/org-content';
import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { organizationNav, findOrg, circularSlice } from '@/components/government/profile-shell';
import { ReportsTable } from '@/components/government/sections';
import { reports } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const org = findOrg(id);
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={org.name} subtitle="Reports filed for this operator." badges={orgBadges(org)} nav={organizationNav} base={`/government/organizations/${org.id}`} active="reports">
        <ReportsTable rows={circularSlice(reports, org.users % reports.length, 6)} title="Operator Reports" subtitle="Filing history and scheduled artifacts" />
      </ProfileShell>
    </GovShell>
  );
}