import { agencyBadges } from '@/components/government/agency-content';
import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { agencyNav, findAgency } from '@/components/government/profile-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { riskAssessments, riskFindings } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agency = findAgency(id);
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={agency.name} subtitle={`Portfolio risk tier: ${agency.risk}.`} badges={agencyBadges(agency)} nav={agencyNav} base={`/government/agencies/${agency.id}`} active="risk">
        <Card>
          <CardHeader title="Assessments" subtitle={`${riskAssessments.length} assessments on record`} />
          <CardBody className="divide-y divide-white/5">
            {riskAssessments.map((a) => (
              <div key={a.id} className="flex items-center justify-between gap-3 py-3 text-xs">
                <div>
                  <p className="font-semibold text-white">{a.systemId} — {a.status}</p>
                  <p className="mt-0.5 text-slate-400">assessor {a.assessor} · started {a.startedAt}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <Badge label={a.severity} tone={a.severity === 'Critical' ? 'rose' : a.severity === 'High' ? 'red' : a.severity === 'Medium' ? 'amber' : 'blue'} />
                  <span className="font-mono text-sky-300">{a.score}</span>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Findings" subtitle="Open remediation items in the portfolio" />
          <CardBody className="divide-y divide-white/5">
            {riskFindings.map((f) => (
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