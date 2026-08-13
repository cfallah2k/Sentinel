import { Lock } from 'lucide-react';
import { StatusPage } from '@/components/status-page';

export default function Page() {
  return (
    <StatusPage
      code="401"
      title="Authentication required"
      description="Your session token is missing, expired or was not presented with this request. Sign in again to continue."
      icon={Lock}
      badge="Unauthorized"
      tone="amber"
      primaryHref="/login"
      primaryLabel="Return to sign in"
      secondaryHref="/dashboard"
      secondaryLabel="Back to dashboard"
    />
  );
}
