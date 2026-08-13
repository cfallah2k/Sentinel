import { orgBadges } from '@/components/government/org-content';
import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { organizationNav, findOrg } from '@/components/government/profile-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { governmentAgencies } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const org = findOrg(id);
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={org.name} subtitle="Agencies with oversight remit over this operator." badges={orgBadges(org)} nav={organizationNav} base={`/government/organizations/${org.id}`} active="agencies">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {governmentAgencies.map((a) => (
            <Card key={a.id}>
              <CardBody>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-white">{a.name}</h3>
                    <p className="mt-1 text-xs text-slate-400">{a.type} jurisdiction · {a.systems} systems overseen</p>
                  </div>
                  <Badge label={a.status} tone={a.status === 'Active' ? 'green' : 'amber'} />
                </div>
                <p className="mt-3 text-[0.65rem] text-slate-500">Primary contact: {a.contact}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </ProfileShell>
    </GovShell>
  );
}