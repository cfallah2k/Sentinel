const rules = [
  {
    name: 'Protect national identifiers',
    expression: 'WHEN data_category = NATIONAL_ID AND provider_type = EXTERNAL THEN BLOCK',
    status: 'Enforced'
  },
  {
    name: 'Redact PII in chat prompts',
    expression: 'WHEN data_category = PII THEN REDACT',
    status: 'Active'
  },
  {
    name: 'Approve model access',
    expression: 'WHEN user_role NOT IN ("Risk", "Security") THEN REQUIRES_APPROVAL',
    status: 'Review'
  }
];

export default function PoliciesPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20 text-[var(--text)]">
      <section className="rounded-[2rem] border border-white/10 bg-[var(--surface)] p-10 shadow-panel backdrop-blur-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Policies</p>
            <h1 className="mt-2 text-4xl font-semibold text-white">Governance rules engineered for AI control.</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              Manage policy definitions, enforcement states, and risk controls from a unified policy workspace tailored for AI workflows.
            </p>
          </div>
          <button className="inline-flex items-center justify-center rounded-full bg-sentinel-500 px-6 py-3 text-sm font-semibold text-white shadow-glow hover:bg-sentinel-400">
            Create policy
          </button>
        </div>

        <div className="mt-10 grid gap-6">
          {rules.map((rule) => (
            <div key={rule.name} className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-6 shadow-panel transition hover:-translate-y-0.5 hover:border-sentinel-500/20 hover:bg-slate-900/95">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{rule.name}</p>
                  <pre className="mt-3 overflow-x-auto rounded-3xl border border-white/10 bg-slate-900/95 p-5 text-sm text-slate-200">{rule.expression}</pre>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-300">{rule.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-8 shadow-glow">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Governance insight</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">Use policy dashboards to validate enforcement coverage, identify drift, and ensure high-risk AI requests are handled consistently.</p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-8 shadow-glow">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Operational control</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">Combine policy rules with approvals, classification metadata, and provider constraints to keep AI usage aligned with enterprise risk requirements.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
