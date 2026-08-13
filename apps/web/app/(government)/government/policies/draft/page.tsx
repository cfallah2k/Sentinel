import { PageHeader } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { PolicyTable } from '@/components/government/sections';
import { policies } from '@/lib/mock-data';

export default function Page() {
  const rows = policies.filter((p) => p.status === 'Draft');
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="Draft Policies"
        description="Policies under development, not yet enforced."
      />
      <PolicyTable rows={rows} title="Draft Policies" subtitle={`${rows.length} policies in draft`} />
    </GovShell>
  );
}