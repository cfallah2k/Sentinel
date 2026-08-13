import { Card, CardBody } from '@/components/ui/card';
import AssessmentOverview from '@/components/governance/assessment-overview';
import { assessmentById } from '@/components/governance/risk-helpers';

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
  return <AssessmentOverview assessment={assessment} active={`/risk/assessments/${id}/overview`} />;
}