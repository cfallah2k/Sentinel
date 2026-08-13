import { Ban } from 'lucide-react';
import { StatusPage } from '@/components/status-page';

export default function Page() {
  return (
    <StatusPage
      code="403"
      title="Access forbidden"
      description="Your account does not have permission to view this resource. Contact an administrator if you believe this is a mistake."
      icon={Ban}
      badge="Forbidden"
      tone="rose"
      primaryHref="/dashboard"
      primaryLabel="Back to dashboard"
      secondaryHref="/support"
      secondaryLabel="Contact support"
    />
  );
}
