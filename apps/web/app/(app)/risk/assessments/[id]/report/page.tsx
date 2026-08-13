import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress';
import { BarSeries } from '@/components/ui/charts';
import AssessmentHeader from '@/components/governance/assessment-header';
import { assessmentById, findingsForAssessment, questionsForAssessment } from '@/components/governance/risk-helpers';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const assessment = assessmentById(id);
  if (!assessment) {
    return (
      <Card>
        <CardBody className="py-14 text-center">
          <p className="text-sm font-semibold text-white">Assessment not found</p>
          <p className="mt-1 text-xs text-slate-500">No assessment exists with id {id}.</p>
        </CardBody>
      </Card>
    );
  }
  const findings = findingsForAssessment(assessment.id);
  const questions = questionsForAssessment(assessment.id);
  const yes = questions.filter((q) => q.answer === 'Yes').length;
  const partial = questions.filter((q) => q.answer === 'Partial').length;
  const no = questions.filter((q) => q.answer === 'No').length;
  const severityData = (['Critical', 'High', 'Medium', 'Low'] as const)
    .map((s) => ({ name: s, count: findings.filter((f) => f.severity === s).length }))
    .filter((d) => d.count > 0);

  return (
    <div className="space-y-5">
      <AssessmentHeader assessment={assessment} active={`/risk/assessments/${id}/report`} />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Score summary" subtitle="Composite score and response breakdown" />
          <CardBody className="space-y-4">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">Residual risk score</p>
                  <p className="text-[0.65rem] text-slate-500">Weighted from likelihood and impact answers</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-semibold text-white">{assessment.score}</span>
                  <Badge label={assessment.severity} tone={toneForStatus(assessment.severity)} />
                </div>
              </div>
              <div className="mt-4">
                <ProgressBar value={assessment.score} color={assessment.severity === 'Critical' || assessment.severity === 'High' ? 'bg-rose-400' : assessment.severity === 'Medium' ? 'bg-amber-400' : 'bg-emerald-400'} />
              </div>
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-slate-400">Yes — {yes} answered</span>
                <span className="font-semibold text-white">{Math.round((yes / questions.length) * 100)}%</span>
              </div>
              <ProgressBar value={(yes / questions.length) * 100} color="bg-emerald-400" />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-slate-400">Partial — {partial} answered</span>
                <span className="font-semibold text-white">{Math.round((partial / questions.length) * 100)}%</span>
              </div>
              <ProgressBar value={(partial / questions.length) * 100} color="bg-amber-400" />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-slate-400">No — {no} answered</span>
                <span className="font-semibold text-white">{Math.round((no / questions.length) * 100)}%</span>
              </div>
              <ProgressBar value={(no / questions.length) * 100} color="bg-rose-400" />
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Findings by severity" subtitle={`${findings.length} findings in this assessment`} />
          <CardBody>
            <BarSeries data={severityData} dataKey="count" xKey="name" color="#f87171" height={220} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}