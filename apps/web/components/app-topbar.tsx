'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bell, ChevronDown, LogOut, Search, Settings2, UserCircle2 } from 'lucide-react';
import { currentOrg, currentUser, notifications, roleLabel } from '@/lib/mock-data';
import { demoAccountFor, getClientRole } from '@/lib/role-access';

export default function AppTopbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [role, setRole] = useState<string>(currentUser.role);
  const unread = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const clientRole = getClientRole();
    if (clientRole) setRole(clientRole);
  }, []);

  const account = demoAccountFor(role);
  const name = account?.name ?? currentUser.name;
  const initials = account
    ? account.name.split(' ').map((p) => p[0]).join('')
    : currentUser.initials;
  const title = account?.title ?? currentUser.title;
  const email = account?.email ?? currentUser.email;

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[var(--surface)] backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        <button
          type="button"
          onClick={() => setSearchOpen((v) => !v)}
          className="inline-flex h-9 flex-1 max-w-sm items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-4 text-left text-xs text-slate-500 transition hover:border-white/20 hover:text-slate-400 sm:flex-none sm:w-64"
        >
          <Search className="h-3.5 w-3.5" size={14} />
          <span className="truncate">Search systems, policies, flows...</span>
          <kbd className="ml-auto hidden rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[0.6rem] text-slate-500 sm:inline">⌘K</kbd>
        </button>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 md:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-slate-400">{currentOrg.name}</span>
            <span className="rounded-full bg-sentinel-500/15 px-2 py-0.5 text-[0.6rem] font-bold text-sentinel-300">{currentOrg.plan}</span>
          </div>

          <span className="hidden rounded-full border border-violet-500/25 bg-violet-500/10 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-violet-300 sm:inline-block">
            {roleLabel(role)}
          </span>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setNotifOpen((v) => !v);
                setUserOpen(false);
              }}
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-950/60 text-slate-400 transition hover:bg-white/10 hover:text-white"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" size={16} />
              {unread > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[0.55rem] font-bold text-white">
                  {unread}
                </span>
              ) : null}
            </button>
            {notifOpen ? (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setNotifOpen(false)} />
                <div className="absolute right-0 z-40 mt-2 w-80 overflow-hidden rounded-3xl border border-white/10 bg-[var(--surface-strong)] shadow-panel backdrop-blur-xl">
                  <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                    <p className="text-xs font-semibold text-white">Notifications</p>
                    <Link href="/notifications" onClick={() => setNotifOpen(false)} className="text-[0.65rem] font-semibold text-sentinel-300 hover:text-sentinel-200">
                      View all
                    </Link>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.slice(0, 6).map((n) => (
                      <Link key={n.id} href="/notifications" onClick={() => setNotifOpen(false)} className="block border-b border-white/5 px-5 py-3 transition hover:bg-white/[0.04]">
                        <div className="flex items-center justify-between gap-2">
                          <p className={`truncate text-xs ${n.unread ? 'font-semibold text-white' : 'text-slate-300'}`}>{n.title}</p>
                          {n.unread ? <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sentinel-400" /> : null}
                        </div>
                        <p className="mt-0.5 line-clamp-1 text-[0.65rem] text-slate-500">{n.detail}</p>
                        <p className="mt-1 text-[0.6rem] text-slate-600">{n.time}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            ) : null}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setUserOpen((v) => !v);
                setNotifOpen(false);
              }}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 py-1 pl-1 pr-2.5 transition hover:bg-white/10"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-400 text-[0.65rem] font-bold text-white">
                {initials}
              </span>
              <span className="hidden text-left sm:block">
                <span className="block max-w-28 truncate text-xs font-semibold text-white">{name}</span>
                <span className="block text-[0.6rem] text-slate-500">{title}</span>
              </span>
              <ChevronDown className="hidden h-3.5 w-3.5 text-slate-500 sm:block" size={14} />
            </button>
            {userOpen ? (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setUserOpen(false)} />
                <div className="absolute right-0 z-40 mt-2 w-64 overflow-hidden rounded-3xl border border-white/10 bg-[var(--surface-strong)] shadow-panel backdrop-blur-xl">
                  <div className="border-b border-white/10 px-5 py-3">
                    <p className="text-xs font-semibold text-white">{name}</p>
                    <p className="truncate text-[0.65rem] text-slate-500">{email}</p>
                    <span className="mt-2 inline-block rounded-full bg-violet-500/15 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-violet-300">
                      {roleLabel(role)}
                    </span>
                  </div>
                  <div className="p-2">
                    <Link href="/settings" onClick={() => setUserOpen(false)} className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-slate-300 transition hover:bg-white/[0.06] hover:text-white">
                      <Settings2 className="h-3.5 w-3.5 text-slate-500" size={14} /> Settings
                    </Link>
                    <Link href="/team" onClick={() => setUserOpen(false)} className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-slate-300 transition hover:bg-white/[0.06] hover:text-white">
                      <UserCircle2 className="h-3.5 w-3.5 text-slate-500" size={14} /> Team & roles
                    </Link>
                    <Link href="/logout" onClick={() => setUserOpen(false)} className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-rose-300 transition hover:bg-rose-500/10">
                      <LogOut className="h-3.5 w-3.5" size={14} /> Sign out
                    </Link>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {searchOpen ? (
        <div className="border-t border-white/10 px-4 py-3 sm:px-6">
          <div className="relative mx-auto max-w-2xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" size={16} />
            <input
              autoFocus
              type="text"
              placeholder="Search AI systems, policies, data flows, incidents..."
              className="w-full rounded-full border border-white/10 bg-slate-950/75 py-2.5 pl-11 pr-4 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15"
            />
          </div>
        </div>
      ) : null}
    </header>
  );
}