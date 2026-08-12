const summaryCards = [
  {
    title: 'Policy management',
    description: 'Create, review, and publish AI governance rules with deterministic impact analysis.',
    value: '42 configs'
  },
  {
    title: 'Data flow insights',
    description: 'Visualize sensitive data movement and block risky AI exchanges before they leave your boundary.',
    value: '128 streams'
  },
  {
    title: 'Security posture',
    description: 'Monitor AI requests, incidents, and compliance state with real-time trust signals.',
    value: 'low risk'
  }
];

export default function AppLandingPage() {
  return (
    <main className="space-y-10 text-[var(--text)]">
      <section className="rounded-[2rem] border border-white/10 bg-[var(--surface)] p-8 shadow-panel backdrop-blur-xl transition duration-300 hover:shadow-[0_35px_100px_rgba(15,23,42,0.2)]">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Control plane home</p>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">Sentinel is your AI security cockpit.</h1>
            <p className="max-w-2xl text-base leading-8 text-slate-300">
              Monitor policy health, data flow risk, and compliance status across AI systems from one unified interface.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-6 shadow-glow">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Live status</p>
            <div className="mt-4 grid gap-4 text-sm text-white sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-900/90 p-4">
                <p className="text-3xl font-semibold text-emerald-300">98%</p>
                <p className="mt-2 text-slate-400">Policy coverage</p>
              </div>
              <div className="rounded-3xl bg-slate-900/90 p-4">
                <p className="text-3xl font-semibold text-sky-300">6</p>
                <p className="mt-2 text-slate-400">Open actions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        {summaryCards.map((card) => (
          <div key={card.title} className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-6 shadow-panel backdrop-blur-xl transition hover:-translate-y-1 hover:border-sentinel-500/20 hover:bg-slate-900/95">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{card.title}</p>
            <p className="mt-4 text-3xl font-semibold text-white">{card.value}</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">{card.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
