import { AreaTrend, DonutChart } from '@/components/ui/charts';
import { PageHeader, SecondaryButton } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { AdminShell } from '@/components/admin/page-shell';
import { OrgsTable, activeOrgs, orgsByPlan, totalMrr } from '@/components/admin/orgs-table';
import { Activity, CreditCard, ShieldAlert, Users } from 'lucide-react';
import { incidents, platformOrganizations, platformUsers, dailySeries } from '@/lib/mock-data';

const usage30d = dailySeries.map((d) => ({ date: d.date, requests: d.requests }));
const systemHealth = Math.round(100 - (incidents.filter((i) => i.status !== 'Resolved').length / incidents.length) * 12);

export default function Page() {
  return (
    <AdminShell>
      <PageHeader
        eyebrow="Admin"
        title="Platform Administration"
        description="Operational control of the Sentinel platform: tenants, billing, usage, and system health."
        actions={<SecondaryButton href="/admin/system">System Infrastructure</SecondaryButton>}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Active Orgs" value={activeOrgs()} delta={8} deltaLabel="this quarter" icon={Activity} accent="sky" />
        <StatCard label="Total Users" value={platformUsers.length} delta={14} deltaLabel="this quarter" icon={Users} accent="cyan" />
        <StatCard label="MRR" value={`$${totalMrr().toLocaleString()}`} delta={6} deltaLabel="vs last month" icon={CreditCard} accent="violet" />
        <StatCard label="Open Incidents" value={incidents.filter((i) => i.status !== 'Resolved').length} delta={-2} deltaLabel="vs last month" icon={ShieldAlert} accent="rose" />
        <StatCard label="System Health" value={`${systemHealth}%`} delta={0.5} deltaLabel="uptime 30d" icon={ShieldAlert} accent="green" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 shadow-panel backdrop-blur-xl">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Platform Usage — 30 Days</p>
            <div className="mt-4">
              <AreaTrend data={usage30d} dataKey="requests" xKey="date" height={220} />
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 shadow-panel backdrop-blur-xl">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Orgs by Plan</p>
          <div className="mt-4">
            <DonutChart data={orgsByPlan()} height={200} />
          </div>
        </div>
      </div>
      <OrgsTable title="Organizations" subtitle={`${platformOrganizations.length} tenants on the platform`} />
    </AdminShell>
  );
}