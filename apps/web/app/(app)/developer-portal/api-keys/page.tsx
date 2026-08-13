import { KeyRound } from 'lucide-react';
import Link from 'next/link';
import { PageHeader, PrimaryButton } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { ScopeList } from '@/components/platform/shared';
import { apiKeys, fmtRelative } from '@/components/platform/developer-data';

type Row = {
  id: string;
  name: string;
  prefix: string;
  scopes: string[];
  created: string;
  lastUsed: string;
  status: string;
  environment: string;
};

export default function Page() {
  const rows: Row[] = apiKeys.map((k) => ({ ...k }));

  const columns: Column<Row>[] = [
    {
      key: 'name',
      label: 'Name',
      sortValue: (r) => r.name,
      render: (r) => (
        <Link href={`/developer-portal/api-keys/${r.id}`} className="font-medium text-slate-200 transition hover:text-sentinel-300">
          {r.name}
        </Link>
      )
    },
    {
      key: 'prefix',
      label: 'Key',
      render: (r) => <span className="font-mono text-slate-400">{r.prefix}</span>
    },
    { key: 'scopes', label: 'Scopes', render: (r) => <ScopeList scopes={r.scopes} /> },
    { key: 'created', label: 'Created', sortValue: (r) => r.created },
    { key: 'lastUsed', label: 'Last Used', sortValue: (r) => r.lastUsed, render: (r) => <span className="text-slate-400">{fmtRelative(r.lastUsed)}</span> },
    { key: 'status', label: 'Status', tone: (r) => toneForStatus(r.status) },
    {
      key: 'environment',
      label: 'Env',
      render: (r) => <Badge label={r.environment} tone={r.environment === 'Live' ? 'blue' : 'amber'} />
    }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="API Keys"
        description="Scoped credentials for applications and automations. Keys are shown once at creation."
        actions={<PrimaryButton href="/developer-portal/api-keys/key-1">Create API Key</PrimaryButton>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Keys" value={apiKeys.length} icon={KeyRound} accent="sky" sub="All environments" />
        <StatCard label="Active" value={apiKeys.filter((k) => k.status === 'Active').length} icon={KeyRound} accent="green" sub="Accepting requests" />
        <StatCard label="Live Keys" value={apiKeys.filter((k) => k.environment === 'Live').length} icon={KeyRound} accent="cyan" sub="Production traffic" />
        <StatCard label="Revoked (30d)" value="1" icon={KeyRound} accent="rose" sub="Rotation and incidents" />
      </div>

      <Card>
        <CardHeader title="Key management" subtitle="All API keys for this organization" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search keys..." initialSort={{ key: 'created', dir: 'desc' }} />
        </CardBody>
      </Card>
    </div>
  );
}