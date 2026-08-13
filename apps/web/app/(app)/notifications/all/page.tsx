import { PageHeader } from '@/components/ui/page-header';
import { NotificationList } from '@/components/dashboard/notification-list';
import { notifications } from '@/lib/mock-data';

export default function Page() {
  return (
    <div>
      <PageHeader
        eyebrow="Notifications"
        title="All Notifications"
        description="Every notification from incidents, approvals, security, and system health in one place."
      />
      <div className="mt-8">
        <NotificationList notifications={notifications} filter="all" />
      </div>
    </div>
  );
}