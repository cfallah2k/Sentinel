'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { Menu, ShieldCheck, X } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

const navItems = [
  { label: 'Product', href: '/product' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Security', href: '/security' },
  { label: 'Developers', href: '/developers' }
];

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

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

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/10 bg-[var(--bg-soft)] backdrop-blur-2xl shadow-[0_25px_120px_rgba(15,23,42,0.2)] transition-colors duration-300"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5 transition hover:opacity-90">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-sentinel-500 via-sky-500 to-cyan-400 text-white shadow-glow sm:h-10 sm:w-10">
            <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div>
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-sentinel-300">SENTINEL</p>
            <p className="text-xs font-semibold text-white sm:text-sm">AI Data Governance</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 transition duration-200 hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
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
            <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
              <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setMobileOpen(false)}
              />
              <div className="relative flex h-full flex-col overflow-y-auto bg-slate-950/95 pt-20 backdrop-blur-2xl">
                <div className="flex-1 px-6 pb-10 pt-8">
                  <nav className="grid gap-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-2xl px-4 py-3.5 text-base font-medium text-slate-200 transition hover:bg-white/5 hover:text-white"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-8 grid gap-3">
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
                <div className="border-t border-white/5 px-6 py-4">
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