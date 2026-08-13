'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { ChevronDown, Menu, ShieldCheck, X } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

interface NavItem {
  label: string;
  href: string;
}

interface NavGroup {
  label: string;
  href: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: 'Product',
    href: '/product',
    items: [
      { label: 'Product overview', href: '/product' },
      { label: 'AI Governance', href: '/product/ai-governance' },
      { label: 'AI Gateway', href: '/product/ai-gateway' },
      { label: 'Policy Engine', href: '/product/policy-engine' },
      { label: 'AI Passport', href: '/product/ai-passport' },
      { label: 'Approvals', href: '/product/approvals' },
      { label: 'Audit', href: '/product/audit' },
      { label: 'Data Classification', href: '/product/data-classification' },
      { label: 'Data Flow', href: '/product/data-flow' },
      { label: 'Incidents', href: '/product/incidents' }
    ]
  },
  {
    label: 'Solutions',
    href: '/solutions',
    items: [
      { label: 'Solutions overview', href: '/solutions' },
      { label: 'Enterprise', href: '/solutions/enterprise' },
      { label: 'Compliance & regulated', href: '/solutions/compliance' },
      { label: 'Security teams', href: '/solutions/security' },
      { label: 'Privacy programs', href: '/solutions/privacy' },
      { label: 'Developers', href: '/solutions/developers' },
      { label: 'Government', href: '/solutions/government' }
    ]
  },
  {
    label: 'Security',
    href: '/security',
    items: [
      { label: 'Security overview', href: '/security' },
      { label: 'Trust', href: '/trust' },
      { label: 'Compliance', href: '/compliance' },
      { label: 'System status', href: '/status' }
    ]
  },
  {
    label: 'Developers',
    href: '/developers',
    items: [
      { label: 'Developers overview', href: '/developers' },
      { label: 'AI Gateway Playground', href: '/playground' },
      { label: 'Docs', href: '/docs' },
      { label: 'Integrations', href: '/integrations' },
      { label: 'Get started', href: '/get-started' }
    ]
  }
];

const pricingNav = { label: 'Pricing', href: '/pricing' };

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!openDropdown) return;

    const onPointerDown = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenDropdown(null);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openDropdown]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-white/10 bg-[var(--bg-soft)] backdrop-blur-2xl shadow-[0_25px_120px_rgba(15,23,42,0.2)] transition-colors duration-300"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 transition hover:opacity-90">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-sentinel-500 via-sky-500 to-cyan-400 text-white shadow-glow sm:h-10 sm:w-10">
            <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div>
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-sentinel-300">SENTINEL</p>
            <p className="text-xs font-semibold text-white sm:text-sm">AI Data Governance</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navGroups.map((group) => (
            <div key={group.label} className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === group.label ? null : group.label)}
                aria-expanded={openDropdown === group.label}
                aria-haspopup="true"
                className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm transition duration-200 hover:bg-white/5 hover:text-white ${
                  openDropdown === group.label ? 'text-white' : 'text-slate-300'
                }`}
              >
                {group.label}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    openDropdown === group.label ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openDropdown === group.label ? (
                <div className="absolute left-0 top-full z-50 mt-2 w-60 rounded-2xl border border-white/10 bg-[var(--surface-strong)] p-2 shadow-panel backdrop-blur-2xl">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="block rounded-xl px-3.5 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
          <Link
            href={pricingNav.href}
            className="rounded-full px-3 py-2 text-sm text-slate-300 transition duration-200 hover:bg-white/5 hover:text-white"
          >
            {pricingNav.label}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/login"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-sentinel-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sentinel-500/20 transition hover:bg-sentinel-400"
            >
              Start free
            </Link>
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen
        ? createPortal(
            <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
              <div className="flex h-full flex-col bg-[var(--bg)]">
                <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
                  <Link href="/" className="flex items-center gap-2.5 transition hover:opacity-90" onClick={() => setMobileOpen(false)}>
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-sentinel-500 via-sky-500 to-cyan-400 text-white shadow-glow">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[0.6rem] uppercase tracking-[0.3em] text-sentinel-300">SENTINEL</p>
                      <p className="text-xs font-semibold text-white">AI Data Governance</p>
                    </div>
                  </Link>
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close navigation"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <nav className="grid gap-7">
                    {navGroups.map((group) => (
                      <div key={group.label}>
                        <Link
                          href={group.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-sm font-semibold uppercase tracking-[0.2em] text-sentinel-300 transition hover:text-white"
                        >
                          {group.label}
                        </Link>
                        <ul className="mt-2 grid gap-0.5">
                          {group.items.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="block rounded-xl px-3 py-2.5 text-base text-slate-200 transition hover:bg-white/5 hover:text-white"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div>
                      <Link
                        href={pricingNav.href}
                        onClick={() => setMobileOpen(false)}
                        className="text-sm font-semibold uppercase tracking-[0.2em] text-sentinel-300 transition hover:text-white"
                      >
                        {pricingNav.label}
                      </Link>
                    </div>
                  </nav>
                  <div className="mt-10 grid gap-3">
                    <Link
                      href="/login"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-center text-sm font-medium text-white transition hover:bg-white/10"
                      onClick={() => setMobileOpen(false)}
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/register"
                      className="rounded-2xl bg-sentinel-500 px-4 py-3.5 text-center text-sm font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
                      onClick={() => setMobileOpen(false)}
                    >
                      Start free
                    </Link>
                  </div>
                </div>
                <div className="border-t border-white/5 px-4 py-4 sm:px-6">
                  <p className="text-xs text-slate-500">© {new Date().getFullYear()} Sentinel. All rights reserved.</p>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </header>
  );
}
