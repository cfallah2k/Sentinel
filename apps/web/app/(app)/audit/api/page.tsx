import AuditCategoryPage from '@/components/governance/audit-category';

export default function Page() {
  return (
    <AuditCategoryPage
      active="/audit/api"
      title="API Events"
      description="Events originating from the API, CLI and webhook contexts."
      category="api"
    />
  );
}