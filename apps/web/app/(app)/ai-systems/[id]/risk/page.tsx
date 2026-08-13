import { AlertTriangle, FileSearch, ShieldCheck, ShieldX } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { systemNav } from '@/components/registry/nav';
import { seededTake } from '@/components/registry/helpers';
import { aiSystems, riskAssessments, riskFindings } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const system = aiSystems.find((s) => s.id === id) ?? aiSystems[0];
  const assessment = riskAssessments.find((a) => a.systemId === system.id);
  const findings = assessment
    ? riskFindings.filter((f) => f.assessmentId === assessment.id)
    : seededTake(riskFindings, system.id, 3);
  const openFindings = findings.filter((f) => f.status !== 'Resolved').length;

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · AI Systems"
        title={system.name}
        id={system.id}
        description="Risk posture, assessments and open findings for this system."
        badges={[
          <Badge key="status" label={system.status} tone={toneForStatus(system.status)} />,
          <Badge key="risk" label={`${system.risk} Risk`} tone={toneForStatus(system.risk)} />
        ]}
      />
      <DetailNav base={`/ai-systems/${id}`} items={systemNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Risk Level" value={system.risk} icon={AlertTriangle} accent={system.risk === 'Low' ? 'green' : system.risk === 'Medium' ? 'amber' : 'rose'} />
        <StatCard label="Assessment Score" value={assessment?.score ?? 0} icon={ShieldCheck} accent="sky" sub={assessment?.status ?? 'No assessment'} />
        <StatCard label="Findings" value={findings.length} icon={FileSearch} accent="violet" />
        <StatCard label="Open Findings" value={openFindings} icon={ShieldX} accent="rose" />
      </div>
      <Card>
        <CardHeader title="Risk Findings" subtitle={assessment ? `From ${assessment.id} · ${assessment.status}` : 'Deterministic assessment view'} />
        <CardBody className="space-y-3">
          {findings.map((f) => (
            <div key={f.id} className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-200">{f.title}</p>
                <p className="mt-0.5 text-[0.65rem] text-slate-500">
                  {f.id} · {f.owner} · due {f.due}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge label={f.severity} tone={toneForStatus(f.severity)} />
                <Badge label={f.status} tone={toneForStatus(f.status)} />
              </div>
            </div>
          ))}
          {findings.length === 0 ? <p className="text-xs text-slate-500">No open findings recorded.</p> : null}
        </CardBody>
      </Card>
    </div>
  );
}