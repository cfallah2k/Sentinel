import { Database, ShieldCheck } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { SystemsTable } from '@/components/registry/registry-tables';
import { modelNav } from '@/components/registry/nav';
import { aiSystems, models } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const model = models.find((m) => m.id === id) ?? models[0];
  const systems = aiSystems.filter((s) => s.modelId === model.id);
  const categories = new Set(systems.flatMap((s) => s.dataCategories));

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Models"
        title={model.name}
        id={model.id}
        description="Data processed through this model by attached systems."
        badges={[
          <Badge key="status" label={model.status} tone={toneForStatus(model.status)} />,
          <Badge key="risk" label={`${model.risk} Risk`} tone={toneForStatus(model.risk)} />
        ]}
      />
      <DetailNav base={`/models/${id}`} items={modelNav(id)} />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Data Categories" subtitle="Across systems using this model" />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {[...categories].map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-slate-200">
                  <Database className="h-3 w-3 text-sentinel-400" /> {c}
                </span>
              ))}
              {categories.size === 0 ? <p className="text-xs text-slate-500">No systems are using this model yet.</p> : null}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Exposure Summary" subtitle="Sensitivity posture" />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {categories.has('RESTRICTED') || categories.has('PII') ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/25 bg-rose-500/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-rose-300">
                  <ShieldCheck className="h-3 w-3" /> Sensitive categories routed to this model
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-emerald-300">
                  <ShieldCheck className="h-3 w-3" /> No sensitive categories observed
                </span>
              )}
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-400">
              {systems.length} systems route through {model.name}; redaction and approval policies apply per system risk.
            </p>
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Systems Using This Model" subtitle={`${systems.length} systems`} />
        <CardBody>
          <SystemsTable rows={systems} />
        </CardBody>
      </Card>
    </div>
  );
}