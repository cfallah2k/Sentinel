import Link from 'next/link';
import SiteFooter from '../components/site-footer';
import SiteHeader from '../components/site-header';
import MarketingDataVisual from '../components/marketing-data-visual';
import MarketingFeatureCard from '../components/marketing-feature-card';

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
    title: 'Africa-first compliance stack',
    description: 'Built around Nigeria\u2019s Data Protection Act, Ghana\u2019s Data Protection Act, Côte d\u2019Ivoire\u2019s and Senegal\u2019s data protection laws, Kenya\u2019s Data Protection Act, and the AU Malabo Convention \u2014 with GDPR where it applies.'
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

export default function HomePage() {
  return (
    <main className="relative overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_36%)] blur-3xl" />
      <SiteHeader />

      <section className="relative mx-auto flex max-w-7xl flex-col gap-10 px-5 py-12 sm:px-6 lg:gap-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1fr] lg:items-center lg:gap-10">
          <div className="space-y-5 sm:space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-sentinel-500/35 bg-sentinel-500/10 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-sentinel-200 shadow-[0_10px_40px_rgba(56,189,248,0.08)]">
              Enterprise AI security
            </span>
            <h1 className="max-w-3xl text-2xl font-semibold leading-snug tracking-[-0.03em] text-white sm:text-3xl lg:text-4xl">
              Give AI the policy guardrails it needs, without slowing your business down.
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base lg:leading-8">
              Sentinel is the modern control plane for AI data governance, policy enforcement, and audit-ready trust &mdash; built for African enterprises and designed for the continent&apos;s regulatory landscape.
            </p>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
              <Link href="/register" className="inline-flex w-full items-center justify-center rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 sm:w-auto sm:text-sm">
                Start free trial
              </Link>
              <Link href="/contact" className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white text-opacity-90 transition hover:bg-white/10 sm:w-auto sm:text-sm">
                Request a demo
              </Link>
            </div>
            <div className="grid gap-2 text-xs text-slate-400 sm:grid-cols-3 sm:gap-3 sm:text-sm">
              <span>Policy coverage for AI / ML</span>
              <span>Continuous risk detection</span>
              <span>Audit-ready reporting</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[var(--surface-strong)] p-4 shadow-panel backdrop-blur-xl animate-float sm:rounded-[2rem] sm:p-5">
            <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.24),_transparent_45%)]" />
            <div className="relative space-y-4 sm:space-y-5">
              <div className="flex items-center justify-between gap-3 rounded-[1.25rem] border border-white/10 bg-slate-950/90 px-3.5 py-2.5 text-xs text-slate-300 sm:rounded-[1.5rem] sm:text-sm">
                <span>Sentinel AI traffic lens</span>
                <span className="whitespace-nowrap rounded-full bg-sentinel-500/15 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-sentinel-200">
                  Preview
                </span>
              </div>
              <div className="grid gap-2.5 rounded-[1.25rem] border border-white/10 bg-slate-900/90 p-3.5 shadow-glow sm:rounded-[1.5rem] sm:gap-3 sm:p-4">
                {['Policy breach', 'Sensitive flow', 'AI provider risk'].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-2xl bg-slate-950/90 px-3.5 py-2.5 text-xs text-slate-200 sm:text-sm">
                    <span>{item}</span>
                    <span className="text-sentinel-300">Tracked</span>
                  </div>
                ))}
              </div>
              <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/85 p-3.5 sm:rounded-[1.5rem] sm:p-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">Policy</p>
                  <p className="mt-2 text-sm font-semibold text-white sm:text-base">Encrypted AI exchange</p>
                </div>
                <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/85 p-3.5 sm:rounded-[1.5rem] sm:p-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">Risk</p>
                  <p className="mt-2 text-sm font-semibold text-white sm:text-base">Full audit trail</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
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

        <section className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-7">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Enterprise readiness</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Designed for AI security teams who move fast and need absolute trust.</h2>
          <div className="mt-6 grid gap-3.5 md:grid-cols-3">
            {trustPoints.map((point) => (
              <div key={point.title} className="rounded-[1.25rem] border border-white/10 bg-slate-950/90 p-4 sm:rounded-[1.5rem]">
                <h3 className="text-sm font-semibold text-white sm:text-base">{point.title}</h3>
                <p className="mt-2 text-xs leading-6 text-slate-300 sm:text-sm">{point.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[1.25rem] border border-white/10 bg-[var(--surface-strong)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Secure your AI strategy</p>
              <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Bring policy, data, and audit into one elegant control plane.</h2>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
              <Link href="/register" className="inline-flex w-full items-center justify-center rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow hover:bg-sentinel-400 sm:w-auto sm:text-sm">
                Start free trial
              </Link>
              <Link href="/contact" className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white text-opacity-90 transition hover:bg-white/10 sm:w-auto sm:text-sm">
                Talk to sales
              </Link>
            </div>
          </div>
        </section>

        <MarketingDataVisual />
      </section>

      <SiteFooter />
    </main>
  );
}