import Link from 'next/link';
import SiteFooter from '../components/site-footer';
import SiteHeader from '../components/site-header';
import MarketingDataVisual from '../components/marketing-data-visual';
import MarketingFeatureCard from '../components/marketing-feature-card';
import MarketingLogoCloud from '../components/marketing-logo-cloud';
import MarketingTestimonial from '../components/marketing-testimonial';

const featureCards = [
  {
    title: 'Enterprise AI policy fabric',
    description: 'Deploy adaptive policy controls across every AI data path with unified observability and proof-ready enforcement.',
    accent: 'Policy Grid',
    detail: 'Correlate AI rules across systems with consistent governance.'
  },
  {
    title: 'Trusted data flow governance',
    description: 'Trace data movement, detect sensitive exposure, and secure AI pipelines from source to inference.',
    accent: 'Data Mesh',
    detail: 'Map every AI boundary with audit clarity.'
  },
  {
    title: 'Engineered for zero trust',
    description: 'Protect AI insights with role-aware access controls, drift-resistant audits, and contract-grade compliance telemetry.',
    accent: 'Zero Trust',
    detail: 'Ensure only authorized AI actions proceed.'
  }
];

const trustPoints = [
  {
    title: 'Global compliance stack',
    description: 'Support GDPR, CCPA, SOC 2, and enterprise compliance across hybrid AI deployments.'
  },
  {
    title: 'AI lifecycle observability',
    description: 'Monitor sensitive data from ingestion to inference with actionable risk signals.'
  },
  {
    title: 'Fast policy orchestration',
    description: 'Launch governance rules across systems in minutes, not weeks.'
  }
];

const trustStats = [
  { label: 'AI workflows protected', value: '2.7k' },
  { label: 'Policy rules deployed', value: '1.4k' },
  { label: 'Risk events reviewed', value: '10.2k' },
  { label: 'Audit reports generated', value: '12m+' }
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_36%)] blur-3xl" />
      <SiteHeader />

      <section className="relative mx-auto flex max-w-7xl flex-col gap-16 px-6 py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1fr] lg:items-center">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-sentinel-500/35 bg-sentinel-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-sentinel-200 shadow-[0_10px_40px_rgba(56,189,248,0.08)]">
              Enterprise AI security
            </span>
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-6xl">
              Give AI the policy guardrails it needs, without slowing your business down.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Sentinel is the modern control plane for AI data governance, policy enforcement, and audit-ready trust across cloud, SaaS, and multi-national enterprise systems.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/register" className="inline-flex items-center justify-center rounded-full bg-sentinel-500 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-sentinel-400">
                Start free trial
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white text-opacity-90 transition hover:bg-white/10">
                Request a demo
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 text-sm text-slate-400">
              <span>Policy coverage for AI / ML</span>
              <span>Continuous risk detection</span>
              <span>Audit-ready reporting</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[rgba(15,23,42,0.95)] p-6 shadow-panel backdrop-blur-xl animate-float">
            <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.24),_transparent_45%)]" />
            <div className="relative space-y-6">
              <div className="flex items-center justify-between rounded-[1.75rem] border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-slate-300">
                <span>Sentinel AI traffic lens</span>
                <span className="rounded-full bg-sentinel-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-sentinel-200">
                  Real-time
                </span>
              </div>
              <div className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-slate-900/90 p-5 shadow-glow">
                {['Policy breach', 'Sensitive flow', 'AI provider risk'].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-3xl bg-slate-950/90 px-4 py-4 text-sm text-slate-200">
                    <span>{item}</span>
                    <span className="text-sentinel-300">Active</span>
                  </div>
                ))}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/85 p-5">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Policy</p>
                  <p className="mt-3 text-lg font-semibold text-white">Encrypted AI exchange</p>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/85 p-5">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Risk</p>
                  <p className="mt-3 text-lg font-semibold text-white">99.99% visibility</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featureCards.map((card) => (
            <MarketingFeatureCard
              key={card.title}
              title={card.title}
              description={card.description}
              accent={card.accent}
              detail={card.detail}
            />
          ))}
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-10 shadow-panel backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Enterprise readiness</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Designed for AI security teams who move fast and need absolute trust.</h2>
            <div className="mt-8 space-y-5">
              {trustPoints.map((point) => (
                <div key={point.title} className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-5">
                  <h3 className="text-lg font-semibold text-white">{point.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{point.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-10 shadow-panel backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Trusted at scale</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Operational visibility meets governance precision.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {trustStats.map((stat) => (
                <div key={stat.label} className="rounded-[1.75rem] bg-slate-950/90 p-5 text-sm text-slate-300">
                  <p className="text-3xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-2 uppercase tracking-[0.35em] text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-[rgba(15,23,42,0.95)] p-10 shadow-panel backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Secure your AI strategy</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">Bring policy, data, and audit into one elegant control plane.</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className="inline-flex items-center justify-center rounded-full bg-sentinel-500 px-6 py-3 text-sm font-semibold text-white shadow-glow hover:bg-sentinel-400">
                Start free trial
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white text-opacity-90 transition hover:bg-white/10">
                Talk to sales
              </Link>
            </div>
          </div>
        </section>

        <MarketingDataVisual />

        <MarketingLogoCloud />

        <section className="grid gap-6 lg:grid-cols-3">
          <MarketingTestimonial
            quote="Sentinel let our security team deploy AI governance controls across cloud and SaaS systems faster than any platform we’ve used."
            name="Maya Chen"
            role="VP of Security"
            company="Nova Financial"
          />
          <MarketingTestimonial
            quote="We now see every sensitive AI flow in real time, and the audit evidence is ready on demand for every compliance review."
            name="Jordan Patel"
            role="Head of AI Risk"
            company="Atlas Health"
          />
          <MarketingTestimonial
            quote="The product feels like it was built for enterprise trust—high fidelity, fast controls, and a design that helps people move with confidence."
            name="Alicia Monroe"
            role="Director of Trust"
            company="Vertex Systems"
          />
        </section>
      </section>

      <SiteFooter />
    </main>
  );
}
