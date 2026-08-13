import { AdminShell } from '@/components/admin/page-shell';
import { SystemShell } from '@/components/admin/system-shell';
import { ProvidersTable } from '@/components/admin/sections';
import { providers } from '@/lib/mock-data';

export default function Page() {
  return (
    <AdminShell>
      <SystemShell active="providers">
        <ProvidersTable rows={providers} title="Provider Connectivity" subtitle="Health and volume of model provider connections" />
      </SystemShell>
    </AdminShell>
  );
}