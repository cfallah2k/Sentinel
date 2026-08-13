import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import ReportHeader from '@/components/governance/report-header';
import { ReportDataView } from '@/components/governance/report-preview';
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
      <ReportHeader report={report} active={`/reports/${id}/data`} />
      <Card>
        <CardHeader
          title="Report data"
          subtitle="Source records included in this report"
          action={
            <div className="flex items-center gap-2">
              <Badge label={report.format} tone="slate" />
              <Badge label={`${report.id} · ${report.type}`} tone={toneForStatus(report.type)} />
            </div>
          }
        />
        <CardBody>
          <ReportDataView report={report} />
        </CardBody>
      </Card>
    </div>
  );
}
