import { AdminShell } from '@/components/admin/page-shell';
import { OrgShell, findAdminOrg } from '@/components/admin/org-shell';
import { auditLogs } from '@/lib/mock-data';
import { AuditTable } from '@/components/admin/sections';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const org = findAdminOrg(id);
  const idx = org.users % auditLogs.length || 3;
  const rows = auditLogs.filter((l, i) => (i + idx) % auditLogs.length < idx);
  return (
    <AdminShell>
      <OrgShell id={org.id} active="audit">
        <AuditTable rows={rows} title="Audit Log" subtitle={`All platform actions for this tenant (${rows.length} events)`} />
      </OrgShell>
    </AdminShell>
  );
}