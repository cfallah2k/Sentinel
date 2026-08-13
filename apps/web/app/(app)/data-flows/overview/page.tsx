import { PageHeader } from '@/components/ui/page-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { BarSeries, DonutChart, MultiArea } from '@/components/ui/charts';
import { hourlySeries } from '@/lib/mock-data';
import { FlowStats } from '@/components/data-intel/flow-stats';
import { FlowTable } from '@/components/data-intel/flow-table';
import { ModuleNav } from '@/components/data-intel/module-nav';
import { enrichedFlows, flowNavItems, groupFlows } from '@/components/data-intel/derived';

export default function Page() {
  const sourceData = groupFlows(enrichedFlows, 'source')
    .sort((a, b) => b.volumeMb - a.volumeMb)
    .slice(0, 6)
    .map((g) => ({ name: g.name.split(' ').slice(0, 2).join(' '), value: g.volumeMb }));
  const decisionData = ['Allow', 'Block', 'Redact', 'Require Approval', 'Log'].map((d) => ({
    name: d,
    value: enrichedFlows.filter((f) => f.decision === d).length
  }));
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="Data Flow Overview"
        description="Operational summary of data movement: volume trends, source breakdown and enforcement decisions."
      />
      <ModuleNav items={flowNavItems.map((it) => ({ ...it, active: it.label === 'Overview' }))} />
      <FlowStats flows={enrichedFlows} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Gateway volume — 24h" subtitle="Allowed, blocked and redacted requests" />
          <CardBody>
            <MultiArea data={hourlySeries} keys={['allowed', 'blocked', 'redacted', 'pending']} colors={['#38bdf8', '#f87171', '#fbbf24', '#a78bfa']} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Decisions" subtitle="Enforcement mix across routes" />
          <CardBody>
            <DonutChart data={decisionData} />
          </CardBody>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Volume by source" subtitle="MB routed per source system, top 6" />
          <CardBody>
            <BarSeries data={sourceData} dataKey="value" color="#38bdf8" />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Enforcement highlights" subtitle="Control plane status" />
          <CardBody className="space-y-4">
            {[
              { label: 'Blocked routes', value: enrichedFlows.filter((f) => f.status === 'Blocked').length, cls: 'text-rose-300' },
              { label: 'Require approval', value: enrichedFlows.filter((f) => f.decision === 'Require Approval').length, cls: 'text-violet-300' },
              { label: 'Logged only', value: enrichedFlows.filter((f) => f.decision === 'Log').length, cls: 'text-sky-300' },
              { label: 'High risk', value: enrichedFlows.filter((f) => f.risk === 'High' || f.risk === 'Critical').length, cls: 'text-amber-300' }
            ].map((it) => (
              <div key={it.label} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
                <span className="text-xs text-slate-400">{it.label}</span>
                <span className={`text-sm font-semibold ${it.cls}`}>{it.value}</span>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Routes" subtitle="Full flow registry" />
        <CardBody>
          <FlowTable flows={enrichedFlows} />
        </CardBody>
      </Card>
    </div>
  );
}