import { PageHeader } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { PolicyTable } from '@/components/government/sections';
import { policies } from '@/lib/mock-data';

export default function Page() {
  const rows = [...policies].filter((p) => p.violations > 0).sort((a, b) => b.violations - a.violations);
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="Policy Violations"
        description="Policies with recorded violations, ranked by volume for remediation prioritization."
      />
      <PolicyTable rows={rows} title="Violation Register" subtitle={`${rows.length} policies with active violations`} />
    </GovShell>
  );
}