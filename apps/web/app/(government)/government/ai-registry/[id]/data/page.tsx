import { registryBadges } from '@/components/government/registry-content';
import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { registryNav, findRegistry, circularSlice } from '@/components/government/profile-shell';
import { SourcesTable } from '@/components/government/sections';
import { dataSources } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = findRegistry(id);
  const idx = Number(entry.id.replace('reg-', '')) - 1;
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={entry.name} subtitle="Data categories processed by this system." badges={registryBadges(entry)} nav={registryNav} base={`/government/ai-registry/${entry.id}`} active="data">
        <SourcesTable rows={circularSlice(dataSources, idx, 4)} title="Associated Data Sources" subtitle="Sources feeding this registered system" />
      </ProfileShell>
    </GovShell>
  );
}