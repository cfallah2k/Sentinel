import { Card, CardBody } from '@/components/ui/card';
import ReportHeader from '@/components/governance/report-header';
import ReportScheduleForm from '@/components/governance/report-schedule-form';
import { reports } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = reports.find((r) => r.id === id);
  if (!report) {
    return (
      <Card>
        <CardBody className="py-14 text-center">
          <p className="text-sm font-semibold text-white">Report not found</p>
          <p className="mt-1 text-xs text-slate-500">No report exists with id {id}.</p>
        </CardBody>
      </Card>
    );
  }
  return (
    <div className="space-y-5">
      <ReportHeader report={report} active={`/reports/${id}/schedule`} />
      <ReportScheduleForm report={report} />
    </div>
  );
}
