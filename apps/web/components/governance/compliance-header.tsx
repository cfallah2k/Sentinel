import { Badge, toneForStatus } from '@/components/ui/badge';
import { ModuleNav, type NavItem } from './module-nav';
import type { ComplianceFramework } from '@/lib/mock-data';

export const complianceNavItems: NavItem[] = [
  { href: '/compliance/overview', label: 'Overview' },
  { href: '/compliance/frameworks', label: 'Frameworks' },
  { href: '/compliance/requirements', label: 'Requirements' },
  { href: '/compliance/controls', label: 'Controls' },
  { href: '/compliance/evidence', label: 'Evidence' },
  { href: '/compliance/gaps', label: 'Gaps' },
  { href: '/compliance/findings', label: 'Findings' },
  { href: '/compliance/remediation', label: 'Remediation' },
  { href: '/compliance/audits', label: 'Audits' },
  { href: '/compliance/reports', label: 'Reports' }
];

export function frameworkNavItems(id: string): NavItem[] {
  return [
    { href: `/compliance/frameworks/${id}`, label: 'Overview' },
    { href: `/compliance/frameworks/${id}/requirements`, label: 'Requirements' },
    { href: `/compliance/frameworks/${id}/controls`, label: 'Controls' },
    { href: `/compliance/frameworks/${id}/evidence`, label: 'Evidence' },
    { href: `/compliance/frameworks/${id}/gaps`, label: 'Gaps' },
    { href: `/compliance/frameworks/${id}/report`, label: 'Report' }
  ];
}

export function ComplianceModuleHeader({
  eyebrow = 'Governance',
  title,
  description,
  active
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  active: string;
}) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-sentinel-300">{eyebrow}</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h1>
          {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{description}</p> : null}
        </div>
      </div>
      <ModuleNav items={complianceNavItems} active={active} />
    </div>
  );
}

export function ComplianceFrameworkHeader({ framework, active }: { framework: ComplianceFramework; active: string }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-sentinel-300">Governance · Compliance</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{framework.name}</h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            {framework.standard} · next audit {framework.nextAudit}
          </p>
        </div>
        <Badge label={framework.status} tone={toneForStatus(framework.status)} />
      </div>
      <ModuleNav items={frameworkNavItems(framework.id)} active={active} />
    </div>
  );
}
