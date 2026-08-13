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
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 text-xs text-slate-400 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-6 sm:text-sm"
        >
          <p className="text-xl font-semibold text-white sm:text-3xl">{stat.value}</p>
          <p className="mt-2 uppercase tracking-[0.3em] text-slate-500">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
