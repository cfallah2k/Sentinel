export default function SecurityPage() {
  const pillars = [
    {
      title: 'Zero trust AI controls',
      description: 'Enforce policies at the edge of every AI request with explicit allow/deny validations and data redaction.'
    },
    {
      title: 'Audit-ready evidence',
      description: 'Capture decision trails, policy versions, and risk signals for compliance and incident review.'
    },
    {
      title: 'Sovereign deployment',
      description: 'Support private, dedicated, and hybrid deployments with minimal external surface area.'
    }
  ];

  return (
    <main className="mx-auto max-w-6xl px-6 py-20 text-[var(--text)]">
      <div className="rounded-[2rem] border border-white/10 bg-[var(--surface)] p-10 shadow-panel backdrop-blur-xl">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.35em] text-sentinel-300">Security</p>
          <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Security architecture for trusted AI governance</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Sentinel enforces policy, isolation, and audit controls across AI pipelines so teams can operate confidently without sacrificing performance.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-6 shadow-glow transition hover:-translate-y-0.5 hover:border-sentinel-500/20">
              <h2 className="text-xl font-semibold text-white">{pillar.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{pillar.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-panel">
            <h2 className="text-2xl font-semibold text-white">Defend sensitive AI data</h2>
            <p className="mt-4 text-slate-300">Sentinel minimizes exposure by classifying, routing, and enforcing policy before data reaches a model or external provider.</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-panel">
            <h2 className="text-2xl font-semibold text-white">Govern with transparency</h2>
            <p className="mt-4 text-slate-300">Every policy decision, alert, and audit record is captured for security teams, compliance teams, and executive stakeholders.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
