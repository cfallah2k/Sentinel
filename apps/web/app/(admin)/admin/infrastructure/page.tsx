import { AdminShell } from '@/components/admin/page-shell';
import { PageHeader, SecondaryButton } from '@/components/ui/page-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { InfraIconCards, MetricCards, QueueOverview, ServiceList } from '@/components/admin/infra';

export default function Page() {
  return (
    <AdminShell>
      <PageHeader
        eyebrow="Admin"
        title="Infrastructure"
        description="Health, capacity, and throughput of the platform control plane."
        actions={<SecondaryButton href="/admin/system">System Console</SecondaryButton>}
      />
      <InfraIconCards />
      <MetricCards />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Services" subtitle="Control plane service status" />
          <CardBody className="p-0">
            <ServiceList />
          </CardBody>
        </Card>
        <QueueOverview />
      </div>
    </AdminShell>
  );
}