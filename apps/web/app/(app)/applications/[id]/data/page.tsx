import { Database, ShieldCheck } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { FlowsTable } from '@/components/registry/related-tables';
import { appNav } from '@/components/registry/nav';
import { aiSystems, applications, dataFlows } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const app = applications.find((a) => a.id === id) ?? applications[0];
  const systems = aiSystems.filter((s) => app.aiSystemIds.includes(s.id));
  const categories = new Set(systems.flatMap((s) => s.dataCategories));
  const flows = dataFlows.filter((f) => f.applicationId === app.id);

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Applications"
        title={app.name}
        id={app.id}
        description="Data categories and flows attributed to this application."
        badges={[
          <Badge key="status" label={app.status} tone={toneForStatus(app.status)} />,
          <Badge key="risk" label={`${app.risk} Risk`} tone={toneForStatus(app.risk)} />
        ]}
      />
      <DetailNav base={`/applications/${id}`} items={appNav(id)} />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Data Categories" subtitle="Declared across attached systems" />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {[...categories].map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-slate-200">
                  <Database className="h-3 w-3 text-sentinel-400" /> {c}
                </span>
              ))}
              {categories.size === 0 ? <p className="text-xs text-slate-500">No categories declared yet.</p> : null}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Category Exposure" subtitle="Observed in traffic" />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {[...new Set(flows.map((f) => f.category))].map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/25 bg-sky-500/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-sky-300">
                  <ShieldCheck className="h-3 w-3" /> {c}
                </span>
              ))}
              {flows.length === 0 ? <p className="text-xs text-slate-500">No flows observed.</p> : null}
            </div>
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Data Flows" subtitle={`${flows.length} flows from this application`} />
        <CardBody>
          <FlowsTable rows={flows} />
        </CardBody>
      </Card>
    </div>
  );
}