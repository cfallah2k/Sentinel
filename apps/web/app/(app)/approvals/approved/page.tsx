import { CheckCircle2, ShieldCheck, ThumbsUp, Timer } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ModuleNav } from '@/components/governance/module-nav';
import { ApprovalTable } from '@/components/enforcement/tables';
import { approvalCounts, approvalNavItems } from '@/components/enforcement/helpers';
import { approvals } from '@/lib/mock-data';

export default function Page() {
  const counts = approvalCounts();
  const rows = approvals.filter((a) => a.status === 'Approved');

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Approved Approvals"
        description="Requests that cleared review and were granted."
      />
      <ModuleNav items={approvalNavItems} active="/approvals/approved" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Approved (30d)" value={rows.length} delta={-2.8} deltaLabel="vs prior 30d" icon={CheckCircle2} accent="green" />
        <StatCard label="Approval Rate" value={Math.round((rows.length / approvals.length) * 100) + '%'} icon={ThumbsUp} accent="sky" />
        <StatCard label="Avg Decision" value={counts.avgDecision} icon={Timer} accent="violet" />
        <StatCard label="Compliant" value="100%" icon={ShieldCheck} accent="cyan" />
      </div>
      <Card>
        <CardHeader title="Approved requests" subtitle="Granted access with recorded justification" />
        <CardBody>
          <ApprovalTable rows={rows} searchPlaceholder="Search approved approvals..." />
        </CardBody>
      </Card>
    </div>
  );
}