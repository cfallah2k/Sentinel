export default function DevelopersPage() {
  const highlights = [
    'OpenAI-compatible gateway for AI request inspection',
    'Policy decision API with allow, block, redact, and approval responses',
    'Metadata-driven governance for providers, applications, and data categories',
    'Audit-ready events for every policy evaluation and AI interaction'
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-20 text-[var(--text)]">
      <section className="rounded-[2rem] border border-white/10 bg-[var(--surface)] p-10 shadow-panel backdrop-blur-xl">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.35em] text-sentinel-300">Developers</p>
          <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Build AI integrations with governance-first APIs and secure controls.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Sentinel provides developer-friendly APIs and gateway hooks so engineering teams can embed policy enforcement and observability directly into AI workflows.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-8 shadow-glow">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">API pattern</p>
              <pre className="mt-6 overflow-x-auto rounded-3xl bg-slate-900/95 px-5 py-6 text-sm leading-6 text-slate-200">
                <code>{`POST /api/gateway/evaluate
{
  "provider": "openai",
  "model": "gpt-4.1",
  "input": "Customer payment data is being sent..."
}`}</code>
              </pre>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-8 shadow-glow">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Developer focus</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {highlights.map((item) => (
                  <li key={item} className="rounded-3xl bg-slate-900/90 p-4">{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-10 shadow-panel">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Integration benefits</p>
            <div className="mt-8 grid gap-5 text-slate-300">
              {[
                'Ensure every AI request is evaluated against policy before execution.',
                'Capture provider metadata and classification context for reporting.',
                'Extend governance to apps, automations, and embedded AI experiences.'
              ].map((benefit) => (
                <div key={benefit} className="rounded-3xl bg-slate-900/95 p-5">{benefit}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
