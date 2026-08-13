import { registryBadges } from '@/components/government/registry-content';
import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { registryNav, findRegistry, circularSlice } from '@/components/government/profile-shell';
import { AuditTable } from '@/components/government/sections';
import { auditLogs } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = findRegistry(id);
  const idx = Number(entry.id.replace('reg-', '')) - 1;
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={entry.name} subtitle="Audit trail for this registered system." badges={registryBadges(entry)} nav={registryNav} base={`/government/ai-registry/${entry.id}`} active="audit">
        <AuditTable rows={circularSlice(auditLogs, idx, 10)} title="System Audit Trail" subtitle="Events captured for this registration" />
      </ProfileShell>
    </GovShell>
  );
}