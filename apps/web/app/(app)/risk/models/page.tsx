import { AlertTriangle, Package, ShieldCheck, Zap } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { BarSeries } from '@/components/ui/charts';
import { ModuleNav } from '@/components/governance/module-nav';
import { riskNavItems, providerName } from '@/components/governance/risk-helpers';
import { models } from '@/lib/mock-data';

export default function Page() {
  const rows = models.map((m) => ({ ...m, provider: providerName(m.providerId) }));
  const restricted = models.filter((m) => m.status === 'Restricted').length;
  const highRisk = models.filter((m) => m.risk === 'High').length;
  const approved = models.filter((m) => m.status === 'Approved').length;
  const totalRequests = models.reduce((s, m) => s + m.requests24h, 0);
  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'name', label: 'Model', sortValue: (r) => r.name, render: (r) => <span className="font-medium text-white">{r.name}</span> },
    { key: 'provider', label: 'Provider', sortValue: (r) => r.provider },
    { key: 'modality', label: 'Modality', sortValue: (r) => r.modality },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> },
    { key: 'risk', label: 'Risk', sortValue: (r) => r.risk, render: (r) => <Badge label={r.risk} tone={toneForStatus(r.risk)} /> },
    { key: 'contextWindow', label: 'Context', sortValue: (r) => r.contextWindow },
    { key: 'pricing', label: 'Pricing', sortValue: (r) => r.pricing },
    { key: 'requests24h', label: 'Req / 24h', sortValue: (r) => r.requests24h }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Governance"
        title="Model Risk"
        description="Model registry risk posture — modality, context limits, pricing and request volume per model."
      />
      <ModuleNav items={riskNavItems} active="/risk/models" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Models" value={models.length} delta={1} deltaLabel="added this quarter" icon={Package} accent="sky" />
        <StatCard label="Approved" value={approved} delta={Math.round((approved / models.length) * 100)} deltaLabel="of registry" icon={ShieldCheck} accent="green" />
        <StatCard label="Restricted" value={restricted} delta={0} deltaLabel="unchanged" icon={AlertTriangle} accent="rose" />
        <StatCard label="Req / 24h" value={totalRequests.toLocaleString()} delta={9} deltaLabel="vs yesterday" icon={Zap} accent="amber" />
      </div>
      <Card>
        <CardHeader title="Model registry" subtitle="All registered models with risk classification" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search models..." initialSort={{ key: 'requests24h', dir: 'desc' }} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Request volume by model" subtitle="24-hour gateway volume" />
        <CardBody>
          <BarSeries data={models.map((m) => ({ name: m.name.replace('gpt-', '').replace('claude-', '').replace('gemini-', ''), requests: m.requests24h }))} dataKey="requests" color="#a78bfa" height={200} />
        </CardBody>
      </Card>
    </div>
  );
}