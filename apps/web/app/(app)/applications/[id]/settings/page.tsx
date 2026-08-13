import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { SettingsForm } from '@/components/registry/settings-form';
import { appNav } from '@/components/registry/nav';
import { applications } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const app = applications.find((a) => a.id === id) ?? applications[0];

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Applications"
        title={app.name}
        id={app.id}
        description="Operational settings for this application."
        badges={[
          <Badge key="status" label={app.status} tone={toneForStatus(app.status)} />,
          <Badge key="risk" label={`${app.risk} Risk`} tone={toneForStatus(app.risk)} />
        ]}
      />
      <DetailNav base={`/applications/${id}`} items={appNav(id)} />
      <SettingsForm
        backHref={`/applications/${id}`}
        sections={[
          {
            title: 'Gateway Access',
            description: 'Controls how this application calls AI systems.',
            fields: [
              { key: 'gateway', label: 'Gateway access enabled', type: 'toggle', defaultValue: app.status === 'Active' },
              { key: 'rateLimit', label: 'Rate limit (RPM)', type: 'text', defaultValue: '1200' },
              { key: 'environment', label: 'Target environment', type: 'select', options: ['Production', 'Staging', 'Development'], defaultValue: app.environment }
            ]
          },
          {
            title: 'Key Management',
            description: 'Key lifecycle behavior for this application.',
            fields: [
              { key: 'autoRotate', label: 'Auto-rotate keys every 90 days', type: 'toggle', defaultValue: app.risk !== 'Low' },
              { key: 'scopes', label: 'Default key scopes', type: 'text', defaultValue: 'gateway.read' }
            ]
          },
          {
            title: 'Notifications',
            description: 'Alert routing for this application.',
            fields: [
              { key: 'alerts', label: 'Incident alerts to owner', type: 'toggle', defaultValue: true },
              { key: 'usageDigest', label: 'Monthly usage digest', type: 'toggle', defaultValue: true }
            ]
          }
        ]}
      />
    </div>
  );
}