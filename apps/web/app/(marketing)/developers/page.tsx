import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  Blocks,
  CheckCircle2,
  ChevronRight,
  Clock,
  Cpu,
  FileSearch,
  Fingerprint,
  GitBranch,
  KeyRound,
  Layers,
  Lock,
  Play,
  Scale,
  Send,
  ShieldCheck,
  Terminal,
  Workflow,
  Zap
} from 'lucide-react';

const K = ({ children }: { children: ReactNode }) => <span className="text-sky-300">{children}</span>;
const S = ({ children }: { children: ReactNode }) => <span className="text-emerald-300">{children}</span>;
const M = ({ children }: { children: ReactNode }) => <span className="text-sentinel-300">{children}</span>;
const P = ({ children }: { children: ReactNode }) => <span className="text-slate-500">{children}</span>;
const G = ({ children }: { children: ReactNode }) => <span className="text-slate-400">{children}</span>;
const C = ({ children }: { children: ReactNode }) => (
  <code className="font-mono text-[0.7rem] leading-6 text-slate-200 sm:text-[0.8125rem] sm:leading-7">{children}</code>
);

function Line({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      {'\n'}
    </>
  );
}

function CodeCard({
  method,
  path,
  label,
  children
}: {
  method: string;
  path: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col rounded-[1.25rem] border border-white/10 bg-slate-950/90 shadow-glow sm:rounded-[1.5rem]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-3 sm:px-5">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="rounded-full bg-sentinel-500/15 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-sentinel-300">
            {method}
          </span>
          <span className="truncate font-mono text-xs text-slate-300">{path}</span>
        </div>
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-slate-500">{label}</span>
      </div>
      <pre className="min-w-0 overflow-x-auto px-4 py-4 sm:px-5 sm:py-5">
        <C>{children}</C>
      </pre>
    </div>
  );
}

const gatewaySteps = [
  {
    icon: Send,
    title: 'Send the request',
    body: 'Your app calls the gateway exactly like an OpenAI-compatible chat endpoint — no new SDK paradigm to learn.'
  },
  {
    icon: FileSearch,
    title: 'Inspect & classify',
    body: 'Detectors scan input and output for emails, national IDs, card numbers, addresses, and custom PII patterns.'
  },
  {
    icon: Scale,
    title: 'Decide against policy',
    body: 'The policy engine evaluates metadata, data categories, and risk flags into allow, block, redact, or approval.'
  },
  {
    icon: ShieldCheck,
    title: 'Forward or enforce',
    body: 'Safe traffic reaches the model. Blocked or redacted traffic never does, and every step emits an audit event.'
  }
];

const focusCards = [
  {
    icon: Cpu,
    title: 'OpenAI-compatible gateway',
    body: 'Route existing chat and completions traffic through the Sentinel gateway with zero client changes. Add /v1/chat/completions to your base URL and governance is active.'
  },
  {
    icon: Scale,
    title: 'Policy decision API',
    body: 'Evaluate any prompt or payload before execution and receive an explicit allow, block, redact, or approval response with the exact rule that matched.'
  },
  {
    icon: Fingerprint,
    title: 'Metadata-driven governance',
    body: 'Providers, applications, and data categories carry metadata that policies reference — so governance follows your registry, not hard-coded exceptions.'
  },
  {
    icon: FileSearch,
    title: 'Audit-ready events',
    body: 'Every policy evaluation and AI interaction emits a structured event with actor, resource, decision, and context for SIEM export and reporting.'
  }
];

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Policy before execution',
    body: 'Ensure every AI request is evaluated against policy before it runs. Enforcement happens inline, in the request path, not after the fact.'
  },
  {
    icon: Layers,
    title: 'Rich context for reporting',
    body: 'Capture provider metadata and classification context on every interaction for compliance dashboards, incident response, and executive reports.'
  },
  {
    icon: Blocks,
    title: 'Govern every surface',
    body: 'Extend governance to apps, automations, embedded AI experiences, and internal tools through the same gateway and decision API.'
  },
  {
    icon: GitBranch,
    title: 'No vendor lock-in',
    body: 'The gateway front-ends any provider. Swap models or move regions without changing your policy surface or rewriting integrations.'
  }
];

