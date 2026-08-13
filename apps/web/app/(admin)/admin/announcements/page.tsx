import { PageHeader } from '@/components/ui/page-header';
import { AdminShell } from '@/components/admin/page-shell';
import { AnnouncementManager } from '@/components/admin/announcement-manager';
import { Card, CardBody } from '@/components/ui/card';

export default function Page() {
  return (
    <AdminShell>
      <PageHeader
        eyebrow="Admin"
        title="Announcements"
        description="Broadcast platform-wide notices to all tenants."
      />
      <Card>
        <CardBody>
          <AnnouncementManager />
        </CardBody>
      </Card>
    </AdminShell>
  );
}