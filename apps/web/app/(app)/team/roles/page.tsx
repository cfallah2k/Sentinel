import { ShieldCheck, Users } from 'lucide-react';
import Link from 'next/link';
import { PageHeader, PrimaryButton } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { teamMembers, rolePermissions, roleOptions } from '@/lib/mock-data';

export default function Page() {
  const roles = Object.entries(rolePermissions);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Roles"
        description="Predefined roles define what each member can access in Sentinel."
        actions={<PrimaryButton href="/team/permissions">View Permissions</PrimaryButton>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Roles" value={roles.length} icon={ShieldCheck} accent="sky" sub="Predefined scopes" />
        <StatCard label="Permissions" value={new Set(roles.flatMap(([, p]) => p)).size} icon={ShieldCheck} accent="cyan" sub="Unique capabilities" />
        <StatCard label="Assigned Members" value={teamMembers.length} icon={Users} accent="green" sub="Active roles in use" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {roles.map(([role, perms]) => {
          const members = teamMembers.filter((m) => m.role === role);
          return (
            <Link key={role} href={`/team/roles/${role.toLowerCase()}`} className="rounded-3xl border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl transition hover:border-sentinel-500/40">
              <div className="flex items-center justify-between">
                <Badge label={role} tone="blue" />
                <span className="text-[0.65rem] text-slate-500">{members.length} members</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {perms.slice(0, 6).map((p) => (
                  <span key={p} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[0.65rem] text-slate-300">
                    {p}
                  </span>
                ))}
                {perms.length > 6 ? (
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[0.65rem] text-slate-500">
                    +{perms.length - 6} more
                  </span>
                ) : null}
              </div>
            </Link>
          );
        })}
      </div>

      <Card>
        <CardHeader title="Role definitions" subtitle="Reference for all assignable roles" />
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">Role</th>
                  <th className="px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">Capabilities</th>
                  <th className="px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">Members</th>
                </tr>
              </thead>
              <tbody>
                {roleOptions.map((r) => (
                  <tr key={r} className="border-b border-white/5 text-xs text-slate-300">
                    <td className="px-4 py-3 font-semibold text-slate-200">{r}</td>
                    <td className="px-4 py-3 text-slate-400">{(rolePermissions[r] ?? []).length} permissions</td>
                    <td className="px-4 py-3 text-slate-400">{teamMembers.filter((m) => m.role === r).length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}