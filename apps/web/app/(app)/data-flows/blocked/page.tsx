import { Ban, ShieldCheck, ShieldX, SlidersHorizontal } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { DonutChart } from '@/components/ui/charts';
import { ModuleNav } from '@/components/data-intel/module-nav';
import { FlowTable } from '@/components/data-intel/flow-table';
import { enrichedFlows, flowNavItems } from '@/components/data-intel/derived';

export default function Page() {
  const blockedFlows = enrichedFlows.filter((f) => f.status === 'Blocked' || f.decision === 'Block');
  const byDecision = ['Block', 'Redact', 'Require Approval', 'Log', 'Allow'].map((d) => ({
    name: d,
    value: enrichedFlows.filter((f) => f.decision === d).length
  }));
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="Blocked Flows"
        description="Routes intercepted by the gateway. Blocked flows never transmit data and remain in this state until a policy exception is approved."
      />
      <ModuleNav items={flowNavItems.map((it) => ({ ...it, active: it.label === 'Blocked' }))} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Blocked flows" value={blockedFlows.length} icon={Ban} accent="rose" sub="Denied at gateway" />
        <StatCard label="Hard blocked" value={enrichedFlows.filter((f) => f.status === 'Blocked').length} icon={ShieldX} accent="rose" sub="Status: blocked" />
        <StatCard label="Redacted instead" value={enrichedFlows.filter((f) => f.decision === 'Redact').length} icon={SlidersHorizontal} accent="amber" sub="Sensitive fields stripped" />
        <StatCard label="Unblocked routes" value={enrichedFlows.filter((f) => f.status !== 'Blocked').length} icon={ShieldCheck} accent="green" sub="Transmitting normally" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader title="Decisions applied" subtitle="Enforcement mix across all routes" />
          <CardBody>
            <DonutChart data={byDecision} />
          </CardBody>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader title="Blocked routes" subtitle={`${blockedFlows.length} flows currently intercepted`} />
          <CardBody>
            <FlowTable flows={blockedFlows} pageSize={10} />
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Recently unblocked" subtitle="Routes restored via approved exceptions" />
        <CardBody>
          <div className="flex flex-wrap gap-2">
            {enrichedFlows.filter((f) => f.status === 'Active' && f.decision === 'Allow').slice(0, 6).map((f) => (
              <Badge key={f.id} label={f.source} tone="green" />
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}