import Link from 'next/link';
import { AlertTriangle, ClipboardList, Crosshair, Radar, ShieldAlert } from 'lucide-react';
import { PageHeader, PrimaryButton, SecondaryButton } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { MultiArea, DonutChart } from '@/components/ui/charts';
import { ProgressBar } from '@/components/ui/progress';
import { ModuleNav } from './module-nav';
import { riskAssessments, riskFindings } from '@/lib/mock-data';
import {
  riskNavItems,
  systemMeta,
  riskTrendData,
  riskDonutData,
  avgResidualRisk,
  assessmentProgress,
  openFindingsCount,
  criticalFindingsCount,
  highRiskSystemsCount
} from './risk-helpers';

export default function RiskOverview({ active }: { active: string }) {
  const rows = riskAssessments.map((a) => ({
    ...a,
    system: systemMeta(a.systemId).name,
    systemType: systemMeta(a.systemId).type,
    progress: assessmentProgress(a)
  }));
  const columns: {
    key: string;
    label: string;
    sortValue?: (row: (typeof rows)[number]) => string | number;
    render?: (row: (typeof rows)[number]) => React.ReactNode;
  }[] = [
    {
      key: 'system',
      label: 'System',
      sortValue: (r) => r.system,
      render: (r) => (
        <Link href={`/risk/assessments/${r.id}`} className="font-medium text-sky-300 transition hover:text-sky-200">
          {r.system}
        </Link>
      )
    },
    { key: 'systemType', label: 'Type', sortValue: (r) => r.systemType },
    { key: 'assessor', label: 'Assessor', sortValue: (r) => r.assessor },
    {
      key: 'status',
      label: 'Status',
      sortValue: (r) => r.status,
      render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} />
    },
    {
      key: 'severity',
      label: 'Severity',
      sortValue: (r) => r.severity,
      render: (r) => <Badge label={r.severity} tone={toneForStatus(r.severity)} />
    },
    { key: 'score', label: 'Residual', sortValue: (r) => r.score, render: (r) => <span className="font-semibold text-white">{r.score}</span> },
    {
      key: 'progress',
      label: 'Progress',
      sortValue: (r) => r.progress,
      render: (r) => (
        <div className="flex w-28 items-center gap-2">
          <ProgressBar value={r.progress} color={r.progress === 100 ? 'bg-emerald-400' : 'bg-sky-400'} />
          <span className="text-[0.65rem] text-slate-400">{r.progress}%</span>
        </div>
      )
    },
    { key: 'startedAt', label: 'Started', sortValue: (r) => r.startedAt }
  ];

  const topFindings = riskFindings.filter((f) => f.status !== 'Resolved').slice(0, 5);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Governance"
        title="Risk Management"
        description="Assess, score and remediate AI risk across the full registry — systems, applications, providers, models, data and flows."
        actions={
          <>
            <PrimaryButton href="/risk/create-assessment">New Assessment</PrimaryButton>
            <SecondaryButton href="/risk/assessments">All Assessments</SecondaryButton>
          </>
        }
      />
      <ModuleNav items={riskNavItems} active={active} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Assessments" value={riskAssessments.length} delta={16} deltaLabel="vs last quarter" icon={ClipboardList} accent="sky" />
        <StatCard label="Open findings" value={openFindingsCount()} delta={-12} deltaLabel="this month" icon={AlertTriangle} accent="amber" />
        <StatCard label="Critical findings" value={criticalFindingsCount()} delta={0} deltaLabel="unchanged" icon={Crosshair} accent="rose" />
        <StatCard label="High risk systems" value={highRiskSystemsCount()} delta={25} deltaLabel="of 12 registered" icon={Radar} accent="rose" sub="Filtered in the High Risk register" />
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Risk trend" subtitle="30-day rolling risk score and incidents" />
          <CardBody>
            <MultiArea data={riskTrendData()} keys={['score', 'incidents']} xKey="date" colors={['#38bdf8', '#f87171']} height={220} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Risk distribution" subtitle="AI systems by risk level" />
          <CardBody>
            <DonutChart data={riskDonutData()} />
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader
          title="Risk assessments"
          subtitle="Latest assessment activity across registered AI systems"
          action={<Badge label={`Avg residual ${avgResidualRisk()}`} tone="blue" />}
        />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search assessments..." initialSort={{ key: 'startedAt', dir: 'desc' }} />
        </CardBody>
      </Card>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Top open findings" subtitle="Highest priority remediation items" />
          <CardBody className="space-y-3">
            {topFindings.map((f) => (
              <div key={f.id} className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-white">{f.title}</p>
                  <p className="mt-0.5 text-[0.65rem] text-slate-500">
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
        <Card>
          <CardHeader title="Risk posture" subtitle="Aggregate exposure across the control plane" />
          <CardBody className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 text-sky-300">
                  <ShieldAlert size={16} />
                </span>
                <div>
                  <p className="text-xs font-medium text-white">Residual risk score</p>
                  <p className="text-[0.65rem] text-slate-500">Weighted average of approved assessments</p>
                </div>
              </div>
              <p className="text-xl font-semibold text-white">{avgResidualRisk()}<span className="text-xs text-slate-500"> / 100</span></p>
            </div>
            {riskDonutData().map((d) => (
              <div key={d.name} className="flex items-center justify-between gap-3 text-xs">
                <span className="text-slate-300">{d.name}</span>
                <div className="flex flex-1 items-center gap-2">
                  <ProgressBar value={(d.value / 12) * 100} color={d.name === 'Critical' ? 'bg-red-400' : d.name === 'High' ? 'bg-amber-400' : 'bg-sky-400'} />
                  <span className="w-6 text-right font-semibold text-white">{d.value}</span>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}