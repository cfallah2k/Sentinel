import { Bot, Boxes, ShieldAlert, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AttrGrid } from '@/components/registry/attr-grid';
import { SeverityBadge } from '@/components/enforcement/badges';
import { fmt, incidentById, incidentNav, modelName, providerName, systemById, systemRisk } from '@/components/enforcement/helpers';
import { incidents } from '@/lib/mock-data';
import Link from 'next/link';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const inc = incidentById(id) ?? incidents[0];
  const system = systemById(inc.systemId);

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Incidents"
        title={inc.title}
        id={inc.id}
        description="The AI system at the center of this incident."
        badges={[
          <SeverityBadge key="sev" label={inc.severity} />,
          <Badge key="s" label={inc.status} tone={inc.status === 'Resolved' ? 'green' : inc.status === 'Investigating' ? 'sky' : 'amber'} />
        ]}
      />
      <DetailNav base={`/incidents/${id}`} items={incidentNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Risk Level" value={systemRisk(inc.systemId)} icon={ShieldAlert} accent={systemRisk(inc.systemId) === 'High' ? 'rose' : systemRisk(inc.systemId) === 'Medium' ? 'amber' : 'green'} />
        <StatCard label="Model" value={modelName(system?.modelId ?? null).split(' ')[0]} icon={Zap} accent="sky" />
        <StatCard label="Provider" value={providerName(system?.providerId ?? null).split(' ')[0]} icon={Boxes} accent="violet" />
        <StatCard label="Requests / 24h" value={system ? fmt(system.requests24h) : '—'} icon={Bot} accent="cyan" />
      </div>
      {system ? (
        <Card>
          <CardHeader title={system.name} subtitle={`${system.id} · ${system.type} · ${system.environment}`} />
          <CardBody>
            <AttrGrid
              items={[
                { label: 'Type', value: system.type },
                { label: 'Owner', value: system.owner },
                { label: 'Purpose', value: system.purpose },
                { label: 'Environment', value: system.environment },
                { label: 'Oversight', value: system.oversight },
                { label: 'Risk', value: system.risk },
                { label: 'Model', value: modelName(system.modelId) },
                { label: 'Provider', value: providerName(system.providerId) },
                { label: 'Data Categories', value: system.dataCategories.join(', ') }
              ]}
            />
            <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/5 pt-4">
              <p className="text-[0.65rem] text-slate-500">Open full system record</p>
              <Link href={`/ai-systems/${system.id}`} className="inline-flex items-center justify-center rounded-full bg-sentinel-500 px-4 py-2 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400">
                View system
              </Link>
            </div>
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardBody className="py-10 text-center">
            <p className="text-xs text-slate-400">No AI system is linked to this incident.</p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}