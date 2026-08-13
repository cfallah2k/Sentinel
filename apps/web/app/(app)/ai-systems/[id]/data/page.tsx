import { Database, ShieldCheck } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { FlowsTable } from '@/components/registry/related-tables';
import { systemNav } from '@/components/registry/nav';
import { aiSystems, classificationCategories, dataFlows } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const system = aiSystems.find((s) => s.id === id) ?? aiSystems[0];
  const flows = dataFlows.filter((f) => f.systemId === system.id);
  const flowCategories = new Set(flows.map((f) => f.category));

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · AI Systems"
        title={system.name}
        id={system.id}
        description="Data processed by this system and how it reaches the gateway."
        badges={[
          <Badge key="status" label={system.status} tone={toneForStatus(system.status)} />,
          <Badge key="risk" label={`${system.risk} Risk`} tone={toneForStatus(system.risk)} />
        ]}
      />
      <DetailNav base={`/ai-systems/${id}`} items={systemNav(id)} />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Declared Categories" subtitle="From the registry record" />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {system.dataCategories.map((c) => {
                const cls = classificationCategories.find((cc) => cc.name === c);
                return (
                  <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-slate-200">
                    <Database className="h-3 w-3 text-sentinel-400" /> {c}
                  </span>
                );
              })}
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-400">
              {system.dataCategories.length} declared categories, {flowCategories.size} observed in live traffic.
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Observed Categories" subtitle="From traced data flows" />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {[...flowCategories].map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/25 bg-sky-500/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-sky-300">
                  <ShieldCheck className="h-3 w-3" /> {c}
                </span>
              ))}
              {flowCategories.size === 0 ? <p className="text-xs text-slate-500">No flows traced yet.</p> : null}
            </div>
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Data Flows" subtitle={`${flows.length} flows involving this system`} />
        <CardBody>
          <FlowsTable rows={flows} />
        </CardBody>
      </Card>
    </div>
  );
}