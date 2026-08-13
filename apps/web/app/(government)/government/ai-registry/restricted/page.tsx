import { PageHeader } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { RegistryTable } from '@/components/government/registry-table';
import { governmentRegistry } from '@/lib/mock-data';

export default function Page() {
  const rows = governmentRegistry.filter((r) => r.status === 'Restricted');
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="AI Registry — Restricted"
        description="Systems with restricted scope, limited to specific operators or data classes."
      />
      <RegistryTable rows={rows} title="Restricted Systems" subtitle={`${rows.length} systems under access restrictions`} />
    </GovShell>
  );
}