// Role access model for Sentinel. Standalone (no mock-data dependency) so it can
// run in middleware (edge) as well as client components.

export const ACCOUNT_ROLES = ['OWNER', 'ADMIN'] as const;
export const SEAT_ROLES = ['SECURITY_ANALYST', 'PRIVACY_OFFICER', 'COMPLIANCE_OFFICER', 'DEVELOPER', 'AUDITOR', 'VIEWER'] as const;
export const ALL_ROLES = [...ACCOUNT_ROLES, ...SEAT_ROLES] as const;
export type SentinelRole = (typeof ALL_ROLES)[number];

export const DEFAULT_ROLE: SentinelRole = 'OWNER';

export const DEMO_ROLE_COOKIE = 'sentinel_demo_role';

// Route access map: every protected prefix lists the roles allowed to see it.
// Anything not listed is shared (allowed for every role).
export const ROUTE_ACCESS: Record<string, SentinelRole[]> = {
  '/dashboard': [...ALL_ROLES],
  '/notifications': [...ALL_ROLES],
  '/search': [...ALL_ROLES],
  '/support': [...ALL_ROLES],
  '/settings': [...ALL_ROLES],
  '/ai-systems': ['OWNER', 'ADMIN', 'DEVELOPER'],
  '/applications': ['OWNER', 'ADMIN', 'DEVELOPER'],
  '/providers': ['OWNER', 'ADMIN', 'DEVELOPER'],
  '/models': ['OWNER', 'ADMIN', 'DEVELOPER'],
  '/data-sources': ['OWNER', 'ADMIN', 'DEVELOPER', 'PRIVACY_OFFICER'],
  '/data-flows': ['OWNER', 'ADMIN', 'PRIVACY_OFFICER'],
  '/data-classification': ['OWNER', 'ADMIN', 'PRIVACY_OFFICER'],
  '/ai-passports': ['OWNER', 'ADMIN', 'PRIVACY_OFFICER', 'COMPLIANCE_OFFICER'],
  '/gateway': ['OWNER', 'ADMIN', 'DEVELOPER', 'SECURITY_ANALYST'],
  '/policies': ['OWNER', 'ADMIN', 'SECURITY_ANALYST', 'PRIVACY_OFFICER', 'COMPLIANCE_OFFICER', 'DEVELOPER'],
  '/incidents': ['OWNER', 'ADMIN', 'SECURITY_ANALYST'],
  '/approvals': ['OWNER', 'ADMIN', 'SECURITY_ANALYST'],
  '/risk': ['OWNER', 'ADMIN', 'SECURITY_ANALYST'],
  '/compliance-admin': ['OWNER', 'ADMIN', 'COMPLIANCE_OFFICER'],
  '/audit': ['OWNER', 'ADMIN', 'SECURITY_ANALYST', 'PRIVACY_OFFICER', 'COMPLIANCE_OFFICER', 'AUDITOR'],
  '/reports': ['OWNER', 'ADMIN', 'SECURITY_ANALYST', 'PRIVACY_OFFICER', 'COMPLIANCE_OFFICER', 'AUDITOR'],
  '/integrations-hub': ['OWNER', 'ADMIN', 'DEVELOPER'],
  '/developer-portal': ['OWNER', 'ADMIN', 'DEVELOPER'],
  '/team': ['OWNER', 'ADMIN'],
  '/billing': ['OWNER', 'ADMIN'],
  '/admin': ['OWNER', 'ADMIN'],
  '/government': ['OWNER', 'ADMIN']
};

export function canAccessRoute(role: string, pathname: string): boolean {
  for (const [prefix, roles] of Object.entries(ROUTE_ACCESS)) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return (roles as readonly string[]).includes(role);
    }
  }
  return true;
}

// ---------- Per-role navigation ----------

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

const DASHBOARD: NavItem = { label: 'Dashboard', href: '/dashboard', icon: 'gauge' };
const SETTINGS: NavItem = { label: 'Settings', href: '/settings', icon: 'settings2' };
const NOTIFICATIONS: NavItem = { label: 'Notifications', href: '/notifications', icon: 'sparkles' };
const SEARCH: NavItem = { label: 'Search', href: '/search', icon: 'search' };

