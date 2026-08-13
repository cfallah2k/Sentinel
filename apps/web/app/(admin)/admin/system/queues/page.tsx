import { AdminShell } from '@/components/admin/page-shell';
import { SystemShell } from '@/components/admin/system-shell';
import { QueueOverview } from '@/components/admin/infra';
import { QueuesTable } from '@/components/admin/sections';

export default function Page() {
  return (
    <AdminShell>
      <SystemShell active="queues">
        <QueueOverview />
        <QueuesTable title="Queue State" subtitle="Pending, active, and rate per queue" />
      </SystemShell>
    </AdminShell>
  );
}