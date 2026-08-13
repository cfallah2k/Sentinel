import Link from 'next/link';
import { ArrowRight, Coffee, Globe2, Layers, Lightbulb, MapPin, Rocket, Users } from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';
import CtaSection from '@/components/marketing/cta-section';

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
    title: 'Building from Monrovia',
    description: 'Our headquarters is in Monrovia, Liberia — with more offices to come as we grow.'
  }
];

const perks = [
  'Competitive salary and meaningful equity',
  'Health coverage for you and your family',
  'Annual learning and conference budget',
  'Four weeks vacation, plus end-of-year shutdown',
  'Parental leave for all caregivers',
  'Relocation support for roles based in Monrovia'
];

export default function CareersPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Careers"
        title="Do the most consequential work in AI security."
        description="Sentinel sits between enterprises and the AI models they depend on. We are building the policy engines, classification pipelines, and audit infrastructure that make AI adoption safe."
        primary={{ label: 'Contact us about careers', href: '/contact' }}
      />

      <section className="space-y-8">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Life at Sentinel</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">How we work</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {culture.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-6"
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
        <div className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-7">
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
        <div className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-7">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-sentinel-300" />
            <h2 className="text-base font-semibold text-white sm:text-lg">Our headquarters</h2>
          </div>
          <p className="mt-4 text-xs leading-6 text-slate-400 sm:text-sm">
            We are currently headquartered in <span className="font-semibold text-white">Monrovia, Liberia</span> — with more offices to come soon.
          </p>
          <p className="mt-4 text-xs leading-6 text-slate-400 sm:text-sm">
            Remote-friendly roles are considered on a case-by-case basis as we grow.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Open positions</p>
          <h2 className="mt-2 text-lg font-semibold text-white sm:text-xl">We are not hiring right now</h2>
        </div>
        <div className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 text-center shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-10">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sentinel-500/10 text-sentinel-300">
            <Rocket className="h-6 w-6" />
          </div>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            There are no open roles at Sentinel right now, but we are always interested in exceptional people in governance, security, and AI infrastructure.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 sm:text-sm"
          >
            Get in touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <CtaSection
        eyebrow="No role listed?"
        title="Tell us what you would build at Sentinel."
        description="We are always interested in hearing from exceptional people in governance, security, and AI infrastructure."
        primary={{ label: 'Send an introduction', href: '/contact' }}
        secondary={{ label: 'Back to about', href: '/about' }}
      />
    </div>
  );
}