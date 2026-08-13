import { agencyBadges } from '@/components/government/agency-content';
import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { agencyNav, findAgency, circularSlice, agencyIdx } from '@/components/government/profile-shell';
import { AuditTable } from '@/components/government/sections';
import { auditLogs } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agency = findAgency(id);
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={agency.name} subtitle="Audit trail for this agency." badges={agencyBadges(agency)} nav={agencyNav} base={`/government/agencies/${agency.id}`} active="audit">
        <AuditTable rows={circularSlice(auditLogs, agencyIdx(agency.id) * 2, 10)} title="Agency Audit Trail" subtitle="Events captured under this agency's remit" />
      </ProfileShell>
    </GovShell>
  );
}