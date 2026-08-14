'use client';

import { useState } from 'react';
import { Users } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { memberGroups, type MemberGroup } from '@/components/platform/team-data';
import QuickCreateModal from '@/components/ui/quick-create-modal';

const typeTone: Record<string, 'blue' | 'green' | 'violet' | 'amber'> = {
  Security: 'blue',
  Data: 'green',
  Engineering: 'violet',
  Executive: 'amber'
};

export default function Page() {
  const [groups, setGroups] = useState<MemberGroup[]>(memberGroups);
  const [createOpen, setCreateOpen] = useState(false);

  const totalMembers = groups.reduce((a, g) => a + g.members, 0);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Groups"
        description="Group members into teams for easier permission assignment and review."
        actions={
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 sm:text-sm"
          >
            Create Group
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Groups" value={groups.length} icon={Users} accent="sky" sub="Organization teams" />
        <StatCard label="Group Members" value={totalMembers} icon={Users} accent="cyan" sub="Across all groups" />
        <StatCard label="SCIM Managed" value={groups.filter((g) => g.managed).length} icon={Users} accent="green" sub="Provisioned via SSO" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {groups.map((g) => (
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

      <QuickCreateModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create group"
        description="New groups start empty — add members from the group detail later."
        fields={[
          { name: 'name', label: 'Group name', placeholder: 'e.g. Platform Security' },
          { name: 'type', label: 'Group type', type: 'select', options: ['Security', 'Data', 'Engineering', 'Executive'], defaultValue: 'Engineering' }
        ]}
        submitLabel="Create group"
        onCreate={(values) => {
          setGroups((prev) => [
            ...prev,
            {
              id: `grp-${Date.now()}`,
              name: values.name,
              description: 'Newly created group',
              type: values.type as MemberGroup['type'],
              members: 0,
              role: 'VIEWER',
              managed: false,
              createdAt: new Date().toISOString().slice(0, 10)
            }
          ]);
        }}
      />
    </div>
  );
}