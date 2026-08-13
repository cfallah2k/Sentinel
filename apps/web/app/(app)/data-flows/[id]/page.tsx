import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AttributeGrid, FlowHeader, FlowMetrics, FlowSubnav, Timeline, flowAttributes } from '@/components/data-intel/flow-detail';
import { FlowTable } from '@/components/data-intel/flow-table';
import { decisionTone } from '@/components/data-intel/flow-table';
import { enrichedFlows, flowEvents, policyMatches, resolveFlow } from '@/components/data-intel/derived';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const flow = resolveFlow(id);
  const siblings = enrichedFlows.filter((f) => f.source === flow.source).slice(0, 5);
  return (
    <div className="space-y-6">
      <FlowSubnav id={flow.id} active="Overview" />
      <FlowHeader flow={flow} />
      <FlowMetrics flow={flow} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Route attributes" subtitle="Static configuration for this flow" />
          <CardBody>
            <AttributeGrid items={flowAttributes(flow)} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Activity timeline" subtitle="Lifecycle events for this route" />
          <CardBody>
            <Timeline events={flowEvents(flow)} />
          </CardBody>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Enforcement" subtitle="Decision and matching policies" />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              <Badge label={flow.decision} tone={decisionTone(flow.decision)} />
              {policyMatches(flow).map((p) => (
                <Badge key={p.id} label={p.name} tone="blue" />
              ))}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Related routes" subtitle="Other flows from the same source" />
          <CardBody>
            <FlowTable flows={siblings} pageSize={5} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}