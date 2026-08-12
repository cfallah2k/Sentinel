export default function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20 text-[var(--text)]">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-white/10 bg-[var(--surface)] p-10 shadow-panel backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-sentinel-300">Contact</p>
          <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Talk to the Sentinel team</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            For enterprise deployments, compliance planning, and strategic AI security guidance, our team is ready to support your organization with secure, high-trust AI governance.
          </p>

          <div className="mt-10 grid gap-4 rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-6 text-slate-300 shadow-glow">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">General</p>
              <p className="mt-2 text-base text-white">hello@sentinel.example</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Security</p>
              <p className="mt-2 text-base text-white">security@sentinel.example</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Governance</p>
              <p className="mt-2 text-base text-white">governance@sentinel.example</p>
            </div>
          </div>

          <div className="mt-10 rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-8 shadow-panel">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Enterprise support</p>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
              <p>Our team partners with security and compliance leaders to define policy, onboarding, and audit readiness for every deployment.</p>
              <p>Expect tailored guidance, secure rollout plans, and hands-on support for regulated AI programs.</p>
            </div>
          </div>
        </div>

        <form className="rounded-[2rem] border border-white/10 bg-[var(--surface)] p-10 shadow-panel backdrop-blur-xl">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.35em] text-sentinel-300">Send a message</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Start a secure conversation</h2>
          </div>
          <div className="grid gap-5">
            <label className="space-y-2 text-sm text-slate-300">
              <span>Name</span>
              <input className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none transition focus:border-sentinel-500 focus:ring-2 focus:ring-sentinel-500/20" />
            </label>
            <label className="space-y-2 text-sm text-slate-300">
              <span>Work email</span>
              <input type="email" className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none transition focus:border-sentinel-500 focus:ring-2 focus:ring-sentinel-500/20" />
            </label>
            <label className="space-y-2 text-sm text-slate-300">
              <span>Company</span>
              <input className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none transition focus:border-sentinel-500 focus:ring-2 focus:ring-sentinel-500/20" />
            </label>
            <label className="space-y-2 text-sm text-slate-300">
              <span>Message</span>
              <textarea className="min-h-[160px] w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none transition focus:border-sentinel-500 focus:ring-2 focus:ring-sentinel-500/20" />
            </label>
          </div>
          <button type="submit" className="mt-6 w-full rounded-full bg-sentinel-500 px-6 py-3 text-sm font-semibold text-white shadow-glow hover:bg-sentinel-400">
            Book a demo
          </button>
        </form>
      </div>
    </main>
  );
}
