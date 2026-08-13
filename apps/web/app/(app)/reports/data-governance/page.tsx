import ReportCategoryPage from '@/components/governance/report-category';

export default function Page() {
  return (
    <ReportCategoryPage
      active="/reports/data-governance"
      title="Data Governance Reports"
      description="Data flow decisions, classification coverage and source compliance reporting."
      types={['Compliance']}
    />
  );
}