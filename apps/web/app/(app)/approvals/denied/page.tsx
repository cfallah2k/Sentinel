import { ShieldAlert, ThumbsDown, XCircle } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ModuleNav } from '@/components/governance/module-nav';
import { ApprovalTable } from '@/components/enforcement/tables';
import { approvalNavItems } from '@/components/enforcement/helpers';
import { approvals } from '@/lib/mock-data';

export default function Page() {
  const rows = approvals.filter((a) => a.status === 'Denied');

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Denied Approvals"
        description="Requests rejected by review."
      />
      <ModuleNav items={approvalNavItems} active="/approvals/denied" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Denied (30d)" value={rows.length} delta={3.1} deltaLabel="vs prior 30d" icon={XCircle} accent="rose" />
        <StatCard label="Denial Rate" value={Math.round((rows.length / approvals.length) * 100) + '%'} icon={ThumbsDown} accent="slate" />
        <StatCard label="Compliance Flags" value={rows.filter((a) => a.risk === 'High').length} icon={ShieldAlert} accent="amber" />
        <StatCard label="Appeals" value={0} icon={ThumbsDown} accent="sky" />
      </div>
      <Card>
        <CardHeader title="Denied requests" subtitle="Rejected with recorded justification" />
        <CardBody>
          <ApprovalTable rows={rows} searchPlaceholder="Search denied approvals..." />
        </CardBody>
      </Card>
    </div>
  );
}