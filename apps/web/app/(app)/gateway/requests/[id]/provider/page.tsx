import { Cloud, Gauge, Server, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { Metric } from '@/components/ui/progress';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { DecisionBadge } from '@/components/enforcement/badges';
import { requestById, requestNav, requestView } from '@/components/enforcement/helpers';
import { models, providers } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const req = requestById(id);
  const v = requestView(req);
  const provider = providers.find((p) => p.id === req.providerId);
  const model = models.find((m) => m.id === req.modelId);

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Gateway"
        title={`${req.id} · Provider`}
        id={req.id}
        description="Destination provider and model used for this request."
        badges={[
          <DecisionBadge key="d" label={req.decision} />,
          <Badge key="p" label={provider?.status ?? '—'} tone="blue" />,
          <Badge key="m" label={model?.status ?? '—'} tone="slate" />
        ]}
      />
      <DetailNav base={`/gateway/requests/${id}`} items={requestNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Provider" value={provider?.name ?? '—'} icon={Cloud} accent="sky" />
        <StatCard label="Provider Latency" value={`${provider?.latencyMs ?? 0} ms`} icon={Gauge} accent="cyan" />
        <StatCard label="Uptime" value={`${(provider?.uptime ?? 0).toFixed(2)}%`} icon={Server} accent="green" />
        <StatCard label="Model Risk" value={model?.risk ?? '—'} icon={ShieldCheck} accent={model?.risk === 'High' ? 'rose' : 'green'} />
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader title="Provider" subtitle={provider ? `${provider.type} · ${provider.region}` : 'Provider details unavailable'} />
          <CardBody>
            {provider ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Metric label="Type" value={provider.type} />
                <Metric label="Region" value={provider.region} />
                <Metric label="Models" value={provider.models} />
                <Metric label="Requests / 24h" value={provider.requests24h.toLocaleString()} />
              </div>
            ) : (
              <p className="py-6 text-center text-sm text-slate-400">No provider record for this request.</p>
            )}
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Model" subtitle={model ? `${model.modality} · ${model.contextWindow} context` : 'Model details unavailable'} />
          <CardBody>
            {model ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Metric label="Modality" value={model.modality} />
                <Metric label="Context Window" value={model.contextWindow} />
                <Metric label="Pricing" value={model.pricing} />
                <Metric label="Requests / 24h" value={model.requests24h.toLocaleString()} />
              </div>
            ) : (
              <p className="py-6 text-center text-sm text-slate-400">No model record for this request.</p>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}