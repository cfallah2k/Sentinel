import { SecondaryButton } from '@/components/ui/page-header';
import { DashboardOverview } from '@/components/dashboard/dashboard-overview';

export default function Page() {
  return (
    <DashboardOverview
      eyebrow="Control Plane"
      title="Control Plane"
      description="Real-time visibility into gateway traffic, policy enforcement, risk posture, and governance activity across your AI estate."
      actions={<SecondaryButton href="/dashboard/activity">View activity log</SecondaryButton>}
    />
  );
}