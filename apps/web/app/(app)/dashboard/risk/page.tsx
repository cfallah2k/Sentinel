import { ClipboardList, FileWarning, ShieldAlert, Target } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { AreaTrend } from '@/components/ui/charts';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { ProgressBar } from '@/components/ui/progress';
import { aiSystems, dailySeries, riskAssessments, riskFindings } from '@/lib/mock-data';

const openFindings = riskFindings.filter((f) => f.status !== 'Resolved');
const highRiskSystems = aiSystems.filter((s) => s.risk === 'High' || s.risk === 'Critical');
const completed = riskAssessments.filter((a) => a.status === 'Approved');
const avgScore = Math.round(completed.reduce((s, a) => s + a.score, 0) / Math.max(1, completed.length));

const systemName = new Map(aiSystems.map((s) => [s.id, s.name]));

const assessmentRows = riskAssessments.map((a) => ({
  id: a.id,
  system: systemName.get(a.systemId) ?? a.systemId,
  score: a.score,
  severity: a.severity,
  findings: a.findings,
  status: a.status,
  assessor: a.assessor,
  completedAt: a.completedAt ?? '—'
}));
type AssessmentRow = (typeof assessmentRows)[number];

const assessmentColumns: Column<AssessmentRow>[] = [
  { key: 'id', label: 'Assessment', render: (r) => <span className="font-mono text-sentinel-300">{r.id}</span> },
  { key: 'system', label: 'AI system', render: (r) => <span className="font-medium text-slate-200">{r.system}</span> },
  {
    key: 'score',
    label: 'Score',
    sortValue: (r) => r.score,
    render: (r) => (
      <div className="flex items-center gap-2">
        <span className="w-8 font-semibold text-white">{r.score > 0 ? r.score : '—'}</span>
        <ProgressBar value={r.score} color={r.score >= 70 ? 'bg-rose-400' : r.score >= 40 ? 'bg-amber-400' : 'bg-emerald-400'} className="w-16" />
      </div>
    )
  },
  { key: 'severity', label: 'Severity', tone: (r) => toneForStatus(r.severity) },
  { key: 'findings', label: 'Findings', sortValue: (r) => r.findings },
  { key: 'status', label: 'Status', tone: (r) => toneForStatus(r.status) },
  { key: 'assessor', label: 'Assessor' },
  { key: 'completedAt', label: 'Completed' }
];

export default function Page() {
  return (
    <div>
      <PageHeader
        eyebrow="Risk"
        title="Risk Snapshot"
        description="Current risk posture across the AI estate — assessments in flight, open findings, and the systems that need the most attention."
      />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Assessments" value={riskAssessments.length} delta={2} deltaLabel="this quarter" icon={ClipboardList} accent="sky" sub={`${riskAssessments.filter((a) => a.status === 'In Review').length} in review`} />
        <StatCard label="Open findings" value={openFindings.length} icon={FileWarning} accent="amber" sub="Awaiting remediation" />
        <StatCard label="High risk systems" value={highRiskSystems.length} icon={ShieldAlert} accent="rose" sub="High or critical rating" />
        <StatCard label="Avg approved score" value={avgScore} icon={Target} accent="violet" sub={`Across ${completed.length} assessments`} />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Assessments" subtitle="Risk scoring and review status" />
          <CardBody>
            <DataTable columns={assessmentColumns} rows={assessmentRows} searchable={false} pageSize={6} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Top findings" subtitle="Open and in-progress remediation" />
          <CardBody className="space-y-4">
            {openFindings.map((f) => (
              <div key={f.id} className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-slate-200">{f.title}</p>
                  <p className="mt-0.5 truncate text-[0.65rem] text-slate-500">
                    {f.owner} · due {f.due}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Badge label={f.severity} tone={toneForStatus(f.severity)} />
                  <Badge label={f.status} tone={toneForStatus(f.status)} />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
      <div className="mt-4">
        <Card>
          <CardHeader title="Risk trend" subtitle="Aggregate risk index over the last 30 days" />
          <CardBody>
            <AreaTrend data={dailySeries} dataKey="riskScore" xKey="date" color="#fbbf24" height={200} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}