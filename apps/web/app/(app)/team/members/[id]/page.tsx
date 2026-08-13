import { notFound } from 'next/navigation';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { Badge, toneForStatus } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { teamMembers, rolePermissions, auditLogs } from '@/lib/mock-data';

type ActivityRow = {
  id: string;
  timestamp: string;
  action: string;
  resource: string;
  result: string;
  context: string;
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = teamMembers.find((m) => m.id === id);
  if (!member) notFound();

  const initials = member.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2);

  const activity: ActivityRow[] = auditLogs
    .filter((l) => l.actor === member.email)
    .slice(0, 8)
    .map((l) => ({ ...l }));

  const columns: Column<ActivityRow>[] = [
    { key: 'timestamp', label: 'Time', sortValue: (r) => r.timestamp, render: (r) => `${r.timestamp.slice(0, 10)} ${r.timestamp.slice(11, 16)}Z` },
    { key: 'action', label: 'Action', render: (r) => <span className="font-mono text-slate-400">{r.action}</span> },
    { key: 'resource', label: 'Resource', render: (r) => <span className="font-mono text-slate-500">{r.resource}</span> },
    { key: 'result', label: 'Result', tone: (r) => toneForStatus(r.result) },
    { key: 'context', label: 'Context' }
  ];

  return (
    <div className="space-y-6">
      <Link href="/team/members" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition hover:text-slate-200">
        <ArrowLeft className="h-3.5 w-3.5" /> Members
      </Link>
      <PageHeader
        eyebrow="Platform"
        title={member.name}
        description={member.email}
        actions={<Badge label={member.status} tone={toneForStatus(member.status)} />}
      />

      <div className="flex flex-wrap items-center gap-4 rounded-3xl border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-sentinel-500/25 bg-sentinel-500/10 text-lg font-bold text-sentinel-300">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base font-semibold text-white">{member.name}</h2>
            <Badge label={member.role} tone="blue" />
          </div>
          <p className="mt-0.5 text-xs text-slate-400">
            Last active {member.lastActive === '—' ? 'never' : `${member.lastActive.slice(0, 10)} ${member.lastActive.slice(11, 16)}Z`}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge label={member.mfa ? 'MFA Enabled' : 'MFA Off'} tone={member.mfa ? 'green' : 'slate'} />
          <Badge label="2FA enrolled" tone={member.mfa ? 'green' : 'amber'} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Role permissions" subtitle={`What ${member.role} can do in Sentinel`} />
          <CardBody>
            <div className="flex flex-wrap gap-1.5">
              {(rolePermissions[member.role] ?? []).map((p) => (
                <span key={p} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[0.65rem] text-slate-300">
                  {p}
                </span>
              ))}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Access summary" />
          <CardBody className="space-y-3">
            {[
              { label: 'Applications', value: '14' },
              { label: 'AI Systems', value: '6' },
              { label: 'Data Sources', value: '8' },
              { label: 'Policies', value: '10' }
            ].map((a) => (
              <div key={a.label} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                <span className="text-xs text-slate-400">{a.label}</span>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
                  <ShieldCheck className="h-3.5 w-3.5 text-sentinel-300" />
                  {a.value}
                </span>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Recent activity" subtitle="Audit events attributed to this member" />
        <CardBody>
          <DataTable columns={columns} rows={activity} searchable={false} pageSize={8} />
        </CardBody>
      </Card>
    </div>
  );
}