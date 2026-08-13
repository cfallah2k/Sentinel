import { orgBadges } from '@/components/government/org-content';
import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { organizationNav, findOrg, incidentsForOrg } from '@/components/government/profile-shell';
import { IncidentsTable } from '@/components/government/sections';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const org = findOrg(id);
  const rows = incidentsForOrg(org.id);
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={org.name} subtitle="Incidents attributed to this operator." badges={orgBadges(org)} nav={organizationNav} base={`/government/organizations/${org.id}`} active="incidents">
        <IncidentsTable rows={rows} title="Incident History" subtitle={`${rows.length} incidents on record for this operator`} />
      </ProfileShell>
    </GovShell>
  );
}