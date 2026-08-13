import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export default function SectionHeading({ eyebrow, title, description, children }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">{eyebrow}</p>
        <h2 className="mt-2 text-lg font-semibold text-white sm:text-xl">{title}</h2>
        {description ? <p className="mt-2.5 text-xs leading-6 text-slate-400 sm:text-sm">{description}</p> : null}
      </div>
      {children}
    </div>
  );
}
