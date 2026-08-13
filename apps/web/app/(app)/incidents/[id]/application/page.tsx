import { AppWindow, Boxes, CircleUser, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AttrGrid } from '@/components/registry/attr-grid';
import { SeverityBadge } from '@/components/enforcement/badges';
import { incidentById, incidentNav } from '@/components/enforcement/helpers';
import { hashOf } from '@/components/governance/risk-helpers';
import { applications, incidents } from '@/lib/mock-data';
import Link from 'next/link';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const inc = incidentById(id) ?? incidents[0];
  const app = applications[hashOf(inc.id) % applications.length];

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Incidents"
        title={inc.title}
        id={inc.id}
        description="The application believed to be the origin of this incident."
        badges={[
          <SeverityBadge key="sev" label={inc.severity} />,
          <Badge key="s" label={inc.status} tone={inc.status === 'Resolved' ? 'green' : inc.status === 'Investigating' ? 'sky' : 'amber'} />
        ]}
      />
      <DetailNav base={`/incidents/${id}`} items={incidentNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Application" value={app.name.split(' ')[0]} icon={AppWindow} accent="sky" />
        <StatCard label="Type" value={app.type} icon={Boxes} accent="violet" />
        <StatCard label="Owner" value={app.owner.split(' ')[0]} icon={CircleUser} accent="green" />
        <StatCard label="Environment" value={app.environment} icon={Globe} accent="amber" />
      </div>
      <Card>
        <CardHeader title={app.name} subtitle={`${app.id} · ${app.environment}`} />
        <CardBody>
          <AttrGrid
            items={[
              { label: 'Type', value: app.type },
              { label: 'Owner', value: app.owner },
              { label: 'Environment', value: app.environment },
              { label: 'Registry Status', value: app.status }
            ]}
          />
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/5 pt-4">
            <p className="text-[0.65rem] text-slate-500">Open full application record</p>
            <Link href={`/applications/${app.id}`} className="inline-flex items-center justify-center rounded-full bg-sentinel-500 px-4 py-2 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400">
              View application
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}