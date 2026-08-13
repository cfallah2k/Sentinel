import { AdminShell } from '@/components/admin/page-shell';
import { SystemShell } from '@/components/admin/system-shell';
import { InfraIconCards, LogFeed, MetricCards, ServiceList } from '@/components/admin/infra';
import { Card, CardBody, CardHeader } from '@/components/ui/card';

export default function Page() {
  return (
    <AdminShell>
      <SystemShell active="health">
        <InfraIconCards />
        <MetricCards />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader title="Services" subtitle="Control plane service status" />
            <CardBody className="p-0">
              <ServiceList />
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Recent Logs" subtitle="Latest control plane events" />
            <CardBody className="p-0">
              <LogFeed rows={12} />
            </CardBody>
          </Card>
        </div>
      </SystemShell>
    </AdminShell>
  );
}