import { Activity, AlertTriangle, AppWindow, KeyRound } from 'lucide-react';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AttrGrid } from '@/components/registry/attr-grid';
import { SystemsTable } from '@/components/registry/registry-tables';
import { FlowsTable } from '@/components/registry/related-tables';
import { ActivityList } from '@/components/registry/activity-list';
import { appNav } from '@/components/registry/nav';
import { aiSystems, applications, dataFlows } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const app = applications.find((a) => a.id === id) ?? applications[0];
  const systems = aiSystems.filter((s) => app.aiSystemIds.includes(s.id));
  const flows = dataFlows.filter((f) => f.applicationId === app.id);

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · Applications"
        title={app.name}
        id={app.id}
        description={`${app.type} running in ${app.environment}.`}
        badges={[
          <Badge key="status" label={app.status} tone={toneForStatus(app.status)} />,
          <Badge key="risk" label={`${app.risk} Risk`} tone={toneForStatus(app.risk)} />
        ]}
        meta={[
          { label: 'Owner', value: app.owner },
          { label: 'Last Activity', value: app.lastActivity },
          { label: 'API Keys', value: String(app.apiKeys) }
        ]}
      />
      <DetailNav base={`/applications/${id}`} items={appNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="AI Systems" value={systems.length} icon={AppWindow} accent="sky" />
        <StatCard label="API Keys" value={app.apiKeys} icon={KeyRound} accent="violet" />
        <StatCard label="Data Flows" value={flows.length} icon={Activity} accent="cyan" />
        <StatCard label="High Risk Systems" value={systems.filter((s) => s.risk === 'High' || s.risk === 'Critical').length} icon={AlertTriangle} accent="rose" />
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="Application Profile" subtitle="Core registry attributes" />
          <CardBody>
            <AttrGrid
              items={[
                { label: 'Type', value: app.type },
                { label: 'Status', value: app.status },
                { label: 'Risk', value: app.risk },
                { label: 'Owner', value: app.owner },
                { label: 'Environment', value: app.environment },
                { label: 'API Keys', value: app.apiKeys },
                { label: 'Last Activity', value: app.lastActivity, full: true }
              ]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Recent Activity" subtitle="Governance events for this application" />
          <CardBody>
            <ActivityList entityId={app.id} entityName={app.name} count={6} />
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="AI Systems Used" subtitle={`${systems.length} systems attached to ${app.name}`} />
        <CardBody>
          <SystemsTable rows={systems} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Data Flows" subtitle={`${flows.length} flows attributed to this application`} />
        <CardBody>
          <FlowsTable rows={flows} />
        </CardBody>
      </Card>
    </div>
  );
}