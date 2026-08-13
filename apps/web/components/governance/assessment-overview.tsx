import { AlertTriangle, CheckCircle2, ClipboardList, FileText } from 'lucide-react';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress';
import AssessmentHeader from './assessment-header';
import {
  findingsForAssessment,
  questionsForAssessment,
  evidenceForAssessment,
  systemMeta,
  assessmentProgress
} from './risk-helpers';
import type { RiskAssessment } from '@/lib/mock-data';

function ScoreRow({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="text-slate-400">{label}</span>
        <span className="font-semibold text-white">{value}</span>
      </div>
      <ProgressBar value={value} color={color} />
    </div>
  );
}

export default function AssessmentOverview({ assessment, active }: { assessment: RiskAssessment; active: string }) {
  const system = systemMeta(assessment.systemId);
  const findings = findingsForAssessment(assessment.id);
  const open = findings.filter((f) => f.status !== 'Resolved').length;
  const questions = questionsForAssessment(assessment.id);
  const yes = questions.filter((q) => q.answer === 'Yes').length;
  const partial = questions.filter((q) => q.answer === 'Partial').length;
  const no = questions.filter((q) => q.answer === 'No').length;
  const evidence = evidenceForAssessment(assessment.id);
  const progress = assessmentProgress(assessment);

  return (
    <div className="space-y-5">
      <AssessmentHeader assessment={assessment} active={active} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Residual risk" value={assessment.score} delta={assessment.score >= 70 ? -8 : 5} deltaLabel="vs baseline" icon={ClipboardList} accent={assessment.score >= 70 ? 'rose' : 'sky'} sub="Inherent risk on this system" />
        <StatCard label="Open findings" value={open} delta={-20} deltaLabel="remediation rate" icon={AlertTriangle} accent="amber" sub={`${findings.length} total findings`} />
        <StatCard label="Questions passed" value={`${yes}/${questions.length}`} delta={Math.round((yes / questions.length) * 100)} deltaLabel="answer rate" icon={CheckCircle2} accent="green" sub="Yes / Partial / No split below" />
        <StatCard label="Evidence items" value={evidence.length} delta={12} deltaLabel="uploaded this cycle" icon={FileText} accent="violet" sub={`${system.name} · ${system.type}`} />
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Score summary" subtitle="Assessment response breakdown" />
          <CardBody className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <div>
                <p className="text-xs font-medium text-white">Overall progress</p>
                <p className="text-[0.65rem] text-slate-500">{assessment.completedAt ? 'Assessment completed and approved' : 'Assessment in progress'}</p>
              </div>
              <p className="text-xl font-semibold text-white">{progress}<span className="text-xs text-slate-500">%</span></p>
            </div>
            <ScoreRow label={`Yes — ${yes} answered`} value={Math.round((yes / questions.length) * 100)} color="bg-emerald-400" />
            <ScoreRow label={`Partial — ${partial} answered`} value={Math.round((partial / questions.length) * 100)} color="bg-amber-400" />
            <ScoreRow label={`No — ${no} answered`} value={Math.round((no / questions.length) * 100)} color="bg-rose-400" />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Latest findings" subtitle="Top remediation items from this assessment" />
          <CardBody className="space-y-3">
            {findings.slice(0, 5).map((f) => (
              <div key={f.id} className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-white">{f.title}</p>
                  <p className="mt-0.5 text-[0.65rem] text-slate-500">{f.owner} · due {f.due}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Badge label={f.severity} tone={toneForStatus(f.severity)} />
                  <Badge label={f.status} tone={toneForStatus(f.status)} />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}