import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DonutChart } from '@/components/ui/charts';
import { AttributeGrid, FlowHeader, FlowMetrics, FlowSubnav, Timeline, flowAttributes } from '@/components/data-intel/flow-detail';
import { enrichedFlows, flowEvents, policyMatches, resolveFlow } from '@/components/data-intel/derived';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const flow = resolveFlow(id);
  const decisionData = ['Allow', 'Block', 'Redact', 'Require Approval', 'Log'].map((d) => ({
    name: d,
    value: enrichedFlows.filter((f) => f.decision === d).length
  }));
  return (
    <div className="space-y-6">
      <FlowSubnav id={flow.id} active="Overview" />
      <FlowHeader flow={flow} />
      <FlowMetrics flow={flow} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Attributes" subtitle="Route configuration" />
          <CardBody>
            <AttributeGrid items={flowAttributes(flow)} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Org-wide decisions" subtitle="Distribution across all flows" />
          <CardBody>
            <DonutChart data={decisionData} height={180} innerRadius={44} outerRadius={60} />
          </CardBody>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Timeline" subtitle="Lifecycle of this route" />
          <CardBody>
            <Timeline events={flowEvents(flow)} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Applicable policies" subtitle="Rules evaluating this flow" />
          <CardBody className="space-y-3">
            {policyMatches(flow).map((p) => (
              <div key={p.id} className="flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div>
                  <p className="text-xs font-semibold text-white">{p.name}</p>
                  <p className="mt-1 text-[0.65rem] text-slate-400">{p.scope} · {p.version}</p>
                </div>
                <Badge label={p.status} tone={p.status === 'Active' ? 'green' : 'slate'} />
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}