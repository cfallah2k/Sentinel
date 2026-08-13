import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { Badge } from '@/components/ui/badge';
import { organizationNav, findOrg } from '@/components/government/profile-shell';
import { orgProfileContent } from '@/components/government/org-content';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const org = findOrg(id);
  return (
    <GovShell>
      <ProfileShell
        eyebrow="Government"
        title={org.name}
        subtitle={`Operator profile — ${org.users} users · ${org.systems} systems · ${org.region}`}
        badges={
          <>
            <Badge label={org.plan} tone={org.plan === 'Enterprise' ? 'violet' : org.plan === 'Growth' ? 'blue' : 'slate'} />
            <Badge label={org.status} tone={org.status === 'Active' ? 'green' : org.status === 'Trial' ? 'amber' : 'rose'} />
          </>
        }
        nav={organizationNav}
        base={`/government/organizations/${org.id}`}
        active="overview"
      >
        {orgProfileContent(org)}
      </ProfileShell>
    </GovShell>
  );
}