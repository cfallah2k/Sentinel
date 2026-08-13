import { Mail, ShieldCheck, User } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AttrGrid } from '@/components/registry/attr-grid';
import { systemNav } from '@/components/registry/nav';
import { aiSystems } from '@/lib/mock-data';
import { currentOrg } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const system = aiSystems.find((s) => s.id === id) ?? aiSystems[0];
  const email = system.owner.toLowerCase().replace(/\s+/g, '.') + '@nexora.io';
  const owned = aiSystems.filter((s) => s.owner === system.owner);

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · AI Systems"
        title={system.name}
        id={system.id}
        description="Ownership and accountability for this system."
        badges={[
          <Badge key="status" label={system.status} tone={toneForStatus(system.status)} />,
          <Badge key="risk" label={`${system.risk} Risk`} tone={toneForStatus(system.risk)} />
        ]}
      />
      <DetailNav base={`/ai-systems/${id}`} items={systemNav(id)} />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="System Owner" subtitle="Accountable for this system" />
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-500/25 bg-sky-500/10 text-sm font-bold text-sky-300">
                {system.owner.split(' ').map((w) => w[0]).join('')}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{system.owner}</p>
                <p className="text-xs text-slate-400">{email}</p>
              </div>
            </div>
            <div className="mt-5">
              <AttrGrid
                items={[
                  { label: 'Role', value: 'AI System Owner' },
                  { label: 'Systems Owned', value: owned.length },
                  { label: 'Organization', value: currentOrg.name },
                  { label: 'Region', value: currentOrg.region }
                ]}
              />
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Accountabilities" subtitle="Owner responsibilities" />
          <CardBody className="space-y-3">
            {[
              { icon: ShieldCheck, text: 'Ensure the system operates within approved risk tolerance and policy scope.' },
              { icon: User, text: 'Approve access changes and review the owner review checklist quarterly.' },
              { icon: Mail, text: 'Respond to security and compliance notifications for this system.' }
            ].map((a) => (
              <div key={a.text} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <a.icon className="mt-0.5 h-4 w-4 shrink-0 text-sentinel-400" />
                <p className="text-xs leading-5 text-slate-300">{a.text}</p>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Other Systems Owned" subtitle={`${owned.length - 1} additional systems by ${system.owner}`} />
        <CardBody>
          <div className="flex flex-wrap gap-2">
            {owned.filter((s) => s.id !== system.id).map((s) => (
              <a key={s.id} href={`/ai-systems/${s.id}`} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[0.7rem] font-semibold text-slate-300 transition hover:border-sentinel-500/40 hover:text-sentinel-300">
                {s.name}
              </a>
            ))}
            {owned.length === 1 ? <p className="text-xs text-slate-500">No other systems owned by this person.</p> : null}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}