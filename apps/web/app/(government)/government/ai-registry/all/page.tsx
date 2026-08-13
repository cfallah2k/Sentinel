import { PageHeader } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { RegistryTable } from '@/components/government/registry-table';
import { governmentRegistry } from '@/lib/mock-data';

export default function Page() {
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="AI Registry — All"
        description="Complete national register of AI systems, unfiltered."
      />
      <RegistryTable rows={governmentRegistry} title="All Systems" />
    </GovShell>
  );
}