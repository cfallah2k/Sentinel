import { FileText, ShieldCheck } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { PolicyTable } from '@/components/registry/related-tables';
import { systemNav } from '@/components/registry/nav';
import { seededFilter } from '@/components/registry/helpers';
import { aiSystems, policies } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const system = aiSystems.find((s) => s.id === id) ?? aiSystems[0];
  const applicable = seededFilter(policies, system.id, 2).filter((p) => p.status !== 'Disabled');
  const active = applicable.filter((p) => p.status === 'Active').length;

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · AI Systems"
        title={system.name}
        id={system.id}
        description="Policies that apply to this system at the gateway."
        badges={[
          <Badge key="status" label={system.status} tone={toneForStatus(system.status)} />,
          <Badge key="risk" label={`${system.risk} Risk`} tone={toneForStatus(system.risk)} />
        ]}
      />
      <DetailNav base={`/ai-systems/${id}`} items={systemNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader title="Applicable Policies" subtitle="Deterministic policy scope" />
          <CardBody>
            <p className="text-2xl font-semibold text-white">{applicable.length}</p>
            <p className="mt-1 text-[0.65rem] text-slate-400">of {policies.length} policies in the catalog</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Active" subtitle="Enforced now" />
          <CardBody>
            <p className="text-2xl font-semibold text-emerald-300">{active}</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-[0.65rem] text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5" /> enforced at evaluation time
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Enforcements" subtitle="Applied / 24h" />
          <CardBody>
            <p className="text-2xl font-semibold text-white">{applicable.reduce((a, p) => a + p.enforcements, 0).toLocaleString()}</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-[0.65rem] text-slate-400">
              <FileText className="h-3.5 w-3.5" /> across applicable policies
            </p>
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Applicable Policies" subtitle="Filtered from the policy catalog" />
        <CardBody>
          <PolicyTable rows={applicable} />
        </CardBody>
      </Card>
    </div>
  );
}