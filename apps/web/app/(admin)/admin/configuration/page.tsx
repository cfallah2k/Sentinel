import { PageHeader } from '@/components/ui/page-header';
import { AdminShell } from '@/components/admin/page-shell';
import { ConfigForm } from '@/components/admin/config-form';
import { Card, CardBody } from '@/components/ui/card';

export default function Page() {
  return (
    <AdminShell>
      <PageHeader
        eyebrow="Admin"
        title="Platform Configuration"
        description="Runtime settings for the control plane. Changes apply within 30 seconds."
      />
      <Card>
        <CardBody>
          <ConfigForm />
        </CardBody>
      </Card>
    </AdminShell>
  );
}