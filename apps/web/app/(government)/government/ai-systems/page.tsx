import { PageHeader } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { SystemsTable } from '@/components/government/sections';
import { aiSystems } from '@/lib/mock-data';

export default function Page() {
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="AI Systems"
        description="AI systems operated by regulated organizations, with registration and risk status."
      />
      <SystemsTable rows={aiSystems} subtitle={`${aiSystems.length} systems across all operators`} />
    </GovShell>
  );
}