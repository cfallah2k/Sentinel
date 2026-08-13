import { PageHeader } from '@/components/ui/page-header';
import { NotificationList } from '@/components/dashboard/notification-list';
import { notifications } from '@/lib/mock-data';

export default function Page() {
  return (
    <div>
      <PageHeader
        eyebrow="Notifications"
        title="Unread"
        description="Notifications that still need your attention. Mark them as read from the list."
      />
      <div className="mt-8">
        <NotificationList notifications={notifications} filter="unread" />
      </div>
    </div>
  );
}