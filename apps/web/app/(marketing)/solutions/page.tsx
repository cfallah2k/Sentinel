import { ArrowRight, Building2, Landmark, Lock, ShieldCheck, Terminal, Users } from 'lucide-react';
import Link from 'next/link';
import MarketingHero from '@/components/marketing/hero';
import CtaSection from '@/components/marketing/cta-section';

const solutions = [
  {
    title: 'Enterprise',
    description: 'Govern AI across business units, regions, and legacy systems without slowing innovation.',
    href: '/solutions/enterprise',
    icon: Building2,
    stat: '2.7k+ workflows protected'
  },
  {
    title: 'Regulated & compliance-led',
    description: 'Continuous evidence for SOC 2, ISO 27001, GDPR, HIPAA, and the EU AI Act.',
    href: '/solutions/compliance',
    icon: ShieldCheck,
    stat: '6+ frameworks mapped'
  },
  {
    title: 'Security teams',
    description: 'Gateway enforcement, incident response, and audit trails for security operations.',
    href: '/solutions/security',
    icon: Lock,
    stat: '99.99% visibility'
  },
  {
    title: 'Privacy programs',
    description: 'Data minimization, classification, and redaction that keep personal data inside policy.',
    href: '/solutions/privacy',
    icon: Users,
    stat: '18 detectors tuned'
  },
  {
    title: 'Developers',
    description: 'Policy as code, SDKs, and an OpenAI-compatible gateway that fits existing pipelines.',
    href: '/solutions/developers',
    icon: Terminal,
    stat: '<50ms evaluation'
  },
  {
    title: 'Government',
    description: 'AI registries, public-sector governance, and accountability for citizen services.',
    href: '/solutions/government',
    icon: Landmark,
    stat: 'Registry-first design'
  }
];

const audience = [
  { label: 'CIOs & CTOs', detail: 'AI adoption with guardrails' },
  { label: 'CISOs & security', detail: 'Zero-trust AI enforcement' },
  { label: 'DPOs & privacy', detail: 'Minimization and redaction' },
  { label: 'Compliance officers', detail: 'Continuous audit evidence' },
  { label: 'Data platform teams', detail: 'Classification and lineage' },
  { label: 'Engineering leads', detail: 'Governance without friction' }
];

export default function SolutionsPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Solutions"
        title="Governance shaped for the way your team works."
        description="Sentinel adapts to your role, your industry, and your regulatory reality — one platform, six working perspectives."
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'Talk to an expert', href: '/contact' }}
      >
        <div className="grid grid-cols-2 gap-3">
          {audience.map(({ label, detail }) => (
            <div key={label} className="rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.95)] p-4 shadow-panel backdrop-blur-xl">
              <p className="text-sm font-semibold text-white">{label}</p>
              <p className="mt-1 text-xs text-slate-400">{detail}</p>
            </div>
          ))}
        </div>
      </MarketingHero>

      <section className="space-y-6">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Explore solutions</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Pick your starting point</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {solutions.map(({ title, description, href, icon: Icon, stat }) => (
            <Link
              key={title}
              href={href}
              className="group flex flex-col rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 shadow-panel backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sentinel-500/25 sm:rounded-[1.5rem] sm:p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sentinel-500/10 text-sentinel-300">
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowRight className="h-4 w-4 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-sentinel-300" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white transition group-hover:text-sentinel-200">{title}</h3>
              <p className="mt-2 flex-1 text-xs leading-6 text-slate-400 sm:text-sm">{description}</p>
              <p className="mt-4 border-t border-white/5 pt-4 text-[0.65rem] uppercase tracking-[0.25em] text-slate-500">{stat}</p>
            </Link>
          ))}
        </div>
      </section>

      <CtaSection
        eyebrow="Not sure where to start?"
        title="Tell us about your stack and obligations."
        description="We will map the right path across product, integrations, and compliance in a 30-minute call."
        primary={{ label: 'Request a demo', href: '/request-demo' }}
        secondary={{ label: 'Start free trial', href: '/register' }}
      />
    </div>
  );
}
