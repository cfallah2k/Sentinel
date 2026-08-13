import AuditCategoryPage from '@/components/governance/audit-category';

export default function Page() {
  return (
    <AuditCategoryPage
      active="/audit/data-access"
      title="Data Access Events"
      description="Approvals and data export activity touching sensitive information."
      category="data-access"
    />
  );
}