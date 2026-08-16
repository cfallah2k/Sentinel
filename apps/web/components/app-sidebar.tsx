'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Box,
  ClipboardCheck,
  CreditCard,
  FileSearch,
  Fingerprint,
  Folder,
  FolderSearch,
  Gauge,
  Landmark,
  Layers,
  Link2,
  ListChecks,
  Menu,
  MessagesSquare,
  Network,
  Package,
  Radar,
  Scale,
  Search,
  ServerCog,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  ShieldHalf,
  Sparkles,
  UserCog,
  Users,
  Webhook,
  X,
  XCircle,
  Boxes,
  type LucideIcon
} from 'lucide-react';
import { currentUser, roleLabel } from '@/lib/mock-data';
import { demoAccountFor, getClientRole, NAV_BY_ROLE, type NavItem } from '@/lib/role-access';

const ICONS: Record<string, LucideIcon> = {
  gauge: Gauge,
  layers: Layers,
  box: Box,
  link2: Link2,
  package: Package,
  folder: Folder,
  network: Network,
  fingerprint: Fingerprint,
  filesearch: FileSearch,
  servercog: ServerCog,
  shieldcheck: ShieldCheck,
  xcircle: XCircle,
  clipboardcheck: ClipboardCheck,
  radar: Radar,
  scale: Scale,
  foldersearch: FolderSearch,
  barchart3: BarChart3,
  boxes: Boxes,
  webhook: Webhook,
  users: Users,
  sparkles: Sparkles,
  settings2: Settings2,
  creditcard: CreditCard,
  search: Search,
  shieldhalf: ShieldHalf,
  landmark: Landmark,
  listchecks: ListChecks,
  messagesquare: MessagesSquare
};

export default function AppSidebar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [role, setRole] = useState<string>(currentUser.role);

  useEffect(() => {
    const clientRole = getClientRole();
    if (clientRole) setRole(clientRole);
  }, []);

  const navGroups = NAV_BY_ROLE[role] ?? NAV_BY_ROLE[currentUser.role];
  const account = demoAccountFor(role);
  const name = account?.name ?? currentUser.name;
  const initials = account ? account.name.split(' ').map((p) => p[0]).join('') : currentUser.initials;

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const renderItem = (item: NavItem) => {
    const Icon = ICONS[item.icon] ?? Gauge;
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
  };

  return (
    <aside className="z-30 flex w-full shrink-0 flex-col border-b border-white/10 bg-[var(--surface)] backdrop-blur-xl lg:h-screen lg:w-72 lg:border-b-0 lg:border-r">
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
            <div className="space-y-1">{group.items.map(renderItem)}</div>
          </div>
        ))}
      </nav>

      <div className="hidden border-t border-white/10 px-6 py-4 lg:block">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-400 text-xs font-bold text-white">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-white">{name}</p>
            <p className="truncate text-[0.65rem] text-slate-500">{roleLabel(role)}</p>
          </div>
          <UserCog className="ml-auto h-4 w-4 text-slate-500" size={16} />
        </div>
      </div>
    </aside>
  );
}