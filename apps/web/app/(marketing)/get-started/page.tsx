import Link from 'next/link';
import { ArrowRight, Check, KeyRound, Link2, Play, Rocket, ShieldCheck, Terminal } from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';
import CtaSection from '@/components/marketing/cta-section';

const phases = [
  {
    icon: Rocket,
    title: 'Create your workspace',
    description: 'Sign up, verify your work email, and invite your first governance team members.',
    steps: ['Create a free workspace', 'Invite security and data teams', 'Choose your region'],
    duration: '5 minutes'
  },
  {
    icon: KeyRound,
    title: 'Connect your AI providers',
    description: 'Add OpenAI, Anthropic, or any OpenAI-compatible endpoint. Keys stay encrypted and scoped.',
    steps: ['Add provider credentials', 'Map models and risk levels', 'Verify connectivity'],
    duration: '10 minutes'
  },
  {
    icon: Link2,
    title: 'Route traffic through the gateway',
    description: 'Swap your base URL for the Sentinel gateway. Every request is now inspectable.',
    steps: ['Update base URL in your SDKs', 'Deploy the gateway proxy', 'Watch the live request lens'],
    duration: '15 minutes'
  },
  {
    icon: ShieldCheck,
    title: 'Enforce your first policy',
    description: 'Start with templates — block PII to unapproved providers, redact financial data, require approvals.',
    steps: ['Pick a policy template', 'Set scope and conditions', 'Enable enforcement'],
    duration: '10 minutes'
  },
  {
    icon: Play,
    title: 'Review and iterate',
    description: 'Use the data flow graph and incident queue to tune policies as traffic grows.',
    steps: ['Review evaluation decisions', 'Tune conditions', 'Export your first audit report'],
    duration: 'Ongoing'
  }
];

const checklist = [
  'A provider API key (OpenAI, Anthropic, Vertex, Bedrock, or self-hosted)',
  'An application that calls an LLM today',
  'A governance owner with policy authority',
  'Ten minutes and a test environment'
];

const command = `npx @sentinel/cli init --workspace=my-corp

# point your SDK at the gateway
OPENAI_BASE_URL=https://gateway.sentinel.ai/v1
SENTINEL_WORKSPACE=my-corp
SENTINEL_API_KEY=sk_live_...`;

export default function GetStartedPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Get started"
        title="From zero to governed AI in under an hour."
        description="A step-by-step path from creating your workspace to enforcing your first policy — with live audit evidence the whole way."
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'Read the docs', href: '/docs' }}
      >
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/95 p-4 shadow-panel backdrop-blur-xl sm:rounded-[2rem] sm:p-5">
          <div className="pointer-events-none absolute -left-16 top-10 h-24 w-24 rounded-full bg-sentinel-500/15 blur-3xl" />
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">CLI setup</p>
          <pre className="mt-4 overflow-x-auto rounded-[1.25rem] bg-slate-900/95 px-5 py-5 text-xs leading-6 text-slate-200 sm:text-sm">
            <code>{command}</code>
          </pre>
          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {[
              { label: 'Gateway latency', value: '<50ms' },
              { label: 'Setup time', value: '~45m' },
              { label: 'Audit capture', value: '100%' }
            ].map((item) => (
              <div key={item.label} className="rounded-2xl bg-slate-950/90 p-3 text-center">
                <p className="text-sm font-semibold text-white">{item.value}</p>
                <p className="mt-1 text-[0.55rem] uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </MarketingHero>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div className="space-y-4">
          {phases.map(({ icon: Icon, title, description, steps, duration }, index) => (
            <div
              key={title}
              className="relative rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sentinel-500/15 text-sentinel-300 shadow-[0_8px_40px_rgba(56,189,248,0.1)]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-sentinel-300">Phase {index + 1}</span>
                      <h3 className="text-sm font-semibold text-white sm:text-base">{title}</h3>
                    </div>
                    <span className="self-start rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-slate-400 sm:self-auto">
                      {duration}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-6 text-slate-400 sm:text-sm">{description}</p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                    {steps.map((step) => (
                      <li key={step} className="flex items-start gap-2 rounded-2xl bg-slate-950/90 p-3 text-xs text-slate-300">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sentinel-300" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4 lg:sticky lg:top-24">
          <div className="rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-6">
            <div className="flex items-center gap-3">
              <Terminal className="h-5 w-5 text-sentinel-300" />
              <h2 className="text-base font-semibold text-white sm:text-lg">Before you start</h2>
            </div>
            <ul className="mt-5 space-y-3">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-xs leading-6 text-slate-300 sm:text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sentinel-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-6">
            <h2 className="text-base font-semibold text-white sm:text-lg">Next stops</h2>
            <div className="mt-4 space-y-2.5">
              {[
                { label: 'Gateway reference', href: '/product/ai-gateway' },
                { label: 'Policy engine guide', href: '/product/policy-engine' },
                { label: 'Classification setup', href: '/product/data-classification' },
                { label: 'Developer docs', href: '/developers' }
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between rounded-2xl bg-slate-950/90 p-3.5 text-xs text-slate-300 transition hover:bg-slate-900/95 sm:text-sm"
                >
                  {link.label}
                  <ArrowRight className="h-4 w-4 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-sentinel-300" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        eyebrow="Ready when you are"
        title="Your first policy is one signup away."
        description="Free tier covers one provider, three policies, and seven days of audit retention."
        primary={{ label: 'Create workspace', href: '/register' }}
        secondary={{ label: 'Request a guided demo', href: '/request-demo' }}
      />
    </div>
  );
}
