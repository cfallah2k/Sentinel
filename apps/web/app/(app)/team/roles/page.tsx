import { Building2, ShieldCheck, Users } from 'lucide-react';
import Link from 'next/link';
import { PageHeader, PrimaryButton } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  teamMembers,
  rolePermissions,
  accountRoleOptions,
  assignableRoleOptions,
  roleLabel,
  roleDescriptions,
  isAccountRole,
  currentOrg
} from '@/lib/mock-data';

export default function Page() {
  const accountRoles = accountRoleOptions.filter((r) => rolePermissions[r]);
  const seatRoles = assignableRoleOptions.filter((r) => rolePermissions[r]);

  const renderRoleCard = (role: string, accountLevel: boolean) => {
    const perms = rolePermissions[role] ?? [];
    const members = teamMembers.filter((m) => m.role === role);
    return (
      <Link key={role} href={`/team/roles/${role.toLowerCase()}`} className="rounded-3xl border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl transition hover:border-sentinel-500/40">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge label={roleLabel(role)} tone="blue" />
            {accountLevel ? (
              <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-violet-300">
                Account-level
              </span>
            ) : (
              <span className="rounded-full border border-sentinel-500/30 bg-sentinel-500/10 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-sentinel-300">
                Seat
              </span>
            )}
          </div>
          <span className="text-[0.65rem] text-slate-500">{members.length} member{members.length === 1 ? '' : 's'}</span>
        </div>
        <p className="mt-3 text-xs leading-6 text-slate-300">{roleDescriptions[role] ?? ''}</p>
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
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Roles"
        description="Account roles belong to the account itself; seat roles are assigned to members within it."
        actions={<PrimaryButton href="/team/permissions">View Permissions</PrimaryButton>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Seat Roles" value={seatRoles.length} icon={ShieldCheck} accent="sky" sub="Assignable to members" />
        <StatCard label="Account Roles" value={accountRoles.length} icon={Building2} accent="violet" sub="Owned by the account" />
        <StatCard label="Assigned Members" value={teamMembers.length} icon={Users} accent="green" sub="Seats in use" />
      </div>

      <div>
        <Card>
          <CardHeader
            title="Account roles"
            subtitle={`${accountRoles.length} roles — held by ${currentOrg.name} itself, not assignable by invitation`}
          />
          <CardBody>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {accountRoles.map((role) => renderRoleCard(role, true))}
            </div>
          </CardBody>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader
            title="Seat roles"
            subtitle={`${seatRoles.length} roles — assigned to members inside the ${currentOrg.name} account`}
          />
          <CardBody>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {seatRoles.map((role) => renderRoleCard(role, false))}
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Role definitions" subtitle="Reference for all roles in Sentinel" />
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">Role</th>
                  <th className="px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">Type</th>
                  <th className="px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">Description</th>
                  <th className="px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">Members</th>
                </tr>
              </thead>
              <tbody>
                {[...accountRoles, ...seatRoles].map((r) => (
                  <tr key={r} className="border-b border-white/5 text-xs text-slate-300">
                    <td className="px-4 py-3 font-semibold text-slate-200">{roleLabel(r)}</td>
                    <td className="px-4 py-3">
                      <Badge label={isAccountRole(r) ? 'Account' : 'Seat'} tone={isAccountRole(r) ? 'violet' : 'blue'} />
                    </td>
                    <td className="px-4 py-3 text-slate-400">{roleDescriptions[r] ?? ''}</td>
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