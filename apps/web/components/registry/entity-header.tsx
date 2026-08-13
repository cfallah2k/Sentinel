'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export function EntityHeader({
  eyebrow,
  title,
  id,
  description,
  badges,
  meta
}: {
  eyebrow: string;
  title: string;
  id: string;
  description?: string;
  badges: ReactNode[];
  meta?: { label: string; value: string }[];
}) {
  return (
    <div>
      <p className="text-[0.65rem] uppercase tracking-[0.3em] text-sentinel-300">{eyebrow}</p>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h1>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[0.65rem] font-medium text-slate-400">{id}</span>
      </div>
      {description ? <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{description}</p> : null}
      {badges.length ? <div className="mt-3 flex flex-wrap items-center gap-2">{badges}</div> : null}
      {meta && meta.length ? (
        <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
          {meta.map((m) => (
            <div key={m.label}>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">{m.label}</p>
              <p className="mt-0.5 text-xs text-slate-200">{m.value}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function DetailNav({ base, items }: { base: string; items: { href: string; label: string }[] }) {
  const pathname = usePathname();
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => {
        const active = pathname === item.href || (item.href !== base && pathname.startsWith(`${item.href}/`));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-[0.7rem] font-semibold transition ${
              active
                ? 'bg-sentinel-500/15 text-sentinel-300 ring-1 ring-sentinel-500/40'
                : 'border border-white/10 bg-white/[0.04] text-slate-400 hover:text-slate-200'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}