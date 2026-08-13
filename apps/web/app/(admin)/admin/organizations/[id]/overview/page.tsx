import { AdminShell } from '@/components/admin/page-shell';
import { OrgShell, findAdminOrg } from '@/components/admin/org-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { AreaTrend } from '@/components/ui/charts';
import { Users, Cpu, CreditCard, ShieldAlert } from 'lucide-react';
import { incidents, dailySeries } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const org = findAdminOrg(id);
  const orgIncidents = incidents.slice(0, org.users % incidents.length || 3);
  return (
    <AdminShell>
      <OrgShell id={org.id} active="overview">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Users" value={org.users} icon={Users} accent="sky" />
          <StatCard label="AI Systems" value={org.systems} icon={Cpu} accent="cyan" />
          <StatCard label="MRR" value={`$${org.mrr.toLocaleString()}`} icon={CreditCard} accent="violet" />
          <StatCard label="Open Incidents" value={orgIncidents.filter((i) => i.status !== 'Resolved').length} icon={ShieldAlert} accent="rose" />
        </div>
        <Card>
          <CardHeader title="Tenant Activity — 30 Days" subtitle="Platform usage trend for this organization" />
          <CardBody>
            <AreaTrend data={dailySeries.map((d) => ({ date: d.date, requests: d.requests }))} dataKey="requests" xKey="date" height={220} />
          </CardBody>
        </Card>
      </OrgShell>
    </AdminShell>
  );
}