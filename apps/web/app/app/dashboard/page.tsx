const stats = [
  { label: 'Total AI Systems', value: '24', tone: 'text-sky-300' },
  { label: 'Approved Systems', value: '18', tone: 'text-emerald-300' },
  { label: 'High Risk Systems', value: '4', tone: 'text-amber-300' },
  { label: 'Blocked Requests', value: '142', tone: 'text-rose-300' },
  { label: 'Redacted Requests', value: '87', tone: 'text-slate-300' },
  { label: 'Pending Approvals', value: '6', tone: 'text-cyan-300' },
  { label: 'Open Incidents', value: '3', tone: 'text-red-300' }
];

const alerts = [
  {
    title: 'Policy drift detected in AI ingest pipeline',
    description: 'New data source rules conflict with current policy enforcement for sensitive customer fields.',
    status: 'Investigate',
    tone: 'text-amber-300'
  },
  {
    title: 'High-risk AI request blocked',
    description: 'A third-party AI provider attempted to access restricted identity data.',
    status: 'Blocked',
    tone: 'text-rose-300'
  }
];

export default function DashboardPage() {
  return (
    <main className="space-y-10 text-[var(--text)]">
      <section className="grid gap-8 xl:grid-cols-[1.45fr_0.95fr]">
        <div className="space-y-6 rounded-[2rem] border border-white/10 bg-[var(--surface)] p-8 shadow-panel backdrop-blur-xl transition duration-300 hover:shadow-[0_35px_100px_rgba(15,23,42,0.22)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Overview</p>
              <h1 className="text-3xl font-semibold text-white">Governance dashboard</h1>
            </div>
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              <span className="mr-2 h-2.5 w-2.5 rounded-full bg-emerald-400" />
              Synced 2 minutes ago
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.slice(0, 4).map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
                <div className="text-sm text-slate-400">{item.label}</div>
                <div className={`mt-4 text-3xl font-semibold ${item.tone}`}>{item.value}</div>
              </div>
            ))}
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Quick actions</p>
                <h2 className="mt-2 text-xl font-semibold text-white">Take control from one place</h2>
              </div>
              <button className="inline-flex items-center justify-center rounded-full bg-sentinel-500 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:bg-sentinel-400">
                Review policies
              </button>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {['Inspect data flows', 'Authorize AI apps', 'Audit latest incidents'].map((action) => (
                <div key={action} className="rounded-3xl bg-[rgba(15,23,42,0.95)] p-4 text-sm text-slate-300 shadow-sm">
                  {action}
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6 rounded-[2rem] border border-white/10 bg-[var(--surface)] p-6 shadow-panel backdrop-blur-xl transition duration-300 hover:shadow-[0_35px_100px_rgba(15,23,42,0.22)]">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Active risks</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Critical alerts</h2>
          </div>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.title} className="rounded-3xl border border-white/10 bg-slate-950/95 p-5 transition hover:border-sentinel-500/20">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-base font-semibold text-white">{alert.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{alert.description}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${alert.tone}`}>{alert.status}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-white/10 bg-[var(--surface)] p-6 shadow-panel backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Policy health</p>
              <h3 className="mt-2 text-xl font-semibold text-white">Governance score</h3>
            </div>
            <div className="rounded-full bg-slate-950/90 px-4 py-2 text-sm text-slate-300">85 / 100</div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Coverage', value: '98%' },
              { label: 'Compliance', value: '91%' },
              { label: 'AI risk', value: 'Low' }
            ].map((card) => (
              <div key={card.label} className="rounded-3xl bg-slate-950/90 p-5 text-sm text-slate-300">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{card.label}</p>
                <p className="mt-3 text-2xl font-semibold text-white">{card.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-[var(--surface)] p-6 shadow-panel backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Activity</p>
              <h3 className="mt-2 text-xl font-semibold text-white">Recent AI data events</h3>
            </div>
            <span className="rounded-full bg-slate-950/90 px-3 py-2 text-sm text-slate-300">Updated now</span>
          </div>
          <div className="mt-6 space-y-3">
            {['New policy created', 'Dataflow validation passed', 'External provider blocked'].map((event, index) => (
              <div key={event} className="rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-4 text-sm text-slate-300 transition hover:border-sentinel-500/20">
                <div className="flex items-center justify-between gap-3">
                  <p>{event}</p>
                  <span className="text-xs uppercase tracking-[0.25em] text-slate-500">{index === 0 ? 'Now' : index === 1 ? '5m ago' : '12m ago'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
