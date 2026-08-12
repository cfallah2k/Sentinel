export default function PrivacyPage() {
  const privacyPoints = [
    {
      title: 'Data minimization',
      description: 'Sentinel processes only the data required to enforce policy decisions and generate audit evidence.'
    },
    {
      title: 'Protection controls',
      description: 'Sensitive information is protected through encryption, role-based access, and governance isolation.'
    },
    {
      title: 'Transparency',
      description: 'Organizations receive visibility into how AI requests, workflows, and data categories are evaluated and retained.'
    },
    {
      title: 'Compliance alignment',
      description: 'Privacy practices are designed to support enterprise obligations across security and regulatory frameworks.'
    }
  ];

  return (
    <main className="mx-auto max-w-6xl px-6 py-20 text-[var(--text)]">
      <section className="rounded-[2rem] border border-white/10 bg-[var(--surface)] p-10 shadow-panel backdrop-blur-xl">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.35em] text-sentinel-300">Privacy</p>
          <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Privacy and data protection for AI governance</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Sentinel is designed to help organizations govern AI without sacrificing data privacy. The platform treats sensitive signals and governance events as security-first telemetry.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {privacyPoints.map((point) => (
            <div key={point.title} className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-8 shadow-glow">
              <h2 className="text-xl font-semibold text-white">{point.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{point.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-8 text-slate-300">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Privacy posture</p>
          <p className="mt-4 text-sm leading-7">
            Sentinel is architected to support privacy-aware AI controls, including data minimization, secure handling, and clear governance reporting for regulated workflows.
          </p>
        </div>
      </section>
    </main>
  );
}
