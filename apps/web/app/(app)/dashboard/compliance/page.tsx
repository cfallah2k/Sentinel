import { CheckCircle2, CircleAlert, Scale, Target } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress';
import { complianceFrameworks, complianceGaps } from '@/lib/mock-data';

const onTrack = complianceFrameworks.filter((f) => f.status === 'On Track');
const controlsPassed = complianceFrameworks.reduce((s, f) => s + f.passed, 0);
const controlsFailed = complianceFrameworks.reduce((s, f) => s + f.failed, 0);
const openGaps = complianceGaps.length;
const avgProgress = Math.round(complianceFrameworks.reduce((s, f) => s + f.progress, 0) / complianceFrameworks.length);

const frameworkName = new Map(complianceFrameworks.map((f) => [f.id, f.name]));

export default function Page() {
  return (
    <div>
      <PageHeader
        eyebrow="Compliance"
        title="Compliance Snapshot"
        description="Implementation progress across audit frameworks, with open gaps flagged for remediation."
      />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Frameworks on track" value={onTrack.length} icon={CheckCircle2} accent="green" sub={`${complianceFrameworks.length} frameworks tracked`} />
        <StatCard label="Controls passed" value={controlsPassed.toLocaleString()} icon={Scale} accent="sky" sub={`${controlsFailed} failed`} />
        <StatCard label="Open gaps" value={openGaps} icon={CircleAlert} accent="rose" sub="Awaiting remediation" />
        <StatCard label="Avg implementation" value={`${avgProgress}%`} icon={Target} accent="violet" sub="Across all frameworks" />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
          {complianceFrameworks.map((f) => (
            <Card key={f.id}>
              <CardHeader
                title={f.name}
                subtitle={`${f.standard} · Next audit ${f.nextAudit}`}
                action={<Badge label={f.status} tone={toneForStatus(f.status)} />}
              />
              <CardBody>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Implementation</span>
                  <span className="font-semibold text-white">{f.progress}%</span>
                </div>
                <div className="mt-2">
                  <ProgressBar value={f.progress} color={f.progress >= 70 ? 'bg-emerald-400' : f.progress >= 50 ? 'bg-amber-400' : 'bg-rose-400'} />
                </div>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 text-[0.65rem]">
                  <div className="rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2">
                    <p className="text-slate-500">Controls</p>
                    <p className="mt-0.5 font-semibold text-white">{f.controls}</p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2">
                    <p className="text-slate-500">Passed</p>
                    <p className="mt-0.5 font-semibold text-emerald-300">{f.passed}</p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2">
                    <p className="text-slate-500">Gaps</p>
                    <p className="mt-0.5 font-semibold text-rose-300">{f.gaps}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader title="Compliance gaps" subtitle="Open items by framework" />
          <CardBody className="space-y-4">
            {complianceGaps.map((g) => (
              <div key={g.id} className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-slate-200">{g.title}</p>
                  <p className="mt-0.5 text-[0.65rem] text-slate-500">
                    {frameworkName.get(g.frameworkId) ?? g.frameworkId} · {g.owner} · due {g.due}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Badge label={g.severity} tone={toneForStatus(g.severity)} />
                  <Badge label={g.status} tone={toneForStatus(g.status)} />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}