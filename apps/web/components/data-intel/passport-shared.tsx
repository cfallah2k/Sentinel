import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress';
import { DataTable, type Column } from '@/components/ui/data-table';
import { ModuleNav } from './module-nav';
import { riskTone } from './flow-table';
import {
  dataInventory,
  fmt,
  fmtTime,
  modelForPassport,
  passportControls,
  passportEvents,
  providerForPassport,
  sensitivityLabel,
  type Passport
} from './derived';

export function PassportNav({ active }: { active: string }) {
  const items = [
    { label: 'Overview', href: '/ai-passports/overview' },
    { label: 'All', href: '/ai-passports/all' },
    { label: 'Approved', href: '/ai-passports/approved' },
    { label: 'Pending', href: '/ai-passports/pending' },
    { label: 'High risk', href: '/ai-passports/high-risk' },
    { label: 'Create', href: '/ai-passports/create' },
    { label: 'Import', href: '/ai-passports/import' }
  ];
  return <ModuleNav items={items.map((it) => ({ ...it, active: it.label === active }))} />;
}

export function PassportSubnav({ id, active }: { id: string; active: string }) {
  const base = `/ai-passports/${id}`;
  const items = [
    { label: 'Overview', href: base },
    { label: 'Identity', href: `${base}/identity` },
    { label: 'Purpose', href: `${base}/purpose` },
    { label: 'Models', href: `${base}/models` },
    { label: 'Providers', href: `${base}/providers` },
    { label: 'Data', href: `${base}/data` },
    { label: 'Risk', href: `${base}/risk` },
    { label: 'Controls', href: `${base}/controls` },
    { label: 'Approvals', href: `${base}/approvals` },
    { label: 'Export', href: `${base}/export` },
    { label: 'Audit', href: `${base}/audit` }
  ];
  return <ModuleNav items={items.map((it) => ({ ...it, active: it.label === active }))} />;
}

export function PassportHeader({ p }: { p: Passport }) {
  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-violet-500/10 via-sky-500/10 to-cyan-400/10 p-5 sm:p-6">
        <Link href="/ai-passports" className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-500 transition hover:text-sentinel-300">
          AI Passports
        </Link>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{p.name}</h1>
          <Badge label={p.status} tone={p.status === 'Certified' ? 'green' : p.status === 'Pending Review' ? 'amber' : p.status === 'Draft' ? 'slate' : 'rose'} />
          <Badge label={p.risk} tone={riskTone(p.risk)} />
          <Badge label={p.version} tone="blue" />
        </div>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-400">
          <span>{p.type}</span>
          <span>· {p.environment}</span>
          <span>· Owner: {p.owner}</span>
          <span>· Issued {p.approvedAt}</span>
        </div>
      </div>
    </Card>
  );
}

