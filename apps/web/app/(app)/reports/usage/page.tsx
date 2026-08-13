import ReportCategoryPage from '@/components/governance/report-category';

export default function Page() {
  return (
    <ReportCategoryPage
      active="/reports/usage"
      title="Usage Reports"
      description="Requests, tokens and spend across applications and providers."
      types={['Usage']}
    />
  );
}