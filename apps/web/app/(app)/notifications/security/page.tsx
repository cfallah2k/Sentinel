import { PageHeader } from '@/components/ui/page-header';
import { NotificationList } from '@/components/dashboard/notification-list';
import { notifications } from '@/lib/mock-data';

export default function Page() {
  return (
    <div>
      <PageHeader
        eyebrow="Notifications"
        title="Security"
        description="Authentication events, MFA challenges, and access-related security notifications."
      />
      <div className="mt-8">
        <NotificationList notifications={notifications} filter="security" />
      </div>
    </div>
  );
}