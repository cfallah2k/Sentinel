import AuditCategoryPage from '@/components/governance/audit-category';

export default function Page() {
  return (
    <AuditCategoryPage
      active="/audit/ai-activity"
      title="AI Activity"
      description="System registration, approval and integration events across the AI registry."
      category="ai-activity"
    />
  );
}