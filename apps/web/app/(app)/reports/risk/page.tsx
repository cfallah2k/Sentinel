import ReportCategoryPage from '@/components/governance/report-category';

export default function Page() {
  return (
    <ReportCategoryPage
      active="/reports/risk"
      title="Risk Reports"
      description="Residual risk scores, findings and assessment status for the risk committee."
      types={['Risk']}
    />
  );
}