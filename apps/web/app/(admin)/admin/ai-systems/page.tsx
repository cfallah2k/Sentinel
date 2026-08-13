import { PageHeader } from '@/components/ui/page-header';
import { AdminShell } from '@/components/admin/page-shell';
import { SystemsTable } from '@/components/admin/sections';
import { aiSystems } from '@/lib/mock-data';

export default function Page() {
  return (
    <AdminShell>
      <PageHeader
        eyebrow="Admin"
        title="AI Systems"
        description="All AI systems registered across platform tenants."
      />
      <SystemsTable rows={aiSystems} subtitle={`${aiSystems.length} systems across all tenants`} />
    </AdminShell>
  );
}