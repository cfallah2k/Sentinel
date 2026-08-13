import { TriangleAlert } from 'lucide-react';
import { StatusPage } from '@/components/status-page';

export default function Page() {
  return (
    <StatusPage
      code="500"
      title="Something went wrong"
      description="An unexpected error occurred while processing your request. Our engineers have been notified and are looking into it."
      icon={TriangleAlert}
      badge="Server error"
      tone="red"
      primaryHref="/dashboard"
      primaryLabel="Back to dashboard"
      secondaryHref="/support"
      secondaryLabel="Contact support"
    />
  );
}
