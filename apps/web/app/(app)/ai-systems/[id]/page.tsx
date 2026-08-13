import { Activity, AlertTriangle, Layers, ShieldX } from 'lucide-react';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AttrGrid } from '@/components/registry/attr-grid';
import { ApplicationsTable } from '@/components/registry/registry-tables';
import { FlowsTable } from '@/components/registry/related-tables';
import { ActivityList } from '@/components/registry/activity-list';
import { aiSystems, applications, dataFlows, models, providers } from '@/lib/mock-data';

const fmt = (n: number) => n.toLocaleString();

const navItems = (id: string) => [
  { href: `/ai-systems/${id}`, label: 'Overview' },
  { href: `/ai-systems/${id}/details`, label: 'Details' },
  { href: `/ai-systems/${id}/models`, label: 'Models' },
  { href: `/ai-systems/${id}/providers`, label: 'Providers' },
  { href: `/ai-systems/${id}/data`, label: 'Data' },
  { href: `/ai-systems/${id}/data-flows`, label: 'Data Flows' },
  { href: `/ai-systems/${id}/policies`, label: 'Policies' },
  { href: `/ai-systems/${id}/risk`, label: 'Risk' },
  { href: `/ai-systems/${id}/approvals`, label: 'Approvals' },
  { href: `/ai-systems/${id}/incidents`, label: 'Incidents' },
  { href: `/ai-systems/${id}/activity`, label: 'Activity' },
  { href: `/ai-systems/${id}/audit`, label: 'Audit' },
  { href: `/ai-systems/${id}/passport`, label: 'Passport' },
  { href: `/ai-systems/${id}/settings`, label: 'Settings' }
];

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const system = aiSystems.find((s) => s.id === id) ?? aiSystems[0];
  const provider = providers.find((p) => p.id === system.providerId);
  const model = models.find((m) => m.id === system.modelId);
  const usedBy = applications.filter((a) => a.aiSystemIds.includes(system.id));
  const flows = dataFlows.filter((f) => f.systemId === system.id);

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Registry · AI Systems"
        title={system.name}
        id={system.id}
        description={system.purpose}
        badges={[
          <Badge key="status" label={system.status} tone={toneForStatus(system.status)} />,
          <Badge key="risk" label={`${system.risk} Risk`} tone={toneForStatus(system.risk)} />,
          <Badge key="env" label={system.environment} tone="slate" />,
          <Badge key="type" label={system.type} tone="blue" />
        ]}
        meta={[
          { label: 'Owner', value: system.owner },
          { label: 'Oversight', value: system.oversight },
          { label: 'Approved', value: system.approvedAt },
          { label: 'Last Activity', value: system.lastActivity }
        ]}
      />
      <DetailNav base={`/ai-systems/${id}`} items={navItems(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Requests / 24h" value={fmt(system.requests24h)} icon={Activity} accent="sky" />
        <StatCard label="Blocked / 24h" value={fmt(system.blocked24h)} icon={ShieldX} accent="rose" />
        <StatCard label="Redacted / 24h" value={fmt(system.redacted24h)} icon={AlertTriangle} accent="amber" />
        <StatCard label="Data Categories" value={system.dataCategories.length} icon={Layers} accent="violet" />
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader title="System Profile" subtitle="Core registry attributes" />
          <CardBody>
            <AttrGrid
              items={[
                { label: 'Type', value: system.type },
                { label: 'Status', value: system.status },
                { label: 'Risk', value: system.risk },
                { label: 'Owner', value: system.owner },
                { label: 'Environment', value: system.environment },
                { label: 'Oversight', value: system.oversight },
                { label: 'Provider', value: provider?.name ?? system.providerId },
                { label: 'Base Model', value: model?.name ?? system.modelId },
                { label: 'Data Categories', value: system.dataCategories.join(', ') },
                { label: 'Approved At', value: system.approvedAt, full: true }
              ]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Recent Activity" subtitle="Governance events for this system" />
          <CardBody>
            <ActivityList entityId={system.id} entityName={system.name} count={6} />
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader title="Applications Using This System" subtitle={`${usedBy.length} applications route requests to ${system.name}`} />
        <CardBody>
          <ApplicationsTable rows={usedBy} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Data Flows" subtitle={`${flows.length} flows traced through this system`} />
        <CardBody>
          <FlowsTable rows={flows} />
        </CardBody>
      </Card>
    </div>
  );
}