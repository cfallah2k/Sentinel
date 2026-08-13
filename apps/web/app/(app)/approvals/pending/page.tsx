import { AlarmClock, Clock, Timer, UserCheck } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ModuleNav } from '@/components/governance/module-nav';
import { ApprovalTable } from '@/components/enforcement/tables';
import { approvalCounts, approvalNavItems } from '@/components/enforcement/helpers';
import { approvals } from '@/lib/mock-data';

export default function Page() {
  const counts = approvalCounts();
  const rows = approvals.filter((a) => a.status === 'Pending');
  const critical = rows.filter((a) => a.risk === 'Critical');

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Pending Approvals"
        description="Requests awaiting a human decision."
      />
      <ModuleNav items={approvalNavItems} active="/approvals/pending" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pending" value={rows.length} icon={Clock} accent="amber" />
        <StatCard label="Critical Risk" value={critical.length} icon={AlarmClock} accent="rose" />
        <StatCard label="Expiring in 24h" value={counts.expiring24h} icon={Timer} accent="violet" />
        <StatCard label="Reviewers" value={3} icon={UserCheck} accent="sky" />
      </div>
      <Card>
        <CardHeader title="Pending requests" subtitle="Require decision before expiry" />
        <CardBody>
          <ApprovalTable rows={rows} searchPlaceholder="Search pending approvals..." />
        </CardBody>
      </Card>
    </div>
  );
}