import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  aiSystems,
  governmentAgencies,
  governmentRegistry,
  incidents,
  platformOrganizations
} from '@/lib/mock-data';

export function DetailNav({ base, items, active }: { base: string; items: { href: string; label: string }[]; active?: string }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => {
        const isActive = item.label.toLowerCase() === active;
        return (
          <Link
            key={item.href}
            href={`${base}/${item.href}`}
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
  );
}

export function ProfileShell({
  eyebrow,
  title,
  subtitle,
  badges,
  nav,
  base,
  active,
  children
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  badges?: ReactNode;
  nav: { href: string; label: string }[];
  base: string;
  active: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-sentinel-300">{eyebrow}</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h1>
        {subtitle ? <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{subtitle}</p> : null}
        {badges ? <div className="mt-3 flex flex-wrap gap-2">{badges}</div> : null}
      </div>
      <DetailNav base={base} items={nav} active={active} />
      {children}
    </div>
  );
}

export const organizationNav = [
  { href: 'overview', label: 'Overview' },
  { href: 'ai-systems', label: 'AI Systems' },
  { href: 'providers', label: 'Providers' },
  { href: 'models', label: 'Models' },
  { href: 'data', label: 'Data' },
  { href: 'risk', label: 'Risk' },
  { href: 'incidents', label: 'Incidents' },
  { href: 'compliance', label: 'Compliance' },
  { href: 'audit', label: 'Audit' },
  { href: 'reports', label: 'Reports' }
];

export const agencyNav = [
  { href: 'overview', label: 'Overview' },
  { href: 'ai-systems', label: 'AI Systems' },
  { href: 'applications', label: 'Applications' },
  { href: 'providers', label: 'Providers' },
  { href: 'data', label: 'Data' },
  { href: 'risk', label: 'Risk' },
  { href: 'incidents', label: 'Incidents' },
  { href: 'compliance', label: 'Compliance' },
  { href: 'audit', label: 'Audit' },
  { href: 'reports', label: 'Reports' }
];

export const registryNav = [
  { href: 'overview', label: 'Overview' },
  { href: 'operator', label: 'Operator' },
  { href: 'purpose', label: 'Purpose' },
  { href: 'data', label: 'Data' },
  { href: 'provider', label: 'Provider' },
  { href: 'risk', label: 'Risk' },
  { href: 'compliance', label: 'Compliance' },
  { href: 'audit', label: 'Audit' }
];

export function findOrg(id: string) {
  return platformOrganizations.find((o) => o.id === id) ?? platformOrganizations[0];
}

export function findAgency(id: string) {
  return governmentAgencies.find((a) => a.id === id) ?? governmentAgencies[0];
}

export function findRegistry(id: string) {
  return governmentRegistry.find((r) => r.id === id) ?? governmentRegistry[0];
}

export function circularSlice<T>(list: T[], start: number, count: number): T[] {
  const n = Math.min(count, list.length);
  const out: T[] = [];
  for (let i = 0; i < n; i++) out.push(list[(start + i) % list.length]);
  return out;
}

export function orgIdx(orgId: string) {
  return Math.max(0, platformOrganizations.findIndex((o) => o.id === orgId));
}

export function agencyIdx(agencyId: string) {
  return Math.max(0, governmentAgencies.findIndex((a) => a.id === agencyId));
}

export function systemsForOrg(orgId: string) {
  return circularSlice(aiSystems, orgIdx(orgId) * 2, 6);
}

export function systemsForAgency(agencyId: string) {
  const agency = findAgency(agencyId);
  return circularSlice(aiSystems, agencyIdx(agencyId) * 2, Math.min(6, Math.max(2, Math.round(agency.systems / 5))));
}

export function incidentsForOrg(orgId: string) {
  const ids = systemsForOrg(orgId).map((s) => s.id);
  return incidents.filter((i) => ids.includes(i.systemId));
}

export function incidentsForAgency(agencyId: string) {
  const ids = systemsForAgency(agencyId).map((s) => s.id);
  return incidents.filter((i) => ids.includes(i.systemId));
}

export function registryRowsForOrg(orgId: string) {
  const org = findOrg(orgId);
  const token = org.name.split(' ')[0].toLowerCase();
  const matched = governmentRegistry.filter((r) => r.operator.toLowerCase().includes(token));
  return matched.length ? matched : circularSlice(governmentRegistry, orgIdx(orgId) * 2, 4);
}

export function registryRowsForAgency(agencyId: string) {
  return governmentRegistry.filter((r) => r.agencyId === agencyId);
}