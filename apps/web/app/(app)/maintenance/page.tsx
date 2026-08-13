import { Hammer } from 'lucide-react';
import { StatusPage } from '@/components/status-page';

export default function Page() {
  return (
    <StatusPage
      code="503"
      title="Under maintenance"
      description="Sentinel is undergoing scheduled maintenance to improve reliability. The console will be back shortly."
      icon={Hammer}
      badge="Maintenance"
      tone="amber"
      note="Maintenance window: 2026-08-14 02:00 – 04:00 UTC"
      primaryHref="/login"
      primaryLabel="Return to sign in"
      secondaryHref="/dashboard"
      secondaryLabel="Back to dashboard"
    />
  );
}
