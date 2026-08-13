import { AdminShell } from '@/components/admin/page-shell';
import { OrgShell, findAdminOrg, usersForOrg } from '@/components/admin/org-shell';
import { UsersTable } from '@/components/admin/sections';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const org = findAdminOrg(id);
  return (
    <AdminShell>
      <OrgShell id={org.id} active="users">
        <UsersTable rows={usersForOrg(org.id)} title="Organization Users" subtitle={`${org.users} seats assigned to this tenant`} />
      </OrgShell>
    </AdminShell>
  );
}