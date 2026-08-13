import { PageHeader } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { PolicyTable } from '@/components/government/sections';
import { policies } from '@/lib/mock-data';

export default function Page() {
  const rows = policies.filter((p) => p.status === 'Active');
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="Active Policies"
        description="Policies currently enforcing across the AI gateway."
      />
      <PolicyTable rows={rows} title="In-Force Policies" subtitle={`${rows.length} policies actively enforced`} />
    </GovShell>
  );
}