'use client';

import { Check } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export interface Plan {
  id: string;
  name: string;
  price: number;
  monthlyRequests: number;
  users: number;
  features: string[];
}

export function formatRequests(n: number): string {
  if (n >= 1000000) return `${n / 1000000}M`;
  if (n >= 1000) return `${n / 1000}K`;
  return String(n);
}

export function PlanCard({
  plan,
  current,
  featured,
  actionHref,
  actionOnClick
}: {
  plan: Plan;
  current?: boolean;
  featured?: boolean;
  actionHref?: string;
  actionOnClick?: () => void;
}) {
  return (
    <div
      className={`flex flex-col rounded-3xl border p-6 shadow-panel backdrop-blur-xl ${
        featured
          ? 'border-sentinel-500/50 bg-[var(--surface)] ring-1 ring-sentinel-500/30'
          : 'border-white/10 bg-[var(--surface)]'
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">{plan.name}</h3>
        {current ? <Badge label="Current Plan" tone="green" /> : featured ? <Badge label="Recommended" tone="blue" /> : null}
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
        ${plan.price}
        <span className="text-xs font-normal text-slate-400"> /mo</span>
      </p>
      <p className="mt-1 text-[0.65rem] text-slate-500">
        {formatRequests(plan.monthlyRequests)} requests/mo · {plan.users} users
      </p>
      <ul className="mt-5 flex-1 space-y-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-xs text-slate-300">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sentinel-300" />
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        {current ? (
          <span className="block rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-center text-xs font-semibold text-slate-400 sm:text-sm">
            Current plan
          </span>
        ) : actionHref ? (
          <Link
            href={actionHref}
            className="block rounded-full bg-sentinel-500 px-5 py-2.5 text-center text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 sm:text-sm"
          >
            Switch to {plan.name}
          </Link>
        ) : actionOnClick ? (
          <button
            type="button"
            onClick={actionOnClick}
            className="block w-full rounded-full bg-sentinel-500 px-5 py-2.5 text-center text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 sm:text-sm"
          >
            Switch to {plan.name}
          </button>
        ) : null}
      </div>
    </div>
  );
}