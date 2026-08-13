import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AttrGrid } from '@/components/registry/attr-grid';
import { ActivityList } from '@/components/registry/activity-list';
import { systemNav } from '@/components/registry/nav';
import { aiSystems, models, providers } from '@/lib/mock-data';
import { classificationCategories } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const system = aiSystems.find((s) => s.id === id) ?? aiSystems[0];
  const provider = providers.find((p) => p.id === system.providerId);
  const model = models.find((m) => m.id === system.modelId);

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · AI Systems"
        title={system.name}
        id={system.id}
        description={`${system.type} in ${system.environment} with ${system.oversight} oversight.`}
        badges={[
          <Badge key="status" label={system.status} tone={toneForStatus(system.status)} />,
          <Badge key="risk" label={`${system.risk} Risk`} tone={toneForStatus(system.risk)} />
        ]}
        meta={[
          { label: 'Owner', value: system.owner },
          { label: 'Approved', value: system.approvedAt }
        ]}
      />
      <DetailNav base={`/ai-systems/${id}`} items={systemNav(id)} />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Purpose & Function" subtitle="What this system does" />
          <CardBody>
            <p className="text-sm leading-6 text-slate-300">{system.purpose}</p>
            <div className="mt-4">
              <AttrGrid
                items={[
                  { label: 'Type', value: system.type },
                  { label: 'Environment', value: system.environment },
                  { label: 'Oversight Model', value: system.oversight },
                  { label: 'Provider', value: provider?.name ?? system.providerId },
                  { label: 'Base Model', value: model?.name ?? system.modelId },
                  { label: 'Approved At', value: system.approvedAt }
                ]}
              />
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Data Exposure" subtitle="Categories this system processes" />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {system.dataCategories.map((c) => {
                const cls = classificationCategories.find((cc) => cc.name === c);
                return (
                  <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-slate-200">
                    {cls ? <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: { emerald: '#34d399', sky: '#38bdf8', amber: '#fbbf24', rose: '#fb7185' }[cls.color] ?? '#38bdf8' }} /> : null}
                    {c}
                  </span>
                );
              })}
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-400">
              {system.dataCategories.includes('RESTRICTED') || system.dataCategories.includes('PII')
                ? 'Contains sensitive categories — requests are subject to redaction and approval policies at the gateway.'
                : 'No highly sensitive categories flagged; standard logging and monitoring apply.'}
            </p>
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Recent Activity" subtitle="Last governance events" />
        <CardBody>
          <ActivityList entityId={system.id} entityName={system.name} count={6} />
        </CardBody>
      </Card>
    </div>
  );
}