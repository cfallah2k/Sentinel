'use client';

import { useState } from 'react';
import { Download, FileJson, FileSpreadsheet, FileText, RefreshCw } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { ModuleNav } from '@/components/governance/module-nav';
import { auditNavItems } from '@/components/governance/audit-helpers';
import { auditLogs } from '@/lib/mock-data';

const formats = [
  { id: 'PDF', icon: FileText },
  { id: 'CSV', icon: FileSpreadsheet },
  { id: 'JSON', icon: FileJson }
];

const historyRows = auditLogs
  .filter((l) => l.action === 'export.run')
  .map((l) => ({
    ...l,
    format: 'JSON',
    scope: l.resource,
    exportId: `exp-${l.id.replace('log-', '')}`,
    duration: '1.2s',
    size: '840 KB',
    status: l.result
  }));

const scheduledExports = [
  { id: 'exp-s1', scope: 'Security events', format: 'PDF', schedule: 'Weekly', nextRun: '2026-08-20', status: 'Scheduled' },
  { id: 'exp-s2', scope: 'All audit events', format: 'CSV', schedule: 'Monthly', nextRun: '2026-09-01', status: 'Scheduled' },
  { id: 'exp-s3', scope: 'Policy events', format: 'JSON', schedule: 'On-demand', nextRun: '—', status: 'Ready' }
];

export default function Page() {
  const [format, setFormat] = useState('PDF');
  const [range, setRange] = useState('30d');
  const [retention, setRetention] = useState('90 days');
  const [scheduled, setScheduled] = useState(true);
  const [frequency, setFrequency] = useState('Weekly');
  const [saved, setSaved] = useState(false);

  const rows = [...scheduledExports.map((e) => ({ ...e })), ...historyRows.map((h) => ({ ...h, schedule: h.action, nextRun: h.timestamp.slice(0, 10) }))];
  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'id', label: 'Export', sortValue: (r) => r.id },
    { key: 'scope', label: 'Scope', sortValue: (r) => r.scope },
    { key: 'format', label: 'Format', sortValue: (r) => r.format },
    { key: 'schedule', label: 'Schedule', sortValue: (r) => r.schedule },
    { key: 'nextRun', label: 'Run / next', sortValue: (r) => r.nextRun },
    {
      key: 'status',
      label: 'Status',
      sortValue: (r) => r.status,
      render: (r) => <Badge label={String(r.status)} tone={toneForStatus(String(r.status))} />
    }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Governance"
        title="Audit Export"
        description="Configure audit log exports, retention and scheduled deliveries to external systems."
      />
      <ModuleNav items={auditNavItems} active="/audit/export" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Scheduled exports" value={scheduledExports.filter((e) => e.status === 'Scheduled').length} delta={0} deltaLabel="active" icon={RefreshCw} accent="sky" />
        <StatCard label="Completed runs" value={historyRows.length} delta={50} deltaLabel="this week" icon={Download} accent="green" />
        <StatCard label="Retention" value={retention} delta={0} deltaLabel="configured" icon={FileText} accent="amber" />
        <StatCard label="Formats" value={3} delta={0} deltaLabel="supported" icon={FileJson} accent="violet" />
      </div>
      <Card>
        <CardHeader title="Export configuration" subtitle="One-time and scheduled export settings" />
        <CardBody>
          <div className="space-y-6">
            <div>
              <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Format</label>
              <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {formats.map((f) => {
                  const Icon = f.icon;
                  const active = format === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFormat(f.id)}
                      className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                        active ? 'border-sentinel-500/50 bg-sentinel-500/10' : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'
                      }`}
                    >
                      <Icon size={16} className={active ? 'text-sentinel-300' : 'text-slate-500'} />
                      <span className={`text-xs font-semibold ${active ? 'text-white' : 'text-slate-400'}`}>{f.id}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Date range</label>
                <select value={range} onChange={(e) => setRange(e.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-sentinel-500/60">
                  {['24h', '7d', '30d', '90d', 'Custom'].map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Retention</label>
                <select value={retention} onChange={(e) => setRetention(e.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-sentinel-500/60">
                  {['30 days', '90 days', '1 year', '7 years'].map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold text-white">Scheduled exports</p>
                <p className="mt-0.5 text-[0.65rem] text-slate-500">Deliver audit exports automatically on a cadence</p>
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  disabled={!scheduled}
                  className="rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-2.5 text-xs text-slate-200 outline-none transition focus:border-sentinel-500/60 disabled:opacity-40"
                >
                  {['Daily', 'Weekly', 'Monthly'].map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setScheduled((v) => !v)}
                  className={`relative h-6 w-11 rounded-full transition ${scheduled ? 'bg-sentinel-500' : 'bg-white/10'}`}
                  aria-label="Toggle scheduled exports"
                >
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${scheduled ? 'left-[22px]' : 'left-0.5'}`} />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-white/5 pt-5">
              <p className="text-[0.65rem] text-slate-500">{saved ? 'Configuration saved and scheduled exports updated.' : 'Changes apply to future export runs.'}</p>
              <button
                type="button"
                onClick={() => setSaved(true)}
                className="inline-flex items-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
              >
                <Download size={14} /> Save Configuration
              </button>
            </div>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Export history & schedule" subtitle="Completed runs and upcoming deliveries" />
        <CardBody>
          <DataTable columns={columns} rows={rows} searchPlaceholder="Search exports..." initialSort={{ key: 'nextRun', dir: 'desc' }} />
        </CardBody>
      </Card>
    </div>
  );
}