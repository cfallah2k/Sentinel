import { AdminShell } from '@/components/admin/page-shell';
import { SystemShell } from '@/components/admin/system-shell';
import { LogFeed } from '@/components/admin/infra';
import { Card, CardBody, CardHeader } from '@/components/ui/card';

export default function Page() {
  return (
    <AdminShell>
      <SystemShell active="logs">
        <Card>
          <CardHeader title="Live Control Plane Logs" subtitle="Structured event stream from all services" />
          <CardBody className="p-0">
            <LogFeed rows={24} />
          </CardBody>
        </Card>
      </SystemShell>
    </AdminShell>
  );
}