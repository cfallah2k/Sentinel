export default function ProductPage() {
  const productFeatures = [
    {
      title: 'AI system mapping',
      description: 'Scan and visualize every model, container, and integration in a single, searchable topology.'
    },
    {
      title: 'Sensitive flow detection',
      description: 'Identify risk paths across AI inputs, outputs, and third-party provider connections.'
    },
    {
      title: 'Policy orchestration',
      description: 'Create reusable policies that enforce governance across all AI channels and data domains.'
    },
    {
      title: 'Automated evidence',
      description: 'Produce audit-ready reports and passports for governance reviews and compliance teams.'
    },
    {
      title: 'Real-time insights',
      description: 'Monitor policy execution, risk signals, and drift indicators with live dashboards.'
    },
    {
      title: 'Secure AI gateway',
      description: 'Route requests through a purpose-built control plane that evaluates every call before it reaches an AI provider.'
    }
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-20 text-[var(--text)]">
      <section className="rounded-[2rem] border border-white/10 bg-[var(--surface)] p-10 shadow-panel backdrop-blur-xl">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.85fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-sentinel-300">Product</p>
            <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Enterprise AI security built for confidence, control, and compliance.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Sentinel helps security, risk, and engineering teams see every AI surface, govern every policy, and prove controls with structured evidence.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-glow">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Product at a glance</p>
            <div className="mt-6 grid gap-4 text-sm text-slate-300">
              <div className="rounded-3xl bg-slate-900/90 p-4">AI discovery engine with metadata-driven mapping.</div>
              <div className="rounded-3xl bg-slate-900/90 p-4">Policy authoring and enforcement in one unified workflow.</div>
              <div className="rounded-3xl bg-slate-900/90 p-4">Audit-ready trails across every AI decision and data flow.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {productFeatures.map((feature) => (
          <div key={feature.title} className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-panel transition hover:-translate-y-1 hover:border-sentinel-500/20 hover:bg-slate-900/95">
            <h2 className="text-xl font-semibold text-white">{feature.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 rounded-[2rem] border border-white/10 bg-[rgba(15,23,42,0.95)] p-10 shadow-panel backdrop-blur-xl">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-8 shadow-glow">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Platform capabilities</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">Sentinel combines discovery, governance, and evidence collection in a single UX designed for enterprise teams.</p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-8 shadow-glow">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Deployment flexibility</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">Deploy in hybrid, cloud, or dedicated environments while maintaining secure policy boundaries.</p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-8 shadow-glow">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Operational insight</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">Use audit-grade evidence and live risk data to support board-level governance and security operations.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
