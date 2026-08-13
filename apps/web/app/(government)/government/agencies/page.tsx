import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { GovShell } from '@/components/government/page-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, type BadgeTone } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { riskTone } from '@/components/government/registry-table';
import { Landmark, Radar, ShieldAlert, Users } from 'lucide-react';
import { governmentAgencies, governmentRegistry } from '@/lib/mock-data';

type AgencyRow = (typeof governmentAgencies)[number];

const agencyTone: Record<string, BadgeTone> = { Active: 'green', Review: 'amber', Pending: 'amber' };

const columns: Column<AgencyRow>[] = [
  { key: 'name', label: 'Agency', render: (r) => <span className="font-semibold text-white">{r.name}</span> },
  { key: 'type', label: 'Jurisdiction', render: (r) => <Badge label={r.type} tone={r.type === 'Federal' ? 'violet' : r.type === 'State' ? 'blue' : 'cyan'} /> },
  { key: 'systems', label: 'Systems Overseen', sortValue: (r) => r.systems, className: 'text-slate-400' },
  { key: 'status', label: 'Status', render: (r) => <Badge label={r.status} tone={agencyTone[r.status]} /> },
  { key: 'risk', label: 'Risk', render: (r) => <Badge label={r.risk} tone={riskTone(r.risk)} /> },
  { key: 'contact', label: 'Primary Contact', className: 'text-slate-400' }
];

export default function Page() {
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="Oversight Agencies"
        description="Agencies exercising regulatory authority over AI systems in their jurisdictions."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Agencies" value={governmentAgencies.length} icon={Landmark} accent="violet" sub={`${governmentAgencies.filter((a) => a.type === 'Federal').length} federal`} />
        <StatCard label="Systems Overseen" value={governmentAgencies.reduce((s, a) => s + a.systems, 0)} icon={Radar} accent="sky" />
        <StatCard label="High-Risk Portfolios" value={governmentAgencies.filter((a) => a.risk === 'High' || a.risk === 'Critical').length} icon={ShieldAlert} accent="rose" />
        <StatCard label="Registry Coverage" value={governmentRegistry.length} icon={Users} accent="cyan" sub="registered systems" />
      </div>
      <Card>
        <CardHeader title="Agency Register" subtitle="Agencies and their oversight remits" />
        <CardBody>
          <DataTable columns={columns} rows={governmentAgencies} searchPlaceholder="Search agencies..." />
        </CardBody>
      </Card>
    </GovShell>
  );
}