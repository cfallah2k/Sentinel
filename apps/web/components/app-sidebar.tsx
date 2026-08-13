'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Box,
  ClipboardCheck,
  FileSearch,
  Fingerprint,
  Folder,
  FolderSearch,
  Gauge,
  Layers,
  Link2,
  ListChecks,
  Menu,
  Network,
  Package,
  Radar,
  Scale,
  ServerCog,
  Settings2,
  ShieldCheck,
  ShieldHalf,
  ShieldAlert,
  Sparkles,
  UserCog,
  Users,
  X,
  XCircle,
  Boxes,
  Landmark,
  CreditCard,
  Webhook
} from 'lucide-react';

const navGroups = [
  {
    label: 'Overview',
    items: [{ label: 'Dashboard', href: '/dashboard', icon: Gauge }]
  },
  {
    label: 'Registry',
    items: [
      { label: 'AI Systems', href: '/ai-systems', icon: Layers },
      { label: 'Applications', href: '/applications', icon: Box },
      { label: 'Providers', href: '/providers', icon: Link2 },
      { label: 'Models', href: '/models', icon: Package },
      { label: 'Data Sources', href: '/data-sources', icon: Folder }
    ]
  },
  {
    label: 'Data Intelligence',
    items: [
      { label: 'Data Flows', href: '/data-flows', icon: Network },
      { label: 'Classification', href: '/data-classification', icon: Fingerprint },
      { label: 'AI Passports', href: '/ai-passports', icon: FileSearch }
    ]
  },
  {
    label: 'Enforcement',
    items: [
      { label: 'Gateway', href: '/gateway', icon: ServerCog },
      { label: 'Policies', href: '/policies', icon: ShieldCheck },
      { label: 'Incidents', href: '/incidents', icon: XCircle },
      { label: 'Approvals', href: '/approvals', icon: ClipboardCheck }
    ]
  },
  {
    label: 'Governance',
    items: [
      { label: 'Risk', href: '/risk', icon: Radar },
      { label: 'Compliance', href: '/compliance-admin', icon: Scale },
      { label: 'Audit', href: '/audit', icon: FolderSearch },
      { label: 'Reports', href: '/reports', icon: BarChart3 }
    ]
  },
  {
    label: 'Platform',
    items: [
      { label: 'Integrations', href: '/integrations-hub', icon: Boxes },
      { label: 'Developer Portal', href: '/developer-portal', icon: Webhook },
      { label: 'Team', href: '/team', icon: Users },
      { label: 'Notifications', href: '/notifications', icon: Sparkles }
    ]
  },
  {
    label: 'Administration',
    items: [
      { label: 'Settings', href: '/settings', icon: Settings2 },
      { label: 'Billing', href: '/billing', icon: CreditCard },
      { label: 'Search', href: '/search', icon: ListChecks },
      { label: 'Admin', href: '/admin', icon: ShieldHalf, admin: true },
      { label: 'Government', href: '/government', icon: Landmark, admin: true }
    ]
  }
];

export default function AppSidebar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside className="z-30 flex w-full shrink-0 flex-col border-b border-white/10 bg-[rgba(15,23,42,0.92)] backdrop-blur-xl lg:h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between gap-3 px-5 py-4 lg:px-6 lg:py-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-sentinel-500 to-cyan-400 shadow-glow">
            <ShieldAlert className="h-4.5 w-4.5 text-white" size={18} />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white">Sentinel</p>
            <p className="text-[0.6rem] uppercase tracking-[0.2em] text-slate-500">AI Control Plane</p>
          </div>
        </Link>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/75 text-slate-300 transition hover:bg-white/10 lg:hidden"
          onClick={() => setDrawerOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <nav className={`flex-1 space-y-6 overflow-y-auto px-3 pb-6 lg:block lg:px-4 ${drawerOpen ? 'block' : 'hidden'}`}>
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-3 text-[0.6rem] font-bold uppercase tracking-[0.25em] text-slate-600">{group.label}</p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className={`group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-[0.8rem] transition duration-200 ${
                      active
                        ? 'bg-gradient-to-r from-sky-500/10 via-sentinel-500/10 to-cyan-400/10 text-white shadow-[0_12px_40px_rgba(56,189,248,0.12)]'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <span
                      className={
                        active
                          ? 'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-sentinel-300'
                          : 'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-slate-500 transition group-hover:text-sentinel-300'
                      }
                    >
                      <Icon className="h-4 w-4" size={16} />
                    </span>
                    <span className="font-medium">{item.label}</span>
                    {active ? <span className="ml-auto h-1.5 w-1.5 rounded-full bg-sentinel-400" /> : null}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="hidden border-t border-white/10 px-6 py-4 lg:block">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-400 text-xs font-bold text-white">
            AR
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-white">Ava Reyes</p>
            <p className="truncate text-[0.65rem] text-slate-500">Security Architect</p>
          </div>
          <UserCog className="ml-auto h-4 w-4 text-slate-500" size={16} />
        </div>
      </div>
    </aside>
  );
}