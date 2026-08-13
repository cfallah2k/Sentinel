import { registryBadges } from '@/components/government/registry-content';
import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { registryNav, findRegistry } from '@/components/government/profile-shell';
import { FrameworksTable } from '@/components/government/sections';
import { complianceFrameworks } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = findRegistry(id);
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={entry.name} subtitle="Standards compliance attached to this system." badges={registryBadges(entry)} nav={registryNav} base={`/government/ai-registry/${entry.id}`} active="compliance">
        <FrameworksTable rows={complianceFrameworks} title="Compliance Posture" subtitle="Frameworks this system must satisfy" />
      </ProfileShell>
    </GovShell>
  );
}