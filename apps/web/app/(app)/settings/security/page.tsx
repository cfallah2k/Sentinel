import { ShieldCheck, ShieldAlert } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ProgressBar, Metric } from '@/components/ui/progress';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { DataTable, type Column } from '@/components/ui/data-table';
import { currentUser, auditLogs } from '@/lib/mock-data';

type AuthRow = {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  result: string;
  ip: string;
  context: string;
};

export default function Page() {
  const authEvents: AuthRow[] = auditLogs
    .filter((l) => l.action.startsWith('auth.'))
    .slice(0, 10)
    .map((l) => ({ ...l }));

  const columns: Column<AuthRow>[] = [
    { key: 'timestamp', label: 'Time', sortValue: (r) => r.timestamp, render: (r) => `${r.timestamp.slice(0, 10)} ${r.timestamp.slice(11, 16)}Z` },
    { key: 'action', label: 'Event', render: (r) => <span className="font-mono text-slate-400">{r.action}</span> },
    { key: 'actor', label: 'Actor' },
    { key: 'result', label: 'Result', tone: (r) => toneForStatus(r.result) },
    { key: 'ip', label: 'IP', render: (r) => <span className="font-mono text-slate-500">{r.ip}</span> },
    { key: 'context', label: 'Context' }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Platform"
        title="Security"
        description="Security posture, MFA status and authentication activity."
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader title="Security score" subtitle="Computed from 24 controls" action={<Badge label="84 / 100" tone="green" />} />
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/25 bg-emerald-500/10 text-xl font-bold text-emerald-300">
                84
              </div>
              <div className="flex-1 space-y-2">
                <ProgressBar value={84} color="bg-emerald-400" />
                <p className="text-[0.65rem] text-slate-500">+6 points in the last 30 days</p>
              </div>
            </div>
            <div className="mt-5 space-y-2.5">
              {[
                { label: 'MFA enforced for admins', ok: true },
                { label: 'SSO required', ok: true },
                { label: 'Password rotation < 90d', ok: true },
                { label: 'Session timeout < 8h', ok: false }
              ].map((c) => (
                <div key={c.label} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-2.5">
                  <span className="text-xs text-slate-300">{c.label}</span>
                  <Badge label={c.ok ? 'Pass' : 'Improve'} tone={c.ok ? 'green' : 'amber'} />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="MFA posture" subtitle="Multi-factor enrollment across the org" />
          <CardBody className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                <span className="text-xs text-slate-300">Your account</span>
              </div>
              <Badge label="Enrolled" tone="green" />
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <span className="text-xs text-slate-300">Members with MFA</span>
              <span className="text-sm font-semibold text-white">7 / 10</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="h-4 w-4 text-amber-300" />
                <span className="text-xs text-slate-300">Members without MFA</span>
              </div>
              <Badge label="3 flagged" tone="amber" />
            </div>
            <ProgressBar value={70} color="bg-emerald-400" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Session & sign-in" />
          <CardBody className="space-y-3">
            {[
              { label: 'Last sign-in', value: currentUser.lastLogin.slice(0, 10) },
              { label: 'Active sessions', value: '4' },
              { label: 'Password age', value: '42 days' },
              { label: 'Recovery codes', value: '8 remaining' }
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                <span className="text-xs text-slate-400">{s.label}</span>
                <span className="text-sm font-semibold text-white">{s.value}</span>
              </div>
            ))}
            <div className="rounded-2xl border border-sentinel-500/20 bg-sentinel-500/5 px-4 py-3">
              <Metric label="Failed logins (30d)" value="6" />
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Recent authentication events" subtitle="Logins, MFA challenges and session activity" />
        <CardBody>
          <DataTable columns={columns} rows={authEvents} searchable={false} pageSize={8} />
        </CardBody>
      </Card>
    </div>
  );
}