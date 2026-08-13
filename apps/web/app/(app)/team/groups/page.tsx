import { Users } from 'lucide-react';
import { PageHeader, PrimaryButton } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { memberGroups } from '@/components/platform/team-data';

const typeTone: Record<string, 'blue' | 'green' | 'violet' | 'amber'> = {
  Security: 'blue',
  Data: 'green',
  Engineering: 'violet',
  Executive: 'amber'
};

export default function Page() {
  const totalMembers = memberGroups.reduce((a, g) => a + g.members, 0);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Groups"
        description="Group members into teams for easier permission assignment and review."
        actions={<PrimaryButton href="/team/groups">Create Group</PrimaryButton>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Groups" value={memberGroups.length} icon={Users} accent="sky" sub="Organization teams" />
        <StatCard label="Group Members" value={totalMembers} icon={Users} accent="cyan" sub="Across all groups" />
        <StatCard label="SCIM Managed" value={memberGroups.filter((g) => g.managed).length} icon={Users} accent="green" sub="Provisioned via SSO" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {memberGroups.map((g) => (
          <Card key={g.id}>
            <CardHeader
              title={g.name}
              subtitle={g.description}
              action={<Badge label={g.type} tone={typeTone[g.type] ?? 'slate'} />}
            />
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-semibold text-white">{g.members}</p>
                  <p className="text-[0.65rem] text-slate-500">members</p>
                </div>
                <div className="text-right">
                  <Badge label={g.role} tone="blue" />
                  <p className="mt-1.5 text-[0.65rem] text-slate-500">
                    {g.managed ? 'SCIM managed' : 'Manually assigned'} · since {g.createdAt}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge label={g.managed ? 'Provisioned' : 'Local'} tone={g.managed ? 'green' : 'amber'} />
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}