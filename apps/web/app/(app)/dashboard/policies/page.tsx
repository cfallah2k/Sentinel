import { FileEdit, FileText, ShieldCheck, ShieldAlert } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { AreaTrend } from '@/components/ui/charts';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { dailySeries, hourlySeries, policies } from '@/lib/mock-data';

const activePolicies = policies.filter((p) => p.status === 'Active');
const draftPolicies = policies.filter((p) => p.status === 'Draft');
const violatingPolicies = policies.filter((p) => p.violations > 0);
const enforcements24h = hourlySeries.reduce((s, h) => s + h.blocked + h.redacted, 0);

const policyRows = policies.map((p) => ({
  id: p.id,
  name: p.name,
  status: p.status,
  scope: p.scope,
  decisions: p.decisions.join(' + '),
  conditions: p.conditions,
  violations: p.violations,
  enforcements: p.enforcements,
  updatedAt: p.updatedAt
}));
type PolicyRow = (typeof policyRows)[number];

const policyColumns: Column<PolicyRow>[] = [
  { key: 'id', label: 'Policy', render: (r) => <span className="font-mono text-sentinel-300">{r.id}</span> },
  { key: 'name', label: 'Name', render: (r) => <span className="font-medium text-slate-200">{r.name}</span> },
  { key: 'status', label: 'Status', tone: (r) => toneForStatus(r.status) },
  { key: 'scope', label: 'Scope' },
  { key: 'decisions', label: 'Decisions' },
  { key: 'conditions', label: 'Conditions', sortValue: (r) => r.conditions },
  { key: 'violations', label: 'Violations', sortValue: (r) => r.violations, render: (r) => <span className={r.violations > 0 ? 'font-semibold text-rose-300' : 'text-slate-400'}>{r.violations.toLocaleString()}</span> },
  { key: 'enforcements', label: 'Enforcements', sortValue: (r) => r.enforcements, render: (r) => r.enforcements.toLocaleString() },
  { key: 'updatedAt', label: 'Updated' }
];

export default function Page() {
  return (
    <div>
      <PageHeader
        eyebrow="Policies"
        title="Policies Snapshot"
        description="Policy inventory, enforcement activity, and violation trends across the gateway."
      />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active policies" value={activePolicies.length} icon={ShieldCheck} accent="green" sub={`${policies.length} policies total`} />
        <StatCard label="Draft policies" value={draftPolicies.length} icon={FileEdit} accent="amber" sub="Awaiting review" />
        <StatCard label="Violating policies" value={violatingPolicies.length} icon={ShieldAlert} accent="rose" sub="Violations recorded" />
        <StatCard label="Enforcements 24h" value={enforcements24h.toLocaleString()} icon={FileText} accent="sky" spark={hourlySeries.map((h) => h.blocked + h.redacted)} sub="Blocked + redacted events" />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Policies" subtitle="Governance rules enforced at the gateway" />
          <CardBody>
            <DataTable columns={policyColumns} rows={policyRows} searchable={false} pageSize={8} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Violation trend" subtitle="Daily blocked requests over 30 days" />
          <CardBody>
            <AreaTrend data={dailySeries} dataKey="blocked" xKey="date" color="#f87171" height={240} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}