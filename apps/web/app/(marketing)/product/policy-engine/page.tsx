import { FlaskConical, GitBranch, ShieldHalf, SlidersHorizontal, TestTube, Workflow } from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';
import FeatureGrid from '@/components/marketing/feature-grid';
import Steps from '@/components/marketing/steps';
import CtaSection from '@/components/marketing/cta-section';

const features = [
  {
    icon: SlidersHorizontal,
    title: 'Policy DSL',
    description: 'Declarative rules over conditions, scope, and data categories — readable by engineers and auditors alike.'
  },
  {
    icon: GitBranch,
    title: 'Versioned like code',
    description: 'Policies live in your repo, review via pull request, and deploy through the API or CLI.'
  },
  {
    icon: FlaskConical,
    title: 'Test before you ship',
    description: 'Simulate requests against a draft policy and see the decision matrix before enforcement goes live.'
  },
  {
    icon: ShieldHalf,
    title: 'Decision matrix',
    description: 'Every policy resolves to allow, block, redact, require approval, or log — with a reason code.'
  },
  {
    icon: TestTube,
    title: 'Shadow mode',
    description: 'Run policies in log-only mode to measure impact, then flip to enforcement with confidence.'
  },
  {
    icon: Workflow,
    title: 'Drift detection',
    description: 'Sentinel compares declared policy with observed behavior and flags drift before it becomes exposure.'
  }
];

const policy = `policy "block_pii_unapproved" {
  scope: providers where approval != "sensitive"
  when: classification(input) includes "PII"
  then: block("PII must not reach unapproved providers")
}

policy "redact_financial_external" {
  scope: category("Financial")
  when: destination == "external"
  then: redact("financial-identifiers")
}`;

const stats = [
  { label: 'Policies active', value: '1.4k' },
  { label: 'Evaluations / day', value: '412k' },
  { label: 'Enforcements / day', value: '61k' }
];

export default function PolicyEnginePage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Product · Policy Engine"
        title="Policy as code. Enforcement as reflex."
        description="Author governance rules in a declarative DSL, test them in shadow mode, and enforce them at the gateway in milliseconds — with every decision logged."
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'Gateway reference', href: '/product/ai-gateway' }}
      >
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/95 p-4 shadow-panel backdrop-blur-xl sm:rounded-[2rem] sm:p-5">
          <div className="pointer-events-none absolute -left-16 top-10 h-24 w-24 rounded-full bg-sentinel-500/15 blur-3xl" />
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Policy DSL</p>
          <pre className="mt-4 overflow-x-auto rounded-[1.25rem] bg-slate-900/95 px-5 py-5 text-xs leading-6 text-slate-200 sm:text-sm">
            <code>{policy}</code>
          </pre>
          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {stats.map(({ label, value }) => (
              <div key={label} className="rounded-2xl bg-slate-950/90 p-3 text-center">
                <p className="text-sm font-semibold text-white sm:text-base">{value}</p>
                <p className="mt-1 text-[0.55rem] uppercase tracking-[0.2em] text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </MarketingHero>

      <section className="space-y-8">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Capabilities</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Rules your auditors can read, your gateway can run</h2>
        </div>
        <FeatureGrid items={features} />
      </section>

      <Steps
        eyebrow="How it works"
        title="Author, test, enforce, observe"
        steps={[
          { title: 'Author', description: 'Write policy in the DSL with scopes, conditions, and actions — stored in version control.' },
          { title: 'Test', description: 'Replay real traffic in shadow mode and review the simulated decision matrix.' },
          { title: 'Enforce', description: 'Promote to active. The gateway applies the policy inline, and drift detection watches it forever.' }
        ]}
      />

      <CtaSection
        eyebrow="Policy engine"
        title="Put your governance rules where your traffic flows."
        description="Deploy your first policy in minutes — with every decision recorded as audit evidence."
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'See classification', href: '/product/data-classification' }}
      />
    </div>
  );
}
