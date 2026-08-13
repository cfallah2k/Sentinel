import AuditCategoryPage from '@/components/governance/audit-category';

export default function Page() {
  return (
    <AuditCategoryPage
      active="/audit/policy-events"
      title="Policy Events"
      description="Policy lifecycle events — creation, updates and deletions."
      category="policy-events"
    />
  );
}