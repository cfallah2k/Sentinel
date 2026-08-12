'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Box,
  ClipboardCheck,
  Folder,
  Layers,
  Link2,
  Menu,
  ShieldAlert,
  ShieldCheck,
  Settings2,
  Sparkles,
  Truck,
  Users,
  Users2,
  XCircle,
  X
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/app/dashboard', icon: BarChart3 },
  { label: 'AI Systems', href: '/app/ai-systems', icon: Layers },
  { label: 'Applications', href: '/app/applications', icon: Box },
  { label: 'Providers', href: '/app/providers', icon: Link2 },
  { label: 'Data Sources', href: '/app/data-sources', icon: Folder },
  { label: 'Data Flows', href: '/app/data-flows', icon: Sparkles },
  { label: 'Policies', href: '/app/policies', icon: ShieldCheck },
  { label: 'Incidents', href: '/app/incidents', icon: XCircle },
  { label: 'Approvals', href: '/app/approvals', icon: ClipboardCheck },
  { label: 'Audit', href: '/app/audit', icon: Truck },
  { label: 'Reports', href: '/app/reports', icon: BarChart3 },
  { label: 'Passports', href: '/app/passports', icon: Folder },
  { label: 'Integrations', href: '/app/integrations', icon: Link2 },
  { label: 'Usage', href: '/app/usage', icon: Users },
  { label: 'Team', href: '/app/team', icon: Users2 },
  { label: 'Settings', href: '/app/settings', icon: Settings2 },
  { label: 'Billing', href: '/app/billing', icon: ShieldAlert }
];

export default function AppSidebar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeItem = useMemo(
    () => navItems.find((item) => item.href === pathname) ?? navItems[0],
    [pathname]
  );

  return (
    <aside className="z-10 w-full border-b border-white/10 bg-[rgba(15,23,42,0.92)] px-4 py-6 backdrop-blur-xl lg:w-96 lg:border-b-0 lg:border-r lg:px-6 lg:py-8">
      <div className="mb-6 flex items-center justify-between gap-3 lg:mb-8">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Sentinel</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">AI control plane</h2>
          <p className="mt-2 text-sm text-slate-400">{activeItem.label}</p>
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-3xl border border-white/10 bg-slate-950/75 text-slate-300 transition hover:bg-white/10 lg:hidden"
          onClick={() => setDrawerOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <nav className={`space-y-2 text-sm text-slate-300 ${drawerOpen ? 'block' : 'hidden'} lg:block`}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                `group flex items-center gap-3 rounded-3xl px-4 py-3 transition duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-500/10 via-sentinel-500/10 to-cyan-400/10 text-white shadow-[0_12px_40px_rgba(56,189,248,0.12)]'
                    : 'hover:bg-slate-800/80 hover:text-white'
                }`
              }
              onClick={() => setDrawerOpen(false)}
            >
              <span className={isActive ? 'inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sentinel-300 shadow-sm' : 'inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-slate-400 group-hover:bg-slate-900 group-hover:text-sentinel-300'}>
                <Icon className="h-4 w-4" />
              </span>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
