import { PageHeader } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { BarSeries } from '@/components/ui/charts';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck } from 'lucide-react';
import { policies } from '@/lib/mock-data';

const scenarios = [
  { name: 'PII to unapproved provider', decision: 'Blocked', result: 'Policy pol-1 matched · request terminated', tone: 'rose' },
  { name: 'Financial data to external provider', decision: 'Redacted', result: 'Identifiers stripped before transmission', tone: 'amber' },
  { name: 'Health data leaving EU region', decision: 'Blocked', result: 'Policy pol-5 matched · EU boundary enforced', tone: 'rose' },
  { name: 'Approved app transmitting customer data', decision: 'Allowed', result: 'Allowlist entry verified · policy pol-7', tone: 'green' },
  { name: 'Biometric model request without approval', decision: 'Approval Required', result: 'Queued for human decision · pol-6', tone: 'amber' },
  { name: 'Self-hosted inference within quota', decision: 'Logged', result: 'Request recorded · quota intact', tone: 'green' }
];

const impact = [
  { name: 'Block', value: policies.filter((p) => p.decisions.includes('Block')).length },
  { name: 'Redact', value: policies.filter((p) => p.decisions.includes('Redact')).length },
  { name: 'Approve', value: policies.filter((p) => p.decisions.includes('Require Approval')).length },
  { name: 'Allow', value: policies.filter((p) => p.decisions.includes('Allow')).length },
  { name: 'Log', value: policies.filter((p) => p.decisions.includes('Log')).length }
];

export default function Page() {
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="Policy Simulator"
        description="Preview how the gateway would decide representative requests under active policy."
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Decision Impact" subtitle="Policies per enforcement decision type" />
          <CardBody>
            <BarSeries data={impact} dataKey="value" height={220} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Simulated Scenarios" subtitle="Deterministic evaluation against active policies" />
          <CardBody className="space-y-3">
            {scenarios.map((s) => (
              <div key={s.name} className="flex items-start justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3">
                <div>
                  <p className="text-xs font-semibold text-white">{s.name}</p>
                  <p className="mt-1 text-[0.65rem] leading-4 text-slate-400">{s.result}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge label={s.decision} tone={s.tone as 'rose'} />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Simulation Notes" subtitle="What the simulator accounts for" />
        <CardBody>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="h-4 w-4 text-sky-300" />
            <span>Order of evaluation: strictest decision wins. Conditions, scope bindings, and allowlists are applied in gateway order.</span>
          </div>
        </CardBody>
      </Card>
    </GovShell>
  );
}