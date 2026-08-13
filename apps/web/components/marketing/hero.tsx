import Link from 'next/link';
import type { ReactNode } from 'react';
import HeroVisual from './hero-visual';

interface MarketingHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  children?: ReactNode;
}

export default function MarketingHero({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  children
}: MarketingHeroProps) {
  return (
    <section className="relative">
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-64 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.12),_transparent_55%)] blur-3xl" />
      <div className="relative mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.95fr_1fr] lg:items-center">
        <div className="space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-sentinel-500/35 bg-sentinel-500/10 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-sentinel-200 shadow-[0_10px_40px_rgba(56,189,248,0.08)]">
            {eyebrow}
          </span>
          <h1 className="text-2xl font-semibold leading-snug tracking-[-0.03em] text-white sm:text-3xl lg:text-4xl">
            {title}
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base lg:leading-8">{description}</p>
          {primary || secondary ? (
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
              {primary ? (
                <Link
                  href={primary.href}
                  className="inline-flex w-full items-center justify-center rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 sm:w-auto sm:text-sm"
                >
                  {primary.label}
                </Link>
              ) : secondary ? (
                <Link
                  href={secondary.href}
                  className="inline-flex w-full items-center justify-center rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 sm:w-auto sm:text-sm"
                >
                  {secondary.label}
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
        <div className="relative">{children ?? <HeroVisual />}</div>
      </div>
    </section>
  );
}
