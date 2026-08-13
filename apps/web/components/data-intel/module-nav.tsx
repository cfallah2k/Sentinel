import Link from 'next/link';

export function ModuleNav({ items }: { items: { label: string; href: string; active?: boolean }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
      {items.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[0.7rem] font-semibold transition ${
            it.active ? 'bg-sentinel-500/15 text-sentinel-300 ring-1 ring-sentinel-500/40' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {it.label}
        </Link>
      ))}
    </div>
  );
}