import { PageHeader } from '@/components/ui/page-header';
import { AdminShell } from '@/components/admin/page-shell';
import { AuditTable } from '@/components/admin/sections';
import { auditLogs } from '@/lib/mock-data';

export default function Page() {
  return (
    <AdminShell>
      <PageHeader
        eyebrow="Admin"
        title="Platform Audit Log"
        description="Immutable record of every administrative action across the control plane."
      />
      <AuditTable rows={auditLogs} title="Full Audit Trail" subtitle={`${auditLogs.length} events recorded`} />
    </AdminShell>
  );
}