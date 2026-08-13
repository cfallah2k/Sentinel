import type { LucideIcon } from 'lucide-react';
import { Badge, type BadgeTone } from '@/components/ui/badge';
import { PrimaryButton, SecondaryButton } from '@/components/ui/page-header';

export function StatusPage({
  code,
  title,
  description,
  icon: Icon,
  badge,
  tone,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  note
}: {
  code: string;
  title: string;
  description: string;
  icon: LucideIcon;
  badge: string;
  tone?: BadgeTone;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  note?: string;
}) {
  return (
    <div className="relative flex min-h-[75vh] items-center justify-center overflow-hidden px-4 py-16">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[44rem] -translate-x-1/2 rounded-full bg-sentinel-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-[-6rem] h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="relative flex max-w-xl flex-col items-center text-center">
        <Badge label={badge} tone={tone} />
        <div className="mt-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/5 shadow-panel">
          <Icon className="h-9 w-9 text-sentinel-300" size={36} />
        </div>
        <p className="mt-8 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-7xl font-bold tracking-tight text-transparent">{code}</p>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
        {note ? (
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-[0.7rem] font-medium text-amber-300">
            {note}
          </p>
        ) : null}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <PrimaryButton href={primaryHref}>{primaryLabel}</PrimaryButton>
          {secondaryHref && secondaryLabel ? <SecondaryButton href={secondaryHref}>{secondaryLabel}</SecondaryButton> : null}
        </div>
      </div>
    </div>
  );
}
