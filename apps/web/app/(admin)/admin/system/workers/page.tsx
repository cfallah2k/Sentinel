import { AdminShell } from '@/components/admin/page-shell';
import { SystemShell } from '@/components/admin/system-shell';
import { WorkerList } from '@/components/admin/infra';
import { Card, CardBody, CardHeader } from '@/components/ui/card';

export default function Page() {
  return (
    <AdminShell>
      <SystemShell active="workers">
        <Card>
          <CardHeader title="Worker Fleet" subtitle="Active workers consuming platform queues" />
          <CardBody className="p-0">
            <WorkerList />
          </CardBody>
        </Card>
      </SystemShell>
    </AdminShell>
  );
}