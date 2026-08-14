import { PageHeader, PrimaryButton } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { PolicyTable } from '@/components/government/sections';
import { policies } from '@/lib/mock-data';

export default function Page() {
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="Regulatory Policies"
        description="Enforcement policies governing AI data flows across regulated operators."
        actions={<PrimaryButton href="/government/policies/create">Create policy</PrimaryButton>}
      />
      <PolicyTable rows={policies} subtitle={`${policies.filter((p) => p.status === 'Active').length} active policies in force`} />
    </GovShell>
  );
}