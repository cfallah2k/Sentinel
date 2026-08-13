import { AlertTriangle, CheckCircle2, Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AttrGrid } from '@/components/registry/attr-grid';
import { SeverityBadge } from '@/components/enforcement/badges';
import { incidentById, incidentNav, policyById, systemName } from '@/components/enforcement/helpers';
import { incidents } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const inc = incidentById(id) ?? incidents[0];
  const policy = inc.policyId ? policyById(inc.policyId) : null;

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Incidents"
        title={inc.title}
        id={inc.id}
        description={inc.description}
        badges={[
          <SeverityBadge key="sev" label={inc.severity} />,
          <Badge key="s" label={inc.status} tone={inc.status === 'Resolved' ? 'green' : inc.status === 'Investigating' ? 'sky' : 'amber'} />,
          <Badge key="t" label={inc.type} tone="violet" />
        ]}
      />
      <DetailNav base={`/incidents/${id}`} items={incidentNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Severity" value={inc.severity} icon={AlertTriangle} accent={inc.severity === 'Critical' ? 'red' : inc.severity === 'High' ? 'rose' : inc.severity === 'Medium' ? 'amber' : 'blue'} />
        <StatCard label="Status" value={inc.status} icon={inc.status === 'Resolved' ? CheckCircle2 : Clock} accent={inc.status === 'Resolved' ? 'green' : inc.status === 'Investigating' ? 'sky' : 'amber'} />
        <StatCard label="SLA Window" value={`${inc.slaHours}h`} icon={Clock} accent="violet" />
        <StatCard label="Assignee" value={inc.assignee} icon={User} accent="cyan" />
      </div>
      <Card>
        <CardHeader title="Incident summary" subtitle="Core attributes" />
        <CardBody>
          <AttrGrid
            items={[
              { label: 'Type', value: inc.type },
              { label: 'Status', value: inc.status },
              { label: 'Severity', value: inc.severity },
              { label: 'Opened', value: inc.openedAt },
              { label: 'SLA Hours', value: `${inc.slaHours}h` },
              { label: 'Assignee', value: inc.assignee },
              { label: 'AI System', value: systemName(inc.systemId) },
              { label: 'Related Policy', value: policy ? `${policy.name} (${policy.id})` : '—' }
            ]}
          />
        </CardBody>
      </Card>
    </div>
  );
}