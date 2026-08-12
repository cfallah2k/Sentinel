const logoNames = ['Vanguard', 'Orion Labs', 'Helix Security', 'Nova Financial', 'Atlas Health', 'Vertex Systems'];

export default function MarketingLogoCloud() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-8 shadow-panel backdrop-blur-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Trusted by</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Enterprise teams rely on Sentinel for secure AI operations.</h2>
        </div>
        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-300 shadow-[0_20px_60px_rgba(15,23,42,0.15)]">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-sentinel-400 shadow-glow" />
          24/7 AI governance visibility
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {logoNames.map((logo) => (
          <div key={logo} className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 px-5 py-6 text-center text-sm font-semibold text-slate-200 transition duration-300 hover:-translate-y-0.5 hover:border-sentinel-500/20 hover:bg-slate-900/95 hover:shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
            {logo}
          </div>
        ))}
      </div>
    </section>
  );
}
