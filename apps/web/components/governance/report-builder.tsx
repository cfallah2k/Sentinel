'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Check, Database, Filter, Save } from 'lucide-react';
import type { BadgeTone } from '@/components/ui/badge';
import { PageHeader, PrimaryButton, SecondaryButton } from '@/components/ui/page-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { ModuleNav } from '@/components/governance/module-nav';
import { reportsNavItems } from '@/components/governance/reports-home';
import { gatewayRequests, auditLogs, aiSystems, incidents, policies, currentUser } from '@/lib/mock-data';

const inputCls =
  'w-full rounded-xl border border-white/10 bg-slate-950/75 px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15';

interface Source {
  id: string;
  label: string;
  rows: Record<string, unknown>[];
  columns: { key: string; label: string }[];
}

const sources: Source[] = [
  {
    id: 'gateway',
    label: 'Gateway Requests',
    rows: gatewayRequests.map((r) => ({ ...r })),
    columns: [
      { key: 'id', label: 'Request ID' },
      { key: 'timestamp', label: 'Timestamp' },
      { key: 'decision', label: 'Decision' },
      { key: 'category', label: 'Category' },
      { key: 'latencyMs', label: 'Latency (ms)' },
      { key: 'tokens', label: 'Tokens' },
      { key: 'ip', label: 'Source IP' }
    ]
  },
  {
    id: 'audit',
    label: 'Audit Logs',
    rows: auditLogs.map((l) => ({ ...l })),
    columns: [
      { key: 'timestamp', label: 'Timestamp' },
      { key: 'actor', label: 'Actor' },
      { key: 'action', label: 'Action' },
      { key: 'resource', label: 'Resource' },
      { key: 'result', label: 'Result' },
      { key: 'context', label: 'Context' }
    ]
  },
  {
    id: 'systems',
    label: 'AI Systems',
    rows: aiSystems.map((s) => ({ ...s })),
    columns: [
      { key: 'name', label: 'System' },
      { key: 'type', label: 'Type' },
      { key: 'status', label: 'Status' },
      { key: 'risk', label: 'Risk' },
      { key: 'owner', label: 'Owner' },
      { key: 'environment', label: 'Environment' },
      { key: 'requests24h', label: 'Req / 24h' }
    ]
  },
  {
    id: 'incidents',
    label: 'Incidents',
    rows: incidents.map((i) => ({ ...i })),
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'title', label: 'Title' },
      { key: 'severity', label: 'Severity' },
      { key: 'status', label: 'Status' },
      { key: 'assignee', label: 'Assignee' },
      { key: 'openedAt', label: 'Opened' }
    ]
  },
  {
    id: 'policies',
    label: 'Policies',
    rows: policies.map((p) => ({ ...p })),
    columns: [
      { key: 'name', label: 'Policy' },
      { key: 'status', label: 'Status' },
      { key: 'version', label: 'Version' },
      { key: 'violations', label: 'Violations' },
      { key: 'enforcements', label: 'Enforcements' },
      { key: 'updatedAt', label: 'Updated' }
    ]
  }
];

const columnTones: Record<string, (v: unknown) => BadgeTone> = {
  decision: (v) => toneForStatus(String(v)),
  status: (v) => toneForStatus(String(v)),
  result: (v) => toneForStatus(String(v)),
  risk: (v) => toneForStatus(String(v)),
  severity: (v) => toneForStatus(String(v))
};

