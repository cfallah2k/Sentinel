import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Boxes,
  Fingerprint,
  Network,
  ScrollText,
  ShieldCheck,
  ShieldHalf,
  UserCheck,
  Workflow
} from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';
import { LiveCycle, LiveTicker } from '@/components/marketing/live-hero';
import FeatureGrid from '@/components/marketing/feature-grid';
import Steps from '@/components/marketing/steps';
import CtaSection from '@/components/marketing/cta-section';

const capabilities = [
  {
    title: 'AI Gateway',
    description: 'An OpenAI-compatible proxy that evaluates every request against policy before it reaches a model.',
    href: '/product/ai-gateway',
    icon: ShieldCheck
  },
  {
    title: 'Policy Engine',
    description: 'Author, version, and enforce governance rules with allow, block, redact, and approval decisions.',
    href: '/product/policy-engine',
    icon: Workflow
  },
  {
    title: 'Data Classification',
    description: 'Detect sensitive data across your estate with detectors tuned for PII, financial, health, and more.',
    href: '/product/data-classification',
    icon: Fingerprint
  },
  {
    title: 'Data Flow Governance',
    description: 'Trace data movement from source to inference and surface every sensitive flow.',
    href: '/product/data-flow',
    icon: Network
  },
  {
    title: 'AI Passports',
    description: 'Rich metadata for every AI system — purpose, risk, data categories, and attestations.',
    href: '/product/ai-passport',
    icon: BookOpen
  },
  {
    title: 'Approvals',
    description: 'Human-in-the-loop workflows for high-risk requests, policy exceptions, and data access.',
    href: '/product/approvals',
    icon: UserCheck
  },
  {
    title: 'Incidents',
    description: 'Triage, escalate, and remediate AI policy violations and data exposures with SLA tracking.',
    href: '/product/incidents',
    icon: ShieldHalf
  },
  {
    title: 'Audit & Reporting',
    description: 'Immutable event logs, evidence exports, and scheduled reports for every stakeholder.',
    href: '/product/audit',
    icon: Boxes
  },
  {
    title: 'AI Governance',
    description: 'A unified control plane connecting registry, policy, risk, and compliance in one loop.',
    href: '/product/ai-governance',
    icon: ScrollText
  }
];

const visualRows = [
  {
    label: 'Request evaluated',
    states: [
      { label: 'policy: pol-1', tone: 'text-emerald-300' },
      { label: 'policy: pol-9', tone: 'text-emerald-300' }
    ]
  },
  {
    label: 'Decision',
    states: [
      { label: 'Blocked — PII to unapproved provider', tone: 'text-rose-300' },
      { label: 'Allowed — policy: pol-1', tone: 'text-emerald-300' },
      { label: 'Redacted — PII masked', tone: 'text-cyan-300' }
    ]
  },
  {
    label: 'Audit event',
    states: [
      { label: 'evt-8f21a9 · captured', tone: 'text-sentinel-300' },
      { label: 'evt-9c04b1 · captured', tone: 'text-sentinel-300' }
    ]
  }
];

export default function ProductPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Product"
        title="One control plane for every AI data path."
        description="Sentinel connects the gateway, policy engine, classification, and audit trail into a single loop — so governance is enforced where AI happens and proven where auditors look."
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'Read the docs', href: '/docs' }}
      >
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[var(--surface-strong)] p-4 shadow-panel backdrop-blur-xl sm:rounded-[2rem] sm:p-5">
          <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.24),_transparent_45%)]" />
          <div className="relative space-y-3">
            <div className="flex items-center justify-between rounded-[1.25rem] border border-white/10 bg-slate-950/90 px-3.5 py-2.5 text-xs text-slate-300 sm:text-sm">
              <span>Gateway — Atlas Support Copilot</span>
              <span className="rounded-full bg-sentinel-500/15 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-sentinel-200">
                Live
              </span>
            </div>
            <div className="space-y-2 rounded-[1.25rem] border border-white/10 bg-slate-900/90 p-3.5 shadow-glow">
              {visualRows.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-950/90 px-3.5 py-2.5 text-xs sm:text-sm">
                  <span className="text-slate-300">{row.label}</span>
                  <LiveCycle states={row.states} />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {[
                { label: 'Policies', value: '0' },
                { label: 'Flows traced', value: '0' },
                { label: 'Evidence', value: '0' }
              ].map((item) => (
                <div key={item.label} className="rounded-2xl bg-slate-950/85 p-3 text-center">
                  <p className="text-sm font-semibold text-white sm:text-base">{item.value}</p>
                  <p className="mt-0.5 text-[0.55rem] uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
            <LiveTicker
              items={[
                'simulated · Atlas Support Copilot · gateway evaluate · allow',
                'simulated · evt-8f21a9 · decision captured with policy, reason, context',
                'simulated · sensitive flow classified · redacted before provider call'
              ]}
            />
          </div>
        </div>
      </MarketingHero>

      <section className="space-y-8">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Capabilities</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Nine capabilities, one governance loop</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {capabilities.map(({ title, description, href, icon: Icon }) => (
            <Link
              key={title}
              href={href}
              className="group rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sentinel-500/25 sm:rounded-[1.5rem] sm:p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sentinel-500/10 text-sentinel-300">
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowRight className="h-4 w-4 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-sentinel-300" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-white sm:text-base">{title}</h3>
              <p className="mt-2 text-xs leading-6 text-slate-400 sm:text-sm">{description}</p>
            </Link>
          ))}
        </div>
      </section>

      <Steps
        eyebrow="How it works"
        title="From first request to audit-ready in three moves"
        steps={[
          { title: 'Route through the gateway', description: 'Every AI request passes through Sentinel before reaching a model — nothing executes unpoliced.' },
          { title: 'Enforce policy at runtime', description: 'The policy engine evaluates conditions and returns allow, block, redact, or require-approval decisions.' },
          { title: 'Prove it with evidence', description: 'Every decision lands in the immutable audit trail, linked to evidence your auditors can export.' }
        ]}
      />

      <CtaSection
        eyebrow="See it in action"
        title="Route your first governed request today."
        description="Free tier includes the gateway, three policies, and seven days of audit retention."
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'Explore integrations', href: '/integrations' }}
      />
    </div>
  );
}
