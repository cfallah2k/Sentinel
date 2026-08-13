import Link from 'next/link';

export interface NavItem {
  href: string;
  label: string;
}

export function ModuleNav({ items, active }: { items: NavItem[]; active: string }) {
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
      {items.map((item) => {
        const isActive = active === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[0.7rem] font-semibold transition ${
              isActive
                ? 'bg-sentinel-500/15 text-sentinel-300 ring-1 ring-sentinel-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
