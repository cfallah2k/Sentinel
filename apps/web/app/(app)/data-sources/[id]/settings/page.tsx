import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { SettingsForm } from '@/components/registry/settings-form';
import { sourceNav } from '@/components/registry/nav';
import { dataSources } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const source = dataSources.find((s) => s.id === id) ?? dataSources[0];

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Data Sources"
        title={source.name}
        id={source.id}
        description="Operational settings for this source."
        badges={[
          <Badge key="status" label={source.status} tone={toneForStatus(source.status)} />,
          <Badge key="risk" label={`${source.risk} Risk`} tone={toneForStatus(source.risk)} />
        ]}
      />
      <DetailNav base={`/data-sources/${id}`} items={sourceNav(id)} />
      <SettingsForm
        backHref={`/data-sources/${id}`}
        sections={[
          {
            title: 'Connector',
            description: 'Sync and connection behavior.',
            fields: [
              { key: 'enabled', label: 'Connector enabled', type: 'toggle', defaultValue: source.status === 'Connected' },
              { key: 'frequency', label: 'Sync frequency', type: 'select', options: ['Real-time', 'Hourly', 'Daily', 'On-demand'], defaultValue: 'Daily' },
              { key: 'location', label: 'Endpoint override', type: 'text', defaultValue: `${source.connector}.internal.nexora.io` }
            ]
          },
          {
            title: 'Classification',
            description: 'How data from this source is classified.',
            fields: [
              { key: 'autoClassify', label: 'Auto-classify new fields', type: 'toggle', defaultValue: true },
              { key: 'scan', label: 'Sensitive data scan on sync', type: 'toggle', defaultValue: source.risk !== 'Low' },
              { key: 'retention', label: 'Scan evidence retention (days)', type: 'text', defaultValue: '90' }
            ]
          },
          {
            title: 'Governance',
            description: 'Access and alerting controls.',
            fields: [
              { key: 'alerts', label: 'Alert on sync failure', type: 'toggle', defaultValue: true },
              { key: 'audit', label: 'Log all extraction events', type: 'toggle', defaultValue: true }
            ]
          }
        ]}
      />
    </div>
  );
}