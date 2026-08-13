import { AlertTriangle, FileText, ShieldCheck, XCircle } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { BarSeries } from '@/components/ui/charts';
import { ModuleNav } from '@/components/governance/module-nav';
import { riskNavItems } from '@/components/governance/risk-helpers';
import { policies } from '@/lib/mock-data';

export default function Page() {
  const rows = policies.map((p) => ({ ...p }));
  const active = policies.filter((p) => p.status === 'Active').length;
  const draft = policies.filter((p) => p.status === 'Draft').length;
  const violations = policies.reduce((s, p) => s + p.violations, 0);
  const enforcements = policies.reduce((s, p) => s + p.enforcements, 0);
  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'name', label: 'Policy', sortValue: (r) => r.name, render: (r) => <span className="font-medium text-white">{r.name}</span> },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> },
    { key: 'version', label: 'Version', sortValue: (r) => r.version },
    { key: 'scope', label: 'Scope', sortValue: (r) => r.scope },
    { key: 'decisions', label: 'Decisions', sortValue: (r) => r.decisions.join(', ') },
    { key: 'conditions', label: 'Conditions', sortValue: (r) => r.conditions },
    { key: 'violations', label: 'Violations', sortValue: (r) => r.violations },
    { key: 'enforcements', label: 'Enforcements', sortValue: (r) => r.enforcements },
    { key: 'updatedAt', label: 'Updated', sortValue: (r) => r.updatedAt }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Governance"
        title="Policy Risk"
        description="Policy configuration risk — coverage, violations and enforcement volume across the control plane."
      />
      <ModuleNav items={riskNavItems} active="/risk/policies" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active policies" value={active} delta={12} deltaLabel="this quarter" icon={ShieldCheck} accent="green" />
        <StatCard label="Draft" value={draft} delta={100} deltaLabel="new this week" icon={FileText} accent="amber" />
        <StatCard label="Violations" value={violations.toLocaleString()} delta={-8} deltaLabel="vs last month" icon={AlertTriangle} accent="rose" />
        <StatCard label="Enforcements" value={enforcements.toLocaleString()} delta={5} deltaLabel="this week" icon={XCircle} accent="sky" />
      </div>
      <Card>
        <CardHeader title="Policy register" subtitle="All policies with enforcement metrics" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search policies..." initialSort={{ key: 'violations', dir: 'desc' }} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Violations by policy" subtitle="30-day enforcement failures per policy" />
        <CardBody>
          <BarSeries data={policies.map((p) => ({ name: p.name.split(' ').slice(0, 3).join(' '), violations: p.violations }))} dataKey="violations" color="#f87171" height={200} />
        </CardBody>
      </Card>
    </div>
  );
}