export default function ReportBuilder() {
  const [sourceId, setSourceId] = useState(sources[0].id);
  const [selected, setSelected] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(sources.map((s) => [s.id, s.columns.slice(0, 4).map((c) => c.key)]))
  );
  const [name, setName] = useState('Custom Gateway Report');
  const [schedule, setSchedule] = useState('Weekly');
  const [format, setFormat] = useState('CSV');
  const [recipients, setRecipients] = useState(`${currentUser.name} (${currentUser.email})`);
  const [dateRange, setDateRange] = useState('Last 7 days');
  const [saved, setSaved] = useState(false);

  const source = sources.find((s) => s.id === sourceId) ?? sources[0];
  const keys = selected[source.id] ?? [];

  const toggle = (key: string) => {
    setSelected((sel) => {
      const current = sel[source.id] ?? [];
      return { ...sel, [source.id]: current.includes(key) ? current.filter((k) => k !== key) : [...current, key] };
    });
    setSaved(false);
  };

  const tableColumns: Column<Record<string, unknown>>[] = source.columns
    .filter((c) => keys.includes(c.key))
    .map((c) => ({
      key: c.key,
      label: c.label,
      tone: columnTones[c.key] ? (row) => columnTones[c.key](row[c.key]) : undefined
    }));

  const previewRows = useMemo(() => source.rows.slice(0, 6), [source]);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Governance"
        title="Custom Report Builder"
        description="Compose a bespoke report from control-plane data sources, pick columns and filters, then schedule delivery."
        actions={
          <>
            <PrimaryButton href="/reports/create">Create from template</PrimaryButton>
            <SecondaryButton href="/reports">Back to reports</SecondaryButton>
          </>
        }
      />
      <ModuleNav items={reportsNavItems} active="/reports/custom" />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Card>
            <CardHeader title="Data source" subtitle="Choose the control-plane dataset for this report" />
            <CardBody>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {sources.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSourceId(s.id)}
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                      source.id === s.id ? 'border-sentinel-500/50 bg-sentinel-500/10' : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'
                    }`}
                  >
                    <Database className={`h-4 w-4 shrink-0 ${source.id === s.id ? 'text-sentinel-300' : 'text-slate-500'}`} />
                    <div className="min-w-0">
                      <p className={`truncate text-xs font-semibold ${source.id === s.id ? 'text-white' : 'text-slate-300'}`}>{s.label}</p>
                      <p className="mt-0.5 text-[0.65rem] text-slate-500">{s.rows.length.toLocaleString()} records</p>
                    </div>
                  </button>
                ))}
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Columns" subtitle="Select the fields included in the report" action={<Badge label={`${keys.length} selected`} tone="blue" />} />
            <CardBody>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {source.columns.map((c) => {
                  const on = keys.includes(c.key);
                  return (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => toggle(c.key)}
                      className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-2.5 text-left transition ${
                        on ? 'border-sentinel-500/40 bg-sentinel-500/10' : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05]'
                      }`}
                    >
                      <span className={`text-xs font-medium ${on ? 'text-white' : 'text-slate-400'}`}>{c.label}</span>
                      <span className={`flex h-4.5 w-4.5 items-center justify-center rounded-md border transition ${on ? 'border-sentinel-500 bg-sentinel-500' : 'border-white/20'}`}>
                        {on ? <Check className="h-3 w-3 text-white" /> : null}
                      </span>
                    </button>
                  );
                })}
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Filters" subtitle="Limit the records included in the report" />
            <CardBody>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Date range</label>
                  <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className={`${inputCls} mt-2 appearance-none`}>
                    {['Last 24 hours', 'Last 7 days', 'Last 30 days', 'This quarter', 'Custom'].map((r) => (
                      <option key={r} value={r} className="bg-slate-950">{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Filter condition</label>
                  <select className={`${inputCls} mt-2 appearance-none`} defaultValue="No filter">
                    {['No filter', 'Category equals', 'Status equals', 'Risk level above'].map((f) => (
                      <option key={f} value={f} className="bg-slate-950">{f}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="space-y-5">
          <Card>
            <CardHeader title="Configuration" subtitle="Naming, format and delivery" />
            <CardBody className="space-y-4">
              <div>
                <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Report name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className={`${inputCls} mt-2`} />
              </div>
              <div>
                <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Format</label>
                <select value={format} onChange={(e) => setFormat(e.target.value)} className={`${inputCls} mt-2 appearance-none`}>
                  {['CSV', 'PDF', 'JSON'].map((f) => (
                    <option key={f} value={f} className="bg-slate-950">{f}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Schedule</label>
                <select value={schedule} onChange={(e) => setSchedule(e.target.value)} className={`${inputCls} mt-2 appearance-none`}>
                  {['On-demand', 'Daily', 'Weekly', 'Monthly'].map((f) => (
                    <option key={f} value={f} className="bg-slate-950">{f}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Recipients</label>
                <input value={recipients} onChange={(e) => setRecipients(e.target.value)} className={`${inputCls} mt-2`} />
              </div>
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <p className={`text-[0.65rem] ${saved ? 'font-semibold text-emerald-300' : 'text-slate-500'}`}>
                  {saved ? 'Report definition saved' : `${keys.length} columns · ${schedule}`}
                </p>
                <button
                  type="button"
                  onClick={() => setSaved(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
                >
                  <Save className="h-3.5 w-3.5" /> {saved ? 'Saved' : 'Save draft'}
                </button>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Live preview" subtitle={`${source.label} — first rows`} action={<Filter className="h-4 w-4 text-slate-500" />} />
            <CardBody>
              <DataTable columns={tableColumns} rows={previewRows} searchable={false} pageSize={6} />
            </CardBody>
          </Card>
          {saved ? (
            <p className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-300">
              Draft saved. <Link href="/reports" className="font-semibold underline underline-offset-2">Open reports</Link> to configure it further.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
