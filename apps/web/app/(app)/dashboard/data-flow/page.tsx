import { ArrowRightLeft, Ban, Database, ShieldAlert, HardDrive } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { aiSystems, dataFlows, providers } from '@/lib/mock-data';

const activeFlows = dataFlows.filter((f) => f.status === 'Active');
const blockedFlows = dataFlows.filter((f) => f.status === 'Blocked' || f.decision === 'Block');
const highRiskFlows = dataFlows.filter((f) => f.risk === 'High' || f.risk === 'Critical');
const totalVolume = dataFlows.reduce((s, f) => s + f.volumeMb, 0);

const systemName = new Map(aiSystems.map((s) => [s.id, s.name]));
const providerName = new Map(providers.map((p) => [p.id, p.name]));

const flowRows = dataFlows.map((f) => ({
  id: f.id,
  source: f.source,
  destination: systemName.get(f.systemId) ?? f.systemId,
  provider: providerName.get(f.providerId) ?? f.providerId,
  category: f.category,
  decision: f.decision,
  status: f.status,
  risk: f.risk,
  volumeMb: f.volumeMb,
  timestamp: f.timestamp
}));
type FlowRow = (typeof flowRows)[number];

const flowColumns: Column<FlowRow>[] = [
  { key: 'id', label: 'Flow', render: (r) => <span className="font-mono text-sentinel-300">{r.id}</span> },
  {
    key: 'source',
    label: 'Source → Destination',
    render: (r) => (
      <span className="flex items-center gap-1.5">
        <span className="max-w-[140px] truncate text-slate-300">{r.source}</span>
        <ArrowRightLeft className="h-3 w-3 shrink-0 text-slate-500" />
        <span className="max-w-[160px] truncate font-medium text-slate-200">{r.destination}</span>
      </span>
    )
  },
  { key: 'provider', label: 'Provider' },
  { key: 'category', label: 'Category' },
  { key: 'decision', label: 'Decision', tone: (r) => toneForStatus(r.decision) },
  { key: 'status', label: 'Status', tone: (r) => toneForStatus(r.status) },
  { key: 'risk', label: 'Risk', tone: (r) => toneForStatus(r.risk) },
  { key: 'volumeMb', label: 'Volume', sortValue: (r) => r.volumeMb, render: (r) => `${r.volumeMb} MB` }
];

export default function Page() {
  return (
    <div>
      <PageHeader
        eyebrow="Data Flow"
        title="Data Flow Overview"
        description="Every data movement between sources, AI systems, and providers — with the enforcement decision applied at the gateway."
      />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active flows" value={activeFlows.length} icon={ArrowRightLeft} accent="sky" sub="Currently transmitting" />
        <StatCard label="Blocked flows" value={blockedFlows.length} icon={Ban} accent="rose" sub="Rejected by policy" />
        <StatCard label="High risk flows" value={highRiskFlows.length} icon={ShieldAlert} accent="amber" sub="High or critical rating" />
        <StatCard label="Volume 24h" value={`${Math.round(totalVolume)} MB`} icon={HardDrive} accent="cyan" sub={`Across ${dataFlows.length} flows`} />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Data flows" subtitle="Source to destination with gateway decisions" />
          <CardBody>
            <DataTable columns={flowColumns} rows={flowRows} searchable={false} pageSize={8} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Blocked flows" subtitle="Flows stopped by policy enforcement" />
          <CardBody className="space-y-4">
            {blockedFlows.length === 0 ? (
              <p className="text-xs text-slate-500">No blocked flows.</p>
            ) : (
              blockedFlows.slice(0, 6).map((f) => (
                <div key={f.id} className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-slate-200">{f.source}</p>
                    <p className="mt-0.5 truncate text-[0.65rem] text-slate-500">
                      → {systemName.get(f.systemId) ?? f.systemId}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Badge label={f.decision} tone={toneForStatus(f.decision)} />
                    <Database className="h-3 w-3 text-slate-500" />
                  </div>
                </div>
              ))
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}