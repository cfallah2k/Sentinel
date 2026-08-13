import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FlowHeader, FlowSubnav } from '@/components/data-intel/flow-detail';
import { policyMatches, resolveFlow, fmt } from '@/components/data-intel/derived';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const flow = resolveFlow(id);
  const matches = policyMatches(flow);
  return (
    <div className="space-y-6">
      <FlowSubnav id={flow.id} active="Policies" />
      <FlowHeader flow={flow} />
      <Card>
        <CardHeader title="Policy matches" subtitle={`${matches.length} policies evaluate this flow`} />
        <CardBody className="space-y-3">
          {matches.map((p) => (
            <div key={p.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white">{p.name}</p>
                  <p className="mt-1 text-[0.65rem] text-slate-400">{p.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge label={p.status} tone={p.status === 'Active' ? 'green' : 'slate'} />
                  <Badge label={p.version} tone="blue" />
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.decisions.map((d) => (
                  <Badge key={d} label={d} tone={d === 'Block' ? 'rose' : d === 'Redact' ? 'amber' : d === 'Require Approval' ? 'violet' : 'green'} />
                ))}
              </div>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-white/5 pt-3 text-[0.65rem]">
                <span className="text-slate-400">Scope: <span className="text-slate-200">{p.scope}</span></span>
                <span className="text-slate-400">Conditions: <span className="text-slate-200">{p.conditions}</span></span>
                <span className="text-slate-400">Enforcements: <span className="text-slate-200">{fmt(p.enforcements)}</span></span>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}