import { PageHeader } from '@/components/ui/page-header';
import { NotificationList } from '@/components/dashboard/notification-list';
import { notifications } from '@/lib/mock-data';

export default function Page() {
  return (
    <div>
      <PageHeader
        eyebrow="Notifications"
        title="Notification Center"
        description="Incident escalations, approval requests, security events, and system alerts across the control plane."
      />
      <div className="mt-8">
        <NotificationList notifications={notifications} filter="all" />
      </div>
    </div>
  );
}