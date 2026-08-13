import { PageHeader } from '@/components/ui/page-header';
import { NotificationList } from '@/components/dashboard/notification-list';
import { notifications } from '@/lib/mock-data';

export default function Page() {
  return (
    <div>
      <PageHeader
        eyebrow="Notifications"
        title="Incidents"
        description="Incident escalations, resolution updates, and policy violation alerts."
      />
      <div className="mt-8">
        <NotificationList notifications={notifications} filter="incidents" />
      </div>
    </div>
  );
}