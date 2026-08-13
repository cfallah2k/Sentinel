import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import AssessmentHeader from '@/components/governance/assessment-header';
import { assessmentById, evidenceForAssessment } from '@/components/governance/risk-helpers';

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
  const rows = evidenceForAssessment(assessment.id).map((e) => ({ ...e }));

  return (
    <div className="space-y-5">
      <AssessmentHeader assessment={assessment} active={`/risk/assessments/${id}/evidence`} />
      <Card>
        <CardHeader title="Evidence library" subtitle="Supporting artifacts collected for this assessment" />
        <CardBody>
          <DataTable
            rows={rows}
            columns={[
              { key: 'id', label: 'ID', sortValue: (r) => r.id },
              { key: 'title', label: 'Title', sortValue: (r) => r.title },
              { key: 'type', label: 'Type', sortValue: (r) => r.type, render: (r) => <Badge label={r.type} tone="slate" /> },
              { key: 'uploadedBy', label: 'Uploaded by', sortValue: (r) => r.uploadedBy },
              { key: 'date', label: 'Date', sortValue: (r) => r.date },
              {
                key: 'status',
                label: 'Status',
                sortValue: (r) => r.status,
                render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} />
              }
            ] as Column<(typeof rows)[number]>[]}
            searchPlaceholder="Search evidence..."
          />
        </CardBody>
      </Card>
    </div>
  );
}