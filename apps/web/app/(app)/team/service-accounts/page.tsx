import { KeyRound } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { ScopeList } from '@/components/platform/shared';
import { serviceAccounts, fmtRelative } from '@/components/platform/developer-data';

type Row = {
  id: string;
  name: string;
  type: string;
  scopes: string[];
  status: string;
  created: string;
  lastUsed: string;
  owner: string;
};

export default function Page() {
  const rows: Row[] = serviceAccounts.map((s) => ({ ...s }));

  const columns: Column<Row>[] = [
    { key: 'name', label: 'Account', sortValue: (r) => r.name, render: (r) => <span className="font-mono text-slate-200">{r.name}</span> },
    { key: 'type', label: 'Type' },
    { key: 'owner', label: 'Owner' },
    { key: 'scopes', label: 'Scopes', render: (r) => <ScopeList scopes={r.scopes} /> },
    { key: 'lastUsed', label: 'Last Used', sortValue: (r) => r.lastUsed, render: (r) => <span className="text-slate-400">{fmtRelative(r.lastUsed)}</span> },
    { key: 'status', label: 'Status', tone: (r) => toneForStatus(r.status) }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Service Accounts"
        description="Machine identities used by team workloads and integrations."
        actions={
          <div className="flex flex-wrap gap-2">
            <Badge label="Owned by team" tone="blue" />
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Accounts" value={serviceAccounts.length} icon={KeyRound} accent="sky" sub="Team identities" />
        <StatCard label="Active" value={serviceAccounts.filter((s) => s.status === 'Active').length} icon={KeyRound} accent="green" sub="Running workloads" />
        <StatCard label="Automations" value={serviceAccounts.filter((s) => s.type === 'Automation').length} icon={KeyRound} accent="cyan" sub="Scheduled jobs" />
        <StatCard label="Scoped Keys" value="12" icon={KeyRound} accent="violet" sub="Key-account bindings" />
      </div>

      <Card>
        <CardHeader title="Team service accounts" subtitle="Identities provisioned for team use" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search accounts..." initialSort={{ key: 'name', dir: 'asc' }} />
        </CardBody>
      </Card>
    </div>
  );
}