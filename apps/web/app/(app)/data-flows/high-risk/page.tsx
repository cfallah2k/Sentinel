import { ShieldAlert, ShieldX, TriangleAlert, Zap } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { ProgressBar } from '@/components/ui/progress';
import { ModuleNav } from '@/components/data-intel/module-nav';
import { FlowTable } from '@/components/data-intel/flow-table';
import { enrichedFlows, flowNavItems, fmt, riskBarColor, riskScoreValue } from '@/components/data-intel/derived';

export default function Page() {
  const highRisk = enrichedFlows.filter((f) => f.risk === 'High' || f.risk === 'Critical');
  const critical = highRisk.filter((f) => f.risk === 'Critical');
  const avgScore = Math.round(highRisk.reduce((a, f) => a + riskScoreValue(f.risk), 0) / Math.max(1, highRisk.length));
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="High-Risk Flows"
        description="Routes rated High or Critical risk. These require additional approvals, monitoring and, in most cases, human oversight."
      />
      <ModuleNav items={flowNavItems.map((it) => ({ ...it, active: it.label === 'High risk' }))} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="High risk flows" value={highRisk.length} icon={ShieldAlert} accent="amber" sub="Risk High or Critical" />
        <StatCard label="Critical" value={critical.length} icon={ShieldX} accent="rose" sub="Require immediate review" />
        <StatCard label="Avg risk score" value={`${avgScore}`} icon={TriangleAlert} accent="rose" sub="Weighted exposure index" />
        <StatCard label="Blocked" value={highRisk.filter((f) => f.status === 'Blocked').length} icon={Zap} accent="sky" sub="Intercepted by gateway" />
      </div>
      <Card>
        <CardHeader title="Risk profile" subtitle={`Average exposure across ${highRisk.length} flagged routes`} />
        <CardBody>
          <div className="flex items-center gap-4">
            <span className="text-3xl font-semibold text-white">{avgScore}</span>
            <div className="flex-1">
              <ProgressBar value={avgScore} color={riskBarColor(avgScore > 70 ? 'Critical' : 'High')} />
              <div className="mt-2 flex justify-between text-[0.65rem] text-slate-500">
                <span>Low 0</span>
                <span>Critical 100</span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="High-risk routes" subtitle="Flows requiring extra controls" />
        <CardBody>
          <FlowTable flows={highRisk} initialSort={{ key: 'risk', dir: 'desc' }} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Why they matter" subtitle="Exposure drivers on flagged routes" />
        <CardBody>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { label: 'Sensitive categories', value: [...new Set(highRisk.map((f) => f.category))].length, note: 'PII, financial and health data in transit' },
              { label: 'External egress', value: highRisk.filter((f) => f.providerType === 'External').length, note: 'Data crossing the org boundary' },
              { label: 'Unapproved decisions', value: highRisk.filter((f) => f.decision === 'Require Approval').length, note: 'Awaiting human approval' }
            ].map((it) => (
              <div key={it.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">{it.label}</p>
                <p className="mt-1 text-2xl font-semibold text-white">{fmt(it.value)}</p>
                <p className="mt-1 text-xs text-slate-400">{it.note}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}