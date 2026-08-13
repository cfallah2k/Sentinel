import Link from 'next/link';
import { CheckCircle2, ClipboardList, Edit3, FileText } from 'lucide-react';
import { PageHeader, PrimaryButton } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { ProgressBar } from '@/components/ui/progress';
import { ModuleNav } from '@/components/governance/module-nav';
import {
  riskNavItems,
  systemMeta,
  assessmentProgress
} from '@/components/governance/risk-helpers';
import { riskAssessments } from '@/lib/mock-data';

export default function Page() {
  const rows = riskAssessments.map((a) => ({
    ...a,
    system: systemMeta(a.systemId).name,
    systemType: systemMeta(a.systemId).type,
    progress: assessmentProgress(a)
  }));
  const approved = riskAssessments.filter((a) => a.status === 'Approved').length;
  const inReview = riskAssessments.filter((a) => a.status === 'In Review').length;
  const draft = riskAssessments.filter((a) => a.status === 'Draft').length;
  const columns: Column<(typeof rows)[number]>[] = [
    {
      key: 'id',
      label: 'Assessment',
      sortValue: (r) => r.id,
      render: (r) => (
        <Link href={`/risk/assessments/${r.id}`} className="font-medium text-sky-300 transition hover:text-sky-200">
          {r.id}
        </Link>
      )
    },
    { key: 'system', label: 'System', sortValue: (r) => r.system },
    { key: 'systemType', label: 'Type', sortValue: (r) => r.systemType },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> },
    { key: 'severity', label: 'Severity', sortValue: (r) => r.severity, render: (r) => <Badge label={r.severity} tone={toneForStatus(r.severity)} /> },
    { key: 'score', label: 'Residual', sortValue: (r) => r.score, render: (r) => <span className="font-semibold text-white">{r.score}</span> },
    { key: 'findings', label: 'Findings', sortValue: (r) => r.findings },
    { key: 'assessor', label: 'Assessor', sortValue: (r) => r.assessor },
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
    { key: 'startedAt', label: 'Started', sortValue: (r) => r.startedAt },
    { key: 'completedAt', label: 'Completed', sortValue: (r) => r.completedAt ?? '' }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Governance"
        title="Risk Assessments"
        description="All risk assessments across the AI registry with status, scores and completion progress."
        actions={<PrimaryButton href="/risk/create-assessment">New Assessment</PrimaryButton>}
      />
      <ModuleNav items={riskNavItems} active="/risk/assessments" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Assessments" value={riskAssessments.length} delta={16} deltaLabel="vs last quarter" icon={ClipboardList} accent="sky" />
        <StatCard label="Approved" value={approved} delta={Math.round((approved / riskAssessments.length) * 100)} deltaLabel="of total" icon={CheckCircle2} accent="green" />
        <StatCard label="In review" value={inReview} delta={0} deltaLabel="in pipeline" icon={Edit3} accent="amber" />
        <StatCard label="Draft" value={draft} delta={0} deltaLabel="not started" icon={FileText} accent="violet" />
      </div>
      <Card>
        <CardHeader title="Assessment register" subtitle="Complete assessment history" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search assessments..." initialSort={{ key: 'startedAt', dir: 'desc' }} />
        </CardBody>
      </Card>
    </div>
  );
}