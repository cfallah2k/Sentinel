import { CheckCircle2, Clock, FileX2, Timer, XCircle } from 'lucide-react';
import { PageHeader, PrimaryButton } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DonutChart } from '@/components/ui/charts';
import { ModuleNav } from '@/components/governance/module-nav';
import { ApprovalTable } from '@/components/enforcement/tables';
import { approvalCounts, approvalNavItems, approvalStatusDonut } from '@/components/enforcement/helpers';
import ExportCsvButton from '@/components/ui/export-button';
import { approvals } from '@/lib/mock-data';

export default function Page() {
  const counts = approvalCounts();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Enforcement"
        title="Approvals"
        description="Human-in-the-loop decisions on high-risk AI access, data movement and exceptions."
        actions={[
          <PrimaryButton key="new" href="/approvals/create">New Request</PrimaryButton>,
          <ExportCsvButton
            key="export"
            label="Export"
            filename="approvals"
            rows={approvals.map((a) => ({
              id: a.id,
              requester: a.requester,
              type: a.type,
              status: a.status,
              risk: a.risk,
              requestedAt: a.requestedAt,
              note: a.note
            }))}
          />
        ]}
      />
      <ModuleNav items={approvalNavItems} active="/approvals" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pending" value={counts.pending} icon={Clock} accent="amber" />
        <StatCard label="Approved (30d)" value={counts.approved} icon={CheckCircle2} accent="green" />
        <StatCard label="Denied (30d)" value={counts.denied} delta={3.1} deltaLabel="vs prior 30d" icon={XCircle} accent="rose" />
        <StatCard label="Expired" value={counts.expired} icon={FileX2} accent="slate" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Awaiting Me" value={counts.awaitingMe} icon={Timer} accent="sky" />
        <StatCard label="Expiring in 24h" value={counts.expiring24h} icon={Clock} accent="violet" />
        <StatCard label="Avg Decision" value={counts.avgDecision} icon={Timer} accent="cyan" />
        <StatCard label="Total (30d)" value={approvals.length} icon={CheckCircle2} accent="blue" />
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
        <Card className="xl:col-span-2">
          <CardHeader title="Status mix" subtitle="Distribution of request outcomes" />
          <CardBody>
            <DonutChart data={approvalStatusDonut()} />
          </CardBody>
        </Card>
        <Card className="xl:col-span-3">
          <CardHeader title="Queue overview" subtitle="Current workload by status" />
          <CardBody className="space-y-3">
            {[
              { label: 'Pending decision', value: counts.pending, tone: 'bg-amber-400' },
              { label: 'Approved', value: counts.approved, tone: 'bg-emerald-400' },
              { label: 'Denied', value: counts.denied, tone: 'bg-rose-400' },
              { label: 'Expired', value: counts.expired, tone: 'bg-slate-500' }
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 rounded-full ${s.tone}`} />
                  <span className="text-xs text-slate-300">{s.label}</span>
                </div>
                <span className="text-xs font-semibold text-white">{s.value}</span>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="All approval requests" subtitle={`${approvals.length} requests on record`} />
        <CardBody>
          <ApprovalTable rows={approvals} />
        </CardBody>
      </Card>
    </div>
  );
}