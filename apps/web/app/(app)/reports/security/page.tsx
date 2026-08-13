import ReportCategoryPage from '@/components/governance/report-category';

export default function Page() {
  return (
    <ReportCategoryPage
      active="/reports/security"
      title="Security Reports"
      description="Enforcement, incident and policy-driven security metrics across the control plane."
      types={['Policy', 'Incidents']}
    />
  );
}