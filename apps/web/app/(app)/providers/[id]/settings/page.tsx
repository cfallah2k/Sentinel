import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { SettingsForm } from '@/components/registry/settings-form';
import { providerNav } from '@/components/registry/nav';
import { providers } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const provider = providers.find((p) => p.id === id) ?? providers[0];

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Providers"
        title={provider.name}
        id={provider.id}
        description="Operational settings for this provider."
        badges={[
          <Badge key="status" label={provider.status} tone={toneForStatus(provider.status)} />,
          <Badge key="risk" label={`${provider.risk} Risk`} tone={toneForStatus(provider.risk)} />
        ]}
      />
      <DetailNav base={`/providers/${id}`} items={providerNav(id)} />
      <SettingsForm
        backHref={`/providers/${id}`}
        sections={[
          {
            title: 'Routing',
            description: 'How requests are routed to this provider.',
            fields: [
              { key: 'enabled', label: 'Routing enabled', type: 'toggle', defaultValue: provider.status === 'Approved' },
              { key: 'fallback', label: 'Use as failover target', type: 'toggle', defaultValue: false },
              { key: 'priority', label: 'Routing priority', type: 'select', options: ['Primary', 'Secondary', 'Tertiary'], defaultValue: 'Primary' }
            ]
          },
          {
            title: 'Health',
            description: 'Health monitoring thresholds.',
            fields: [
              { key: 'healthChecks', label: 'Active health checks', type: 'toggle', defaultValue: true },
              { key: 'latency', label: 'Latency alert threshold (ms)', type: 'text', defaultValue: String(provider.latencyMs * 2) },
              { key: 'uptime', label: 'Uptime SLA target (%)', type: 'text', defaultValue: '99.9' }
            ]
          },
          {
            title: 'Governance',
            description: 'Approval and oversight controls.',
            fields: [
              { key: 'autoApprove', label: 'Auto-approve model additions', type: 'toggle', defaultValue: provider.risk === 'Low' },
              { key: 'review', label: 'Annual security review', type: 'toggle', defaultValue: true }
            ]
          }
        ]}
      />
    </div>
  );
}