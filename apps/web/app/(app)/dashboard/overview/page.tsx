import { DashboardOverview } from '@/components/dashboard/dashboard-overview';

export default function Page() {
  return (
    <DashboardOverview
      eyebrow="Overview"
      title="Platform Overview"
      description="A high-level snapshot of the platform — gateway throughput, policy health, incidents, and data flow activity in one place."
    />
  );
}