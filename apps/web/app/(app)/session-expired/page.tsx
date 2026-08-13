import { Hourglass } from 'lucide-react';
import { StatusPage } from '@/components/status-page';

export default function Page() {
  return (
    <StatusPage
      code="Expired"
      title="Your session has expired"
      description="For security, sessions automatically expire after a period of inactivity. Sign in again to continue where you left off."
      icon={Hourglass}
      badge="Session expired"
      tone="amber"
      primaryHref="/login"
      primaryLabel="Sign in again"
      secondaryHref="/dashboard"
      secondaryLabel="Back to dashboard"
    />
  );
}
