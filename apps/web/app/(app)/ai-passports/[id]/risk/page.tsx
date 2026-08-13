import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar, Metric } from '@/components/ui/progress';
import { PassportHeader, PassportSubnav } from '@/components/data-intel/passport-shared';
import { findingsForSystem, resolvePassport, riskBarColor, riskScoreValue } from '@/components/data-intel/derived';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = resolvePassport(id);
  const score = riskScoreValue(p.risk);
  const findings = findingsForSystem(p.systemId);
  return (
    <div className="space-y-6">
      <PassportSubnav id={p.id} active="Risk" />
      <PassportHeader p={p} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Risk assessment" subtitle="Composite score for this system" />
          <CardBody>
            <div className="flex items-center gap-5">
              <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border text-2xl font-bold ${p.risk === 'Critical' ? 'border-rose-500/30 bg-rose-500/10 text-rose-300' : p.risk === 'High' ? 'border-amber-500/30 bg-amber-500/10 text-amber-300' : p.risk === 'Medium' ? 'border-sky-500/30 bg-sky-500/10 text-sky-300' : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'}`}>
                {score}
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <div className="flex justify-between text-[0.65rem] text-slate-500">
                    <span>Risk index</span>
                    <span className="font-semibold text-slate-300">{p.risk}</span>
                  </div>
                  <div className="mt-1.5">
                    <ProgressBar value={score} color={riskBarColor(p.risk)} />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge label={p.risk} tone={p.risk === 'Critical' ? 'red' : p.risk === 'High' ? 'rose' : p.risk === 'Medium' ? 'amber' : 'blue'} />
                  <Badge label={`${p.complianceScore}% compliance`} tone={p.complianceScore > 70 ? 'green' : 'amber'} />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Risk summary" subtitle="Key numbers" />
          <CardBody className="space-y-4">
            <Metric label="Risk rating" value={p.risk} />
            <Metric label="Blocked 24h" value={p.blocked24h} />
            <Metric label="Open findings" value={findings.filter((f) => f.status === 'Open').length} />
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Findings" subtitle="Open items from the latest risk assessment" />
        <CardBody className="space-y-3">
          {findings.map((f) => (
            <div key={f.id} className="flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div>
                <p className="text-xs font-semibold text-white">{f.title}</p>
                <p className="mt-1 text-[0.65rem] text-slate-400">Owner: {f.owner} · due {f.due}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Badge label={f.severity} tone={f.severity === 'Critical' ? 'red' : f.severity === 'High' ? 'rose' : 'amber'} />
                <Badge label={f.status} tone={f.status === 'Resolved' ? 'green' : f.status === 'In Progress' ? 'amber' : 'rose'} />
              </div>
            </div>
          ))}
          {findings.length === 0 ? (
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs font-semibold text-emerald-300">
              No open findings for this system.
            </div>
          ) : null}
        </CardBody>
      </Card>
    </div>
  );
}