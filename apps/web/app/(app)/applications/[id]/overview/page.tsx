import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AttrGrid } from '@/components/registry/attr-grid';
import { ActivityList } from '@/components/registry/activity-list';
import { appNav } from '@/components/registry/nav';
import { aiSystems, applications } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const app = applications.find((a) => a.id === id) ?? applications[0];
  const systems = aiSystems.filter((s) => app.aiSystemIds.includes(s.id));
  const highRisk = systems.filter((s) => s.risk === 'High' || s.risk === 'Critical').length;

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Applications"
        title={app.name}
        id={app.id}
        description={`${app.type} in ${app.environment}, owned by ${app.owner}.`}
        badges={[
          <Badge key="status" label={app.status} tone={toneForStatus(app.status)} />,
          <Badge key="risk" label={`${app.risk} Risk`} tone={toneForStatus(app.risk)} />
        ]}
        meta={[
          { label: 'Owner', value: app.owner },
          { label: 'Last Activity', value: app.lastActivity }
        ]}
      />
      <DetailNav base={`/applications/${id}`} items={appNav(id)} />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Profile Summary" subtitle="Key attributes" />
          <CardBody>
            <AttrGrid
              items={[
                { label: 'Type', value: app.type },
                { label: 'Environment', value: app.environment },
                { label: 'Status', value: app.status },
                { label: 'Owner', value: app.owner },
                { label: 'API Keys Issued', value: app.apiKeys },
                { label: 'AI Systems Attached', value: systems.length },
                { label: 'High Risk Systems', value: highRisk }
              ]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Recent Activity" subtitle="Last governance events" />
          <CardBody>
            <ActivityList entityId={app.id} entityName={app.name} count={6} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}