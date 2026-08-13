import { ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { rolePermissions, roleOptions } from '@/lib/mock-data';

export default function Page() {
  const roles = Object.entries(rolePermissions);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Role Settings"
        description="Define roles, their scope and how members are assigned."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Roles" value={roles.length} icon={ShieldCheck} accent="sky" sub="Assignable scopes" />
        <StatCard label="Permissions" value={new Set(roles.flatMap(([, p]) => p)).size} icon={ShieldCheck} accent="cyan" sub="Unique capabilities" />
        <StatCard label="Customizable" value="4" icon={ShieldCheck} accent="amber" sub="Roles that can be edited" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {roles.map(([role, perms]) => (
          <Card key={role}>
            <CardHeader
              title={role}
              subtitle={`${perms.length} permissions · ${roleOptions.length} assignable`}
              action={<Badge label={role === 'OWNER' ? 'Fixed' : 'Editable'} tone={role === 'OWNER' ? 'slate' : 'blue'} />}
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
        ))}
      </div>
    </div>
  );
}