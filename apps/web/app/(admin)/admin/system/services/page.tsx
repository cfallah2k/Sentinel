import { AdminShell } from '@/components/admin/page-shell';
import { SystemShell } from '@/components/admin/system-shell';
import { ServiceList } from '@/components/admin/infra';
import { Card, CardBody, CardHeader } from '@/components/ui/card';

export default function Page() {
  return (
    <AdminShell>
      <SystemShell active="services">
        <Card>
          <CardHeader title="Control Plane Services" subtitle="Every service powering the platform, with live status" />
          <CardBody className="p-0">
            <ServiceList />
          </CardBody>
        </Card>
      </SystemShell>
    </AdminShell>
  );
}