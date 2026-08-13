import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AttrGrid } from '@/components/registry/attr-grid';
import { appNav } from '@/components/registry/nav';
import { aiSystems, applications } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const app = applications.find((a) => a.id === id) ?? applications[0];
  const systems = aiSystems.filter((s) => app.aiSystemIds.includes(s.id));

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Applications"
        title={app.name}
        id={app.id}
        description="Complete registry record for this application."
        badges={[
          <Badge key="status" label={app.status} tone={toneForStatus(app.status)} />,
          <Badge key="risk" label={`${app.risk} Risk`} tone={toneForStatus(app.risk)} />
        ]}
      />
      <DetailNav base={`/applications/${id}`} items={appNav(id)} />
      <Card>
        <CardHeader title="Registry Attributes" subtitle="Full record as stored in the inventory" />
        <CardBody>
          <AttrGrid
            items={[
              { label: 'Application ID', value: app.id },
              { label: 'Name', value: app.name },
              { label: 'Type', value: app.type },
              { label: 'Status', value: app.status },
              { label: 'Risk', value: app.risk },
              { label: 'Owner', value: app.owner },
              { label: 'Environment', value: app.environment },
              { label: 'API Keys', value: app.apiKeys },
              { label: 'AI Systems', value: systems.map((s) => s.name).join(', ') || 'None' },
              { label: 'Last Activity', value: app.lastActivity }
            ]}
          />
        </CardBody>
      </Card>
    </div>
  );
}