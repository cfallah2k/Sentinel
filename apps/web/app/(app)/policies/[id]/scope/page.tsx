import { AppWindow, Boxes, Cpu, Server } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { DataTable, type Column } from '@/components/ui/data-table';
import { policyById, policyNav, systemName, systemRisk } from '@/components/enforcement/helpers';
import { policies, aiSystems as systems, applications, providers } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const policy = policyById(id) ?? policies[0];
  const scopedSystems = systems;
  const systemRows = scopedSystems.slice(0, 6).map((s) => ({
    id: s.id,
    system: systemName(s.id),
    risk: systemRisk(s.id)
  }));
  const systemColumns: Column<(typeof systemRows)[number]>[] = [
    { key: 'system', label: 'System', sortValue: (r) => r.system, render: (r) => <span className="text-slate-200">{r.system}</span> },
    { key: 'risk', label: 'Risk', render: (r) => <Badge label={r.risk} tone={r.risk === 'High' ? 'rose' : r.risk === 'Medium' ? 'amber' : 'green'} /> },
    { key: 'id', label: 'ID', render: (r) => <span className="font-mono text-xs text-slate-500">{r.id}</span> }
  ];
  const appRows = applications.slice(0, 6).map((a) => ({ name: a.name, id: a.id }));
  const appColumns: Column<(typeof appRows)[number]>[] = [
    { key: 'name', label: 'Application', render: (r) => <span className="text-slate-200">{r.name}</span> },
    { key: 'id', label: 'ID', render: (r) => <span className="font-mono text-xs text-slate-500">{r.id}</span> }
  ];

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Policies"
        title={policy.name}
        id={policy.id}
        description="Where this policy applies — systems, applications and providers in scope."
        badges={[
          <Badge key="s" label={policy.status} tone={policy.status === 'Active' ? 'green' : policy.status === 'Draft' ? 'amber' : 'slate'} />,
          <Badge key="v" label={policy.version} tone="blue" />
        ]}
      />
      <DetailNav base={`/policies/${id}`} items={policyNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Systems" value={systemRows.length} icon={Server} accent="sky" />
        <StatCard label="Applications" value={appRows.length} icon={AppWindow} accent="green" />
        <StatCard label="Providers" value={providers.length} icon={Cpu} accent="violet" />
        <StatCard label="Scope Mode" value={policy.scope.split(' ')[0]} icon={Boxes} accent="cyan" />
      </div>
      <Card>
        <CardHeader title="Scope definition" subtitle="Traffic matching all of the below is evaluated" />
        <CardBody>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Scope', value: policy.scope },
              { label: 'Systems', value: `${systemRows.length} of ${systems.length}` },
              { label: 'Applications', value: `${appRows.length} of ${applications.length}` },
              { label: 'Providers', value: `${providers.length} of ${providers.length}` }
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                <p className="text-[0.65rem] uppercase tracking-wider text-slate-500">{s.label}</p>
                <p className="mt-1 text-sm font-medium text-white">{s.value}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader title="Systems in scope" subtitle="AI systems this policy protects" />
          <CardBody>
            <DataTable columns={systemColumns} rows={systemRows} searchable={false} pageSize={8} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Applications in scope" subtitle="Applications whose traffic is evaluated" />
          <CardBody>
            <DataTable columns={appColumns} rows={appRows} searchable={false} pageSize={8} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}