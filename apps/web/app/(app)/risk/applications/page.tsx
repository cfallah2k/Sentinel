import { AlertTriangle, Box, CheckCircle2, Smartphone } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { BarSeries } from '@/components/ui/charts';
import { ModuleNav } from '@/components/governance/module-nav';
import { riskNavItems } from '@/components/governance/risk-helpers';
import { applications, dataFlows, aiSystems } from '@/lib/mock-data';

export default function Page() {
  const rows = applications.map((a) => ({
    ...a,
    systems: a.aiSystemIds.length,
    flowCount: dataFlows.filter((f) => f.applicationId === a.id).length
  }));
  const highRisk = applications.filter((a) => a.risk === 'High').length;
  const active = applications.filter((a) => a.status === 'Active').length;
  const discovered = applications.filter((a) => a.status === 'Discovered').length;
  const production = applications.filter((a) => a.environment === 'Production').length;
  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'name', label: 'Application', sortValue: (r) => r.name },
    { key: 'type', label: 'Type', sortValue: (r) => r.type },
    { key: 'environment', label: 'Environment', sortValue: (r) => r.environment },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> },
    { key: 'risk', label: 'Risk', sortValue: (r) => r.risk, render: (r) => <Badge label={r.risk} tone={toneForStatus(r.risk)} /> },
    { key: 'owner', label: 'Owner', sortValue: (r) => r.owner },
    { key: 'apiKeys', label: 'API keys', sortValue: (r) => r.apiKeys },
    { key: 'systems', label: 'AI systems', sortValue: (r) => r.systems },
    { key: 'flowCount', label: 'Data flows', sortValue: (r) => r.flowCount },
    { key: 'lastActivity', label: 'Last activity', sortValue: (r) => r.lastActivity }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Governance"
        title="Application Risk"
        description="Risk exposure of the applications that consume AI systems, including key inventory and data flow activity."
      />
      <ModuleNav items={riskNavItems} active="/risk/applications" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Applications" value={applications.length} delta={1} deltaLabel="discovered this month" icon={Box} accent="sky" />
        <StatCard label="High risk" value={highRisk} delta={50} deltaLabel="need review" icon={AlertTriangle} accent="rose" />
        <StatCard label="Active" value={active} delta={Math.round((active / applications.length) * 100)} deltaLabel="of inventory" icon={CheckCircle2} accent="green" />
        <StatCard label="Production" value={production} delta={0} deltaLabel="unchanged" icon={Smartphone} accent="amber" />
      </div>
      <Card>
        <CardHeader title="Application inventory" subtitle="All applications and their AI dependencies" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search applications..." initialSort={{ key: 'risk', dir: 'desc' }} />
        </CardBody>
      </Card>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="AI systems per application" subtitle="Dependency footprint" />
          <CardBody>
            <BarSeries data={applications.map((a) => ({ name: a.name.split(' ')[0], systems: a.aiSystemIds.length }))} dataKey="systems" color="#38bdf8" height={200} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="High risk applications" subtitle="Inventory flagged for deeper review" />
          <CardBody className="space-y-3">
            {applications
              .filter((a) => a.risk === 'High')
              .map((a) => (
                <div key={a.id} className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-white">{a.name}</p>
                    <p className="mt-0.5 text-[0.65rem] text-slate-500">{a.type} · {a.owner} · {a.aiSystemIds.length} AI systems · {aiSystems.filter((s) => a.aiSystemIds.includes(s.id) && (s.risk === 'High' || s.risk === 'Critical')).length} high risk</p>
                  </div>
                  <Badge label={a.risk} tone={toneForStatus(a.risk)} />
                </div>
              ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}