import { AlarmClock, Clock, FileX2, TimerReset } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ModuleNav } from '@/components/governance/module-nav';
import { ApprovalTable } from '@/components/enforcement/tables';
import { approvalNavItems } from '@/components/enforcement/helpers';
import { approvals } from '@/lib/mock-data';

export default function Page() {
  const rows = approvals.filter((a) => a.status === 'Expired');

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Expired Approvals"
        description="Requests that lapsed before a decision was recorded."
      />
      <ModuleNav items={approvalNavItems} active="/approvals/expired" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Expired (30d)" value={rows.length} icon={FileX2} accent="slate" />
        <StatCard label="Lapsed at Risk" value={rows.filter((a) => a.risk === 'High').length} icon={AlarmClock} accent="amber" />
        <StatCard label="Re-submitted" value={0} icon={TimerReset} accent="sky" />
        <StatCard label="Avg Window" value="24h" icon={Clock} accent="violet" />
      </div>
      <Card>
        <CardHeader title="Expired requests" subtitle="No decision was recorded before expiry" />
        <CardBody>
          <ApprovalTable rows={rows} searchPlaceholder="Search expired approvals..." />
        </CardBody>
      </Card>
    </div>
  );
}