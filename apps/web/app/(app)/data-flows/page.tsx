import { PageHeader, SecondaryButton } from '@/components/ui/page-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DonutChart, MultiArea } from '@/components/ui/charts';
import { hourlySeries } from '@/lib/mock-data';
import { FlowStats } from '@/components/data-intel/flow-stats';
import { FlowTable } from '@/components/data-intel/flow-table';
import { ModuleNav } from '@/components/data-intel/module-nav';
import { enrichedFlows, flowNavItems } from '@/components/data-intel/derived';

export default function Page() {
  const statusData = ['Active', 'Blocked', 'Review'].map((s) => ({
    name: s,
    value: enrichedFlows.filter((f) => f.status === s).length
  }));
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="Data Flows"
        description="Every route data takes from source systems into AI applications and providers, with the decision the Sentinel gateway applies."
        actions={
          <>
            <SecondaryButton href="/data-flows/map">Flow map</SecondaryButton>
            <SecondaryButton href="/data-flows/external">External routes</SecondaryButton>
          </>
        }
      />
      <ModuleNav items={flowNavItems.map((it) => ({ ...it, active: it.label === 'Overview' || it.href === '/data-flows' }))} />
      <FlowStats flows={enrichedFlows} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Flow volume — 24h" subtitle="Requests evaluated by the gateway per hour" />
          <CardBody>
            <MultiArea data={hourlySeries} keys={['allowed', 'blocked', 'redacted']} colors={['#38bdf8', '#f87171', '#fbbf24']} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Flows by status" subtitle="Current distribution across all routes" />
          <CardBody>
            <DonutChart data={statusData} />
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="All data flows" subtitle={`${enrichedFlows.length} registered routes`} action={<SecondaryButton href="/data-flows/recent">Recent activity</SecondaryButton>} />
        <CardBody>
          <FlowTable flows={enrichedFlows} initialSort={{ key: 'timestamp', dir: 'desc' }} />
        </CardBody>
      </Card>
    </div>
  );
}