const REGISTRY = (items: NavItem[]): NavGroup => ({ label: 'Registry', items });
const DATA_INTEL = (items: NavItem[]): NavGroup => ({ label: 'Data Intelligence', items });
const ENFORCEMENT = (items: NavItem[]): NavGroup => ({ label: 'Enforcement', items });
const GOVERNANCE = (items: NavItem[]): NavGroup => ({ label: 'Governance', items });
const PLATFORM = (items: NavItem[]): NavGroup => ({ label: 'Platform', items });
const ADMINISTRATION = (items: NavItem[]): NavGroup => ({ label: 'Administration', items });

export const NAV_BY_ROLE: Record<string, NavGroup[]> = {
  OWNER: [
    { label: 'Overview', items: [DASHBOARD] },
    REGISTRY([
      { label: 'AI Systems', href: '/ai-systems', icon: 'layers' },
      { label: 'Applications', href: '/applications', icon: 'box' },
      { label: 'Providers', href: '/providers', icon: 'link2' },
      { label: 'Models', href: '/models', icon: 'package' },
      { label: 'Data Sources', href: '/data-sources', icon: 'folder' }
    ]),
    DATA_INTEL([
      { label: 'Data Flows', href: '/data-flows', icon: 'network' },
      { label: 'Classification', href: '/data-classification', icon: 'fingerprint' },
      { label: 'AI Passports', href: '/ai-passports', icon: 'filesearch' }
    ]),
    ENFORCEMENT([
      { label: 'Gateway', href: '/gateway', icon: 'servercog' },
      { label: 'Policies', href: '/policies', icon: 'shieldcheck' },
      { label: 'Incidents', href: '/incidents', icon: 'xcircle' },
      { label: 'Approvals', href: '/approvals', icon: 'clipboardcheck' }
    ]),
    GOVERNANCE([
      { label: 'Risk', href: '/risk', icon: 'radar' },
      { label: 'Compliance', href: '/compliance-admin', icon: 'scale' },
      { label: 'Audit', href: '/audit', icon: 'foldersearch' },
      { label: 'Reports', href: '/reports', icon: 'barchart3' }
    ]),
    PLATFORM([
      { label: 'Integrations', href: '/integrations-hub', icon: 'boxes' },
      { label: 'Developer Portal', href: '/developer-portal', icon: 'webhook' },
      { label: 'Team', href: '/team', icon: 'users' },
      NOTIFICATIONS
    ]),
    ADMINISTRATION([
      SETTINGS,
      { label: 'Billing', href: '/billing', icon: 'creditcard' },
      SEARCH,
      { label: 'Admin', href: '/admin', icon: 'shieldhalf' },
      { label: 'Government', href: '/government', icon: 'landmark' }
    ])
  ],
  ADMIN: [
    { label: 'Overview', items: [DASHBOARD] },
    REGISTRY([
      { label: 'AI Systems', href: '/ai-systems', icon: 'layers' },
      { label: 'Applications', href: '/applications', icon: 'box' },
      { label: 'Providers', href: '/providers', icon: 'link2' },
      { label: 'Models', href: '/models', icon: 'package' },
      { label: 'Data Sources', href: '/data-sources', icon: 'folder' }
    ]),
    DATA_INTEL([
      { label: 'Data Flows', href: '/data-flows', icon: 'network' },
      { label: 'Classification', href: '/data-classification', icon: 'fingerprint' },
      { label: 'AI Passports', href: '/ai-passports', icon: 'filesearch' }
    ]),
    ENFORCEMENT([
      { label: 'Gateway', href: '/gateway', icon: 'servercog' },
      { label: 'Policies', href: '/policies', icon: 'shieldcheck' },
      { label: 'Incidents', href: '/incidents', icon: 'xcircle' },
      { label: 'Approvals', href: '/approvals', icon: 'clipboardcheck' }
    ]),
    GOVERNANCE([
      { label: 'Risk', href: '/risk', icon: 'radar' },
      { label: 'Compliance', href: '/compliance-admin', icon: 'scale' },
      { label: 'Audit', href: '/audit', icon: 'foldersearch' },
      { label: 'Reports', href: '/reports', icon: 'barchart3' }
    ]),
    PLATFORM([
      { label: 'Integrations', href: '/integrations-hub', icon: 'boxes' },
      { label: 'Developer Portal', href: '/developer-portal', icon: 'webhook' },
      { label: 'Team', href: '/team', icon: 'users' },
      NOTIFICATIONS
    ]),
    ADMINISTRATION([
      SETTINGS,
      SEARCH,
      { label: 'Admin', href: '/admin', icon: 'shieldhalf' },
      { label: 'Government', href: '/government', icon: 'landmark' }
    ])
  ],
  SECURITY_ANALYST: [
    { label: 'Overview', items: [DASHBOARD] },
    ENFORCEMENT([
      { label: 'Gateway', href: '/gateway', icon: 'servercog' },
      { label: 'Policies', href: '/policies', icon: 'shieldcheck' },
      { label: 'Incidents', href: '/incidents', icon: 'xcircle' },
      { label: 'Approvals', href: '/approvals', icon: 'clipboardcheck' }
    ]),
    GOVERNANCE([
      { label: 'Risk', href: '/risk', icon: 'radar' },
      { label: 'Audit', href: '/audit', icon: 'foldersearch' },
      { label: 'Reports', href: '/reports', icon: 'barchart3' }
    ]),
    PLATFORM([NOTIFICATIONS, SEARCH, SETTINGS])
  ],
  PRIVACY_OFFICER: [
    { label: 'Overview', items: [DASHBOARD] },
    REGISTRY([
      { label: 'Data Sources', href: '/data-sources', icon: 'folder' }
    ]),
    DATA_INTEL([
      { label: 'Data Flows', href: '/data-flows', icon: 'network' },
      { label: 'Classification', href: '/data-classification', icon: 'fingerprint' },
      { label: 'AI Passports', href: '/ai-passports', icon: 'filesearch' }
    ]),
    ENFORCEMENT([
      { label: 'Policies', href: '/policies', icon: 'shieldcheck' }
    ]),
    GOVERNANCE([
      { label: 'Audit', href: '/audit', icon: 'foldersearch' },
      { label: 'Reports', href: '/reports', icon: 'barchart3' }
    ]),
    PLATFORM([NOTIFICATIONS, SETTINGS])
  ],
  COMPLIANCE_OFFICER: [
    { label: 'Overview', items: [DASHBOARD] },
    ENFORCEMENT([
      { label: 'Policies', href: '/policies', icon: 'shieldcheck' }
    ]),
    GOVERNANCE([
      { label: 'Compliance', href: '/compliance-admin', icon: 'scale' },
      { label: 'Audit', href: '/audit', icon: 'foldersearch' },
      { label: 'Reports', href: '/reports', icon: 'barchart3' }
    ]),
    PLATFORM([NOTIFICATIONS, SETTINGS])
  ],
  DEVELOPER: [
    { label: 'Overview', items: [DASHBOARD] },
    REGISTRY([
      { label: 'AI Systems', href: '/ai-systems', icon: 'layers' },
      { label: 'Applications', href: '/applications', icon: 'box' },
      { label: 'Providers', href: '/providers', icon: 'link2' },
      { label: 'Models', href: '/models', icon: 'package' }
    ]),
    ENFORCEMENT([
      { label: 'Gateway', href: '/gateway', icon: 'servercog' },
      { label: 'Policies', href: '/policies', icon: 'shieldcheck' }
    ]),
    PLATFORM([
      { label: 'Developer Portal', href: '/developer-portal', icon: 'webhook' },
      { label: 'Integrations', href: '/integrations-hub', icon: 'boxes' },
      NOTIFICATIONS,
      SEARCH,
      SETTINGS
    ])
  ],
  AUDITOR: [
    { label: 'Overview', items: [DASHBOARD] },
    GOVERNANCE([
      { label: 'Audit', href: '/audit', icon: 'foldersearch' },
      { label: 'Reports', href: '/reports', icon: 'barchart3' }
    ]),
    PLATFORM([NOTIFICATIONS, SEARCH, SETTINGS])
  ],
  VIEWER: [
    { label: 'Overview', items: [DASHBOARD] },
    PLATFORM([NOTIFICATIONS, SEARCH, SETTINGS])
  ]
};

// ---------- Client-side helpers (demo role switcher) ----------

export function getClientRole(): SentinelRole | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|; )sentinel_demo_role=([^;]+)/);
  if (!match) return null;
  return (ALL_ROLES as readonly string[]).includes(match[1]) ? (match[1] as SentinelRole) : null;
}

export function setDemoRole(role: string) {
  document.cookie = `${DEMO_ROLE_COOKIE}=${role};path=/;max-age=86400;SameSite=Lax`;
  window.location.reload();
}

export function clearDemoRole() {
  document.cookie = `${DEMO_ROLE_COOKIE}=;path=/;max-age=0;SameSite=Lax`;
  window.location.reload();
}
