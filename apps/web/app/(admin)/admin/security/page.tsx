import { PageHeader } from '@/components/ui/page-header';
import { AdminShell } from '@/components/admin/page-shell';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert, ShieldCheck, KeyRound, Lock } from 'lucide-react';
import { auditLogs, platformUsers } from '@/lib/mock-data';
import { resultTone, AuditTable } from '@/components/admin/sections';

export default function Page() {
  const authEvents = auditLogs.filter((l) => l.resource === 'auth' || l.action.includes('Login'));
  const denied = authEvents.filter((e) => e.result === 'Denied').length;
  const mfaEnabled = platformUsers.filter((u) => u.status === 'Active').length;
  return (
    <AdminShell>
      <PageHeader
        eyebrow="Admin"
        title="Platform Security"
        description="Authentication, access control, and security posture across the platform."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Auth Events" value={authEvents.length} icon={KeyRound} accent="sky" />
        <StatCard label="Denied Attempts" value={denied} icon={ShieldAlert} accent="rose" />
        <StatCard label="Active Sessions" value={mfaEnabled} icon={ShieldCheck} accent="green" />
        <StatCard label="MFA Enforced" value="All tenants" icon={Lock} accent="cyan" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Security Posture" subtitle="Platform-wide controls and enforcement state" />
          <CardBody className="space-y-3">
            {[
              { name: 'MFA for all admin roles', enabled: true },
              { name: 'SCIM provisioning', enabled: true },
              { name: 'IP allow-listing', enabled: false },
              { name: 'Automated suspension after 5 failed logins', enabled: true },
              { name: 'Weekly credential rotation', enabled: false }
            ].map((c) => (
              <div key={c.name} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3 text-xs">
                <span className="text-slate-300">{c.name}</span>
                <Badge label={c.enabled ? 'Enabled' : 'Disabled'} tone={c.enabled ? 'green' : 'slate'} />
              </div>
            ))}
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Recent Auth Events" subtitle="Latest authentication results" />
          <CardBody className="space-y-2">
            {authEvents.slice(-6).map((e) => (
              <div key={e.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-2.5 text-xs">
                <div>
                  <p className="font-medium text-white">{e.action}</p>
                  <p className="mt-0.5 text-slate-500">{e.actor} · {e.timestamp}</p>
                </div>
                <Badge label={e.result} tone={resultTone(e.result)} />
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
      <AuditTable rows={authEvents} title="Security Events" subtitle={`Authentication and access audit (${authEvents.length} events)`} />
    </AdminShell>
  );
}