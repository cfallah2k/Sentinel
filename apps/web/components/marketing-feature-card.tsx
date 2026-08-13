import type { ReactNode } from 'react';

interface MarketingFeatureCardProps {
  title: string;
  description: string;
  accent: string;
  detail: string;
  children?: ReactNode;
}

export default function MarketingFeatureCard({ title, description, accent, detail, children }: MarketingFeatureCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-slate-950/90 p-5 shadow-panel transition duration-300 hover:-translate-y-1 hover:border-sentinel-500/20 hover:bg-slate-900/95 hover:shadow-[0_35px_120px_rgba(15,23,42,0.24)]">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sentinel-500 via-sky-400 to-cyan-300 opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-sentinel-200 shadow-[0_8px_40px_rgba(56,189,248,0.06)]">
        <span className="h-1.5 w-1.5 rounded-full bg-sentinel-400 shadow-glow" />
        {accent}
      </div>
      <h3 className="text-base font-semibold text-white sm:text-lg">{title}</h3>
      <p className="mt-2.5 text-xs leading-6 text-slate-300 sm:text-sm">{description}</p>
      <p className="mt-3 text-xs font-semibold text-slate-200 sm:text-sm">{detail}</p>
      {children ? <div className="mt-4 text-xs text-slate-400">{children}</div> : null}
    </div>
  );
}