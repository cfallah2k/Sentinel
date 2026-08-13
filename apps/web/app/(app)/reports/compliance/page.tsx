import ReportCategoryPage from '@/components/governance/report-category';

export default function Page() {
  return (
    <ReportCategoryPage
      active="/reports/compliance"
      title="Compliance Reports"
      description="Framework progress, control implementation and open gap reporting for auditors."
      types={['Compliance']}
    />
  );
}