const decisions = [
  {
    icon: CheckCircle2,
    tone: 'text-emerald-300',
    chip: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
    title: 'allow',
    body: 'The request is safe. It is forwarded to the model and the interaction is recorded in the audit stream.',
    code: '200 · decision: allow'
  },
  {
    icon: Lock,
    tone: 'text-rose-300',
    chip: 'border-rose-500/30 bg-rose-500/10 text-rose-300',
    title: 'block',
    body: 'A policy rule is violated. The request is rejected before reaching the provider and the event is flagged.',
    code: '403 · decision: block'
  },
  {
    icon: FileSearch,
    tone: 'text-amber-300',
    chip: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
    title: 'redact',
    body: 'Sensitive values are replaced with [REDACTED] placeholders and the sanitized payload proceeds safely.',
    code: '200 · decision: redact'
  },
  {
    icon: Clock,
    tone: 'text-sky-300',
    chip: 'border-sky-500/30 bg-sky-500/10 text-sky-300',
    title: 'approval',
    body: 'High-risk actions pause and route to an approver. The request resumes only when the approval completes.',
    code: '202 · decision: approval'
  }
];

const lifecycle = [
  { step: 'Inspect', detail: 'Headers, metadata, payload, data categories', latency: '< 2 ms' },
  { step: 'Classify', detail: 'Detectors tag emails, IDs, cards, custom PII', latency: '< 15 ms' },
  { step: 'Decide', detail: 'Policy engine returns allow / block / redact / approval', latency: '< 5 ms' },
  { step: 'Forward', detail: 'Sanitized payload reaches the provider', latency: 'provider latency' },
  { step: 'Audit', detail: 'Event written with decision, rule, and context', latency: 'async' }
];

