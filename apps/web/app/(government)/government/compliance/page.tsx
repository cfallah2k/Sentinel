import { PageHeader } from '@/components/ui/page-header';
import { GovShell } from '@/components/government/page-shell';
import { FrameworksTable } from '@/components/government/sections';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { complianceFrameworks, complianceGaps } from '@/lib/mock-data';

export default function Page() {
  return (
    <GovShell>
      <PageHeader
        eyebrow="Government"
        title="Standards Compliance"
        description="Operator readiness against national and international AI governance standards."
      />
      <FrameworksTable rows={complianceFrameworks} subtitle={`${complianceFrameworks.length} frameworks tracked`} />
      <Card>
        <CardHeader title="Open Compliance Gaps" subtitle={`${complianceGaps.length} gaps awaiting remediation`} />
        <CardBody className="divide-y divide-white/5">
          {complianceGaps.map((g) => (
            <div key={g.id} className="flex items-center justify-between gap-3 py-3 text-xs">
              <div>
                <p className="font-semibold text-white">{g.title}</p>
                <p className="mt-0.5 text-slate-400">{g.frameworkId} · owner {g.owner} · due {g.due}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Badge label={g.severity} tone={g.severity === 'Critical' ? 'rose' : g.severity === 'High' ? 'red' : 'amber'} />
                <Badge label={g.status} tone={g.status === 'In Progress' ? 'amber' : 'rose'} />
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </GovShell>
  );
}