export function PassportMetrics({ p }: { p: Passport }) {
  const items = [
    { label: 'Requests 24h', value: fmt(p.requests24h) },
    { label: 'Blocked 24h', value: fmt(p.blocked24h) },
    { label: 'Redacted 24h', value: fmt(p.redacted24h) },
    { label: 'Compliance score', value: `${p.complianceScore}%` }
  ];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it) => (
        <Card key={it.label}>
          <CardBody>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">{it.label}</p>
            <p className="mt-1 text-lg font-semibold text-white">{it.value}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

export function PassportCertifications({ p }: { p: Passport }) {
  return (
    <Card>
      <CardHeader title="Certifications" subtitle="Frameworks this passport is certified against" />
      <CardBody>
        <div className="flex flex-wrap gap-2">
          {p.certifications.map((c) => (
            <Badge key={c} label={c} tone="green" />
          ))}
          <Badge label={p.oversight} tone="blue" />
        </div>
        <div className="mt-4 space-y-3">
          <div>
            <div className="flex items-center justify-between text-[0.65rem] text-slate-500">
              <span>Framework compliance</span>
              <span className="font-semibold text-slate-300">{p.complianceScore}%</span>
            </div>
            <div className="mt-1.5">
              <ProgressBar value={p.complianceScore} color={p.complianceScore > 70 ? 'bg-emerald-400' : p.complianceScore > 50 ? 'bg-amber-400' : 'bg-rose-400'} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-[0.65rem] text-slate-500">
              <span>Data classification coverage</span>
              <span className="font-semibold text-slate-300">100%</span>
            </div>
            <div className="mt-1.5">
              <ProgressBar value={100} color="bg-sky-400" />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export function passportColumns(): Column<Passport>[] {
  return [
    {
      key: 'name',
      label: 'System',
      render: (r) => (
        <Link href={`/ai-passports/${r.id}`} className="group">
          <span className="block font-medium text-white transition group-hover:text-sentinel-300">{r.name}</span>
          <span className="text-[0.65rem] text-slate-500">{r.type} · {r.version}</span>
        </Link>
      ),
      sortValue: (r) => r.name
    },
    {
      key: 'purpose',
      label: 'Purpose',
      render: (r) => <span className="max-w-[220px] truncate text-slate-300">{r.purpose}</span>,
      sortValue: (r) => r.purpose
    },
    {
      key: 'dataTypes',
      label: 'Data types',
      render: (r) => (
        <span className="flex max-w-[180px] flex-wrap gap-1">
          {r.dataTypes.slice(0, 2).map((d) => (
            <span key={d} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[0.6rem] text-slate-300">{d}</span>
          ))}
          {r.dataTypes.length > 2 ? <span className="text-[0.6rem] text-slate-500">+{r.dataTypes.length - 2}</span> : null}
        </span>
      )
    },
    {
      key: 'retention',
      label: 'Retention',
      render: (r) => <span className="text-slate-300">{r.retention}</span>,
      sortValue: (r) => r.retention
    },
    {
      key: 'status',
      label: 'Status',
      render: (r) => (
        <Badge label={r.status} tone={r.status === 'Certified' ? 'green' : r.status === 'Pending Review' ? 'amber' : r.status === 'Draft' ? 'slate' : 'rose'} />
      )
    },
    {
      key: 'risk',
      label: 'Risk',
      render: (r) => <Badge label={r.risk} tone={riskTone(r.risk)} />
    },
    {
      key: 'owner',
      label: 'Owner',
      render: (r) => <span className="text-slate-300">{r.owner}</span>,
      sortValue: (r) => r.owner
    },
    {
      key: 'lastActivity',
      label: 'Last activity',
      render: (r) => <span className="whitespace-nowrap text-slate-400">{fmtTime(r.lastActivity)}</span>,
      sortValue: (r) => r.lastActivity
    }
  ];
}

export function PassportTable({ passports: rows, pageSize = 8 }: { passports: Passport[]; pageSize?: number }) {
  return <DataTable columns={passportColumns()} rows={rows} pageSize={pageSize} searchPlaceholder="Search passports by system, purpose or owner..." />;
}

export function PassportDataTable({ p }: { p: Passport }) {
  const rows = dataInventory(p).map((d) => ({ ...d, sensitivityLabel: sensitivityLabel(d.sensitivity) }));
  return (
    <DataTable
      columns={[
        {
          key: 'category',
          label: 'Data type',
          render: (r) => <span className="font-medium text-white">{r.category}</span>
        },
        {
          key: 'sensitivityLabel',
          label: 'Sensitivity',
          render: (r) => <Badge label={r.sensitivityLabel} tone={r.sensitivity >= 4 ? 'rose' : r.sensitivity === 3 ? 'amber' : 'blue'} />
        },
        {
          key: 'purpose',
          label: 'Purpose',
          render: (r) => <span className="text-slate-300">{r.purpose}</span>
        },
        {
          key: 'storage',
          label: 'Storage region',
          render: (r) => <span className="text-slate-300">{r.storage}</span>
        },
        {
          key: 'retention',
          label: 'Retention',
          render: (r) => <span className="text-slate-300">{r.retention}</span>
        }
      ]}
      rows={rows}
      searchable={false}
      pageSize={10}
    />
  );
}

export function PassportControlsTable({ p }: { p: Passport }) {
  return (
    <DataTable
      columns={[
        {
          key: 'name',
          label: 'Control',
          render: (r) => <span className="font-medium text-white">{r.name}</span>
        },
        {
          key: 'status',
          label: 'Status',
          render: (r) => (
            <Badge
              label={r.status}
              tone={r.status === 'Implemented' ? 'green' : r.status === 'Partially Implemented' ? 'amber' : r.status === 'In Review' ? 'amber' : 'rose'}
            />
          )
        },
        {
          key: 'evidence',
          label: 'Evidence',
          render: (r) => <span className="text-slate-300">{r.evidence} items</span>,
          sortValue: (r) => r.evidence
        }
      ]}
      rows={passportControls(p).map((c) => ({ ...c }))}
      searchable={false}
      pageSize={10}
    />
  );
}

export function PassportActivity({ p }: { p: Passport }) {
  return (
    <Card>
      <CardHeader title="Activity log" subtitle="Lifecycle events for this passport" />
      <CardBody>
        <div className="relative space-y-5 pl-5">
          <span className="absolute left-1.5 top-2 h-[calc(100%-1rem)] w-px bg-white/10" />
          {passportEvents(p).map((e, i) => (
            <div key={i} className="relative">
              <span className={`absolute -left-5 top-1 h-2.5 w-2.5 rounded-full ${e.tone === 'green' ? 'bg-emerald-400' : e.tone === 'amber' ? 'bg-amber-400' : 'bg-sky-400'}`} />
              <p className="text-[0.65rem] uppercase tracking-wider text-slate-500">{e.time}</p>
              <p className="mt-0.5 text-xs font-semibold text-white">{e.title}</p>
              <p className="mt-0.5 text-xs text-slate-400">{e.detail}</p>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

export function PassportModelCard({ p }: { p: Passport }) {
  const m = modelForPassport(p);
  const pr = providerForPassport(p);
  return (
    <Card>
      <CardHeader title="Deployed model" subtitle="Model and provider serving this system" />
      <CardBody>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-sky-500/25 bg-sky-500/10 text-sm font-bold text-sky-300">
            {m?.name.slice(0, 2).toUpperCase() ?? '—'}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{m?.name ?? 'Unassigned model'}</p>
            <p className="text-xs text-slate-400">{m?.modality} · {m?.contextWindow} context · {m?.pricing}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2">
          {[
            { label: 'Provider', value: pr?.name ?? '—' },
            { label: 'Provider type', value: pr?.type ?? '—' },
            { label: 'Region', value: pr?.region ?? '—' },
            { label: 'Requests 24h', value: fmt(pr?.requests24h ?? 0) }
          ].map((it) => (
            <div key={it.label} className="bg-slate-950/90 px-4 py-3">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">{it.label}</p>
              <p className="mt-1 text-xs text-slate-200">{it.value}</p>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}