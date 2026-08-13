export default function MarketingDataVisual() {
  return (
    <section className="relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-4 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),_transparent_30%)] blur-3xl" />
      <div className="relative space-y-5 sm:space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">AI threat lens</p>
            <h2 className="mt-2 text-lg font-semibold text-white sm:text-xl">Visualize the hidden AI data flows that matter most.</h2>
          </div>
          <div className="inline-flex items-center gap-2 self-start rounded-full bg-slate-950/90 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.25em] text-slate-300 sm:self-auto">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Live map
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-slate-950/95 p-3.5 shadow-[0_30px_70px_rgba(15,23,42,0.22)] sm:rounded-[1.5rem] sm:p-5">
          <div className="pointer-events-none absolute -left-16 top-10 h-24 w-24 rounded-full bg-sentinel-500/15 blur-3xl" />
          <div className="pointer-events-none absolute right-6 top-20 h-20 w-20 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="grid h-[180px] grid-cols-5 gap-2 sm:h-[220px] sm:gap-3 lg:h-[260px]">
            <div className="space-y-2.5 sm:space-y-3">
              <div className="h-14 rounded-[1.25rem] bg-gradient-to-b from-sky-500/20 to-transparent shadow-[0_20px_50px_rgba(56,189,248,0.08)] sm:h-16 sm:rounded-[1.5rem]" />
              <div className="h-20 rounded-[1.25rem] bg-gradient-to-b from-slate-700/80 to-slate-800/60 sm:h-24 sm:rounded-[1.5rem]" />
            </div>
            <div className="space-y-2.5 sm:space-y-3">
              <div className="h-9 rounded-[1.25rem] bg-gradient-to-b from-slate-700/80 to-slate-800/60 sm:h-10 sm:rounded-[1.5rem]" />
              <div className="h-16 rounded-[1.25rem] bg-gradient-to-b from-sky-400/20 to-transparent shadow-[0_18px_50px_rgba(56,189,248,0.06)] sm:h-20 sm:rounded-[1.5rem]" />
              <div className="h-10 rounded-[1.25rem] bg-gradient-to-b from-slate-700/80 to-slate-800/60 sm:h-12 sm:rounded-[1.5rem]" />
            </div>
            <div className="space-y-2.5 sm:space-y-3">
              <div className="h-20 rounded-[1.25rem] bg-gradient-to-b from-sky-500/10 to-transparent sm:h-24 sm:rounded-[1.5rem]" />
              <div className="h-12 rounded-[1.25rem] bg-gradient-to-b from-slate-700/80 to-slate-800/60 sm:h-14 sm:rounded-[1.5rem]" />
            </div>
            <div className="space-y-2.5 sm:space-y-3">
              <div className="h-14 rounded-[1.25rem] bg-gradient-to-b from-cyan-400/20 to-transparent sm:h-16 sm:rounded-[1.5rem]" />
              <div className="h-20 rounded-[1.25rem] bg-gradient-to-b from-slate-700/80 to-slate-800/60 sm:h-24 sm:rounded-[1.5rem]" />
            </div>
            <div className="space-y-2.5 sm:space-y-3">
              <div className="h-12 rounded-[1.25rem] bg-gradient-to-b from-slate-700/80 to-slate-800/60 sm:h-14 sm:rounded-[1.5rem]" />
              <div className="h-16 rounded-[1.25rem] bg-gradient-to-b from-sky-500/10 to-transparent sm:h-20 sm:rounded-[1.5rem]" />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:mt-5 sm:grid-cols-3 sm:gap-3">
            {[
              { label: 'Policy blocks', value: '98%' },
              { label: 'Risk reduction', value: '72%' },
              { label: 'Audit readiness', value: '100%' }
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-950/90 p-3.5 text-xs text-slate-300 transition hover:border-sentinel-500/20 hover:bg-slate-900/95 sm:rounded-3xl sm:p-4 sm:text-sm">
                <p className="text-lg font-semibold text-white sm:text-xl">{item.value}</p>
                <p className="mt-1.5 uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}