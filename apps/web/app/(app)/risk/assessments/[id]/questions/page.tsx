import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import AssessmentHeader from '@/components/governance/assessment-header';
import { assessmentById, questionsForAssessment } from '@/components/governance/risk-helpers';

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
  const questions = questionsForAssessment(assessment.id);

  return (
    <div className="space-y-5">
      <AssessmentHeader assessment={assessment} active={`/risk/assessments/${id}/questions`} />
      <Card>
        <CardHeader title="Assessment questions" subtitle={`${questions.length} questions across 8 control categories`} />
        <CardBody className="space-y-3">
          {questions.map((q) => (
            <div key={q.id} className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-[0.65rem] uppercase tracking-wider text-slate-500">{q.category}</p>
                  <p className="mt-1 text-sm font-medium text-white">{q.question}</p>
                  <p className="mt-1 text-xs text-slate-500">{q.note}</p>
                </div>
                <Badge label={q.answer} tone={toneForStatus(q.answer === 'Yes' ? 'Approved' : q.answer === 'Partial' ? 'Pending' : 'Denied')} />
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}