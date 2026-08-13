import { orgBadges } from '@/components/government/org-content';
import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { organizationNav, findOrg } from '@/components/government/profile-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Metric } from '@/components/ui/progress';
import { riskAssessments, riskFindings } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const org = findOrg(id);
  const openFindings = riskFindings.filter((f) => f.status !== 'Resolved');
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={org.name} subtitle="Risk assessments and open findings for this operator." badges={orgBadges(org)} nav={organizationNav} base={`/government/organizations/${org.id}`} active="risk">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card><CardBody><Metric label="Assessments" value={riskAssessments.length} /></CardBody></Card>
          <Card><CardBody><Metric label="Open Findings" value={openFindings.length} /></CardBody></Card>
          <Card><CardBody><Metric label="Critical Findings" value={openFindings.filter((f) => f.severity === 'Critical').length} /></CardBody></Card>
          <Card><CardBody><Metric label="Avg Score" value={Math.round(riskAssessments.filter((r) => r.score > 0).reduce((s, r) => s + r.score, 0) / Math.max(1, riskAssessments.filter((r) => r.score > 0).length))} /></CardBody></Card>
        </div>
        <Card>
          <CardHeader title="Findings" subtitle="Open remediation items tracked against this operator" />
          <CardBody className="divide-y divide-white/5">
            {openFindings.map((f) => (
              <div key={f.id} className="flex items-center justify-between gap-3 py-3 text-xs">
                <div>
                  <p className="font-semibold text-white">{f.title}</p>
                  <p className="mt-0.5 text-slate-400">{f.id} · owner {f.owner} · due {f.due}</p>
                </div>
                <Badge label={f.severity} tone={f.severity === 'Critical' ? 'rose' : f.severity === 'High' ? 'red' : 'amber'} />
              </div>
            ))}
          </CardBody>
        </Card>
      </ProfileShell>
    </GovShell>
  );
}