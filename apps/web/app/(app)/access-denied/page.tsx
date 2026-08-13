import { ShieldAlert } from 'lucide-react';
import { StatusPage } from '@/components/status-page';

export default function Page() {
  return (
    <StatusPage
      code="403"
      title="Access denied"
      description="Your role does not include the permissions required for this area. Sign in with an authorized account or request elevated access."
      icon={ShieldAlert}
      badge="Access denied"
      tone="rose"
      primaryHref="/login"
      primaryLabel="Return to sign in"
      secondaryHref="/dashboard"
      secondaryLabel="Back to dashboard"
    />
  );
}
