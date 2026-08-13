import { CheckCircle2, Clock, FileX2, XCircle } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DonutChart } from '@/components/ui/charts';
import { ModuleNav } from '@/components/governance/module-nav';
import { ApprovalTable } from '@/components/enforcement/tables';
import { approvalCounts, approvalNavItems, approvalStatusDonut } from '@/components/enforcement/helpers';
import { approvals } from '@/lib/mock-data';

export default function Page() {
  const counts = approvalCounts();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Approval Overview"
        description="Queue health, decision speed and request mix."
      />
      <ModuleNav items={approvalNavItems} active="/approvals/overview" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pending" value={counts.pending} icon={Clock} accent="amber" />
        <StatCard label="Approved" value={counts.approved} icon={CheckCircle2} accent="green" />
        <StatCard label="Denied" value={counts.denied} icon={XCircle} accent="rose" />
        <StatCard label="Expired" value={counts.expired} icon={FileX2} accent="slate" />
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
        <Card className="xl:col-span-2">
          <CardHeader title="Status mix" subtitle="By outcome" />
          <CardBody>
            <DonutChart data={approvalStatusDonut()} />
          </CardBody>
        </Card>
        <Card className="xl:col-span-3">
          <CardHeader title="Throughput" subtitle="Decision metrics" />
          <CardBody className="space-y-3">
            {[
              { label: 'Average decision time', value: counts.avgDecision },
              { label: 'Requests awaiting me', value: counts.awaitingMe },
              { label: 'Expiring in 24h', value: counts.expiring24h },
              { label: 'Total on record', value: approvals.length }
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                <span className="text-xs text-slate-300">{r.label}</span>
                <span className="text-xs font-semibold text-white">{r.value}</span>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Approval list" subtitle="All requests" />
        <CardBody>
          <ApprovalTable rows={approvals} />
        </CardBody>
      </Card>
    </div>
  );
}