import { Activity, FileSignature, PenSquare, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { Timeline } from '@/components/enforcement/timeline';
import { policyActivity, policyById, policyNav } from '@/components/enforcement/helpers';
import { policies } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const policy = policyById(id) ?? policies[0];
  const activity = policyActivity(policy);

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Policies"
        title={policy.name}
        id={policy.id}
        description="Every change to this policy, in order."
        badges={[
          <Badge key="s" label={policy.status} tone={policy.status === 'Active' ? 'green' : policy.status === 'Draft' ? 'amber' : 'slate'} />,
          <Badge key="v" label={policy.version} tone="blue" />
        ]}
      />
      <DetailNav base={`/policies/${id}`} items={policyNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Events" value={activity.length} icon={Activity} accent="sky" />
        <StatCard label="Updates" value={activity.filter((a) => a.title.includes('update')).length} icon={PenSquare} accent="violet" />
        <StatCard label="Enforcements" value={activity.filter((a) => a.title.includes('enforce')).length} icon={FileSignature} accent="green" />
        <StatCard label="Violations" value={activity.filter((a) => a.title.includes('violation')).length} icon={Trash2} accent="rose" />
      </div>
      <Card>
        <CardHeader title="Activity timeline" subtitle="Who changed what, and when" />
        <CardBody>
          <Timeline items={activity.map((a) => ({
            time: a.time,
            title: a.title,
            description: a.description,
            actor: a.actor,
            tone: a.tone
          }))} />
        </CardBody>
      </Card>
    </div>
  );
}