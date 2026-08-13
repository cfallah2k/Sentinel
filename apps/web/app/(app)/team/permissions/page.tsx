import { ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { rolePermissions, roleOptions } from '@/lib/mock-data';

export default function Page() {
  const perms = [...new Set(Object.values(rolePermissions).flat())].sort();
  const rolesWithPerm = (perm: string) => roleOptions.filter((r) => (rolePermissions[r] ?? []).includes(perm));

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Permissions"
        description="Every capability in the Sentinel platform and which roles receive it."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Permissions" value={perms.length} icon={ShieldCheck} accent="sky" sub="Unique capabilities" />
        <StatCard label="Roles" value={roleOptions.length} icon={ShieldCheck} accent="cyan" sub="Assignable roles" />
        <StatCard label="Coverage" value="100%" icon={ShieldCheck} accent="green" sub="All perms assigned" />
      </div>

      <Card>
        <CardHeader title="Permission matrix" subtitle="Which roles can perform each capability" />
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">Permission</th>
                  {roleOptions.map((r) => (
                    <th key={r} className="px-3 py-3 text-center text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">{r}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {perms.map((p) => (
                  <tr key={p} className="border-b border-white/5 text-xs text-slate-300">
                    <td className="px-4 py-3 font-mono text-slate-200">{p}</td>
                    {roleOptions.map((r) => {
                      const has = (rolePermissions[r] ?? []).includes(p);
                      return (
                        <td key={r} className="px-3 py-3 text-center">
                          {has ? <Badge label="Yes" tone="green" /> : <Badge label="—" tone="slate" />}
                        </td>
                      );
                    })}
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