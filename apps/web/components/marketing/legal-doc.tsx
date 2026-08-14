'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUp, FileText } from 'lucide-react';

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface LegalNavItem {
  label: string;
  href: string;
}

export const LEGAL_NAV: LegalNavItem[] = [
  { label: 'Terms of service', href: '/legal/terms' },
  { label: 'Privacy policy', href: '/legal/privacy' },
  { label: 'Cookie policy', href: '/legal/cookies' },
  { label: 'Security policy', href: '/legal/security' }
];

interface LegalDocProps {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  nav?: LegalNavItem[];
  activeNav?: string;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function LegalDoc({ eyebrow, title, updated, intro, sections, nav = [], activeNav }: LegalDocProps) {
  const toc = sections.map((s) => ({ id: slugify(s.heading), label: s.heading }));
  const [active, setActive] = useState(toc[0]?.id ?? '');

  useEffect(() => {
    const onScroll = () => {
      let current = toc[0]?.id ?? '';
      for (const t of toc) {
        const el = document.getElementById(t.id);
        if (el && el.getBoundingClientRect().top <= 140) current = t.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sections]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const currentIndex = nav.findIndex((n) => n.label === activeNav);
  const prev = currentIndex > 0 ? nav[currentIndex - 1] : null;
  const next = currentIndex >= 0 && currentIndex < nav.length - 1 ? nav[currentIndex + 1] : null;

  return (
    <article className="mx-auto max-w-7xl space-y-8 lg:space-y-12">
      {/* Document header — matches the home page hero language */}
      <header className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[var(--surface-strong)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[2rem] sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_45%)]" />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-sentinel-500/35 bg-sentinel-500/10 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-sentinel-200 shadow-[0_10px_40px_rgba(56,189,248,0.08)]">
            <FileText className="h-3 w-3" size={12} /> {eyebrow}
          </span>
          <h1 className="mt-5 max-w-3xl text-2xl font-semibold leading-snug tracking-[-0.03em] text-white sm:text-3xl lg:text-4xl">
            {title}
          </h1>
          <p className="mt-3 inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-500">
            Last updated {updated}
            <span className="h-1 w-1 rounded-full bg-sentinel-400" />
            <span className="normal-case tracking-normal text-slate-600">Reads in about {Math.max(2, Math.round(sections.reduce((s, x) => s + x.paragraphs.length, 0) / 5))} min</span>
          </p>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base lg:leading-8">{intro}</p>

          {nav.length > 0 ? (
            <div className="mt-7 flex flex-wrap gap-2 border-t border-white/10 pt-6">
              {nav.map((item) => {
                const isActive = item.label === activeNav;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold transition ${
                      isActive
                        ? 'border-sentinel-500/40 bg-sentinel-500/15 text-sentinel-200'
                        : 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>
      </header>

      {/* Mobile table of contents — horizontal chips */}
      <nav className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden" aria-label="On this page">
        {toc.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => scrollTo(t.id)}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
              active === t.id
                ? 'border-sentinel-500/40 bg-sentinel-500/15 text-sentinel-200'
                : 'border-white/10 bg-white/[0.04] text-slate-400 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div className="grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-10">
        {/* Sticky table of contents — desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-[1.5rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-slate-600">On this page</p>
            <div className="mt-3 space-y-1">
              {toc.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => scrollTo(t.id)}
                  className={`block w-full rounded-xl px-3 py-2 text-left text-xs transition ${
                    active === t.id
                      ? 'bg-sentinel-500/10 font-semibold text-sentinel-200'
                      : 'text-slate-400 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <ArrowUp className="h-3 w-3" size={12} /> Back to top
            </button>
          </div>
        </aside>

        {/* Sections */}
        <div className="min-w-0 space-y-6 lg:space-y-8">
          {sections.map((section, index) => {
            const id = toc[index].id;
            const isActive = active === id;
            return (
              <section
                key={id}
                id={id}
                className={`scroll-mt-24 rounded-[1.25rem] border p-5 shadow-panel backdrop-blur-xl transition-colors sm:rounded-[1.5rem] sm:p-7 lg:p-8 ${
                  isActive ? 'border-sentinel-500/30 bg-[var(--surface-strong)]' : 'border-white/10 bg-[var(--surface)]'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition sm:h-9 sm:w-9 ${
                      isActive
                        ? 'border-sentinel-500/40 bg-sentinel-500/15 text-sentinel-200'
                        : 'border-sentinel-500/30 bg-sentinel-500/10 text-sentinel-300'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base font-semibold text-white sm:text-lg">{section.heading}</h2>
                    <div className="mt-3 space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 48)} className="text-sm leading-7 text-slate-400 sm:text-[0.95rem] sm:leading-8">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}

          <div className="flex items-center justify-between gap-4 pt-2 lg:hidden">
            <p className="text-xs text-slate-500">{sections.length} sections</p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <ArrowUp className="h-3 w-3" size={12} /> Back to top
            </button>
          </div>
        </div>
      </div>

      {/* Prev / next legal documents */}
      {nav.length > 1 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {prev ? (
            <Link
              href={prev.href}
              className="group flex items-center gap-4 rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl transition hover:border-sentinel-500/40 sm:rounded-[1.5rem] sm:p-6"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition group-hover:text-sentinel-300">
                <ArrowLeft className="h-4 w-4" size={16} />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.6rem] font-bold uppercase tracking-[0.25em] text-slate-600">Previous</span>
                <span className="mt-0.5 block truncate text-sm font-semibold text-white">{prev.label}</span>
              </span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {next ? (
            <Link
              href={next.href}
              className="group flex items-center justify-end gap-4 rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 text-right shadow-panel backdrop-blur-xl transition hover:border-sentinel-500/40 sm:rounded-[1.5rem] sm:p-6"
            >
              <span className="min-w-0">
                <span className="block text-[0.6rem] font-bold uppercase tracking-[0.25em] text-slate-600">Next</span>
                <span className="mt-0.5 block truncate text-sm font-semibold text-white">{next.label}</span>
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition group-hover:text-sentinel-300">
                <ArrowRight className="h-4 w-4" size={16} />
              </span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
        </div>
      ) : null}
    </article>
  );
}