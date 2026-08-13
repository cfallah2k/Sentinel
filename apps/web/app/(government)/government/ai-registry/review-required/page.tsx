import { PageHeader } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { RegistryTable } from '@/components/government/registry-table';
import { governmentRegistry } from '@/lib/mock-data';

export default function Page() {
  const rows = governmentRegistry.filter((r) => (r.risk === 'High' || r.risk === 'Critical') && r.status !== 'Registered');
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="AI Registry — Review Required"
        description="High-risk systems not yet cleared, requiring a formal regulatory review."
      />
      <RegistryTable rows={rows} title="Systems Requiring Review" subtitle={`${rows.length} high-risk systems awaiting clearance`} />
    </GovShell>
  );
}