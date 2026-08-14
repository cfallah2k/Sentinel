'use client';

import { useState } from 'react';
import { Braces } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { ScopeList } from '@/components/platform/shared';
import { serviceAccounts, fmtRelative, type ServiceAccount } from '@/components/platform/developer-data';
import QuickCreateModal from '@/components/ui/quick-create-modal';

export default function Page() {
  const [rows, setRows] = useState<ServiceAccount[]>(serviceAccounts);
  const [createOpen, setCreateOpen] = useState(false);

  const columns: Column<ServiceAccount>[] = [
    {
      key: 'name',
      label: 'Name',
      sortValue: (r) => r.name,
      render: (r) => (
        <Link href={`/developer-portal/service-accounts/${r.id}`} className="font-mono text-slate-200 transition hover:text-sentinel-300">
          {r.name}
        </Link>
      )
    },
    { key: 'type', label: 'Type' },
    { key: 'scopes', label: 'Scopes', render: (r) => <ScopeList scopes={r.scopes} /> },
    { key: 'owner', label: 'Owner' },
    { key: 'lastUsed', label: 'Last Used', sortValue: (r) => r.lastUsed, render: (r) => <span className="text-slate-400">{fmtRelative(r.lastUsed)}</span> },
    { key: 'status', label: 'Status', tone: (r) => toneForStatus(r.status) }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Service Accounts"
        description="Machine identities used by workers, integrations and scheduled jobs."
        actions={
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 sm:text-sm"
          >
            Create Account
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Accounts" value={rows.length} icon={Braces} accent="sky" sub="All identities" />
        <StatCard label="Active" value={rows.filter((s) => s.status === 'Active').length} icon={Braces} accent="green" sub="Running workloads" />
        <StatCard label="Automations" value={rows.filter((s) => s.type === 'Automation').length} icon={Braces} accent="cyan" sub="Scheduled jobs" />
        <StatCard label="Last Rotation" value="12d" icon={Braces} accent="amber" sub="Key rotation age" />
      </div>

      <Card>
        <CardHeader title="Service accounts" subtitle="All machine identities" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search accounts..." initialSort={{ key: 'name', dir: 'asc' }} />
        </CardBody>
      </Card>

      <QuickCreateModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create service account"
        description="A bearer credential is generated immediately."
        fields={[
          { name: 'name', label: 'Account name', placeholder: 'e.g. nightly-classification-job' },
          { name: 'type', label: 'Account type', type: 'select', options: ['Machine', 'Automation', 'Integration'], defaultValue: 'Automation' },
          { name: 'owner', label: 'Owner', placeholder: 'Team or member email' }
        ]}
        submitLabel="Create account"
        onCreate={(values) => {
          setRows((prev) => [
            {
              id: `sa-${Date.now()}`,
              name: values.name,
              type: values.type as ServiceAccount['type'],
              scopes: ['audit.read'],
              status: 'Active',
              created: new Date().toISOString().slice(0, 10),
              lastUsed: '2026-08-13T09:00:00Z',
              owner: values.owner || 'Amara Okafor'
            },
            ...prev
          ]);
        }}
      />
    </div>
  );
}