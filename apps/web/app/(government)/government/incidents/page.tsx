import { PageHeader } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { IncidentsTable } from '@/components/government/sections';
import { incidents } from '@/lib/mock-data';

export default function Page() {
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="Incident Oversight"
        description="Reportable AI incidents across regulated operators, with severity and resolution status."
      />
      <IncidentsTable rows={incidents} title="Reported Incidents" subtitle={`${incidents.length} incidents in the oversight window`} />
    </GovShell>
  );
}