import { AlertTriangle, CheckCircle2, FileText, Scale, ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import FrameworkCard from '@/components/governance/framework-card';
import {
  complianceFrameworks,
  complianceControls,
  complianceEvidence,
  complianceGaps
} from '@/lib/mock-data';

export default function Page() {
  const totalControls = complianceFrameworks.reduce((s, f) => s + f.controls, 0);
  const passedControls = complianceFrameworks.reduce((s, f) => s + f.passed, 0);
  const implemented = Math.round((passedControls / totalControls) * 100);
  const evidenceCount = complianceFrameworks.reduce((s, f) => s + f.evidence, 0);

  const controlRows = complianceControls.map((c) => ({
    ...c,
    framework: complianceFrameworks.find((f) => f.id === c.frameworkId)?.name ?? c.frameworkId
  }));
  const controlColumns: Column<(typeof controlRows)[number]>[] = [
    { key: 'code', label: 'Code', sortValue: (r) => r.code, render: (r) => <span className="font-medium text-sky-300">{r.code}</span> },
    { key: 'name', label: 'Control', sortValue: (r) => r.name },
    { key: 'framework', label: 'Framework', sortValue: (r) => r.framework },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> },
    { key: 'evidence', label: 'Evidence', sortValue: (r) => r.evidence },
    { key: 'owner', label: 'Owner', sortValue: (r) => r.owner },
    { key: 'updated', label: 'Updated', sortValue: (r) => r.updated }
  ];

  const gapRows = complianceGaps.map((g) => ({
    ...g,
    framework: complianceFrameworks.find((f) => f.id === g.frameworkId)?.name ?? g.frameworkId
  }));
  const gapColumns: Column<(typeof gapRows)[number]>[] = [
    { key: 'id', label: 'Gap', sortValue: (r) => r.id },
    { key: 'title', label: 'Description', sortValue: (r) => r.title },
    { key: 'framework', label: 'Framework', sortValue: (r) => r.framework },
    { key: 'severity', label: 'Severity', sortValue: (r) => r.severity, render: (r) => <Badge label={r.severity} tone={toneForStatus(r.severity)} /> },
    { key: 'owner', label: 'Owner', sortValue: (r) => r.owner },
    { key: 'due', label: 'Due', sortValue: (r) => r.due },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> }
  ];

  const evidenceRows = complianceEvidence.map((e) => ({ ...e }));
  const evidenceColumns: Column<(typeof evidenceRows)[number]>[] = [
    { key: 'id', label: 'Item', sortValue: (r) => r.id },
    { key: 'title', label: 'Title', sortValue: (r) => r.title },
    { key: 'type', label: 'Type', sortValue: (r) => r.type, render: (r) => <Badge label={r.type} tone="slate" /> },
    { key: 'uploadedBy', label: 'Uploaded by', sortValue: (r) => r.uploadedBy },
    { key: 'date', label: 'Date', sortValue: (r) => r.date },
    { key: 'status', label: 'Status', sortValue: (r) => r.status, render: (r) => <Badge label={r.status} tone={toneForStatus(r.status)} /> }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Governance"
        title="Compliance Management"
        description="Framework coverage, control implementation, evidence collection and gap remediation across all standards."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Frameworks" value={complianceFrameworks.length} delta={1} deltaLabel="added this year" icon={Scale} accent="violet" />
        <StatCard label="Controls" value={totalControls.toLocaleString()} delta={4} deltaLabel="this quarter" icon={ShieldCheck} accent="sky" />
        <StatCard label="Implemented" value={`${implemented}%`} delta={5} deltaLabel="vs last audit" icon={CheckCircle2} accent="green" />
        <StatCard label="Open gaps" value={complianceGaps.length} delta={20} deltaLabel="needs attention" icon={AlertTriangle} accent="amber" />
      </div>
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-white">Framework coverage</h2>
            <p className="mt-0.5 text-xs text-slate-500">{evidenceCount.toLocaleString()} evidence items collected across standards</p>
          </div>
          <Badge label="Evidence library" tone="blue" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {complianceFrameworks.map((f) => (
            <FrameworkCard key={f.id} framework={f} />
          ))}
        </div>
      </div>
      <Card>
        <CardHeader title="Control implementation" subtitle="Controls across all frameworks" action={<Badge label={`${controlRows.length} mapped`} tone="blue" />} />
        <CardBody>
          <DataTable columns={controlColumns} rows={controlRows} searchPlaceholder="Search controls..." initialSort={{ key: 'status', dir: 'desc' }} />
        </CardBody>
      </Card>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Open gaps" subtitle="Gap register requiring remediation" />
          <CardBody>
            <DataTable columns={gapColumns} rows={gapRows} searchPlaceholder="Search gaps..." initialSort={{ key: 'severity', dir: 'desc' }} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Evidence items" subtitle="Artifacts collected for controls" />
          <CardBody>
            <DataTable columns={evidenceColumns} rows={evidenceRows} searchPlaceholder="Search evidence..." />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}