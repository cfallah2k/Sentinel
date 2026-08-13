import { PageHeader } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { ModelsTable } from '@/components/government/sections';
import { models } from '@/lib/mock-data';

export default function Page() {
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="Model Registry"
        description="Foundation models in use across regulated systems, with modality and risk classification."
      />
      <ModelsTable rows={models} subtitle={`${models.length} models tracked under national oversight`} />
    </GovShell>
  );
}