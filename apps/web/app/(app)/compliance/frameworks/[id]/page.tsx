import { CheckCircle2, FileText, ShieldCheck, XCircle } from 'lucide-react';
import { ComplianceFrameworkHeader } from '@/components/governance/compliance-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { ProgressBar } from '@/components/ui/progress';
import { complianceControls, complianceEvidence, complianceFrameworks, complianceGaps } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const framework = complianceFrameworks.find((f) => f.id === id);
  if (!framework) {
    return (
      <Card>
        <CardBody className="py-14 text-center">
          <p className="text-sm font-semibold text-white">Framework not found</p>
          <p className="mt-1 text-xs text-slate-500">No framework exists with id {id}.</p>
        </CardBody>
      </Card>
    );
  }

  const controls = complianceControls.filter((c) => c.frameworkId === id);
  const evidence = complianceEvidence.filter((e) => controls.some((c) => c.id === e.controlId));
  const gaps = complianceGaps.filter((g) => g.frameworkId === id);

  const rows = controls.map((c) => ({ ...c }));
  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'code', label: 'Code', sortValue: (r) => r.code, render: (r) => <span className="font-medium text-sky-300">{r.code}</span> },
    { key: 'name', label: 'Control', sortValue: (r) => r.name },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> },
    { key: 'evidence', label: 'Evidence', sortValue: (r) => r.evidence },
    { key: 'owner', label: 'Owner', sortValue: (r) => r.owner },
    { key: 'updated', label: 'Updated', sortValue: (r) => r.updated }
  ];

  return (
    <div className="space-y-8">
      <ComplianceFrameworkHeader framework={framework} active={`/compliance/frameworks/${id}`} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Controls" value={framework.controls} sub={`${framework.passed} passed`} icon={ShieldCheck} accent="sky" />
        <StatCard label="Evidence" value={framework.evidence} sub={`${evidence.length} linked here`} icon={FileText} accent="green" />
        <StatCard label="Failed" value={framework.failed} sub="require attention" icon={XCircle} accent="rose" />
        <StatCard label="Gaps" value={framework.gaps} sub={`${gaps.filter((g) => g.status === 'Open').length} open`} icon={CheckCircle2} accent="amber" />
      </div>
      <Card>
        <CardHeader
          title="Implementation progress"
          subtitle={`${framework.passed} controls passed across ${framework.controls} total`}
          action={<Badge label={framework.status} tone={toneForStatus(framework.status)} />}
        />
        <CardBody>
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-slate-400">{framework.standard}</span>
            <span className="font-semibold text-white">{framework.progress}%</span>
          </div>
          <ProgressBar
            value={framework.progress}
            color={framework.status === 'Behind' ? 'bg-rose-400' : framework.status === 'At Risk' ? 'bg-amber-400' : 'bg-sky-400'}
          />
          <p className="mt-4 text-xs text-slate-500">
            Next audit {framework.nextAudit} · {framework.passed} passed / {framework.failed} failed · {framework.evidence} evidence items across the standard
          </p>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Controls in this framework" subtitle="Implementation status per control" action={<Badge label={`${rows.length} mapped`} tone="blue" />} />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search controls..." initialSort={{ key: 'status', dir: 'asc' }} />
        </CardBody>
      </Card>
    </div>
  );
}
