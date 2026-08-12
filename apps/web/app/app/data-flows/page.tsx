const flowPaths = [
  {
    title: 'Customer Database → Support App → Sentinel → External AI Provider',
    status: 'Blocked',
    tone: 'text-rose-300',
    description: 'Sensitive customer records were intercepted by policy controls before reaching an external model.'
  },
  {
    title: 'HR System → Internal Chatbot → Sentinel',
    status: 'Approved',
    tone: 'text-emerald-300',
    description: 'Trusted internal AI workflows are validated and routed without exposing regulated data externally.'
  }
];

export default function DataFlowsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20 text-[var(--text)]">
      <section className="rounded-[2rem] border border-white/10 bg-[var(--surface)] p-10 shadow-panel backdrop-blur-xl">
        <div className="mb-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Data flows</p>
            <h1 className="mt-4 text-4xl font-semibold text-white">Visualize and govern AI data movement across every integration.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Sentinel maps sensitive data journeys and enforces policy at every boundary so security teams can see where AI traffic is going and why requests are blocked.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-6 shadow-glow">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Flow overview</p>
            <div className="mt-5 space-y-4 text-sm text-slate-300">
              <div className="rounded-3xl bg-slate-900/95 p-4">
                <p className="font-semibold text-white">82%</p>
                <p className="mt-1 text-slate-400">of AI data flows validated</p>
              </div>
              <div className="rounded-3xl bg-slate-900/95 p-4">
                <p className="font-semibold text-white">4</p>
                <p className="mt-1 text-slate-400">blocked high-risk paths</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {flowPaths.map((flow) => (
            <div key={flow.title} className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-6 shadow-panel transition hover:-translate-y-1 hover:border-sentinel-500/20 hover:bg-slate-900/95">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Flow path</p>
                  <p className="mt-3 text-lg font-semibold text-white">{flow.title}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-sm font-semibold ${flow.tone} bg-white/5 border border-white/10`}>{flow.status}</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">{flow.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
