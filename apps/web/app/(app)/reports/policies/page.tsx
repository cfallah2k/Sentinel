import ReportCategoryPage from '@/components/governance/report-category';

export default function Page() {
  return (
    <ReportCategoryPage
      active="/reports/policies"
      title="Policy Reports"
      description="Enforcement counts, violations and policy lifecycle reporting."
      types={['Policy']}
    />
  );
}