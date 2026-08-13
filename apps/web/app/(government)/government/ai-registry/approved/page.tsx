import { PageHeader } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { RegistryTable } from '@/components/government/registry-table';
import { governmentRegistry } from '@/lib/mock-data';

export default function Page() {
  const rows = governmentRegistry.filter((r) => r.status === 'Registered');
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="AI Registry — Approved"
        description="Systems cleared for operation on public-sector data."
      />
      <RegistryTable rows={rows} title="Approved Systems" subtitle={`${rows.length} systems currently approved for operation`} />
    </GovShell>
  );
}