interface Stat {
  value: string;
  label: string;
}

interface StatsBandProps {
  stats: Stat[];
}

export default function StatsBand({ stats }: StatsBandProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 text-xs text-slate-400 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-6 sm:text-sm"
        >
          <div className="pointer-events-none absolute -top-10 right-0 h-24 w-24 rounded-full bg-sentinel-500/10 blur-3xl" />
          <div className="relative flex items-start justify-between gap-2">
            <p className="text-xl font-semibold text-white sm:text-3xl">{stat.value}</p>
            <span className="relative mt-1 flex h-1.5 w-1.5 shrink-0">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"
                style={{ animationDelay: `${index * 400}ms` }}
              />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
          </div>
          <p className="mt-2 uppercase tracking-[0.3em] text-slate-500">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}