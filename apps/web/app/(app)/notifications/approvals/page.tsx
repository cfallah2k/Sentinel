import { PageHeader } from '@/components/ui/page-header';
import { NotificationList } from '@/components/dashboard/notification-list';
import { notifications } from '@/lib/mock-data';

export default function Page() {
  return (
    <div>
      <PageHeader
        eyebrow="Notifications"
        title="Approvals"
        description="Requests awaiting your decision and updates on previously submitted approvals."
      />
      <div className="mt-8">
        <NotificationList notifications={notifications} filter="approvals" />
      </div>
    </div>
  );
}