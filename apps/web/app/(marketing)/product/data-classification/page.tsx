import { Eye, Fingerprint, Filter, ScanSearch, ShieldHalf, Tag } from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';
import FeatureGrid from '@/components/marketing/feature-grid';
import Steps from '@/components/marketing/steps';
import CtaSection from '@/components/marketing/cta-section';

const features = [
  {
    icon: Fingerprint,
    title: 'Detector catalog',
    description: 'Eighteen detectors out of the box — PII, credentials, financial, health, biometric, location, employee, and customer data.'
  },
  {
    icon: Tag,
    title: 'Sensitivity taxonomy',
    description: 'Four classification tiers — public, internal, confidential, restricted — with rules that inherit down the hierarchy.'
  },
  {
    icon: ScanSearch,
    title: 'Live inspection',
    description: 'Classifiers run at the gateway on every request, flagging matches before a model ever receives the payload.'
  },
  {
    icon: ShieldHalf,
    title: 'Inline redaction',
    description: 'Matches are redacted in flight with configurable policies — preserve structure, strip sensitive values.'
  },
  {
    icon: Eye,
    title: 'False-positive tuning',
    description: 'Review matches, promote exceptions, and retrain thresholds without pausing enforcement.'
  },
  {
    icon: Filter,
    title: 'Retroactive scanning',
    description: 'Scan connected data sources to build a baseline classification map of your entire estate.'
  }
];

const detectors = [
  { name: 'PII', matches: '0/24h', blocked: '0', tone: 'bg-sky-400' },
  { name: 'Financial', matches: '0/24h', blocked: '0', tone: 'bg-amber-400' },
  { name: 'Employee', matches: '0/24h', blocked: '0', tone: 'bg-slate-400' },
  { name: 'Health (PHI)', matches: '0/24h', blocked: '0', tone: 'bg-rose-400' },
  { name: 'Biometric', matches: '0/24h', blocked: '0', tone: 'bg-cyan-400' }
];

export default function DataClassificationPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Product · Data Classification"
        title="Know exactly what flows through your AI stack."
        description="Sentinel classifies sensitive data at the gateway and across your data sources — then redacts, blocks, or quarantines it before it reaches a model."
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'Trace data flows', href: '/product/data-flow' }}
      >
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[var(--surface-strong)] p-4 shadow-panel backdrop-blur-xl sm:rounded-[2rem] sm:p-5">
          <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),_transparent_45%)]" />
          <div className="relative space-y-2.5">
            <div className="flex items-center justify-between rounded-[1.25rem] border border-white/10 bg-slate-950/90 px-3.5 py-2.5 text-xs text-slate-300 sm:text-sm">
              <span className="font-semibold text-white">Detector activity — 24h</span>
              <span className="rounded-full bg-sentinel-500/15 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-sentinel-200">
                Demo
              </span>
            </div>
            {detectors.map(({ name, matches, blocked, tone }) => (
              <div key={name} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-950/90 px-3.5 py-2.5 text-xs sm:text-sm">
                <span className="inline-flex items-center gap-2 text-slate-200">
                  <span className={`h-1.5 w-1.5 rounded-full ${tone}`} />
                  {name}
                </span>
                <div className="flex items-center gap-4 text-slate-400">
                  <span>{matches}</span>
                  <span className="text-rose-300">{blocked} blocked</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MarketingHero>

      <section className="space-y-8">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Capabilities</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Classification your models can feel</h2>
        </div>
        <FeatureGrid items={features} />
      </section>

      <Steps
        eyebrow="How it works"
        title="Detect, decide, defend"
        steps={[
          { title: 'Detect', description: 'Detectors match sensitive patterns in prompts, tool calls, and responses at the gateway.' },
          { title: 'Decide', description: 'Policy maps each category and sensitivity to an action — allow, block, or redact.' },
          { title: 'Defend', description: 'Enforcement happens inline, and every match feeds the audit trail and incident queue.' }
        ]}
      />

      <CtaSection
        eyebrow="Classification"
        title="Stop sensitive data at the door of your models."
        description="Turn detection into policy in minutes — with zero code changes in your applications."
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'Read the policy engine', href: '/product/policy-engine' }}
      />
    </div>
  );
}
