import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import AssessmentHeader from '@/components/governance/assessment-header';
import { assessmentById, findingsForAssessment } from '@/components/governance/risk-helpers';

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
  const rows = findingsForAssessment(assessment.id).map((f) => ({ ...f }));

  return (
    <div className="space-y-5">
      <AssessmentHeader assessment={assessment} active={`/risk/assessments/${id}/findings`} />
      <Card>
        <CardHeader title="Findings" subtitle="Issues identified during this assessment" />
        <CardBody>
          <DataTable
            rows={rows}
            columns={[
              { key: 'id', label: 'Finding', sortValue: (r) => r.id },
              { key: 'title', label: 'Title', sortValue: (r) => r.title },
              {
                key: 'severity',
                label: 'Severity',
                sortValue: (r) => r.severity,
                render: (r) => <Badge label={r.severity} tone={toneForStatus(r.severity)} />
              },
              {
                key: 'status',
                label: 'Status',
                sortValue: (r) => r.status,
                render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} />
              },
              { key: 'owner', label: 'Owner', sortValue: (r) => r.owner },
              { key: 'due', label: 'Due', sortValue: (r) => r.due }
            ] as Column<(typeof rows)[number]>[]}
            searchPlaceholder="Search findings..."
            initialSort={{ key: 'severity', dir: 'desc' }}
          />
        </CardBody>
      </Card>
    </div>
  );
}