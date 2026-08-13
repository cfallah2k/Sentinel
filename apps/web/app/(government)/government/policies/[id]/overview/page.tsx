import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Metric } from '@/components/ui/progress';
import { PolicyTable } from '@/components/government/sections';
import { policyNav, findPolicy } from '@/components/government/policies-shared';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const policy = findPolicy(id);
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={policy.name} subtitle={policy.description} badges={
        <>
          <Badge label={policy.status} tone={policy.status === 'Active' ? 'green' : policy.status === 'Draft' ? 'amber' : 'slate'} />
          <Badge label={policy.version} tone="blue" />
        </>
      } nav={policyNav} base={`/government/policies/${policy.id}`} active="overview">
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          <Card><CardBody><Metric label="Decisions" value={policy.decisions.length} /></CardBody></Card>
          <Card><CardBody><Metric label="Conditions" value={policy.conditions} /></CardBody></Card>
          <Card><CardBody><Metric label="Violations" value={policy.violations} /></CardBody></Card>
          <Card><CardBody><Metric label="Enforcements" value={policy.enforcements.toLocaleString()} /></CardBody></Card>
        </div>
        <PolicyTable rows={[policy]} title="Policy Record" subtitle={`Scope: ${policy.scope} · Updated ${policy.updatedAt}`} />
      </ProfileShell>
    </GovShell>
  );
}