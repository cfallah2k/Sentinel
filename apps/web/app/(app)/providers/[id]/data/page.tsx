import { Database, ShieldCheck } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { FlowsTable } from '@/components/registry/related-tables';
import { providerNav } from '@/components/registry/nav';
import { dataFlows, providers } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const provider = providers.find((p) => p.id === id) ?? providers[0];
  const flows = dataFlows.filter((f) => f.providerId === provider.id);

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Providers"
        title={provider.name}
        id={provider.id}
        description="Data flowing through this provider and the categories observed."
        badges={[
          <Badge key="status" label={provider.status} tone={toneForStatus(provider.status)} />,
          <Badge key="risk" label={`${provider.risk} Risk`} tone={toneForStatus(provider.risk)} />
        ]}
      />
      <DetailNav base={`/providers/${id}`} items={providerNav(id)} />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Observed Categories" subtitle="In traffic through this provider" />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {[...new Set(flows.map((f) => f.category))].map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/25 bg-sky-500/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-sky-300">
                  <ShieldCheck className="h-3 w-3" /> {c}
                </span>
              ))}
              {flows.length === 0 ? <p className="text-xs text-slate-500">No flows traced through this provider.</p> : null}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Source Distribution" subtitle="Where data originates" />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {[...new Set(flows.map((f) => f.source))].slice(0, 8).map((s) => (
                <span key={s} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.65rem] font-semibold text-slate-200">
                  <Database className="h-3 w-3 text-sentinel-400" /> {s}
                </span>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Data Flows" subtitle={`${flows.length} flows through this provider`} />
        <CardBody>
          <FlowsTable rows={flows} />
        </CardBody>
      </Card>
    </div>
  );
}