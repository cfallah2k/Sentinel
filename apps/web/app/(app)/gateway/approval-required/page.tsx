import { Timer, Activity, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { PageHeader, PrimaryButton } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ModuleNav } from '@/components/governance/module-nav';
import { RequestTable } from '@/components/enforcement/tables';
import { fmt, gatewayNavItems, gatewayTotals } from '@/components/enforcement/helpers';
import { approvals, gatewayRequests } from '@/lib/mock-data';

export default function Page() {
  const totals = gatewayTotals();
  const rows = gatewayRequests.filter((r) => r.decision === 'Approval Required');
  const pendingApprovals = approvals.filter((a) => a.status === 'Pending').length;
  const share = Math.round((rows.length / Math.max(1, gatewayRequests.length)) * 100);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Approval Required"
        description="Requests queued for human review before they can reach the provider."
        actions={[<PrimaryButton key="approvals" href="/approvals">Open Approvals Queue</PrimaryButton>]}
      />
      <ModuleNav items={gatewayNavItems} active="/gateway/approval-required" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Queued / 24h" value={fmt(totals.pending)} delta={1.8} deltaLabel="vs yesterday" icon={Timer} accent="amber" />
        <StatCard label="Share of traffic" value={`${share}%`} icon={Activity} accent="sky" />
        <StatCard label="Open Approvals" value={pendingApprovals} icon={ShieldAlert} accent="rose" />
        <StatCard label="Auto-expired" value={approvals.filter((a) => a.status === 'Expired').length} icon={CheckCircle2} accent="green" />
      </div>
      <Card>
        <CardHeader title="Approval-required requests" subtitle="High-risk requests awaiting a human decision" />
        <CardBody>
          <RequestTable rows={rows} searchPlaceholder="Search queued requests..." />
        </CardBody>
      </Card>
    </div>
  );
}