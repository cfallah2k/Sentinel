import type { ReactNode } from 'react';
import { Badge, type BadgeTone } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { AreaTrend } from '@/components/ui/charts';
import { StatCard } from '@/components/ui/stat-card';
import { RegistryTable } from './registry-table';
import { IncidentsTable } from './sections';
import { incidentsForOrg, registryRowsForOrg } from './profile-shell';
import { Cpu, ShieldAlert, Users, CreditCard } from 'lucide-react';
import { dailySeries, platformOrganizations, riskFindings } from '@/lib/mock-data';

export type Org = (typeof platformOrganizations)[number];

const statusTone: Record<string, BadgeTone> = { Active: 'green', Trial: 'amber', Overdue: 'rose', Suspended: 'rose' };

export function orgBadges(org: Org): ReactNode {
  return (
    <>
      <Badge label={org.plan} tone={org.plan === 'Enterprise' ? 'violet' : org.plan === 'Growth' ? 'blue' : 'slate'} />
      <Badge label={org.status} tone={statusTone[org.status]} />
    </>
  );
}

export function orgProfileContent(org: Org) {
  const orgIncidents = incidentsForOrg(org.id);
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Users" value={org.users} icon={Users} accent="sky" sub="active seats" />
        <StatCard label="AI Systems" value={org.systems} icon={Cpu} accent="cyan" sub="registered systems" />
        <StatCard label="MRR" value={`$${org.mrr.toLocaleString()}`} icon={CreditCard} accent="violet" sub={org.region} />
        <StatCard label="Open Incidents" value={orgIncidents.filter((i) => i.status !== 'Resolved').length} icon={ShieldAlert} accent="rose" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Activity — 30 Days" subtitle="Oversight activity trend" />
          <CardBody>
            <AreaTrend data={dailySeries.map((d) => ({ ...d }))} dataKey="requests" xKey="date" height={200} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Risk Posture" subtitle={`${riskFindings.length} open findings across assessments`} />
          <CardBody className="space-y-3">
            {riskFindings.slice(0, 4).map((f) => (
              <div key={f.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-2.5 text-xs">
                <span className="min-w-0 truncate text-slate-300">{f.title}</span>
                <Badge label={f.severity} tone={f.severity === 'Critical' ? 'rose' : f.severity === 'High' ? 'red' : f.severity === 'Medium' ? 'amber' : 'blue'} />
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
      <RegistryTable title="Registered Systems" subtitle="Systems registered under this operator" rows={registryRowsForOrg(org.id)} />
      <IncidentsTable rows={orgIncidents} title="Incident History" subtitle="Incidents attributed to this operator" />
    </>
  );
}