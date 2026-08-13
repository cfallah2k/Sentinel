import { PageHeader } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { RegistryTable } from '@/components/government/registry-table';
import { governmentRegistry } from '@/lib/mock-data';

export default function Page() {
  const rows = governmentRegistry.filter((r) => r.status === 'Pending');
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="AI Registry — Pending"
        description="Registration applications awaiting regulatory review."
      />
      <RegistryTable rows={rows} title="Pending Reviews" subtitle={`${rows.length} applications in the review queue`} />
    </GovShell>
  );
}