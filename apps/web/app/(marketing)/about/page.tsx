import Link from 'next/link';
import { Target, Heart, Scale, Radar } from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';
import StatsBand from '@/components/marketing/stats-band';
import CtaSection from '@/components/marketing/cta-section';
import FeatureGrid from '@/components/marketing/feature-grid';

const stats = [
  { value: '2026', label: 'Founded' },
  { value: '0', label: 'Production workflows' },
  { value: '0', label: 'Enterprise customers' },
  { value: '0', label: 'Audit events tracked' }
];

const values = [
  {
    icon: Radar,
    title: 'Radical visibility',
    description: 'Every AI decision should be inspectable. We build observability into the foundation so governance is never an afterthought.'
  },
  {
    icon: Scale,
    title: 'Governance without friction',
    description: 'Security controls must keep pace with innovation. We design policies that protect without slowing teams down.'
  },
  {
    icon: Heart,
    title: 'Trust as a product',
    description: 'Compliance is not paperwork. It is the contract between an organization and the people who rely on its AI systems.'
  },
  {
    icon: Target,
    title: 'Ship with conviction',
    description: 'We move fast on hard problems — AI policy engines, classification pipelines, and audit infrastructure that scale.'
  }
];

const milestones = [
  { year: '2026', title: 'Sentinel is founded in Monrovia, Liberia', description: 'Built to solve a simple problem: AI was moving faster than the guardrails around it — and African enterprises were adopting AI without a governance layer built for them.' },
  { year: '2026', title: 'Africa-first compliance roadmap', description: 'Designing control mappings for Nigeria\u2019s Data Protection Act, Ghana\u2019s Data Protection Act, Côte d\u2019Ivoire\u2019s and Senegal\u2019s data protection laws, Kenya\u2019s Data Protection Act, and the AU Malabo Convention.' },
  { year: '2026', title: 'Early access program', description: 'Opening the platform to pilot customers across financial services, healthcare, and public sector as production data begins to flow.' }
];

export default function AboutPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="About Sentinel"
        title="We build the guardrails that let AI move at full speed."
        description="Sentinel is a modern AI data governance and control plane. Founded by security and data platform engineers, we help enterprises observe, govern, and prove every AI interaction — from gateway to audit trail."
        primary={{ label: 'Meet the platform', href: '/product' }}
        secondary={{ label: 'Read our story', href: '/blog' }}
      >
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[var(--surface-strong)] p-4 shadow-panel backdrop-blur-xl sm:rounded-[2rem] sm:p-5">
          <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.24),_transparent_45%)]" />
          <div className="relative space-y-3">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Company snapshot</p>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {[
                { label: 'Employees', value: '0' },
                { label: 'Market', value: 'Africa' },
                { label: 'Engineers', value: '0%' },
                { label: 'Customers', value: '0' }
              ].map((item) => (
                <div key={item.label} className="rounded-[1.25rem] bg-slate-950/90 p-4">
                  <p className="text-lg font-semibold text-white">{item.value}</p>
                  <p className="mt-1 text-[0.6rem] uppercase tracking-[0.25em] text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/85 p-4">
              <p className="text-xs text-slate-300">Mission</p>
              <p className="mt-1.5 text-sm font-semibold text-white">Give every AI system the governance it deserves.</p>
            </div>
          </div>
        </div>
      </MarketingHero>

      <section className="space-y-6">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">By the numbers</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Governance infrastructure, built to scale</h2>
        </div>
        <StatsBand stats={stats} />
      </section>

      <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Our story</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">From AI adoption chaos to a single control plane</h2>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            We watched enterprises across Africa adopt LLMs at a staggering pace — and lose sight of what data was going
            where, who approved which model, and what was being recorded for auditors. Sentinel was born to give security
            and data teams a single source of truth for AI governance — built in Africa, for African regulations.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            With 40+ African countries now enforcing data protection laws and the AU&apos;s Malabo Convention in force,
            the continent needs governance infrastructure that speaks its own regulatory language. That is the gap
            Sentinel is built to fill — starting with pilot deployments as production data begins to flow.
          </p>
        </div>
        <div className="space-y-3">
          {milestones.map((milestone) => (
            <div key={milestone.year} className="flex gap-4 rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-4 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-5">
              <span className="flex h-9 w-16 shrink-0 items-center justify-center rounded-2xl bg-sentinel-500/10 text-xs font-bold text-sentinel-300">
                {milestone.year}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-white sm:text-base">{milestone.title}</h3>
                <p className="mt-1 text-xs leading-6 text-slate-400 sm:text-sm">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">What we believe</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">The values that shape every release</h2>
        </div>
        <FeatureGrid items={values} columns={2} />
      </section>

      <CtaSection
        eyebrow="Join the mission"
        title="Govern AI with the same rigor you apply to your infrastructure."
        primary={{ label: 'Request a demo', href: '/request-demo' }}
        secondary={{ label: 'Explore careers', href: '/careers' }}
      />

      <p className="text-center text-xs text-slate-500">
        Want to learn more?{' '}
        <Link href="/contact" className="text-sentinel-300 transition hover:text-sentinel-200">
          Talk to our team
        </Link>
        .
      </p>
    </div>
  );
}
