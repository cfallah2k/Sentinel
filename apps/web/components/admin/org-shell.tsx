import type { ReactNode } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { orgStatusTone, planTone } from './orgs-table';
import { platformOrganizations, platformUsers } from '@/lib/mock-data';

export const adminOrgNav = [
  { href: 'overview', label: 'Overview' },
  { href: 'users', label: 'Users' },
  { href: 'subscription', label: 'Subscription' },
  { href: 'usage', label: 'Usage' },
  { href: 'security', label: 'Security' },
  { href: 'activity', label: 'Activity' },
  { href: 'audit', label: 'Audit' }
];

export function findAdminOrg(id: string) {
  return platformOrganizations.find((o) => o.id === id) ?? platformOrganizations[0];
}

export function usersForOrg(orgId: string) {
  const org = findAdminOrg(orgId);
  return platformUsers.filter((u) => u.orgId === orgId).length
    ? platformUsers.filter((u) => u.orgId === orgId)
    : platformUsers.slice(0, Math.min(org.users, platformUsers.length));
}

export function OrgShell({ id, active, children }: { id: string; active: string; children: ReactNode }) {
  const org = findAdminOrg(id);
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-sentinel-300">Admin</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{org.name}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            {org.users} users · {org.systems} AI systems · {org.region}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge label={org.plan} tone={planTone(org.plan)} />
            <Badge label={org.status} tone={orgStatusTone(org.status)} />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {adminOrgNav.map((item) => {
          const isActive = item.label.toLowerCase() === active;
          return (
            <Link
              key={item.href}
              href={`/admin/organizations/${org.id}/${item.href}`}
              className={`rounded-full border px-3.5 py-1.5 text-[0.7rem] font-semibold transition ${
                isActive
                  ? 'border-sentinel-500/40 bg-sentinel-500/15 text-sentinel-300'
                  : 'border-white/10 bg-white/[0.04] text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
      {children}
    </div>
  );
}