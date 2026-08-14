import { notFound } from 'next/navigation';
import { ArrowLeft, Building2, ShieldCheck, Users } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { teamMembers, rolePermissions, roleOptions, roleLabel, roleDescriptions, isAccountRole } from '@/lib/mock-data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const role = roleOptions.find((r) => r.toLowerCase() === id);
  if (!role) notFound();

  const perms = rolePermissions[role] ?? [];
  const members = teamMembers.filter((m) => m.role === role);
  const accountLevel = isAccountRole(role);

  return (
    <div className="space-y-6">
      <Link href="/team/roles" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition hover:text-slate-200">
        <ArrowLeft className="h-3.5 w-3.5" /> Roles
      </Link>
      <PageHeader
        eyebrow="Platform"
        title={roleLabel(role)}
        description={roleDescriptions[role] ?? `Capabilities granted to the ${role} role.`}
        actions={
          <div className="flex items-center gap-2">
            <Badge label={accountLevel ? 'Account-level' : 'Seat'} tone={accountLevel ? 'violet' : 'blue'} />
            <Badge label={`${members.length} members`} tone="slate" />
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Permissions" subtitle={`${perms.length} capabilities in scope`} />
          <CardBody>
            <div className="flex flex-wrap gap-1.5">
              {perms.map((p) => (
                <span key={p} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[0.65rem] text-slate-300">
                  {p}
                </span>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge label="Granted by default" tone="green" />
              <Badge label="Audit logged" tone="slate" />
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Members with this role" />
          <CardBody className="space-y-2.5">
            {members.length ? (
              members.map((m) => (
                <Link key={m.id} href={`/team/members/${m.id}`} className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 transition hover:bg-white/[0.05]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-sentinel-500/20 bg-sentinel-500/10 text-[0.65rem] font-bold text-sentinel-300">
                    {m.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-slate-200">{m.name}</p>
                    <p className="truncate text-[0.65rem] text-slate-500">{m.email}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-xs text-slate-500">
                {accountLevel ? 'This role belongs to the account itself and has no seats.' : 'No members currently assigned'}
              </p>
            )}
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Role summary" />
        <CardBody>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">Scope</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-200">
                {accountLevel ? (
                  <Building2 className="h-3.5 w-3.5 text-violet-300" />
                ) : (
                  <ShieldCheck className="h-3.5 w-3.5 text-sentinel-300" />
                )}
                {accountLevel ? 'Account-level' : 'Seat role inside the account'}
              </p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">Permission Count</p>
              <p className="mt-1 text-sm text-slate-200">{perms.length}</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">Assigned</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-200">
                <Users className="h-3.5 w-3.5 text-slate-400" /> {members.length} member{members.length === 1 ? '' : 's'}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}