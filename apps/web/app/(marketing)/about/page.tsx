import Link from 'next/link';
import { Target, Heart, Scale, Radar } from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';
import StatsBand from '@/components/marketing/stats-band';
import CtaSection from '@/components/marketing/cta-section';
import FeatureGrid from '@/components/marketing/feature-grid';

const stats = [
  { value: '2023', label: 'Founded' },
  { value: '2.7k+', label: 'AI workflows protected' },
  { value: '140+', label: 'Enterprise customers' },
  { value: '12m+', label: 'Audit events tracked' }
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
  { year: '2023', title: 'Sentinel is founded', description: 'Built to solve a simple problem: AI was moving faster than the guardrails around it.' },
  { year: '2024', title: 'First enterprise deployments', description: 'Gateway and policy engine go live with financial services and healthcare customers.' },
  { year: '2025', title: 'AI Passports and classification', description: 'Introduced registry-driven governance with live data classification across hybrid estates.' },
  { year: '2026', title: 'EU AI Act readiness', description: 'Delivered compliance mapping for the EU AI Act, NIST AI RMF, and a global trust center.' }
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
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[rgba(15,23,42,0.95)] p-4 shadow-panel backdrop-blur-xl sm:rounded-[2rem] sm:p-5">
          <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.24),_transparent_45%)]" />
          <div className="relative space-y-3">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Company snapshot</p>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { label: 'Employees', value: '86' },
                { label: 'Markets', value: '18' },
                { label: 'Engineers', value: '61%' },
                { label: 'Customers', value: '140+' }
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
            We watched enterprises adopt LLMs at a staggering pace — and lose sight of what data was going where, who
            approved which model, and what was being recorded for auditors. Sentinel was born to give security and
            data teams a single source of truth for AI governance.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            Today Sentinel sits in front of AI providers, policy engines, and classification pipelines for some of the
            world&apos;s most regulated organizations — turning AI risk into a managed, measurable discipline.
          </p>
        </div>
        <div className="space-y-3">
          {milestones.map((milestone) => (
            <div key={milestone.year} className="flex gap-4 rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-4 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-5">
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
        primary={{ label: 'Start free trial', href: '/register' }}
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
