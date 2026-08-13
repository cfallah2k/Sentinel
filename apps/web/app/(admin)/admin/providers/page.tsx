import { PageHeader } from '@/components/ui/page-header';
import { AdminShell } from '@/components/admin/page-shell';
import { ProvidersTable } from '@/components/admin/sections';
import { providers } from '@/lib/mock-data';

export default function Page() {
  return (
    <AdminShell>
      <PageHeader
        eyebrow="Admin"
        title="Providers"
        description="Model providers connected to the platform, with health and volume."
      />
      <ProvidersTable rows={providers} subtitle={`${providers.length} providers on the platform`} />
    </AdminShell>
  );
}