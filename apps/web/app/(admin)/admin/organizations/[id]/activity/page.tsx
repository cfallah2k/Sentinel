import { AdminShell } from '@/components/admin/page-shell';
import { OrgShell, findAdminOrg } from '@/components/admin/org-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { AreaTrend } from '@/components/ui/charts';
import { hourlySeries, systemJobs } from '@/lib/mock-data';
import { JobsTable } from '@/components/admin/sections';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const org = findAdminOrg(id);
  const idx = org.users % systemJobs.length || 1;
  const jobs = systemJobs.filter((j, i) => (i + idx) % systemJobs.length < idx);
  return (
    <AdminShell>
      <OrgShell id={org.id} active="activity">
        <Card>
          <CardHeader title="Real-time Volume" subtitle="Requests per hour, last 24 hours" />
          <CardBody>
            <AreaTrend data={hourlySeries} dataKey="requests" xKey="hour" color="#34d399" height={220} />
          </CardBody>
        </Card>
        <JobsTable rows={jobs} title="Recent Jobs" subtitle={`Background jobs attributed to this tenant (${jobs.length})`} />
      </OrgShell>
    </AdminShell>
  );
}