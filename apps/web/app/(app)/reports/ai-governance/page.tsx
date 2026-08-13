import ReportCategoryPage from '@/components/governance/report-category';

export default function Page() {
  return (
    <ReportCategoryPage
      active="/reports/ai-governance"
      title="AI Governance Reports"
      description="Registry, approval and oversight summaries for the AI governance program."
      types={['Governance', 'Executive']}
    />
  );
}