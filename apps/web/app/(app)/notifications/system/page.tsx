import { PageHeader } from '@/components/ui/page-header';
import { NotificationList } from '@/components/dashboard/notification-list';
import { notifications } from '@/lib/mock-data';

export default function Page() {
  return (
    <div>
      <PageHeader
        eyebrow="Notifications"
        title="System"
        description="Platform health, scheduled reports, usage thresholds, and operational alerts."
      />
      <div className="mt-8">
        <NotificationList notifications={notifications} filter="system" />
      </div>
    </div>
  );
}