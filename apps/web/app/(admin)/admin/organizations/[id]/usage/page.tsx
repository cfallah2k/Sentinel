import { AdminShell } from '@/components/admin/page-shell';
import { OrgShell, findAdminOrg } from '@/components/admin/org-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { BarSeries, MultiArea } from '@/components/ui/charts';
import { dailySeries, usageByApp, kpiHistory, platformOrganizations } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const org = findAdminOrg(id);
  const idx = platformOrganizations.findIndex((o) => o.id === org.id);
  const appUsage = usageByApp.slice(idx % usageByApp.length).concat(usageByApp.slice(0, idx % usageByApp.length)).slice(0, 5);
  return (
    <AdminShell>
      <OrgShell id={org.id} active="usage">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader title="Daily Activity — 30 Days" subtitle="Requests and blocked traffic for this tenant" />
            <CardBody>
              <MultiArea data={dailySeries} keys={['requests', 'blocked']} xKey="date" colors={['#38bdf8', '#f87171']} height={220} />
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Top Applications" subtitle="Largest consumers by request volume" />
            <CardBody>
              <BarSeries data={appUsage} dataKey="requests" xKey="name" height={220} />
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Monthly Requests — 12 Months" subtitle="Monthly volume trend" />
            <CardBody>
              <BarSeries data={kpiHistory.requests} dataKey="value" xKey="month" color="#a78bfa" height={200} />
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Monthly Blocked — 12 Months" subtitle="Blocked request trend" />
            <CardBody>
              <BarSeries data={kpiHistory.blocked} dataKey="value" xKey="month" color="#f87171" height={200} />
            </CardBody>
          </Card>
        </div>
      </OrgShell>
    </AdminShell>
  );
}