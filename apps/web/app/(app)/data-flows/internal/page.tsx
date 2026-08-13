import { Boxes, HardDrive, ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { ModuleNav } from '@/components/data-intel/module-nav';
import { FlowTable } from '@/components/data-intel/flow-table';
import { enrichedFlows, flowNavItems, fmt } from '@/components/data-intel/derived';

export default function Page() {
  const internalFlows = enrichedFlows.filter((f) => f.providerType === 'Self-hosted' || f.providerType === 'Cloud');
  const volume = internalFlows.reduce((a, f) => a + f.volumeMb, 0);
  const providers = [...new Set(internalFlows.map((f) => f.providerName))];
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="Internal Flows"
        description="Routes served by self-hosted infrastructure or cloud tenants owned by the organization, staying inside the trust boundary."
      />
      <ModuleNav items={flowNavItems.map((it) => ({ ...it, active: it.label === 'Internal' }))} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Internal routes" value={internalFlows.length} icon={Boxes} accent="sky" sub="Inside the org boundary" />
        <StatCard label="Infrastructure" value={providers.length} icon={HardDrive} accent="cyan" sub="Self-hosted & cloud tenants" />
        <StatCard label="Volume internal" value={`${fmt(volume)} MB`} icon={HardDrive} accent="violet" sub="Routed in 24h" />
        <StatCard label="Routes healthy" value={internalFlows.filter((f) => f.status === 'Active').length} icon={ShieldCheck} accent="green" sub="No intervention needed" />
      </div>
      <Card>
        <CardHeader title="Internal infrastructure" subtitle="Tenants carrying internal flows" />
        <CardBody>
          <div className="flex flex-wrap gap-2">
            {providers.map((p) => (
              <span key={p} className="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-sky-500/10 px-3 py-1.5 text-xs text-sky-300">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                {p}
              </span>
            ))}
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Internal data flows" subtitle={`${internalFlows.length} routes staying on-premise`} action={<Badge label="Trust boundary" tone="green" />} />
        <CardBody>
          <FlowTable flows={internalFlows} />
        </CardBody>
      </Card>
    </div>
  );
}