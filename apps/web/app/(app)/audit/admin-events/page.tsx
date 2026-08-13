import AuditCategoryPage from '@/components/governance/audit-category';

export default function Page() {
  return (
    <AuditCategoryPage
      active="/audit/admin-events"
      title="Admin Events"
      description="User management and settings changes performed by administrators."
      category="admin-events"
    />
  );
}