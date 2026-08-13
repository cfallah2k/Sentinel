import { Inbox, Timer, UserCheck, Users } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ModuleNav } from '@/components/governance/module-nav';
import { ApprovalTable } from '@/components/enforcement/tables';
import { approvalNavItems } from '@/components/enforcement/helpers';
import { approvals, currentUser } from '@/lib/mock-data';

export default function Page() {
  const rows = approvals.filter((a) => a.status === 'Pending');
  const critical = rows.filter((a) => a.risk === 'Critical');

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="My Approvals"
        description={`Requests queued for ${currentUser.name} — decide before they expire.`}
      />
      <ModuleNav items={approvalNavItems} active="/approvals/my-approvals" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Awaiting Me" value={rows.length} icon={Inbox} accent="amber" />
        <StatCard label="Critical Risk" value={critical.length} icon={Timer} accent="rose" />
        <StatCard label="High Risk" value={rows.filter((a) => a.risk === 'High').length} icon={Users} accent="violet" />
        <StatCard label="Expiring in 24h" value={rows.filter((a) => Date.parse(a.expiresAt) - Date.parse(a.requestedAt) < 86400000).length} icon={UserCheck} accent="sky" />
      </div>
      <Card>
        <CardHeader title="My decision queue" subtitle="Pending requests assigned to you" />
        <CardBody>
          <ApprovalTable rows={rows} searchPlaceholder="Search your queue..." />
        </CardBody>
      </Card>
    </div>
  );
}