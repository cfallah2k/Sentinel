import AuditCategoryPage from '@/components/governance/audit-category';

export default function Page() {
  return (
    <AuditCategoryPage
      active="/audit/logs"
      title="Audit Logs"
      description="Complete immutable event history across the control plane."
    />
  );
}