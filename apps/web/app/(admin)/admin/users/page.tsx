import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { AdminShell } from '@/components/admin/page-shell';
import { UsersTable } from '@/components/admin/sections';
import { Users, UserCheck, UserX, UserCog } from 'lucide-react';
import { platformUsers } from '@/lib/mock-data';

export default function Page() {
  const active = platformUsers.filter((u) => u.status === 'Active').length;
  const suspended = platformUsers.filter((u) => u.status === 'Suspended').length;
  return (
    <AdminShell>
      <PageHeader
        eyebrow="Admin"
        title="Platform Users"
        description="Every user account across all platform tenants."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Users" value={platformUsers.length} icon={Users} accent="sky" />
        <StatCard label="Active" value={active} icon={UserCheck} accent="green" />
        <StatCard label="Suspended" value={suspended} icon={UserX} accent="rose" />
        <StatCard label="Main Accounts" value={platformUsers.filter((u) => ['ADMIN', 'GOVERNMENT', 'ENTERPRISE'].includes(u.role)).length} icon={UserCog} accent="violet" />
      </div>
      <UsersTable rows={platformUsers} title="User Directory" subtitle="All platform users with role and status" />
    </AdminShell>
  );
}