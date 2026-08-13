'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Card, CardBody } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress';

export const inputCls =
  'w-full rounded-xl border border-white/10 bg-slate-950/75 px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15';

export const labelCls = 'text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500';

export const onboardingSteps = [
  { href: '/onboarding', label: 'Welcome' },
  { href: '/onboarding/profile', label: 'Profile' },
  { href: '/onboarding/organization', label: 'Organization' },
  { href: '/onboarding/industry', label: 'Industry' },
  { href: '/onboarding/use-case', label: 'Use case' },
  { href: '/onboarding/ai-providers', label: 'AI providers' },
  { href: '/onboarding/applications', label: 'Applications' },
  { href: '/onboarding/data-classification', label: 'Classification' },
  { href: '/onboarding/policies', label: 'Policies' },
  { href: '/onboarding/integrations', label: 'Integrations' },
  { href: '/onboarding/security', label: 'Security' },
  { href: '/onboarding/api', label: 'API keys' },
  { href: '/onboarding/team', label: 'Team' },
  { href: '/onboarding/complete', label: 'Complete' }
];

export function OnboardingShell({
  step,
  title,
  description,
  children,
  next,
  prev,
  nextLabel = 'Continue'
}: {
  step: number;
  title: string;
  description: string;
  children: ReactNode;
  next: string | null;
  prev: string | null;
  nextLabel?: string;
}) {
  const total = onboardingSteps.length;
  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-sentinel-300">Onboarding</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{description}</p>
        </div>
        <p className="shrink-0 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Step {step} of {total}
        </p>
      </div>
      <div className="mt-6">
        <div className="flex items-center gap-3">
          <ProgressBar value={(step / total) * 100} color="bg-sentinel-400" className="flex-1" />
          <span className="text-[0.65rem] font-semibold text-slate-500">{step}/{total}</span>
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          {onboardingSteps.map((s, i) => (
            <span
              key={s.href}
              className={`h-1 flex-1 rounded-full ${i < step ? 'bg-sentinel-500/70' : i === step - 1 ? 'bg-sentinel-400' : 'bg-white/10'}`}
            />
          ))}
        </div>
      </div>
      <Card className="mt-6">
        <CardBody className="pb-6">{children}</CardBody>
      </Card>
      <div className="mt-5 flex items-center justify-between">
        {prev ? (
          <Link
            href={prev}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={next}
            className="inline-flex items-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400"
          >
            {nextLabel} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export function SelectCard({
  selected,
  onSelect,
  title,
  subtitle,
  badge
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  subtitle?: string;
  badge?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex flex-col gap-2 rounded-2xl border p-4 text-left transition ${
        selected ? 'border-sentinel-500/50 bg-sentinel-500/10' : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className={`text-xs font-semibold ${selected ? 'text-white' : 'text-slate-200'}`}>{title}</p>
        {selected ? (
          <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-sentinel-500 text-white">
            <Check className="h-3 w-3" />
          </span>
        ) : (
          <span className="h-4.5 w-4.5 shrink-0 rounded-full border border-white/15" />
        )}
      </div>
      {subtitle ? <p className="text-[0.7rem] leading-5 text-slate-500">{subtitle}</p> : null}
      {badge ? <div className="flex flex-wrap items-center gap-1.5">{badge}</div> : null}
    </button>
  );
}

export function ToggleRow({
  label,
  description,
  checked,
  onToggle
}: {
  label: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-200">{label}</p>
        <p className="mt-0.5 text-[0.65rem] text-slate-500">{description}</p>
      </div>
      <button
        type="button"
        onClick={onToggle}
        aria-label={label}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${checked ? 'bg-sentinel-500' : 'bg-white/10'}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${checked ? 'left-[22px]' : 'left-0.5'}`} />
      </button>
    </div>
  );
}
