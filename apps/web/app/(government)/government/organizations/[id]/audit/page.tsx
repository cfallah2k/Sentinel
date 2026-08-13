import { orgBadges } from '@/components/government/org-content';
import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { organizationNav, findOrg, circularSlice } from '@/components/government/profile-shell';
import { AuditTable } from '@/components/government/sections';
import { auditLogs } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const org = findOrg(id);
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={org.name} subtitle="Audit trail for this operator." badges={orgBadges(org)} nav={organizationNav} base={`/government/organizations/${org.id}`} active="audit">
        <AuditTable rows={circularSlice(auditLogs, org.users % auditLogs.length, 10)} title="Operator Audit Trail" subtitle="Events captured across this operator's estate" />
      </ProfileShell>
    </GovShell>
  );
}