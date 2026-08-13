import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { AreaTrend } from '@/components/ui/charts';
import { StatCard } from '@/components/ui/stat-card';
import { registryTone, riskTone } from './registry-table';
import { findAgency } from './profile-shell';
import { Cpu, ShieldAlert, ShieldCheck, Zap } from 'lucide-react';
import { dailySeries, governmentRegistry } from '@/lib/mock-data';

export type RegistryEntry = (typeof governmentRegistry)[number];

export function registryBadges(entry: RegistryEntry): ReactNode {
  return (
    <>
      <Badge label={entry.status} tone={registryTone(entry.status)} />
      <Badge label={`${entry.risk} Risk`} tone={riskTone(entry.risk)} />
    </>
  );
}

export function registryProfileContent(entry: RegistryEntry) {
  const agency = findAgency(entry.agencyId);
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Operator" value={entry.operator} icon={Cpu} accent="sky" />
        <StatCard label="Risk Tier" value={entry.risk} icon={ShieldAlert} accent={entry.risk === 'Critical' ? 'rose' : entry.risk === 'High' ? 'red' : entry.risk === 'Medium' ? 'amber' : 'green'} />
        <StatCard label="Oversight Agency" value={agency.name} icon={ShieldCheck} accent="violet" sub={agency.type} />
        <StatCard label="Approved" value={entry.approvedAt} icon={Zap} accent="cyan" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Purpose" subtitle="Registered use case" />
          <CardBody>
            <p className="text-sm leading-6 text-slate-300">{entry.purpose}</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Telemetry — 30 Days" subtitle="Gateway activity associated with this system" />
          <CardBody>
            <AreaTrend data={dailySeries.map((d) => ({ ...d }))} dataKey="requests" xKey="date" height={180} />
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Registration Record" subtitle="Key registration facts" />
        <CardBody>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Registry ID', entry.id],
              ['Status', entry.status],
              ['Approved Date', entry.approvedAt],
              ['Operator', entry.operator]
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</p>
                <p className="mt-1 text-sm font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </>
  );
}