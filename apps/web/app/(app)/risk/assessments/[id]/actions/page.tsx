import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress';
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
  const findings = findingsForAssessment(assessment.id);
  const rows = findings.map((f) => ({
    ...f,
    progress: f.status === 'Resolved' ? 100 : f.status === 'In Progress' ? 50 : 0
  }));
  const resolved = findings.filter((f) => f.status === 'Resolved').length;
  const remediationRate = findings.length ? Math.round((resolved / findings.length) * 100) : 0;

  return (
    <div className="space-y-5">
      <AssessmentHeader assessment={assessment} active={`/risk/assessments/${id}/actions`} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardBody className="py-4 text-center">
            <p className="text-2xl font-semibold text-white">{findings.length}</p>
            <p className="mt-0.5 text-[0.65rem] uppercase tracking-wider text-slate-500">Total actions</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="py-4 text-center">
            <p className="text-2xl font-semibold text-white">{findings.filter((f) => f.status === 'Open').length}</p>
            <p className="mt-0.5 text-[0.65rem] uppercase tracking-wider text-slate-500">Open</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="py-4 text-center">
            <p className="text-2xl font-semibold text-white">{findings.filter((f) => f.status === 'In Progress').length}</p>
            <p className="mt-0.5 text-[0.65rem] uppercase tracking-wider text-slate-500">In progress</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="py-4 text-center">
            <p className="text-2xl font-semibold text-white">{remediationRate}%</p>
            <p className="mt-0.5 text-[0.65rem] uppercase tracking-wider text-slate-500">Remediated</p>
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Remediation actions" subtitle="Findings tracked to owners with progress" />
        <CardBody>
          <DataTable
            rows={rows}
            columns={[
              { key: 'id', label: 'Action', sortValue: (r) => r.id },
              { key: 'title', label: 'Title', sortValue: (r) => r.title },
              {
                key: 'severity',
                label: 'Severity',
                sortValue: (r) => r.severity,
                render: (r) => <Badge label={r.severity} tone={toneForStatus(r.severity)} />
              },
              { key: 'owner', label: 'Owner', sortValue: (r) => r.owner },
              { key: 'due', label: 'Due', sortValue: (r) => r.due },
              {
                key: 'status',
                label: 'Status',
                sortValue: (r) => r.status,
                render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} />
              },
              {
                key: 'progress',
                label: 'Progress',
                sortValue: (r) => r.progress,
                render: (r) => (
                  <div className="flex w-28 items-center gap-2">
                    <ProgressBar value={r.progress} color={r.progress === 100 ? 'bg-emerald-400' : r.progress > 0 ? 'bg-amber-400' : 'bg-slate-500'} />
                    <span className="text-[0.65rem] text-slate-400">{r.progress}%</span>
                  </div>
                )
              }
            ] as Column<(typeof rows)[number]>[]}
            searchPlaceholder="Search actions..."
          />
        </CardBody>
      </Card>
    </div>
  );
}