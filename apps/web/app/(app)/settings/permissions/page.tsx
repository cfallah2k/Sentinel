import { KeyRound } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { rolePermissions, roleOptions, roleLabel } from '@/lib/mock-data';

export default function Page() {
  const perms = [...new Set(Object.values(rolePermissions).flat())].sort();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform"
        title="Permission Settings"
        description="Govern what each role can access. Changes take effect immediately."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Permissions" value={perms.length} icon={KeyRound} accent="sky" sub="Capability catalog" />
        <StatCard label="Roles" value={roleOptions.length} icon={KeyRound} accent="cyan" sub="Scopes in use" />
        <StatCard label="Audited" value="100%" icon={KeyRound} accent="green" sub="Every check is logged" />
      </div>

      <Card>
        <CardHeader title="Capability catalog" subtitle="All permission keys in the platform" />
        <CardBody>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {perms.map((p) => {
              const holders = roleOptions.filter((r) => (rolePermissions[r] ?? []).includes(p));
              return (
                <div key={p} className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                  <p className="font-mono text-xs text-slate-200">{p}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {holders.map((h) => (
                      <Badge key={h} label={roleLabel(h)} tone="blue" />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}