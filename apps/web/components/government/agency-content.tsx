import type { ReactNode } from 'react';
import { Badge, type BadgeTone } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { AreaTrend } from '@/components/ui/charts';
import { StatCard } from '@/components/ui/stat-card';
import { RegistryTable } from './registry-table';
import { IncidentsTable } from './sections';
import { incidentsForAgency, registryRowsForAgency } from './profile-shell';
import { Landmark, Radar, ShieldAlert, Users } from 'lucide-react';
import { dailySeries, governmentAgencies, riskFindings } from '@/lib/mock-data';

export type Agency = (typeof governmentAgencies)[number];

const statusTone: Record<string, BadgeTone> = { Active: 'green', Review: 'amber', Pending: 'amber' };

export function agencyBadges(agency: Agency): ReactNode {
  return (
    <>
      <Badge label={agency.type} tone={agency.type === 'Federal' ? 'violet' : agency.type === 'State' ? 'blue' : 'cyan'} />
      <Badge label={agency.status} tone={statusTone[agency.status]} />
    </>
  );
}

export function agencyProfileContent(agency: Agency) {
  const rows = registryRowsForAgency(agency.id);
  const agencyIncidents = incidentsForAgency(agency.id);
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Systems Overseen" value={agency.systems} icon={Radar} accent="sky" sub={agency.type} />
        <StatCard label="Registry Coverage" value={rows.length} icon={Landmark} accent="cyan" sub="registered systems" />
        <StatCard label="Open Incidents" value={agencyIncidents.filter((i) => i.status !== 'Resolved').length} icon={ShieldAlert} accent="rose" />
        <StatCard label="Portfolio Risk" value={agency.risk} icon={Users} accent={agency.risk === 'Critical' ? 'rose' : agency.risk === 'High' ? 'red' : 'amber'} />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Oversight Activity — 30 Days" subtitle="Telemetry trend across the agency portfolio" />
          <CardBody>
            <AreaTrend data={dailySeries.map((d) => ({ ...d }))} dataKey="blocked" xKey="date" color="#f87171" height={200} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Portfolio Findings" subtitle={`${riskFindings.length} findings across assessed systems`} />
          <CardBody className="space-y-3">
            {riskFindings.slice(0, 4).map((f) => (
              <div key={f.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-2.5 text-xs">
                <span className="min-w-0 truncate text-slate-300">{f.title}</span>
                <Badge label={f.severity} tone={f.severity === 'Critical' ? 'rose' : f.severity === 'High' ? 'red' : 'amber'} />
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
      <RegistryTable title="Agency Registry" subtitle="Systems registered under this agency's remit" rows={rows} />
      <IncidentsTable rows={agencyIncidents} title="Incident History" subtitle="Incidents across the agency portfolio" />
    </>
  );
}