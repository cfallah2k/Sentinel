import { Clock, FileCheck2, ShieldAlert, Timer } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { AttrGrid } from '@/components/registry/attr-grid';
import { approvalById, approvalNav, policyById, systemName } from '@/components/enforcement/helpers';
import { approvals } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const apr = approvalById(id) ?? approvals[0];
  const policy = apr.policyId ? policyById(apr.policyId) : null;

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Approvals"
        title={`${apr.type} · ${systemName(apr.systemId)}`}
        id={apr.id}
        description={apr.note}
        badges={[
          <Badge key="s" label={apr.status} tone={apr.status === 'Approved' ? 'green' : apr.status === 'Denied' ? 'rose' : apr.status === 'Expired' ? 'slate' : 'amber'} />,
          <Badge key="r" label={`${apr.risk} risk`} tone={apr.risk === 'Critical' ? 'red' : apr.risk === 'High' ? 'rose' : 'amber'} />
        ]}
      />
      <DetailNav base={`/approvals/${id}`} items={approvalNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Status" value={apr.status} icon={FileCheck2} accent={apr.status === 'Approved' ? 'green' : apr.status === 'Denied' ? 'rose' : apr.status === 'Expired' ? 'slate' : 'amber'} />
        <StatCard label="Risk" value={apr.risk} icon={ShieldAlert} accent={apr.risk === 'Critical' ? 'red' : apr.risk === 'High' ? 'rose' : 'amber'} />
        <StatCard label="Requested" value={apr.requestedAt.slice(0, 10)} icon={Clock} accent="sky" />
        <StatCard label="Expires" value={apr.expiresAt.slice(0, 10)} icon={Timer} accent="violet" />
      </div>
      <Card>
        <CardHeader title="Overview" subtitle="Approval attributes" />
        <CardBody>
          <AttrGrid
            items={[
              { label: 'Type', value: apr.type },
              { label: 'Requester', value: apr.requester },
              { label: 'Risk', value: apr.risk },
              { label: 'AI System', value: systemName(apr.systemId) },
              { label: 'Policy', value: policy ? `${policy.name} (${policy.id})` : '—' },
              { label: 'Requested', value: apr.requestedAt },
              { label: 'Expires', value: apr.expiresAt },
              { label: 'Justification', value: apr.note }
            ]}
          />
        </CardBody>
      </Card>
    </div>
  );
}