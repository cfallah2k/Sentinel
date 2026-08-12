export default function StatusPage() {
  const systems = [
    { name: 'API', status: 'Operational', description: 'External API endpoints are responding normally.' },
    { name: 'Gateway', status: 'Operational', description: 'AI request evaluation and enforcement are healthy.' },
    { name: 'Policy engine', status: 'Operational', description: 'Policy decisions are being generated within target latency.' },
    { name: 'Audit trail', status: 'Operational', description: 'Governance logs and event exports are available.' }
  ];

  return (
    <main className="mx-auto max-w-6xl px-6 py-20 text-[var(--text)]">
      <section className="rounded-[2rem] border border-white/10 bg-[var(--surface)] p-10 shadow-panel backdrop-blur-xl">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.35em] text-sentinel-300">Status</p>
          <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Operational status and system health</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Monitor the current availability of core Sentinel services. This page is designed to give security and operations teams a quick view of service health and stability.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {systems.map((system) => (
            <div key={system.name} className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-6 shadow-glow">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-white">{system.name}</h2>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-300">{system.status}</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">{system.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-8 text-slate-300">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Recent incidents</p>
          <div className="mt-6 space-y-4 text-sm leading-7">
            <div className="rounded-3xl bg-slate-900/95 p-4">No incidents reported in the last 24 hours.</div>
            <div className="rounded-3xl bg-slate-900/95 p-4">Latency and throughput remain within baseline thresholds.</div>
          </div>
        </div>
      </section>
    </main>
  );
}
