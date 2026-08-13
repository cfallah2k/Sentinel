import ReportCategoryPage from '@/components/governance/report-category';

export default function Page() {
  return (
    <ReportCategoryPage
      active="/reports/incidents"
      title="Incident Reports"
      description="Severity mix, response metrics and resolution trends for the SOC."
      types={['Incidents']}
    />
  );
}