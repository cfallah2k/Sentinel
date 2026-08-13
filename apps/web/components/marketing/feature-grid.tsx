import type { LucideIcon } from 'lucide-react';

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureGridProps {
  items: FeatureItem[];
  columns?: 2 | 3;
}

export default function FeatureGrid({ items, columns = 3 }: FeatureGridProps) {
  return (
    <div className={`grid gap-4 md:grid-cols-2 ${columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} lg:gap-6`}>
      {items.map(({ icon: Icon, title, description }) => (
        <div
          key={title}
          className="group relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 shadow-panel backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sentinel-500/25 hover:bg-[rgba(15,23,42,0.97)] sm:rounded-[1.5rem] sm:p-6"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sentinel-500 via-sky-400 to-cyan-300 opacity-0 transition duration-300 group-hover:opacity-100" />
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sentinel-500/10 text-sentinel-300 shadow-[0_8px_40px_rgba(56,189,248,0.08)] transition group-hover:bg-sentinel-500/20">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-base font-semibold text-white sm:text-lg">{title}</h3>
          <p className="mt-2.5 text-xs leading-6 text-slate-400 sm:text-sm">{description}</p>
        </div>
      ))}
    </div>
  );
}
