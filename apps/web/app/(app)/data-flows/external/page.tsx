import { Globe, Link2, ShieldAlert } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { providers } from '@/lib/mock-data';
import { ModuleNav } from '@/components/data-intel/module-nav';
import { FlowTable } from '@/components/data-intel/flow-table';
import { enrichedFlows, flowNavItems, fmt } from '@/components/data-intel/derived';

type ProviderRow = {
  id: string;
  name: string;
  type: string;
  status: string;
  region: string;
  requests24h: number;
  risk: string;
};

export default function Page() {
  const externalFlows = enrichedFlows.filter((f) => f.providerType === 'External' || f.providerType === 'OpenAI-compatible');
  const externalProviders = providers.filter((p) => p.type === 'External' || p.type === 'OpenAI-compatible');
  const providerRows: ProviderRow[] = externalProviders.map((p) => ({
    id: p.id,
    name: p.name,
    type: p.type,
    status: p.status,
    region: p.region,
    requests24h: p.requests24h,
    risk: p.risk
  }));
  const providerColumns: Column<ProviderRow>[] = [
    { key: 'name', label: 'Provider', render: (r) => <span className="font-medium text-white">{r.name}</span>, sortValue: (r) => r.name },
    { key: 'type', label: 'Type', render: (r) => <Badge label={r.type} tone="blue" /> },
    { key: 'region', label: 'Region', render: (r) => <span className="text-slate-300">{r.region}</span> },
    { key: 'status', label: 'Status', render: (r) => <Badge label={r.status} tone={r.status === 'Approved' ? 'green' : r.status === 'Pending' ? 'amber' : 'rose'} /> },
    { key: 'requests24h', label: 'Requests 24h', render: (r) => <span className="text-slate-300">{fmt(r.requests24h)}</span>, sortValue: (r) => r.requests24h },
    { key: 'risk', label: 'Risk', render: (r) => <Badge label={r.risk} tone={r.risk === 'High' ? 'rose' : 'blue'} /> }
  ];
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Intelligence"
        title="External Flows"
        description="Routes where data leaves the organization to external or OpenAI-compatible providers, subject to the strictest controls."
      />
      <ModuleNav items={flowNavItems.map((it) => ({ ...it, active: it.label === 'External' }))} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="External routes" value={externalFlows.length} icon={Globe} accent="sky" sub="Leaving the org boundary" />
        <StatCard label="Providers" value={externalProviders.length} icon={Link2} accent="cyan" sub="External endpoints in use" />
        <StatCard label="Blocked externally" value={externalFlows.filter((f) => f.status === 'Blocked').length} icon={ShieldAlert} accent="rose" sub="Denied at gateway" />
        <StatCard label="Redacted egress" value={externalFlows.filter((f) => f.decision === 'Redact').length} icon={ShieldAlert} accent="amber" sub="Redaction applied" />
      </div>
      <Card>
        <CardHeader title="External providers" subtitle="Registered external endpoints" />
        <CardBody>
          <DataTable columns={providerColumns} rows={providerRows} pageSize={8} searchPlaceholder="Search providers..." />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="External data flows" subtitle={`${externalFlows.length} routes to external providers`} />
        <CardBody>
          <FlowTable flows={externalFlows} />
        </CardBody>
      </Card>
    </div>
  );
}