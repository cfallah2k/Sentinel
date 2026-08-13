import { registryBadges } from '@/components/government/registry-content';
import { ProfileShell } from '@/components/government/profile-shell';
import { GovShell } from '@/components/government/page-shell';
import { registryNav, findRegistry } from '@/components/government/profile-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { riskTone } from '@/components/government/registry-table';
import { riskAssessments, riskFindings } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = findRegistry(id);
  return (
    <GovShell>
      <ProfileShell eyebrow="Government" title={entry.name} subtitle={`Classified ${entry.risk} risk under the national standard.`} badges={registryBadges(entry)} nav={registryNav} base={`/government/ai-registry/${entry.id}`} active="risk">
        <Card>
          <CardHeader title="Risk Classification" subtitle="Tier assigned at registration" />
          <CardBody>
            <div className="flex items-center gap-3">
              <Badge label={entry.risk} tone={riskTone(entry.risk)} />
              <p className="text-xs text-slate-400">
                {entry.risk === 'Critical' || entry.risk === 'High'
                  ? 'Subject to enhanced oversight, quarterly assessments, and approval gates.'
                  : 'Subject to standard oversight with annual re-assessment.'}
              </p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Assessments" subtitle="Completed and in-flight assessments" />
          <CardBody className="divide-y divide-white/5">
            {riskAssessments.map((a) => (
              <div key={a.id} className="flex items-center justify-between gap-3 py-3 text-xs">
                <div>
                  <p className="font-semibold text-white">{a.id} — {a.status}</p>
                  <p className="mt-0.5 text-slate-400">assessor {a.assessor} · {a.findings} findings · started {a.startedAt}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <Badge label={a.severity} tone={riskTone(a.severity)} />
                  <span className="font-mono text-sky-300">{a.score}</span>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Open Findings" subtitle="Remediation items linked to this system" />
          <CardBody className="divide-y divide-white/5">
            {riskFindings.slice(0, 5).map((f) => (
              <div key={f.id} className="flex items-center justify-between gap-3 py-3 text-xs">
                <div>
                  <p className="font-semibold text-white">{f.title}</p>
                  <p className="mt-0.5 text-slate-400">owner {f.owner} · due {f.due}</p>
                </div>
                <Badge label={f.status} tone={f.status === 'Resolved' ? 'green' : f.status === 'In Progress' ? 'amber' : 'rose'} />
              </div>
            ))}
          </CardBody>
        </Card>
      </ProfileShell>
    </GovShell>
  );
}