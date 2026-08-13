import { registryBadges } from '@/components/government/registry-content';
import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { registryNav, findRegistry, circularSlice } from '@/components/government/profile-shell';
import { ProvidersTable, ModelsTable } from '@/components/government/sections';
import { models, providers } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = findRegistry(id);
  const idx = Number(entry.id.replace('reg-', '')) - 1;
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={entry.name} subtitle="Providers and models underpinning this system." badges={registryBadges(entry)} nav={registryNav} base={`/government/ai-registry/${entry.id}`} active="provider">
        <ProvidersTable rows={circularSlice(providers, idx, 3)} title="Provider Stack" subtitle="Providers in the system's request path" />
        <ModelsTable rows={circularSlice(models, idx, 4)} title="Model Stack" subtitle="Models referenced by this system" />
      </ProfileShell>
    </GovShell>
  );
}