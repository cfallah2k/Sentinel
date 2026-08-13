import { WifiOff } from 'lucide-react';
import { StatusPage } from '@/components/status-page';

export default function Page() {
  return (
    <StatusPage
      code="Offline"
      title="You are offline"
      description="We could not reach the Sentinel servers from this device. Check your network connection and try again."
      icon={WifiOff}
      badge="Network offline"
      tone="slate"
      note="Reconnecting automatically — no data loss"
      primaryHref="/login"
      primaryLabel="Return to sign in"
      secondaryHref="/dashboard"
      secondaryLabel="Back to dashboard"
    />
  );
}
