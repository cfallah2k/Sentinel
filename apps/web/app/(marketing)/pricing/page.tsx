const tiers = [
  { name: 'Free / Trial', description: 'Explore core policy and classification controls for a limited environment.', price: 'Custom quote' },
  { name: 'Professional', description: 'For focused AI governance at product and security teams.', price: 'Custom quote' },
  { name: 'Business', description: 'Full org governance, monitoring, and reporting across teams.', price: 'Custom quote' },
  { name: 'Enterprise', description: 'Advanced controls, custom deployment, and managed support.', price: 'Custom quote' },
  { name: 'Government', description: 'Sovereign deployment and compliance reporting architecture.', price: 'Custom quote' }
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20 text-[var(--text)]">
      <section className="rounded-[2rem] border border-white/10 bg-[var(--surface)] p-10 shadow-panel backdrop-blur-xl">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.35em] text-sentinel-300">Pricing</p>
          <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Flexible pricing for governance programs that demand control and compliance.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Sentinel is priced for enterprise deployment, with customized plans that match your risk profile, scale, and data governance needs.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-5">
          {tiers.map((tier) => (
            <div key={tier.name} className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-8 shadow-panel transition hover:-translate-y-1 hover:border-sentinel-500/20 hover:bg-slate-900/95">
              <h2 className="text-xl font-semibold text-white">{tier.name}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{tier.description}</p>
              <div className="mt-8 text-3xl font-semibold text-white">{tier.price}</div>
              <button className="mt-8 w-full rounded-full bg-sentinel-500 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:bg-sentinel-400">
                Contact sales
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            'Policy enforcement and classification across AI workflows',
            'Audit-ready evidence and report generation',
            'Hybrid deployment support and governance automation'
          ].map((item) => (
            <div key={item} className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-6 text-sm text-slate-300">
              {item}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
