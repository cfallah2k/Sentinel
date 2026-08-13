import { registryBadges, registryProfileContent } from '@/components/government/registry-content';
import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { registryNav, findRegistry } from '@/components/government/profile-shell';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = findRegistry(id);
  return (
    <GovShell>
      <ProfileShell
        eyebrow="Government"
        title={entry.name}
        subtitle={`${entry.operator} · registered ${entry.approvedAt} · ${entry.purpose}`}
        badges={registryBadges(entry)}
        nav={registryNav}
        base={`/government/ai-registry/${entry.id}`}
        active="overview"
      >
        {registryProfileContent(entry)}
      </ProfileShell>
    </GovShell>
  );
}