import { Building2, ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  rolePermissions,
  accountRoleOptions,
  assignableRoleOptions,
  roleLabel,
  roleDescriptions,
  isAccountRole
} from '@/lib/mock-data';

export default function Page() {
  const roles = Object.entries(rolePermissions);
  const seatRoles = roles.filter(([r]) => !isAccountRole(r));
  const accountRoles = roles.filter(([r]) => isAccountRole(r));

  const renderRoleCard = ([role, perms]: [string, string[]]) => (
    <Card key={role}>
      <CardHeader
        title={roleLabel(role)}
        subtitle={roleDescriptions[role] ?? `${perms.length} permissions`}
        action={<Badge label={isAccountRole(role) ? 'Account-level' : 'Seat'} tone={isAccountRole(role) ? 'violet' : 'blue'} />}
      />
      <CardBody>
        <div className="flex flex-wrap gap-1.5">
          {perms.slice(0, 8).map((p) => (
            <span key={p} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[0.65rem] text-slate-300">
              {p}
            </span>
          ))}
          {perms.length > 8 ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[0.65rem] text-slate-500">+{perms.length - 8}</span>
          ) : null}
        </div>
      </CardBody>
    </Card>
  );

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Role Settings"
        description="Account roles belong to the account itself; seat roles are assigned to members within it."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Seat Roles" value={seatRoles.length} icon={ShieldCheck} accent="sky" sub="Assignable to members" />
        <StatCard label="Account Roles" value={accountRoles.length} icon={Building2} accent="violet" sub="Owned by the account" />
        <StatCard label="Permissions" value={new Set(roles.flatMap(([, p]) => p)).size} icon={ShieldCheck} accent="cyan" sub="Unique capabilities" />
      </div>

      <div>
        <Card>
          <CardHeader title="Account roles" subtitle="Not assignable by invitation — they represent the account itself" />
          <CardBody>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {accountRoles.map(renderRoleCard)}
            </div>
          </CardBody>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader title="Seat roles" subtitle="Assignable roles offered when inviting members" />
          <CardBody>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {seatRoles.map(renderRoleCard)}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}