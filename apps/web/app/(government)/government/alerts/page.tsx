import { PageHeader } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BellRing, ShieldAlert, ShieldCheck } from 'lucide-react';
import { governmentRegistry, notifications } from '@/lib/mock-data';

const alerts = [
  ...notifications.slice(0, 4).map((n) => ({
    id: n.id,
    type: n.type,
    title: n.title,
    detail: n.detail,
    tone: n.type === 'Incident' ? 'rose' : n.type === 'Security' ? 'red' : n.type === 'Approval' ? 'amber' : 'blue'
  })),
  {
    id: 'alt-gov-1',
    type: 'Compliance',
    title: 'Expired registrations flagged',
    detail: `${governmentRegistry.filter((r) => r.status === 'Expired').length} systems operating without current registration.`,
    tone: 'rose'
  },
  {
    id: 'alt-gov-2',
    type: 'Risk',
    title: 'High-risk concentration detected',
    detail: `${governmentRegistry.filter((r) => r.risk === 'Critical').length} critical-risk systems share a single operator.`,
    tone: 'red'
  }
];

export default function Page() {
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="Regulatory Alerts"
        description="Actionable signals from the oversight program."
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Active Alerts" subtitle={`${alerts.length} alerts in the current window`} />
          <CardBody className="space-y-3">
            {alerts.map((a) => (
              <div key={a.id} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3">
                <span className="mt-0.5 shrink-0">
                  {a.tone === 'rose' ? <ShieldAlert className="h-4 w-4 text-rose-400" /> : a.tone === 'red' ? <ShieldAlert className="h-4 w-4 text-red-400" /> : <ShieldCheck className="h-4 w-4 text-sky-400" />}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-semibold text-white">{a.title}</p>
                    <Badge label={a.type} tone={a.tone as 'rose'} />
                  </div>
                  <p className="mt-1 text-xs leading-5 text-slate-400">{a.detail}</p>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Alert Channels" subtitle="Distribution endpoints" />
          <CardBody className="space-y-3">
            {['Regulatory email digest', 'National registry webhook', 'SMS on-call rotation', 'OpsGenie integration'].map((c) => (
              <div key={c} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3 text-xs">
                <span className="flex items-center gap-2 text-slate-300"><BellRing className="h-3.5 w-3.5 text-sky-300" /> {c}</span>
                <Badge label="Active" tone="green" />
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </GovShell>
  );
}