import { registryBadges } from '@/components/government/registry-content';
import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { registryNav, findRegistry, findAgency } from '@/components/government/profile-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = findRegistry(id);
  const agency = findAgency(entry.agencyId);
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={entry.name} subtitle="Operator responsible for this registered system." badges={registryBadges(entry)} nav={registryNav} base={`/government/ai-registry/${entry.id}`} active="operator">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader title="Operator" subtitle="Entity accountable for this system" />
            <CardBody>
              <h3 className="text-lg font-semibold text-white">{entry.operator}</h3>
              <p className="mt-1 text-xs text-slate-400">Registered operator of record for {entry.name}.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge label="Licensed" tone="green" />
                <Badge label={entry.risk === 'Critical' || entry.risk === 'High' ? 'Enhanced Oversight' : 'Standard Oversight'} tone={entry.risk === 'Critical' || entry.risk === 'High' ? 'rose' : 'blue'} />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Oversight Agency" subtitle="Agency with remit over this system" />
            <CardBody>
              <h3 className="text-lg font-semibold text-white">{agency.name}</h3>
              <p className="mt-1 text-xs text-slate-400">{agency.type} jurisdiction · {agency.systems} systems overseen</p>
              <p className="mt-3 text-[0.65rem] text-slate-500">Primary contact: {agency.contact}</p>
            </CardBody>
          </Card>
        </div>
      </ProfileShell>
    </GovShell>
  );
}