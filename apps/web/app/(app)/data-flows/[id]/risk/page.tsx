import { ShieldCheck } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar, Metric } from '@/components/ui/progress';
import { FlowHeader, FlowSubnav } from '@/components/data-intel/flow-detail';
import { findingsForSystem, resolveFlow, riskBarColor, riskScoreValue } from '@/components/data-intel/derived';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const flow = resolveFlow(id);
  const score = riskScoreValue(flow.risk);
  const findings = findingsForSystem(flow.systemId);
  return (
    <div className="space-y-6">
      <FlowSubnav id={flow.id} active="Risk" />
      <FlowHeader flow={flow} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Risk score" subtitle="Composite exposure for this route" />
          <CardBody>
            <div className="flex items-center gap-5">
              <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border text-2xl font-bold ${flow.risk === 'Critical' ? 'border-rose-500/30 bg-rose-500/10 text-rose-300' : flow.risk === 'High' ? 'border-amber-500/30 bg-amber-500/10 text-amber-300' : flow.risk === 'Medium' ? 'border-sky-500/30 bg-sky-500/10 text-sky-300' : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'}`}>
                {score}
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <div className="flex justify-between text-[0.65rem] text-slate-500">
                    <span>Exposure index</span>
                    <span className="font-semibold text-slate-300">{flow.risk}</span>
                  </div>
                  <div className="mt-1.5">
                    <ProgressBar value={score} color={riskBarColor(flow.risk)} />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge label={flow.risk} tone={flow.risk === 'Critical' ? 'red' : flow.risk === 'High' ? 'rose' : flow.risk === 'Medium' ? 'amber' : 'blue'} />
                  <Badge label={flow.decision} tone={flow.decision === 'Block' ? 'rose' : flow.decision === 'Redact' ? 'amber' : 'green'} />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Risk summary" subtitle="Key numbers" />
          <CardBody className="space-y-4">
            <Metric label="Risk rating" value={flow.risk} />
            <Metric label="Decision applied" value={flow.decision} />
            <Metric label="Open findings" value={findings.filter((f) => f.status === 'Open').length} />
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Open findings" subtitle="Risk assessment items tied to this flow's destination system" />
        <CardBody className="space-y-3">
          {findings.map((f) => (
            <div key={f.id} className="flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div>
                <p className="text-xs font-semibold text-white">{f.title}</p>
                <p className="mt-1 text-[0.65rem] text-slate-400">Owner: {f.owner} · due {f.due}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Badge label={f.severity} tone={f.severity === 'Critical' ? 'red' : f.severity === 'High' ? 'rose' : 'amber'} />
                <Badge label={f.status} tone={f.status === 'Resolved' ? 'green' : 'amber'} />
              </div>
            </div>
          ))}
          {findings.length === 0 ? (
            <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <ShieldCheck className="h-5 w-5 text-emerald-300" />
              <div>
                <p className="text-xs font-semibold text-emerald-300">No open findings</p>
                <p className="mt-0.5 text-[0.65rem] text-slate-400">This route is clear of outstanding risk items.</p>
              </div>
            </div>
          ) : null}
        </CardBody>
      </Card>
    </div>
  );
}