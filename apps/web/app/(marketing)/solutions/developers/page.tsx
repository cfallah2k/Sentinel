import { Braces, Code2, GitBranch, KeyRound, Package, Terminal } from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';
import FeatureGrid from '@/components/marketing/feature-grid';
import StatsBand from '@/components/marketing/stats-band';
import CtaSection from '@/components/marketing/cta-section';

const features = [
  {
    icon: Braces,
    title: 'Policy as code',
    description: 'Manage policies in git, review via pull request, and deploy with CI — governance joins the software lifecycle.'
  },
  {
    icon: Terminal,
    title: 'CLI and SDKs',
    description: 'TypeScript, Python, Go, and Java SDKs plus a full CLI for registry, policy, and audit automation.'
  },
  {
    icon: KeyRound,
    title: 'Scoped API keys',
    description: 'Per-environment keys with granular permissions and rotation workflows your security team will approve.'
  },
  {
    icon: GitBranch,
    title: 'Shadow mode testing',
    description: 'Test policies against real traffic before enforcement — ship governance like a feature.'
  },
  {
    icon: Package,
    title: 'OpenAI-compatible gateway',
    description: 'Swap one base URL and keep your entire stack: LangChain, Vercel AI SDK, or raw requests.'
  },
  {
    icon: Code2,
    title: 'Webhooks & events',
    description: 'Stream decisions, incidents, and approvals into your own pipelines and automations.'
  }
];

const stats = [
  { value: '<50ms', label: 'Evaluation latency' },
  { value: '4', label: 'Official SDKs' },
  { value: '100%', label: 'API coverage' },
  { value: '0', label: 'Code changes required' }
];

const code = `import { Sentinel } from '@sentinel/sdk';

const client = new Sentinel({
  workspace: 'my-corp',
  apiKey: process.env.SENTINEL_API_KEY
});

const decision = await client.evaluate({
  provider: 'openai',
  model: 'gpt-4.1',
  input: 'Summarize the customer contract'
});

if (decision.action === 'blocked') {
  console.log('Governed by policy', decision.policyId);
}`;

export default function DevelopersSolutionPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Solution · Developers"
        title="Governance that ships in the same pipeline as your code."
        description="Policy as code, an OpenAI-compatible gateway, and SDKs for the languages you already use — built for engineers who hate governance theater."
        primary={{ label: 'Read the docs', href: '/docs' }}
        secondary={{ label: 'Start free trial', href: '/register' }}
      >
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/95 p-4 shadow-panel backdrop-blur-xl sm:rounded-[2rem] sm:p-5">
          <div className="pointer-events-none absolute -right-16 top-10 h-24 w-24 rounded-full bg-cyan-400/15 blur-3xl" />
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">TypeScript SDK</p>
          <pre className="mt-4 overflow-x-auto rounded-[1.25rem] bg-slate-900/95 px-5 py-5 text-xs leading-6 text-slate-200 sm:text-sm">
            <code>{code}</code>
          </pre>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            {[
              { label: 'SDKs', value: 'TS · Py · Go · Java' },
              { label: 'API style', value: 'REST + gateway' }
            ].map(({ label, value }) => (
              <div key={label} className="rounded-2xl bg-slate-950/90 p-3">
                <p className="text-xs font-semibold text-white">{value}</p>
                <p className="mt-1 text-[0.55rem] uppercase tracking-[0.2em] text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </MarketingHero>

      <section className="space-y-8">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Why developers choose Sentinel</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Built by engineers, for engineers</h2>
        </div>
        <StatsBand stats={stats} />
        <FeatureGrid items={features} />
      </section>

      <CtaSection
        eyebrow="Developers"
        title="Govern without slowing the build."
        description="Wire Sentinel into your stack in an afternoon — and never think about it again until an auditor asks."
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'Browse integrations', href: '/integrations' }}
      />
    </div>
  );
}
