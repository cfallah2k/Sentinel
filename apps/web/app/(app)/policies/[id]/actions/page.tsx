import { BellRing, ShieldCheck, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { DecisionBadge } from '@/components/enforcement/badges';
import { policyById, policyNav } from '@/components/enforcement/helpers';
import { policies } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const policy = policyById(id) ?? policies[0];
  const actions = policy.decisions.map((d) => ({
    action: d,
    description:
      d === 'Block' ? 'Terminate the request at the gateway' : d === 'Redact' ? 'Scrub sensitive fields before forwarding' : d === 'Require Approval' ? 'Queue for human approval' : d === 'Allow' ? 'Forward with audit record' : 'Record and continue',
    enabled: true,
    severity: d === 'Block' ? 'Critical' : d === 'Redact' ? 'High' : 'Medium'
  }));
  const columns: Column<(typeof actions)[number]>[] = [
    { key: 'action', label: 'Action', sortValue: (r) => r.action, render: (r) => <DecisionBadge label={r.action} /> },
    { key: 'description', label: 'Effect', render: (r) => <span className="text-slate-300">{r.description}</span> },
    { key: 'severity', label: 'Severity', sortValue: (r) => r.severity, render: (r) => <Badge label={r.severity} tone={r.severity === 'Critical' ? 'red' : r.severity === 'High' ? 'rose' : 'amber'} /> },
    { key: 'enabled', label: 'Enabled', render: (r) => (r.enabled ? <Badge label="Enabled" tone="green" /> : <Badge label="Disabled" tone="slate" />) }
  ];

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Policies"
        title={policy.name}
        id={policy.id}
        description="What happens when this policy fires."
        badges={[
          <Badge key="s" label={policy.status} tone={policy.status === 'Active' ? 'green' : policy.status === 'Draft' ? 'amber' : 'slate'} />,
          <Badge key="v" label={policy.version} tone="blue" />
        ]}
      />
      <DetailNav base={`/policies/${id}`} items={policyNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Actions" value={actions.length} icon={Zap} accent="violet" />
        <StatCard label="Webhook Fires" value={2} icon={BellRing} accent="sky" />
        <StatCard label="Incident Auto-open" value={policy.decisions.includes('Block') ? 'Yes' : 'No'} icon={ShieldCheck} accent="green" />
        <StatCard label="Audit Coverage" value="Full" icon={ShieldCheck} accent="cyan" />
      </div>
      <Card>
        <CardHeader title="Enforcement actions" subtitle="Actions triggered when a rule matches" />
        <CardBody>
          <DataTable columns={columns} rows={actions} searchable={false} pageSize={10} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Notification routing" subtitle="Where enforcement events are sent" />
        <CardBody className="space-y-2">
          {[
            { channel: 'Security alerts webhook', event: 'decision.blocked', status: 'Active' },
            { channel: 'Approval queue', event: 'approval.requested', status: policy.decisions.includes('Require Approval') ? 'Active' : 'Inactive' },
            { channel: 'SIEM forwarder', event: 'policy.violation', status: 'Active' },
            { channel: 'Incident pipeline', event: 'incident.created', status: policy.decisions.includes('Block') ? 'Active' : 'Inactive' }
          ].map((n) => (
            <div key={n.channel} className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <div className="min-w-0">
                <p className="text-xs font-medium text-white">{n.channel}</p>
                <p className="mt-0.5 font-mono text-[0.65rem] text-slate-500">{n.event}</p>
              </div>
              <Badge label={n.status} tone={n.status === 'Active' ? 'green' : 'slate'} />
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}