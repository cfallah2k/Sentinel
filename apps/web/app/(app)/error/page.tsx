import { TriangleAlert } from 'lucide-react';
import { StatusPage } from '@/components/status-page';

export default function Page() {
  return (
    <StatusPage
      code="Error"
      title="Application error"
      description="The application hit an unexpected failure while rendering this page. Try reloading or return to the dashboard."
      icon={TriangleAlert}
      badge="Unexpected error"
      tone="red"
      primaryHref="/dashboard"
      primaryLabel="Back to dashboard"
      secondaryHref="/support"
      secondaryLabel="Contact support"
    />
  );
}
