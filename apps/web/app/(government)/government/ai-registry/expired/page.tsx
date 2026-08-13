import { PageHeader } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { RegistryTable } from '@/components/government/registry-table';
import { governmentRegistry } from '@/lib/mock-data';

export default function Page() {
  const rows = governmentRegistry.filter((r) => r.status === 'Expired');
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="AI Registry — Expired"
        description="Registrations past their approval window and not renewed."
      />
      <RegistryTable rows={rows} title="Expired Registrations" subtitle={`${rows.length} registrations lapsed`} />
    </GovShell>
  );
}