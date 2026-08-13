import { BookOpen, FileCheck2, ShieldCheck } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AttrGrid } from '@/components/registry/attr-grid';
import { systemNav } from '@/components/registry/nav';
import { aiSystems, models, providers } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const system = aiSystems.find((s) => s.id === id) ?? aiSystems[0];
  const provider = providers.find((p) => p.id === system.providerId);
  const model = models.find((m) => m.id === system.modelId);
  const ready = system.status === 'Approved' && system.risk !== 'Critical';

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · AI Systems"
        title={system.name}
        id={system.id}
        description="The AI Passport is the single source of truth for this system's governance posture."
        badges={[
          <Badge key="status" label={system.status} tone={toneForStatus(system.status)} />,
          <Badge key="risk" label={`${system.risk} Risk`} tone={toneForStatus(system.risk)} />
        ]}
      />
      <DetailNav base={`/ai-systems/${id}`} items={systemNav(id)} />
      <Card>
        <CardHeader title="Passport Summary" subtitle="Verifiable claims about this system" />
        <CardBody>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                <FileCheck2 className="h-3.5 w-3.5 text-sentinel-400" /> Approval
              </p>
              <p className="mt-1.5 text-lg font-semibold text-white">{system.approvedAt}</p>
              <p className="text-[0.65rem] text-slate-500">{system.oversight} oversight</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Posture
              </p>
              <p className="mt-1.5 text-lg font-semibold text-white">{ready ? 'Compliant' : 'Review Required'}</p>
              <p className="text-[0.65rem] text-slate-500">{ready ? 'All checks passing' : 'Blocking checks present'}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                <BookOpen className="h-3.5 w-3.5 text-violet-400" /> Documentation
              </p>
              <p className="mt-1.5 text-lg font-semibold text-white">{system.dataCategories.length}</p>
              <p className="text-[0.65rem] text-slate-500">data categories documented</p>
            </div>
          </div>
          <div className="mt-6">
            <AttrGrid
              items={[
                { label: 'System', value: `${system.name} (${system.id})` },
                { label: 'Type', value: system.type },
                { label: 'Provider', value: provider?.name ?? system.providerId },
                { label: 'Model', value: model?.name ?? system.modelId },
                { label: 'Owner', value: system.owner },
                { label: 'Environment', value: system.environment },
                { label: 'Status', value: system.status },
                { label: 'Risk', value: system.risk }
              ]}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}