export default function DevelopersPage() {
  return (
    <div className="space-y-10 lg:space-y-16">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
        <div className="space-y-5 sm:space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-sentinel-500/35 bg-sentinel-500/10 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-sentinel-300">
            <Terminal className="h-3.5 w-3.5" />
            Developer platform
          </span>
          <h1 className="max-w-3xl text-2xl font-semibold leading-snug tracking-[-0.03em] text-white sm:text-3xl lg:text-4xl">
            Build AI integrations with governance-first APIs and secure controls.
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base lg:leading-8">
            Sentinel provides developer-friendly APIs and gateway hooks so engineering teams can embed policy
            enforcement and observability directly into AI workflows.
          </p>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
            <Link href="/register" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 sm:w-auto sm:text-sm">
              Get API keys <ArrowRight className="h-4 w-4" size={16} />
            </Link>
            <Link href="/playground" className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white text-opacity-90 transition hover:bg-white/10 sm:w-auto sm:text-sm">
              Try the live playground
            </Link>
            <Link href="/docs" className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white text-opacity-90 transition hover:bg-white/10 sm:w-auto sm:text-sm">
              Read the docs
            </Link>
          </div>
          <div className="grid gap-2 text-xs text-slate-400 sm:grid-cols-3 sm:gap-3 sm:text-sm">
            <span>OpenAI-compatible API</span>
            <span>Policy-first enforcement</span>
            <span>Audit events on every call</span>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-[var(--surface)] p-4 shadow-panel backdrop-blur-xl sm:rounded-[2rem] sm:p-5">
          <div className="flex items-center justify-between gap-3 rounded-[1.25rem] border border-white/10 bg-slate-950/90 px-3.5 py-2.5 text-xs text-slate-300 sm:rounded-[1.5rem] sm:text-sm">
            <span className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-sentinel-300" size={16} /> Request lifecycle
            </span>
            <span className="whitespace-nowrap rounded-full bg-sentinel-500/15 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-sentinel-200">
              ~20 ms overhead
            </span>
          </div>
          <div className="mt-3 space-y-3">
            {[
              { label: 'App calls /api/gateway/evaluate', state: 'Inbound', tone: 'text-sentinel-300' },
              { label: 'Detectors classify payload', state: 'Classified', tone: 'text-sky-300' },
              { label: 'Policy engine returns decision', state: 'allow', tone: 'text-emerald-300' },
              { label: 'Sanitized request forwarded to model', state: 'Sent', tone: 'text-slate-400' }
            ].map((row, i) => (
              <div key={row.label} className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-slate-950/90 text-[0.6rem] font-bold text-slate-400">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-slate-950/90 px-3.5 py-2.5">
                  <p className="truncate text-xs text-slate-200">{row.label}</p>
                </div>
                <span className={`whitespace-nowrap rounded-full bg-white/5 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] ${row.tone}`}>
                  {row.state}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-[1.25rem] border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-2.5 text-xs text-emerald-300">
            Audit event evt_… written with decision, rule, and context for every interaction.
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-3xl">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">How it works</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">One gateway. Four guarantees. Zero client changes.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Every request passes through the same pipeline, whether it originates from a chatbot, an automation, or an
            embedded AI experience. The pipeline is additive — your existing provider SDKs keep working.
          </p>
        </div>

        <div className="relative mt-8">
          <div className="absolute inset-x-[10%] top-7 hidden h-px bg-gradient-to-r from-sentinel-500/50 via-white/15 to-cyan-400/50 lg:block" />
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {gatewaySteps.map((step, i) => (
              <li
                key={step.title}
                className="relative rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sentinel-500/15 text-sentinel-300">
                    <step.icon className="h-5 w-5" size={20} />
                  </span>
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-slate-500">Step {i + 1}</span>
                </div>
                <h3 className="mt-4 text-sm font-semibold text-white sm:text-base">{step.title}</h3>
                <p className="mt-2 text-xs leading-6 text-slate-300 sm:text-sm">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <div className="max-w-3xl">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">API patterns</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Call the gateway like any model API — governance runs underneath.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Four endpoints cover the common patterns: evaluate a prompt, proxy a chat completion, decide against policy
            explicitly, and read the audit stream.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <CodeCard method="POST" path="/api/gateway/evaluate" label="Evaluate before execution">
            <Line>
              <M>POST</M> <S>/api/gateway/evaluate</S>
            </Line>
            <Line>
              <P>{'{'}</P>
            </Line>
            <Line>
              {'  '}
              <K>{'"provider"'}</K>
              <P>:</P> <S>'"openai"'</S>
              <P>,</P>
            </Line>
            <Line>
              {'  '}
              <K>{'"model"'}</K>
              <P>:</P> <S>'"gpt-4.1"'</S>
              <P>,</P>
            </Line>
            <Line>
              {'  '}
              <K>{'"input"'}</K>
              <P>:</P> <S>'"Customer payment data is being sent..."'</S>
              <P>,</P>
            </Line>
            <Line>
              {'  '}
              <K>{'"application"'}</K>
              <P>:</P> <S>'"payments-bot"'</S>
            </Line>
            <Line>
              <P>{'}'}</P>
            </Line>
            <Line>
              <G>{''}</G>
            </Line>
            <Line>
              <G>{'// 200 OK'}</G>
            </Line>
            <Line>
              <P>{'{'}</P>
            </Line>
            <Line>
              {'  '}
              <K>{'"decision"'}</K>
              <P>:</P> <S>'"redact"'</S>
              <P>,</P>
            </Line>
            <Line>
              {'  '}
              <K>{'"matched_rule"'}</K>
              <P>:</P> <S>'"payments.pii.never-exfiltrate"'</S>
              <P>,</P>
            </Line>
            <Line>
              {'  '}
              <K>{'"sanitized_input"'}</K>
              <P>:</P> <S>'"Customer [REDACTED] data is being sent..."'</S>
              <P>,</P>
            </Line>
            <Line>
              {'  '}
              <K>{'"audit_id"'}</K>
              <P>:</P> <S>'"evt_9f2k1m8x"'</S>
            </Line>
            <Line>
              <P>{'}'}</P>
            </Line>
          </CodeCard>

          <CodeCard method="POST" path="/v1/chat/completions" label="OpenAI-compatible proxy">
            <Line>
              <M>POST</M> <S>/v1/chat/completions</S>
            </Line>
            <Line>
              <K>{'"Authorization"'}</K>
              <P>:</P> <S>'"Bearer sk-sentinel-••••••••"'</S>
            </Line>
            <Line>
              <G>{''}</G>
            </Line>
            <Line>
              <P>{'{'}</P>
            </Line>
            <Line>
              {'  '}
              <K>{'"model"'}</K>
              <P>:</P> <S>'"gpt-4.1"'</S>
              <P>,</P>
            </Line>
            <Line>
              {'  '}
              <K>{'"messages"'}</K>
              <P>: [</P>
            </Line>
            <Line>
              {'    '}
              <P>{'{'}</P> <K>{'"role"'}</K>
              <P>:</P> <S>'"user"'</S>
              <P>,</P> <K>{'"content"'}</K>
              <P>:</P> <S>'"Summarize this contract"'</S> <P>{'}'}</P>
            </Line>
            <Line>
              {'  '}
              <P>],</P>
            </Line>
            <Line>
              {'  '}
              <K>{'"sentinel"'}</K>
              <P>:</P> <P>{'{'}</P> <K>{'"policy"'}</K>
              <P>:</P> <S>'"legal.default"'</S> <P>{'}'}</P>
            </Line>
            <Line>
              <P>{'}'}</P>
            </Line>
            <Line>
              <G>{''}</G>
            </Line>
            <Line>
              <G>{'// 200 OK — streamed as usual'}</G>
            </Line>
            <Line>
              <P>{'{'}</P>
            </Line>
            <Line>
              {'  '}
              <K>{'"id"'}</K>
              <P>:</P> <S>'"chatcmpl-8xQ2n"'</S>
              <P>,</P>
            </Line>
            <Line>
              {'  '}
              <K>{'"choices"'}</K>
              <P>: [</P>
              <P>{'{'}</P> <K>{'"message"'}</K>
              <P>:</P> <P>{'{'}</P> <K>{'"content"'}</K>
              <P>:</P> <S>'"..."'</S> <P>{'}'}</P> <P>{'}'}</P>
              <P>],</P>
            </Line>
            <Line>
              {'  '}
              <K>{'"sentinel_decision"'}</K>
              <P>:</P> <S>'"allow"'</S>
            </Line>
            <Line>
              <P>{'}'}</P>
            </Line>
          </CodeCard>

          <CodeCard method="POST" path="/api/policies/decide" label="Explicit policy decision">
            <Line>
              <M>POST</M> <S>/api/policies/decide</S>
            </Line>
            <Line>
              <P>{'{'}</P>
            </Line>
            <Line>
              {'  '}
              <K>{'"resource_type"'}</K>
              <P>:</P> <S>'"application"'</S>
              <P>,</P>
            </Line>
            <Line>
              {'  '}
              <K>{'"resource_id"'}</K>
              <P>:</P> <S>'"app_paybot_42"'</S>
              <P>,</P>
            </Line>
            <Line>
              {'  '}
              <K>{'"data_categories"'}</K>
              <P>: [</P>
              <S>'"payment"'</S>
              <P>,</P> <S>'"customer"'</S>
              <P>],</P>
            </Line>
            <Line>
              {'  '}
              <K>{'"action"'}</K>
              <P>:</P> <S>'"send_to_model"'</S>
            </Line>
            <Line>
              <P>{'}'}</P>
            </Line>
            <Line>
              <G>{''}</G>
            </Line>
            <Line>
              <G>{'// 403 Forbidden'}</G>
            </Line>
            <Line>
              <P>{'{'}</P>
            </Line>
            <Line>
              {'  '}
              <K>{'"decision"'}</K>
              <P>:</P> <S>'"block"'</S>
              <P>,</P>
            </Line>
            <Line>
              {'  '}
              <K>{'"policy"'}</K>
              <P>:</P> <S>'"payments.pii.never-exfiltrate"'</S>
              <P>,</P>
            </Line>
            <Line>
              {'  '}
              <K>{'"reason"'}</K>
              <P>:</P> <S>'"payment data may not leave the boundary"'</S>
              <P>,</P>
            </Line>
            <Line>
              {'  '}
              <K>{'"audit_id"'}</K>
              <P>:</P> <S>'"evt_8a12d9c3"'</S>
            </Line>
            <Line>
              <P>{'}'}</P>
            </Line>
          </CodeCard>

          <CodeCard method="GET" path="/api/audit/events" label="Audit stream">
            <Line>
              <M>GET</M> <S>/api/audit/events?limit=2</S>
            </Line>
            <Line>
              <G>{''}</G>
            </Line>
            <Line>
              <G>{'// newest first'}</G>
            </Line>
            <Line>
              <P>[</P>
            </Line>
            <Line>
              {'  '}
              <P>{'{'}</P>
            </Line>
            <Line>
              {'    '}
              <K>{'"id"'}</K>
              <P>:</P> <S>'"evt_9f2k1m8x"'</S>
              <P>,</P>
            </Line>
            <Line>
              {'    '}
              <K>{'"actor"'}</K>
              <P>:</P> <S>'"service-account:payments-bot"'</S>
              <P>,</P>
            </Line>
            <Line>
              {'    '}
              <K>{'"decision"'}</K>
              <P>:</P> <S>'"redact"'</S>
              <P>,</P>
            </Line>
            <Line>
              {'    '}
              <K>{'"rule"'}</K>
              <P>:</P> <S>'"payments.pii.never-exfiltrate"'</S>
              <P>,</P>
            </Line>
            <Line>
              {'    '}
              <K>{'"created_at"'}</K>
              <P>:</P> <S>'"2026-08-13T14:02:11Z"'</S>
            </Line>
            <Line>
              {'  '}
              <P>{'}'},</P>
            </Line>
            <Line>
              {'  '}
              <P>{'{'}</P>
            </Line>
            <Line>
              {'    '}
              <K>{'"id"'}</K>
              <P>:</P> <S>'"evt_8a12d9c3"'</S>
              <P>,</P>
            </Line>
            <Line>
              {'    '}
              <K>{'"actor"'}</K>
              <P>:</P> <S>'"user:ada@acme.gov"'</S>
              <P>,</P>
            </Line>
            <Line>
              {'    '}
              <K>{'"decision"'}</K>
              <P>:</P> <S>'"block"'</S>
              <P>,</P>
            </Line>
            <Line>
              {'    '}
              <K>{'"rule"'}</K>
              <P>:</P> <S>'"payments.pii.never-exfiltrate"'</S>
              <P>,</P>
            </Line>
            <Line>
              {'    '}
              <K>{'"created_at"'}</K>
              <P>:</P> <S>'"2026-08-13T13:58:40Z"'</S>
            </Line>
            <Line>
              {'  '}
              <P>{'}'}</P>
            </Line>
            <Line>
              <P>]</P>
            </Line>
          </CodeCard>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6">
        <div className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-7">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Decision matrix</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Every evaluation ends in one of four explicit decisions.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {decisions.map((d) => (
              <div key={d.title} className="rounded-[1.25rem] border border-white/10 bg-slate-950/90 p-4 sm:rounded-[1.5rem]">
                <div className="flex items-center gap-2.5">
                  <d.icon className={`h-4 w-4 ${d.tone}`} size={16} />
                  <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[0.65rem] font-semibold ${d.chip}`}>{d.title}</span>
                </div>
                <p className="mt-3 text-xs leading-6 text-slate-300 sm:text-sm">{d.body}</p>
                <p className="mt-3 font-mono text-[0.65rem] text-slate-500">{d.code}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-7">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Inside the pipeline</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">What happens between the request and the model.</h2>
          <ol className="mt-6 space-y-3">
            {lifecycle.map((item, i) => (
              <li key={item.step} className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-slate-950/90 p-4 sm:rounded-[1.5rem]">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sentinel-500/15 text-xs font-bold text-sentinel-300">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white">{item.step}</p>
                  <p className="mt-0.5 truncate text-xs text-slate-400">{item.detail}</p>
                </div>
                <span className="whitespace-nowrap rounded-full bg-white/5 px-2.5 py-1 font-mono text-[0.6rem] text-slate-400">
                  {item.latency}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <div className="max-w-3xl">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Developer focus</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">The primitives your team builds on.</h2>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {focusCards.map((card) => (
            <div key={card.title} className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem]">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sentinel-500/15 text-sentinel-300">
                <card.icon className="h-5 w-5" size={20} />
              </span>
              <h3 className="mt-4 text-sm font-semibold text-white sm:text-base">{card.title}</h3>
              <p className="mt-2 text-xs leading-6 text-slate-300 sm:text-sm">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[1.25rem] border border-white/10 bg-[var(--surface-strong)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-7">
        <div className="max-w-3xl">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Integration benefits</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Governance that travels with your AI, not beside it.</h2>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="rounded-[1.25rem] border border-white/10 bg-slate-950/90 p-4 sm:rounded-[1.5rem]">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sentinel-500/15 text-sentinel-300">
                <benefit.icon className="h-5 w-5" size={18} />
              </span>
              <h3 className="mt-3.5 text-sm font-semibold text-white">{benefit.title}</h3>
              <p className="mt-2 text-xs leading-6 text-slate-300">{benefit.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="max-w-3xl">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Quickstart</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">From zero to governed in one request.</h2>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <CodeCard method="curl" path="Evaluate a prompt" label="cURL">
            <Line>
              <M>curl</M> <S>https://api.sentinel.ai/api/gateway/evaluate</S> <P>\</P>
            </Line>
            <Line>
              {'  '}
              <P>-H</P> <S>'"Authorization: Bearer $SENTINEL_API_KEY"'</S> <P>\</P>
            </Line>
            <Line>
              {'  '}
              <P>-H</P> <S>'"Content-Type: application/json"'</S> <P>\</P>
            </Line>
            <Line>
              {'  '}
              <P>-d</P>{' '}
              <S>{'"{\\"provider\\":\\"openai\\",\\"model\\":\\"gpt-4.1\\",\\"input\\":\\"Reply to the customer about their account\\"}"'}</S>
            </Line>
          </CodeCard>

          <CodeCard method="node" path="Chat through the gateway" label="Node.js">
            <Line>
              <G>import</G> OpenAI <G>from</G> <S>'"openai"'</S>
              <P>;</P>
            </Line>
            <Line>
              <G>{''}</G>
            </Line>
            <Line>
              <G>const</G> client = <G>new</G> OpenAI(
              <P>{'{'}</P>
            </Line>
            <Line>
              {'  '}
              baseURL: <S>'"https://gateway.sentinel.ai/v1"'</S>
              <P>,</P>
            </Line>
            <Line>
              {'  '}
              apiKey: process.env.SENTINEL_API_KEY
            </Line>
            <Line>
              <P>{'}'});</P>
            </Line>
            <Line>
              <G>{''}</G>
            </Line>
            <Line>
              <G>const</G> res = <G>await</G> client.chat.completions.create(
              <P>{'{'}</P>
            </Line>
            <Line>
              {'  '}
              model: <S>'"gpt-4.1"'</S>
              <P>,</P>
            </Line>
            <Line>
              {'  '}
              messages: <P>[{'{'}</P> role: <S>'"user"'</S>
              <P>,</P> content: <S>'"Summarize this contract"'</S> <P>{'}'}</P>
              <P>]</P>
            </Line>
            <Line>
              <P>{'}'});</P>
            </Line>
            <Line>
              <G>{''}</G>
            </Line>
            <Line>
              <G>{'// Sentinel attached the decision to the response:'}</G>
            </Line>
            <Line>
              console.log(res.sentinel_decision); <G>{'// "allow"'}</G>
            </Line>
          </CodeCard>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-7">
          <div className="flex items-center justify-between">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Sandbox</p>
            <span className="rounded-full border border-sentinel-500/30 bg-sentinel-500/10 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-sentinel-300">
              Free
            </span>
          </div>
          <h3 className="mt-3 text-lg font-semibold text-white sm:text-xl">Build and test against a simulated registry.</h3>
          <ul className="mt-5 space-y-2.5 text-xs leading-6 text-slate-300 sm:text-sm">
            <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sentinel-300" size={16} /> Sample providers, policies, and data categories</li>
            <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sentinel-300" size={16} /> Deterministic decisions for integration tests</li>
            <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sentinel-300" size={16} /> No credit card required</li>
          </ul>
          <Link href="/playground" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 sm:w-auto sm:text-sm">
            <Play className="h-4 w-4" size={16} /> Open the playground
          </Link>
        </div>

        <div className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-7">
          <div className="flex items-center justify-between">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Production</p>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-emerald-300">
              SLA-backed
            </span>
          </div>
          <h3 className="mt-3 text-lg font-semibold text-white sm:text-xl">Enforce live traffic with full audit coverage.</h3>
          <ul className="mt-5 space-y-2.5 text-xs leading-6 text-slate-300 sm:text-sm">
            <li className="flex gap-2"><KeyRound className="mt-0.5 h-4 w-4 shrink-0 text-sentinel-300" size={16} /> Scoped API keys per application and environment</li>
            <li className="flex gap-2"><Zap className="mt-0.5 h-4 w-4 shrink-0 text-sentinel-300" size={16} /> Regional gateway endpoints with failover</li>
            <li className="flex gap-2"><Workflow className="mt-0.5 h-4 w-4 shrink-0 text-sentinel-300" size={16} /> Webhooks and SIEM export for every event</li>
          </ul>
          <Link href="/contact" className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white text-opacity-90 transition hover:bg-white/10 sm:w-auto sm:text-sm">
            Talk to sales <ArrowRight className="h-4 w-4" size={16} />
          </Link>
        </div>
      </section>

      <section className="rounded-[1.25rem] border border-white/10 bg-[var(--surface-strong)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Ship governed AI</p>
            <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Point your client at the gateway. Let policy do the rest.</h2>
            <p className="mt-3 text-xs leading-6 text-slate-300 sm:text-sm">
              The playground runs the real detection engine in your browser — try a prompt with payment data and watch it
              get redacted before any model sees it.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
            <Link href="/playground" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow hover:bg-sentinel-400 sm:w-auto sm:text-sm">
              <ChevronRight className="h-4 w-4" size={16} /> Try the live playground
            </Link>
            <Link href="/register" className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white text-opacity-90 transition hover:bg-white/10 sm:w-auto sm:text-sm">
              Get API keys
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}