import { PageHeader } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { ProvidersTable } from '@/components/government/sections';
import { providers } from '@/lib/mock-data';

export default function Page() {
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="Model Providers"
        description="Providers supplying model capabilities to regulated systems, and their oversight posture."
      />
      <ProvidersTable rows={providers} subtitle={`${providers.length} providers in the oversight scope`} />
    </GovShell>
  );
}