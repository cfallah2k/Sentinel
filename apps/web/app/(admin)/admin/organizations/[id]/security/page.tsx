import { AdminShell } from '@/components/admin/page-shell';
import { OrgShell, findAdminOrg, usersForOrg } from '@/components/admin/org-shell';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/ui/stat-card';
import { ShieldAlert, ShieldCheck, KeyRound, Lock } from 'lucide-react';
import { auditLogs } from '@/lib/mock-data';
import { resultTone, AuditTable } from '@/components/admin/sections';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const org = findAdminOrg(id);
  const users = usersForOrg(org.id);
  const idx = users.length || 1;
  const events = auditLogs.filter((l, i) => (i + idx) % auditLogs.length < idx).slice(0, 10);
  const failed = events.filter((e) => e.result === 'Denied').length;
  return (
    <AdminShell>
      <OrgShell id={org.id} active="security">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Auth Events" value={events.length} icon={KeyRound} accent="sky" />
          <StatCard label="Denied" value={failed} icon={ShieldAlert} accent="rose" />
          <StatCard label="SSO Configured" value={org.plan === 'Enterprise' ? 'Yes' : 'No'} icon={ShieldCheck} accent="green" />
          <StatCard label="MFA Enforced" value={org.status === 'Suspended' ? 'No' : 'Yes'} icon={Lock} accent="cyan" />
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader title="User Roles" subtitle="Role distribution for this tenant" />
            <CardBody className="space-y-3">
              {['OWNER', 'ADMIN', 'MEMBER'].map((role) => {
                const count = users.filter((u) => u.role === role).length;
                return (
                  <div key={role} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-2.5 text-xs">
                    <span className="text-slate-300">{role}</span>
                    <span className="flex items-center gap-2">
                      <Badge label={String(count)} tone={role === 'OWNER' ? 'violet' : role === 'ADMIN' ? 'blue' : 'slate'} />
                    </span>
                  </div>
                );
              })}
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Recent Security Events" subtitle="Latest authentication results" />
            <CardBody className="space-y-2">
              {events.slice(0, 6).map((e) => (
                <div key={e.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-2.5 text-xs">
                  <div>
                    <p className="font-medium text-white">{e.action}</p>
                    <p className="mt-0.5 text-slate-500">{e.resource} · {e.timestamp}</p>
                  </div>
                  <Badge label={e.result} tone={resultTone(e.result)} />
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
        <AuditTable rows={events} title="Security Audit Trail" subtitle={`Filtered to this tenant (${events.length} events)`} />
      </OrgShell>
    </AdminShell>
  );
}