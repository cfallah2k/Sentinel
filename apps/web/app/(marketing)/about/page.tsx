export default function AboutPage() {
  const pillars = [
    {
      title: 'Trusted AI governance',
      description: 'Sentinel delivers policy-first controls, data flow visibility, and audit evidence across every AI surface.'
    },
    {
      title: 'Built for global enterprises',
      description: 'Secure multi-cloud and SaaS environments with consistent controls and compliance-ready reporting.'
    },
    {
      title: 'Designed for speed',
      description: 'Launch governance quickly with orchestration, automation, and context-aware controls for AI teams.'
    }
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-20 text-[var(--text)]">
      <section className="rounded-[2rem] border border-white/10 bg-[var(--surface)] p-10 shadow-panel backdrop-blur-xl">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-sentinel-300">About</p>
            <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Sentinel is the governance layer that makes AI safe, auditable, and enterprise-ready.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              We help security, privacy, and risk teams see every AI interaction, enforce policy consistently, and deliver the operational evidence needed for audit and compliance.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-glow">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Why Sentinel</p>
            <div className="mt-6 space-y-5 text-sm text-slate-300">
              <div className="rounded-3xl bg-slate-900/90 p-4">Built for complex enterprises with hybrid AI estates.</div>
              <div className="rounded-3xl bg-slate-900/90 p-4">Designed for security teams to own visibility and policy enforcement.</div>
              <div className="rounded-3xl bg-slate-900/90 p-4">Delivers audit-ready evidence without manual review overhead.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {pillars.map((pillar) => (
          <div key={pillar.title} className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-8 shadow-panel backdrop-blur-xl transition hover:-translate-y-1 hover:border-sentinel-500/20 hover:bg-slate-900/95">
            <h2 className="text-xl font-semibold text-white">{pillar.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{pillar.description}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 rounded-[2rem] border border-white/10 bg-[rgba(15,23,42,0.95)] p-10 shadow-panel backdrop-blur-xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Leadership</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">A governance platform built for enterprise confidence and team velocity.</h2>
          </div>
          <div className="space-y-4 text-sm text-slate-300">
            <p>Sentinel is engineered to help organizations move faster with AI while preserving security, privacy, and compliance controls across every integration.</p>
            <p>From discovery to enforcement to audit, the platform makes AI governance operational and transparent for both technical and executive stakeholders.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
