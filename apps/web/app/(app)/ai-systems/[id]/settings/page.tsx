import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { SettingsForm } from '@/components/registry/settings-form';
import { systemNav } from '@/components/registry/nav';
import { aiSystems } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const system = aiSystems.find((s) => s.id === id) ?? aiSystems[0];

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · AI Systems"
        title={system.name}
        id={system.id}
        description="Operational settings for this system."
        badges={[
          <Badge key="status" label={system.status} tone={toneForStatus(system.status)} />,
          <Badge key="risk" label={`${system.risk} Risk`} tone={toneForStatus(system.risk)} />
        ]}
      />
      <DetailNav base={`/ai-systems/${id}`} items={systemNav(id)} />
      <SettingsForm
        backHref={`/ai-systems/${id}`}
        sections={[
          {
            title: 'Gateway Routing',
            description: 'Controls how requests from this system are handled.',
            fields: [
              { key: 'gateway', label: 'Route through gateway', description: 'All requests must pass policy evaluation.', type: 'toggle', defaultValue: true },
              { key: 'logging', label: 'Full request logging', description: 'Store payload hashes and tokens per request.', type: 'toggle', defaultValue: system.risk !== 'Low' },
              { key: 'approval', label: 'Human approval required', description: 'Every request requires sign-off at the gateway.', type: 'toggle', defaultValue: system.risk === 'High' || system.risk === 'Critical' },
              { key: 'environment', label: 'Target environment', type: 'select', options: ['Production', 'Staging', 'Development'], defaultValue: system.environment }
            ]
          },
          {
            title: 'Data Controls',
            description: 'How data categories are treated for this system.',
            fields: [
              { key: 'redact', label: 'Auto-redact sensitive fields', type: 'toggle', defaultValue: system.redacted24h > 0 },
              { key: 'retention', label: 'Prompt retention (days)', type: 'text', defaultValue: '30' }
            ]
          },
          {
            title: 'Notifications',
            description: 'Alert routing for this system.',
            fields: [
              { key: 'alerts', label: 'Incident alerts to owner', type: 'toggle', defaultValue: true },
              { key: 'digest', label: 'Weekly activity digest', type: 'toggle', defaultValue: false }
            ]
          }
        ]}
      />
    </div>
  );
}