import { registryBadges } from '@/components/government/registry-content';
import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { registryNav, findRegistry } from '@/components/government/profile-shell';
import { riskTone } from '@/components/government/registry-table';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target } from 'lucide-react';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = findRegistry(id);
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={entry.name} subtitle="Declared purpose and use conditions." badges={registryBadges(entry)} nav={registryNav} base={`/government/ai-registry/${entry.id}`} active="purpose">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader title="Declared Purpose" subtitle="As filed in the registration" />
            <CardBody>
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-sky-500/25 bg-sky-500/10 text-sky-300">
                  <Target className="h-4 w-4" size={16} />
                </span>
                <div>
                  <p className="text-sm leading-6 text-slate-300">{entry.purpose}</p>
                  <p className="mt-2 text-[0.65rem] leading-4 text-slate-500">
                    Registered use category: {entry.purpose}. Operator must notify the registry of any material change in use.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Use Conditions" subtitle="Restrictions attached to this registration" />
            <CardBody className="space-y-2">
              <Badge label={entry.status === 'Registered' ? 'Operations permitted' : 'Operations restricted'} tone={entry.status === 'Registered' ? 'green' : 'rose'} />
              <Badge label={`${entry.risk} risk monitoring`} tone={riskTone(entry.risk)} />
              <Badge label="Annual re-registration" tone="slate" />
            </CardBody>
          </Card>
        </div>
      </ProfileShell>
    </GovShell>
  );
}