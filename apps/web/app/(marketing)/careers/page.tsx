import Link from 'next/link';
import { ArrowRight, Coffee, Globe2, Layers, Lightbulb, MapPin, Rocket, Users } from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';
import CtaSection from '@/components/marketing/cta-section';

const departments = [
  { label: 'Engineering', count: '8 open roles' },
  { label: 'Security', count: '4 open roles' },
  { label: 'Product & Design', count: '3 open roles' },
  { label: 'Customer Success', count: '3 open roles' },
  { label: 'Marketing', count: '2 open roles' },
  { label: 'Operations', count: '1 open role' }
];

const roles = [
  { title: 'Senior Platform Engineer — Policy Engine', team: 'Engineering', location: 'Remote / US-EU', type: 'Full-time' },
  { title: 'Staff Security Engineer — AI Gateway', team: 'Security', location: 'Remote / US', type: 'Full-time' },
  { title: 'Machine Learning Engineer — Classification', team: 'Engineering', location: 'Remote / EU', type: 'Full-time' },
  { title: 'Product Manager — Governance', team: 'Product & Design', location: 'Remote / US', type: 'Full-time' },
  { title: 'Solutions Architect — Regulated Industries', team: 'Customer Success', location: 'Remote / US', type: 'Full-time' },
  { title: 'Technical Writer — Docs & Guides', team: 'Marketing', location: 'Remote / Anywhere', type: 'Full-time' },
  { title: 'Compliance Program Lead', team: 'Operations', location: 'Remote / US-EU', type: 'Full-time' }
];

const culture = [
  {
    icon: Users,
    title: 'Small teams, big ownership',
    description: 'Engineers own systems end to end — from design review to production runbook.'
  },
  {
    icon: Lightbulb,
    title: 'Write it down',
    description: 'Async-first documentation culture. Decisions live in docs, not in meeting rooms.'
  },
  {
    icon: Layers,
    title: 'Depth over sprints',
    description: 'We invest in durable infrastructure and hard problems that compound over years.'
  },
  {
    icon: Globe2,
    title: 'Remote-first, globally',
    description: 'Hire from anywhere we can collaborate in overlapping time zones — no office requirement.'
  }
];

const perks = [
  'Competitive salary and meaningful equity',
  'Home office stipend and co-working budget',
  'Health, dental, and vision coverage',
  'Annual learning and conference budget',
  'Four weeks vacation, plus end-of-year shutdown',
  'Parental leave for all caregivers'
];

export default function CareersPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Careers"
        title="Do the most consequential work in AI security."
        description="Sentinel sits between enterprises and the AI models they depend on. Join a team building the policy engines, classification pipelines, and audit infrastructure that make AI adoption safe."
        primary={{ label: 'View open roles', href: '#roles' }}
        secondary={{ label: 'Meet the company', href: '/about' }}
      >
        <div className="grid grid-cols-2 gap-3">
          {departments.map((dept) => (
            <div
              key={dept.label}
              className="rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.95)] p-4 shadow-panel backdrop-blur-xl"
            >
              <p className="text-sm font-semibold text-white">{dept.label}</p>
              <p className="mt-1 text-xs text-slate-400">{dept.count}</p>
            </div>
          ))}
        </div>
      </MarketingHero>

      <section className="space-y-8">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Life at Sentinel</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">How we work</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {culture.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-6"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sentinel-500/10 text-sentinel-300">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-white sm:text-base">{title}</h3>
              <p className="mt-2 text-xs leading-6 text-slate-400 sm:text-sm">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-7">
          <div className="flex items-center gap-3">
            <Coffee className="h-5 w-5 text-sentinel-300" />
            <h2 className="text-base font-semibold text-white sm:text-lg">Benefits and perks</h2>
          </div>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {perks.map((perk) => (
              <li key={perk} className="flex items-start gap-2.5 rounded-[1.25rem] bg-slate-950/90 p-3.5 text-xs text-slate-300 sm:text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sentinel-400" />
                {perk}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-7">
          <div className="flex items-center gap-3">
            <Rocket className="h-5 w-5 text-sentinel-300" />
            <h2 className="text-base font-semibold text-white sm:text-lg">Our interview process</h2>
          </div>
          <ol className="mt-5 space-y-3">
            {[
              'Intro call with the hiring manager',
              'Technical deep dive with the team',
              'Paid work sample or architecture review',
              'Final round with founders and culture'
            ].map((step, index) => (
              <li key={step} className="flex items-center gap-3 rounded-[1.25rem] bg-slate-950/90 p-3.5 text-xs text-slate-300 sm:text-sm">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sentinel-500/15 text-xs font-bold text-sentinel-300">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs leading-6 text-slate-500">
            Typically completes in two weeks. We respond to every applicant.
          </p>
        </div>
      </section>

      <section id="roles" className="scroll-mt-24 space-y-6">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Open positions</p>
          <h2 className="mt-2 text-lg font-semibold text-white sm:text-xl">Join the team</h2>
        </div>
        <div className="space-y-3">
          {roles.map((role) => (
            <Link
              key={role.title}
              href="/contact"
              className="group flex flex-col gap-3 rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-4 shadow-panel backdrop-blur-xl transition duration-300 hover:border-sentinel-500/25 sm:flex-row sm:items-center sm:justify-between sm:rounded-[1.5rem] sm:p-5"
            >
              <div>
                <h3 className="text-sm font-semibold text-white transition group-hover:text-sentinel-200 sm:text-base">{role.title}</h3>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-sentinel-300" />
                    {role.team}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-sentinel-300" />
                    {role.location}
                  </span>
                  <span>{role.type}</span>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold text-sentinel-300">
                Apply <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CtaSection
        eyebrow="No role listed?"
        title="Tell us what you would build at Sentinel."
        description="We are always looking for exceptional people in governance, security, and AI infrastructure."
        primary={{ label: 'Send an introduction', href: '/contact' }}
        secondary={{ label: 'Back to about', href: '/about' }}
      />
    </div>
  );
}
