import { CalendarClock, ShieldOff, TimerReset, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { policyById, policyExceptions, policyNav } from '@/components/enforcement/helpers';
import { policies } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const policy = policyById(id) ?? policies[0];
  const exceptions = policyExceptions(policy);
  const columns: Column<(typeof exceptions)[number]>[] = [
    { key: 'system', label: 'System', sortValue: (r) => r.system, render: (r) => <span className="text-slate-200">{r.system}</span> },
    { key: 'reason', label: 'Reason', render: (r) => <span className="text-slate-400">{r.reason}</span> },
    { key: 'expires', label: 'Expires', render: (r) => <span className="text-slate-300">{r.expires}</span> },
    { key: 'grantedBy', label: 'Granted By', sortValue: (r) => r.grantedBy, render: (r) => <span className="text-slate-300">{r.grantedBy}</span> },
    { key: 'active', label: 'Status', render: (r) => (r.active ? <Badge label="Active" tone="amber" /> : <Badge label="Expired" tone="slate" />) }
  ];

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Policies"
        title={policy.name}
        id={policy.id}
        description="Temporary carve-outs granted against this policy."
        badges={[
          <Badge key="s" label={policy.status} tone={policy.status === 'Active' ? 'green' : policy.status === 'Draft' ? 'amber' : 'slate'} />,
          <Badge key="v" label={policy.version} tone="blue" />
        ]}
      />
      <DetailNav base={`/policies/${id}`} items={policyNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Exceptions" value={exceptions.filter((e) => e.active).length} icon={ShieldOff} accent="amber" />
        <StatCard label="Expiring Soon" value={exceptions.filter((e) => e.active).length > 0 ? 1 : 0} icon={TimerReset} accent="rose" />
        <StatCard label="Historical" value={exceptions.filter((e) => !e.active).length} icon={CalendarClock} accent="slate" />
        <StatCard label="Requesters" value={exceptions.length} icon={Users} accent="sky" />
      </div>
      <Card>
        <CardHeader title="Exceptions" subtitle="Each exception bypasses the policy for a defined window" />
        <CardBody>
          <DataTable columns={columns} rows={exceptions} searchable={false} pageSize={10} />
        </CardBody>
      </Card>
    </div>
  );
}