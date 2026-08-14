'use client';

import { useState } from 'react';
import { KeyRound } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { ScopeList } from '@/components/platform/shared';
import { apiKeys, fmtRelative, type ApiKey } from '@/components/platform/developer-data';
import QuickCreateModal from '@/components/ui/quick-create-modal';

export default function Page() {
  const [rows, setRows] = useState<ApiKey[]>(apiKeys);
  const [createOpen, setCreateOpen] = useState(false);

  const columns: Column<ApiKey>[] = [
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
        actions={
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 sm:text-sm"
          >
            Create API Key
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Keys" value={rows.length} icon={KeyRound} accent="sky" sub="All environments" />
        <StatCard label="Active" value={rows.filter((k) => k.status === 'Active').length} icon={KeyRound} accent="green" sub="Accepting requests" />
        <StatCard label="Live Keys" value={rows.filter((k) => k.environment === 'Live').length} icon={KeyRound} accent="cyan" sub="Production traffic" />
        <StatCard label="Revoked (30d)" value={rows.filter((k) => k.status === 'Revoked').length} icon={KeyRound} accent="rose" sub="Rotation and incidents" />
      </div>

      <Card>
        <CardHeader title="Key management" subtitle="All API keys for this organization" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search keys..." initialSort={{ key: 'created', dir: 'desc' }} />
        </CardBody>
      </Card>

      <QuickCreateModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create API key"
        description="The full key is shown only once — store it securely."
        fields={[
          { name: 'name', label: 'Key name', placeholder: 'e.g. production-gateway' },
          { name: 'environment', label: 'Environment', type: 'select', options: ['Test', 'Live'], defaultValue: 'Test' }
        ]}
        submitLabel="Create key"
        onCreate={(values) => {
          const rand = Math.random().toString(36).slice(2, 6);
          setRows((prev) => [
            {
              id: `key-${Date.now()}`,
              name: values.name,
              prefix: `sk_${values.environment === 'Live' ? 'live' : 'test'}_${rand}…`,
              scopes: ['requests.read'],
              created: new Date().toISOString().slice(0, 10),
              lastUsed: '2026-08-13T09:00:00Z',
              status: 'Active',
              environment: values.environment as 'Live' | 'Test'
            },
            ...prev
          ]);
        }}
      />
    </div>
  );
}