import AuditCategoryPage from '@/components/governance/audit-category';

export default function Page() {
  return (
    <AuditCategoryPage
      active="/audit/security"
      title="Security Events"
      description="Key rotations, incident management and security-related audit events."
      category="security"
    />
  );
}