import { AlertTriangle, CheckCircle2, Layers, ServerCog } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { DonutChart } from '@/components/ui/charts';
import { ModuleNav } from '@/components/governance/module-nav';
import { riskNavItems, riskDonutData, findingsForSystem } from '@/components/governance/risk-helpers';
import { aiSystems, riskAssessments } from '@/lib/mock-data';

export default function Page() {
  const rows = aiSystems.map((s) => ({ ...s }));
  const highRisk = aiSystems.filter((s) => s.risk === 'High' || s.risk === 'Critical');
  const approved = aiSystems.filter((s) => s.status === 'Approved').length;
  const pending = aiSystems.filter((s) => s.status === 'Pending').length;
  const production = aiSystems.filter((s) => s.environment === 'Production').length;
  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'name', label: 'System', sortValue: (r) => r.name },
    { key: 'type', label: 'Type', sortValue: (r) => r.type },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> },
    { key: 'risk', label: 'Risk', sortValue: (r) => r.risk, render: (r) => <Badge label={r.risk} tone={toneForStatus(r.risk)} /> },
    { key: 'owner', label: 'Owner', sortValue: (r) => r.owner },
    { key: 'environment', label: 'Environment', sortValue: (r) => r.environment },
    { key: 'oversight', label: 'Oversight', sortValue: (r) => r.oversight },
    { key: 'requests24h', label: 'Req / 24h', sortValue: (r) => r.requests24h },
    { key: 'blocked24h', label: 'Blocked', sortValue: (r) => r.blocked24h }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Governance"
        title="AI System Risk"
        description="Risk posture of every registered AI system — status, environment, oversight model and request volume."
      />
      <ModuleNav items={riskNavItems} active="/risk/ai-systems" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="AI systems" value={aiSystems.length} delta={2} deltaLabel="registered this month" icon={Layers} accent="sky" />
        <StatCard label="High / critical risk" value={highRisk.length} delta={Math.round((highRisk.length / aiSystems.length) * 100)} deltaLabel="of registry" icon={AlertTriangle} accent="rose" />
        <StatCard label="Approved" value={approved} delta={Math.round((approved / aiSystems.length) * 100)} deltaLabel="of registry" icon={CheckCircle2} accent="green" />
        <StatCard label="Pending review" value={pending} delta={0} deltaLabel="awaiting decision" icon={ServerCog} accent="amber" />
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Registered systems" subtitle="All AI systems with risk classification" />
          <CardBody>
            <DataTable columns={columns} rows={rows} searchPlaceholder="Search systems..." initialSort={{ key: 'risk', dir: 'desc' }} />
          </CardBody>
        </Card>
        <div className="space-y-5">
          <Card>
            <CardHeader title="Risk distribution" subtitle="Systems by risk level" />
            <CardBody>
              <DonutChart data={riskDonutData()} />
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Assessed systems" subtitle="Active risk assessments per system" />
            <CardBody className="space-y-2">
              {riskAssessments.map((a) => (
                <div key={a.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-white">{aiSystems.find((s) => s.id === a.systemId)?.name ?? a.systemId}</p>
                    <p className="text-[0.65rem] text-slate-500">{a.id} · {a.assessor}</p>
                  </div>
                  <Badge label={a.severity} tone={toneForStatus(a.severity)} />
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
      <Card>
        <CardHeader title="Findings on high-risk systems" subtitle="Open remediation items for High and Critical risk systems" />
        <CardBody className="space-y-3">
          {highRisk.map((s) =>
            findingsForSystem(s.id).map((f) => (
              <div key={f.id} className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-white">{f.title}</p>
                  <p className="mt-0.5 text-[0.65rem] text-slate-500">{s.name} · {f.owner} · due {f.due}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Badge label={f.severity} tone={toneForStatus(f.severity)} />
                  <Badge label={f.status} tone={toneForStatus(f.status)} />
                </div>
              </div>
            ))
          )}
        </CardBody>
      </Card>
    </div>
  );
}