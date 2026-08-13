import { PageHeader } from '@/components/ui/page-header';
import { AdminShell } from '@/components/admin/page-shell';
import { IncidentsTable } from '@/components/admin/sections';
import { incidents } from '@/lib/mock-data';

export default function Page() {
  return (
    <AdminShell>
      <PageHeader
        eyebrow="Admin"
        title="Platform Incidents"
        description="Incidents raised across all tenants, with severity and resolution state."
      />
      <IncidentsTable rows={incidents} subtitle={`${incidents.filter((i) => i.status !== 'Resolved').length} open incidents`} />
    </AdminShell>
  );
}