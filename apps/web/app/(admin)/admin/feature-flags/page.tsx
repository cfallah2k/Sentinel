import { PageHeader } from '@/components/ui/page-header';
import { AdminShell } from '@/components/admin/page-shell';
import { FeatureFlagGrid } from '@/components/admin/feature-flag-card';
import { Card, CardBody } from '@/components/ui/card';
import { featureFlags } from '@/lib/mock-data';

export default function Page() {
  const enabled = featureFlags.filter((f) => f.enabled).length;
  return (
    <AdminShell>
      <PageHeader
        eyebrow="Admin"
        title="Feature Flags"
        description={`Release management for the control plane — ${enabled}/${featureFlags.length} flags enabled.`}
      />
      <Card>
        <CardBody>
          <FeatureFlagGrid />
        </CardBody>
      </Card>
    </AdminShell>
  );
}