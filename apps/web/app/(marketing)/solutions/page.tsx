export default function SolutionsPage() {
  const solutions = [
    {
      title: 'Risk visibility',
      description: 'Capture every AI data flow across apps, models, and providers with a searchable governance topology.'
    },
    {
      title: 'Policy enforcement',
      description: 'Apply consistent controls at the gateway layer and stop non-compliant AI requests before they reach providers.'
    },
    {
      title: 'Sensitive data protection',
      description: 'Detect regulated content, PII, and high-risk assets with context-aware classification and redaction.'
    },
    {
      title: 'Audit readiness',
      description: 'Generate evidence-rich logs, reports, and access trails for security, privacy, and compliance reviews.'
    },
    {
      title: 'Governance automation',
      description: 'Use policy templates, approval workflows, and scorecards to scale controls across teams and projects.'
    },
    {
      title: 'Operational alerting',
      description: 'Trigger risk notifications, incident reviews, and data protection actions from a single secure control plane.'
    }
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-20 text-[var(--text)]">
      <section className="rounded-[2rem] border border-white/10 bg-[var(--surface)] p-10 shadow-panel backdrop-blur-xl">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-sentinel-300">Solutions</p>
            <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">AI governance that protects data, controls risk, and enables enterprise scale.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Sentinel gives security, privacy, and risk teams a unified control layer for every AI interaction, provider, and dataset. Build policy-driven protection across cloud, SaaS, and custom AI workflows.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-glow">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Key outcomes</p>
            <div className="mt-6 grid gap-4 text-sm text-slate-300">
              <div className="rounded-3xl bg-slate-900/90 p-5">Reduce AI exposure with proactive policy enforcement.</div>
              <div className="rounded-3xl bg-slate-900/90 p-5">Manage sensitive flows with real-time discovery and classification.</div>
              <div className="rounded-3xl bg-slate-900/90 p-5">Support audits with evidence-ready logs and governance reports.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {solutions.map((solution) => (
          <div key={solution.title} className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-panel transition duration-300 hover:-translate-y-1 hover:border-sentinel-500/20 hover:bg-slate-900/95">
            <h2 className="text-xl font-semibold text-white">{solution.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{solution.description}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 rounded-[2rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-10 shadow-panel backdrop-blur-xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-sentinel-300">Enterprise readiness</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Governance workflows built for audit, policy, and control.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {['Compliant by design', 'Cross-team trust', 'Actionable evidence'].map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-slate-950/90 p-5 text-sm text-slate-300">{item}</div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
