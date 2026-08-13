import { Fingerprint, Layers, ShieldAlert } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { ProgressBar } from '@/components/ui/progress';
import { DataTable, type Column } from '@/components/ui/data-table';
import { EntityHeader, DetailNav } from '@/components/registry/entity-header';
import { DecisionBadge } from '@/components/enforcement/badges';
import { requestById, requestNav, requestView, sensitivityOf } from '@/components/enforcement/helpers';
import { sensitiveCategories } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const req = requestById(id);
  const v = requestView(req);
  const level = sensitivityOf(req.category);
  const sensitivityIndex = level === 'RESTRICTED' ? 4 : level === 'CONFIDENTIAL' ? 3 : level === 'INTERNAL' ? 2 : 1;

  const columns: Column<(typeof sensitiveCategories)[number]>[] = [
    { key: 'name', label: 'Detector', sortValue: (r) => r.name },
    { key: 'detector', label: 'Engine', render: (r) => <span className="font-mono text-xs text-sentinel-300">{r.detector}</span> },
    { key: 'matches24h', label: 'Matches / 24h', sortValue: (r) => r.matches24h, render: (r) => <span className="text-slate-200">{r.matches24h.toLocaleString()}</span> },
    { key: 'blocked24h', label: 'Blocked / 24h', sortValue: (r) => r.blocked24h, render: (r) => <span className="text-slate-200">{r.blocked24h.toLocaleString()}</span> }
  ];

  return (
    <div className="space-y-6">
      <EntityHeader
        eyebrow="Enforcement · Gateway"
        title={`${req.id} · Classification`}
        id={req.id}
        description="Data classification applied to the request payload."
        badges={[
          <DecisionBadge key="d" label={req.decision} />,
          <Badge key="c" label={level} tone={level === 'RESTRICTED' ? 'rose' : level === 'CONFIDENTIAL' ? 'amber' : 'blue'} />
        ]}
      />
      <DetailNav base={`/gateway/requests/${id}`} items={requestNav(id)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Category" value={req.category} icon={Layers} accent="sky" />
        <StatCard label="Sensitivity" value={`${sensitivityIndex} / 4`} icon={Fingerprint} accent="violet" />
        <StatCard label="Source System" value={v.system.length > 18 ? `${v.system.slice(0, 18)}…` : v.system} icon={ShieldAlert} accent="amber" />
        <StatCard label="Detector Active" value={sensitiveCategories.length} icon={Fingerprint} accent="green" />
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader title="Classification level" subtitle="Sensitivity assigned by the classification engine" />
          <CardBody className="space-y-5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Sensitivity index</span>
              <span className="font-semibold text-white">{level}</span>
            </div>
            <ProgressBar value={sensitivityIndex * 25} color={sensitivityIndex >= 4 ? 'bg-rose-400' : sensitivityIndex === 3 ? 'bg-amber-400' : 'bg-sky-400'} />
            <p className="text-xs leading-6 text-slate-400">
              {v.system} transmits {req.category.toLowerCase()} data. {level} data requires{' '}
              {level === 'RESTRICTED' || level === 'CONFIDENTIAL' ? 'strict controls, redaction and approval gates.' : 'standard governance controls.'}
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Detector coverage" subtitle="Sensitive data detectors applied to this traffic" />
          <CardBody>
            <DataTable columns={columns} rows={sensitiveCategories} searchable={false} pageSize={8} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}