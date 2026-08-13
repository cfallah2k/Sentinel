import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PassportHeader, PassportSubnav } from '@/components/data-intel/passport-shared';
import { AttributeGrid } from '@/components/data-intel/flow-detail';
import { resolvePassport } from '@/components/data-intel/derived';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = resolvePassport(id);
  return (
    <div className="space-y-6">
      <PassportSubnav id={p.id} active="Identity" />
      <PassportHeader p={p} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Identity" subtitle="Registered system attributes" />
          <CardBody>
            <AttributeGrid
              items={[
                { label: 'System ID', value: p.systemId },
                { label: 'Passport ID', value: p.id },
                { label: 'Name', value: p.name },
                { label: 'Type', value: p.type },
                { label: 'Version', value: p.version },
                { label: 'Environment', value: p.environment },
                { label: 'Oversight', value: p.oversight },
                { label: 'Owner', value: p.owner }
              ]}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Registration" subtitle="Status and issuance" />
          <CardBody className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge label={p.status} tone={p.status === 'Certified' ? 'green' : p.status === 'Pending Review' ? 'amber' : p.status === 'Draft' ? 'slate' : 'rose'} />
              <Badge label={p.risk} tone={p.risk === 'Critical' ? 'red' : p.risk === 'High' ? 'rose' : p.risk === 'Medium' ? 'amber' : 'blue'} />
              <Badge label={p.oversight} tone="blue" />
            </div>
            <AttributeGrid
              items={[
                { label: 'Issued', value: p.approvedAt },
                { label: 'Last activity', value: p.lastActivity },
                { label: 'Renewal due', value: '2026-09-30' },
                { label: 'Requests 24h', value: p.requests24h.toLocaleString('en-US') }
              ]}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}