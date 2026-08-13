import { Compass } from 'lucide-react';
import { StatusPage } from '@/components/status-page';

export default function Page() {
  return (
    <StatusPage
      code="404"
      title="Page not found"
      description="The page you are looking for does not exist or has been moved. Check the address and try again."
      icon={Compass}
      badge="Not found"
      tone="slate"
      primaryHref="/"
      primaryLabel="Back to home"
      secondaryHref="/dashboard"
      secondaryLabel="Back to dashboard"
    />
  );
}
