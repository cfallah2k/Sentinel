export default function MarketingDataVisual() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-8 shadow-panel backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),_transparent_30%)] blur-3xl" />
      <div className="relative space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">AI threat lens</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Visualize the hidden AI data flows that matter most.</h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/90 px-4 py-2 text-sm uppercase tracking-[0.35em] text-slate-300">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            Live map
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-[0_30px_70px_rgba(15,23,42,0.22)]">
          <div className="pointer-events-none absolute -left-16 top-10 h-24 w-24 rounded-full bg-sentinel-500/15 blur-3xl" />
          <div className="pointer-events-none absolute right-6 top-20 h-20 w-20 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="grid h-[280px] grid-cols-5 gap-4 sm:h-[320px]">
            <div className="space-y-4">
              <div className="h-20 rounded-[1.75rem] bg-gradient-to-b from-sky-500/20 to-transparent shadow-[0_20px_50px_rgba(56,189,248,0.08)]" />
              <div className="h-32 rounded-[1.75rem] bg-gradient-to-b from-slate-700/80 to-slate-800/60" />
            </div>
            <div className="space-y-4">
              <div className="h-12 rounded-[1.75rem] bg-gradient-to-b from-slate-700/80 to-slate-800/60" />
              <div className="h-24 rounded-[1.75rem] bg-gradient-to-b from-sky-400/20 to-transparent shadow-[0_18px_50px_rgba(56,189,248,0.06)]" />
              <div className="h-14 rounded-[1.75rem] bg-gradient-to-b from-slate-700/80 to-slate-800/60" />
            </div>
            <div className="space-y-4">
              <div className="h-28 rounded-[1.75rem] bg-gradient-to-b from-sky-500/10 to-transparent" />
              <div className="h-16 rounded-[1.75rem] bg-gradient-to-b from-slate-700/80 to-slate-800/60" />
            </div>
            <div className="space-y-4">
              <div className="h-20 rounded-[1.75rem] bg-gradient-to-b from-cyan-400/20 to-transparent" />
              <div className="h-28 rounded-[1.75rem] bg-gradient-to-b from-slate-700/80 to-slate-800/60" />
            </div>
            <div className="space-y-4">
              <div className="h-16 rounded-[1.75rem] bg-gradient-to-b from-slate-700/80 to-slate-800/60" />
              <div className="h-24 rounded-[1.75rem] bg-gradient-to-b from-sky-500/10 to-transparent" />
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Policy blocks', value: '98%' },
              { label: 'Risk reduction', value: '72%' },
              { label: 'Audit readiness', value: '100%' }
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/10 bg-slate-950/90 p-5 text-sm text-slate-300 transition hover:border-sentinel-500/20 hover:bg-slate-900/95">
                <p className="text-3xl font-semibold text-white">{item.value}</p>
                <p className="mt-2 uppercase tracking-[0.35em] text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
