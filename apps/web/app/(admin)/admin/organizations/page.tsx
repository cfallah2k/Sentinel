import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { AdminShell } from '@/components/admin/page-shell';
import { OrgsTable, activeOrgs, totalMrr } from '@/components/admin/orgs-table';
import { Activity, CreditCard, Cpu, Users } from 'lucide-react';
import { platformOrganizations } from '@/lib/mock-data';

export default function Page() {
  return (
    <AdminShell>
      <PageHeader
        eyebrow="Admin"
        title="Organizations"
        description="All tenants on the platform with subscription and health status."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Organizations" value={platformOrganizations.length} icon={Activity} accent="sky" />
        <StatCard label="Active" value={activeOrgs()} icon={Users} accent="green" />
        <StatCard label="Total Users" value={platformOrganizations.reduce((s, o) => s + o.users, 0)} icon={Users} accent="cyan" />
        <StatCard label="Platform MRR" value={`$${totalMrr().toLocaleString()}`} icon={CreditCard} accent="violet" />
      </div>
      <OrgsTable title="Tenant Directory" subtitle="All organizations and their subscription state" />
    </AdminShell>
  );
}