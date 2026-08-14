import { Boxes, GitMerge, Map, Network, Radar, Route } from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';
import FeatureGrid from '@/components/marketing/feature-grid';
import Steps from '@/components/marketing/steps';
import CtaSection from '@/components/marketing/cta-section';

const features = [
  {
    icon: Network,
    title: 'Live flow graph',
    description: 'Every request renders as an edge between source, application, system, and provider — visualized in real time.'
  },
  {
    icon: Radar,
    title: 'Sensitive flow detection',
    description: 'Flows carrying classified categories surface instantly with the policy decision applied to them.'
  },
  {
    icon: Route,
    title: 'Full lineage',
    description: 'Follow data from warehouse to prompt to model to response — and back into your retention stores.'
  },
  {
    icon: GitMerge,
    title: 'Boundary mapping',
    description: 'See where data crosses regions, providers, or deployment boundaries — the exact points regulators care about.'
  },
  {
    icon: Boxes,
    title: 'Volume telemetry',
    description: 'Per-flow volume, latency, and token metrics give you the cost and risk of every data path.'
  },
  {
    icon: Map,
    title: 'Compliance export',
    description: 'Export flow inventories for records of processing activities and AI transparency registers.'
  }
];

const flows = [
  { path: 'Customer PostgreSQL → Atlas Copilot → OpenAI', category: 'PII', decision: 'Blocked', tone: 'text-rose-300' },
  { path: 'Finance Warehouse → Insight Analyst → Anthropic', category: 'Financial', decision: 'Redacted', tone: 'text-amber-300' },
  { path: 'Slack Archive → Echo Summarizer → Azure OpenAI', category: 'Internal', decision: 'Allowed', tone: 'text-emerald-300' },
  { path: 'Clickstream Kafka → Zephyr Classifier → Self-hosted', category: 'Public', decision: 'Allowed', tone: 'text-emerald-300' }
];

export default function DataFlowPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Product · Data Flow Governance"
        title="Follow every byte that touches a model."
        description="Sentinel maps data movement across your entire AI estate — where it came from, what was classified, what the policy decided, and where it ended up."
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'Meet classification', href: '/product/data-classification' }}
      >
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[var(--surface-strong)] p-4 shadow-panel backdrop-blur-xl sm:rounded-[2rem] sm:p-5">
          <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),_transparent_45%)]" />
          <div className="relative space-y-2.5">
            <div className="flex items-center justify-between rounded-[1.25rem] border border-white/10 bg-slate-950/90 px-3.5 py-2.5 text-xs text-slate-300 sm:text-sm">
              <span className="font-semibold text-white">Data flow lens</span>
              <span className="rounded-full bg-sentinel-500/15 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-sentinel-200">
                Traced
              </span>
            </div>
            {flows.map(({ path, category, decision, tone }) => (
              <div key={path} className="rounded-2xl bg-slate-950/90 px-3.5 py-2.5">
                <p className="truncate text-xs text-slate-200 sm:text-sm">{path}</p>
                <div className="mt-1 flex items-center justify-between text-[0.6rem] uppercase tracking-[0.2em] text-slate-500">
                  <span>{category}</span>
                  <span className={tone}>{decision}</span>
                </div>
              </div>
            ))}
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {[
                { label: 'Flows active', value: '0' },
                { label: 'Sensitive', value: '0' },
                { label: 'Blocked', value: '0' }
              ].map((item) => (
                <div key={item.label} className="rounded-2xl bg-slate-950/85 p-3 text-center">
                  <p className="text-sm font-semibold text-white">{item.value}</p>
                  <p className="mt-0.5 text-[0.55rem] uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MarketingHero>

      <section className="space-y-8">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Capabilities</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">See the whole graph, not just the hops</h2>
        </div>
        <FeatureGrid items={features} />
      </section>

      <Steps
        eyebrow="How it works"
        title="Trace, tag, and tame data movement"
        steps={[
          { title: 'Trace', description: 'The gateway records every request edge with source, target, and volume metadata.' },
          { title: 'Tag', description: 'Classification results attach to each flow, marking sensitivity in real time.' },
          { title: 'Tame', description: 'Policy acts on tagged flows — and the graph becomes your compliance record.' }
        ]}
      />

      <CtaSection
        eyebrow="Data flows"
        title="See where your data actually goes."
        description="Map every AI boundary in one graph, with decisions that never surprise you."
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'Explore approvals', href: '/product/approvals' }}
      />
    </div>
  );
}
