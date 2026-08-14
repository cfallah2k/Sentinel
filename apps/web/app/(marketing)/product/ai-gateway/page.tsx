import { Check, Gauge, ShieldCheck, ShieldHalf, Timer, Workflow, Zap } from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';
import FeatureGrid from '@/components/marketing/feature-grid';
import Steps from '@/components/marketing/steps';
import CtaSection from '@/components/marketing/cta-section';

const features = [
  {
    icon: Zap,
    title: 'Drop-in OpenAI compatibility',
    description: 'Swap your base URL and keep your SDKs. The gateway proxies OpenAI-compatible traffic with streaming support.'
  },
  {
    icon: Gauge,
    title: 'Sub-50ms evaluation',
    description: 'Policy decisions are evaluated inline with request routing — latency stays invisible to end users.'
  },
  {
    icon: ShieldCheck,
    title: 'Full request inspection',
    description: 'Inspect prompts, tool calls, and responses token-level, with redaction applied before anything leaves your boundary.'
  },
  {
    icon: ShieldHalf,
    title: 'Per-route controls',
    description: 'Set policies per provider, model, application, or data category — enforcement follows the data, not the endpoint.'
  },
  {
    icon: Timer,
    title: 'Streaming decisions',
    description: 'Decisions apply to streaming responses in real time, blocking or redacting tokens as they are generated.'
  },
  {
    icon: Workflow,
    title: 'Provider failover',
    description: 'Route around restricted or degraded providers automatically while preserving policy decisions.'
  }
];

const decisions = [
  { label: 'Allow', detail: 'Request passes through', tone: 'text-emerald-300' },
  { label: 'Block', detail: 'Request rejected before the model', tone: 'text-rose-300' },
  { label: 'Redact', detail: 'Sensitive tokens replaced in flight', tone: 'text-amber-300' },
  { label: 'Require approval', detail: 'Held until a human decides', tone: 'text-sentinel-300' },
  { label: 'Log', detail: 'Recorded with full context', tone: 'text-slate-300' }
];

const code = `POST /v1/chat/completions
{
  "model": "gpt-4.1",
  "messages": [
    { "role": "user", "content": "Summarize the customer contract" }
  ]
}

// gateway response
{
  "decision": "blocked",
  "policy": { "id": "pol-1", "action": "block_pii" },
  "reason": "PII detected for unapproved provider"
}`;

export default function AiGatewayPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Product · AI Gateway"
        title="The gateway that sees every AI request."
        description="Sentinel sits between your applications and every model provider. Each request is evaluated against policy, inspected for sensitive data, and recorded to the audit trail — before the model ever sees it."
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'Gateway docs', href: '/docs' }}
      >
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/95 p-4 shadow-panel backdrop-blur-xl sm:rounded-[2rem] sm:p-5">
          <div className="pointer-events-none absolute -left-16 top-10 h-24 w-24 rounded-full bg-sentinel-500/15 blur-3xl" />
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Decision flow</p>
          <pre className="mt-4 overflow-x-auto rounded-[1.25rem] bg-slate-900/95 px-5 py-5 text-xs leading-6 text-slate-200 sm:text-sm">
            <code>{code}</code>
          </pre>
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {[
              { label: 'Latency', value: 'Design target' },
              { label: 'Evaluated', value: '100%' },
              { label: 'Deployments', value: '0' }
            ].map((item) => (
              <div key={item.label} className="rounded-2xl bg-slate-950/90 p-3 text-center">
                <p className="text-sm font-semibold text-white sm:text-base">{item.value}</p>
                <p className="mt-1 text-[0.55rem] uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </MarketingHero>

      <section className="space-y-8">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Capabilities</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Invisible enforcement, visible control</h2>
        </div>
        <FeatureGrid items={features} />
      </section>

      <section className="mx-auto max-w-7xl">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {decisions.map(({ label, detail, tone }) => (
            <div key={label} className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-4 text-center shadow-panel backdrop-blur-xl sm:rounded-[1.5rem]">
              <p className={`text-sm font-semibold sm:text-base ${tone}`}>{label}</p>
              <p className="mt-1.5 text-[0.65rem] leading-5 text-slate-500">{detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">
          Every decision emits a structured audit event with policy, reason, and context — no exceptions.
        </p>
      </section>

      <Steps
        eyebrow="How it works"
        title="Evaluate, decide, record — in milliseconds"
        steps={[
          { title: 'Intercept', description: 'Your application calls the gateway base URL with an OpenAI-compatible payload.' },
          { title: 'Evaluate', description: 'The policy engine checks scope, conditions, and classifiers against the request.' },
          { title: 'Act & record', description: 'The gateway allows, blocks, redacts, or queues — then writes the audit event.' }
        ]}
      />

      <CtaSection
        eyebrow="Gateway"
        title="See it in action — no setup required."
        description="Type a prompt in the playground and watch Sentinel detect, redact, and block before the model ever sees it."
        primary={{ label: 'Try the live playground', href: '/playground' }}
        secondary={{ label: 'Start free trial', href: '/register' }}
      />
    </div>
  );
}
