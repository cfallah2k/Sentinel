import { PageHeader } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { PolicyTable } from '@/components/government/sections';
import { policies } from '@/lib/mock-data';

export default function Page() {
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="Policy Overview"
        description="Lifecycle snapshot of regulatory policies, from draft to enforcement."
      />
      <PolicyTable rows={policies} subtitle={`${policies.length} policies across all lifecycle states`} />
    </GovShell>
  );
}