import { PageHeader } from '@/components/ui/page-header';
import { AdminShell } from '@/components/admin/page-shell';
import { ModelsTable } from '@/components/admin/sections';
import { models } from '@/lib/mock-data';

export default function Page() {
  return (
    <AdminShell>
      <PageHeader
        eyebrow="Admin"
        title="Models"
        description="Foundation models available and in use across the platform."
      />
      <ModelsTable rows={models} subtitle={`${models.length} models in the platform catalog`} />
    </AdminShell>
  );
}