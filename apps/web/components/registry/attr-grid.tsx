import type { ReactNode } from 'react';

export function AttrGrid({ items }: { items: { label: string; value: ReactNode; full?: boolean }[] }) {
  return (
    <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className={item.full ? 'sm:col-span-2 lg:col-span-3' : ''}>
          <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">{item.label}</dt>
          <dd className="mt-1 text-sm text-slate-200">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}