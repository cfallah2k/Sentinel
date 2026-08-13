import AuditCategoryPage from '@/components/governance/audit-category';

export default function Page() {
  return (
    <AuditCategoryPage
      active="/audit/authentication"
      title="Authentication Events"
      description="Login attempts, MFA challenges and session security events."
      category="authentication"
    />
  );
}