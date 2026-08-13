import { PageHeader } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { RegistryTable } from '@/components/government/registry-table';
import { governmentRegistry } from '@/lib/mock-data';

export default function Page() {
  const rows = governmentRegistry.filter((r) => r.risk === 'High' || r.risk === 'Critical');
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="AI Registry — High Risk"
        description="Systems classified High or Critical risk under the National AI Risk Classification Standard."
      />
      <RegistryTable rows={rows} title="High-Risk Systems" subtitle={`${rows.length} systems in the high-risk tier`} />
    </GovShell>
  );
}