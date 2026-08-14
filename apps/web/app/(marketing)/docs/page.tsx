import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Box,
  Boxes,
  Code2,
  Fingerprint,
  FlaskConical,
  GitBranch,
  KeyRound,
  Network,
  ScrollText,
  Search,
  ShieldCheck,
  Terminal,
  Workflow,
  Zap
} from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';
import CtaSection from '@/components/marketing/cta-section';

const docSections = [
  {
    title: 'Getting started',
    description: 'Install the gateway, create your first policy, and route your first AI request.',
    icon: Zap,
    links: ['Quickstart', 'Installation', 'First policy', 'Connect a provider'],
    href: '/get-started'
  },
  {
    title: 'Gateway',
    description: 'Reference for the OpenAI-compatible proxy, decision API, and streaming.',
    icon: ShieldCheck,
    links: ['Configuration', 'Request anatomy', 'Decision API', 'Streaming & WebSockets'],
    href: '/product/ai-gateway'
  },
  {
    title: 'Policy engine',
    description: 'Author, version, and test governance rules with the policy DSL.',
    icon: Workflow,
    links: ['Policy DSL', 'Conditions reference', 'Decision matrix', 'Policy testing'],
    href: '/product/policy-engine'
  },
  {
    title: 'Classification',
    description: 'Detector catalogs, sensitivity levels, and redaction pipelines.',
    icon: Fingerprint,
    links: ['Detectors', 'Categories', 'Redaction', 'Custom detectors'],
    href: '/product/data-classification'
  },
  {
    title: 'Data flows',
    description: 'Trace data movement from source to inference and back.',
    icon: Network,
    links: ['Flow graph', 'Lineage', 'Sensitive flows', 'Alerts'],
    href: '/product/data-flow'
  },
  {
    title: 'AI passports',
    description: 'Registry, attestations, and audit-ready system metadata.',
    icon: BookOpen,
    links: ['System registration', 'Passport schema', 'Attestations', 'Versioning'],
    href: '/product/ai-passport'
  },
  {
    title: 'Approvals & incidents',
    description: 'Human-in-the-loop workflows and AI incident response.',
    icon: ScrollText,
    links: ['Approval flows', 'SLA escalation', 'Incident types', 'Playbooks'],
    href: '/product/incidents'
  },
  {
    title: 'Audit & reporting',
    description: 'Immutable event log, evidence exports, and scheduled reports.',
    icon: Boxes,
    links: ['Audit events', 'Evidence export', 'Reports', 'Retention'],
    href: '/product/audit'
  },
  {
    title: 'Integrations',
    description: 'Connect Sentinel to your existing security and data stack.',
    icon: Box,
    links: ['SSO & SCIM', 'SIEM forwarding', 'Data sources', 'Webhooks'],
    href: '/integrations'
  },
  {
    title: 'API reference',
    description: 'REST and gateway endpoints, SDKs, and code samples.',
    icon: Code2,
    links: ['Authentication', 'REST endpoints', 'SDKs', 'Rate limits'],
    href: '/developers'
  }
];

const quickLinks = [
  { label: 'Installation', href: '/get-started', icon: Terminal },
  { label: 'Decision API', href: '/developers', icon: GitBranch },
  { label: 'Policy DSL', href: '/product/policy-engine', icon: FlaskConical },
  { label: 'SSO setup', href: '/integrations', icon: KeyRound }
];

export default function DocsPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Documentation"
        title="Everything you need to run Sentinel."
        description="Guides, references, and API docs for operators, security engineers, and developers integrating AI governance into their stack."
        primary={{ label: 'Get started', href: '/get-started' }}
        secondary={{ label: 'API reference', href: '/developers' }}
      />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {quickLinks.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="group flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-4 shadow-panel backdrop-blur-xl transition duration-300 hover:border-sentinel-500/25 sm:rounded-[1.5rem] sm:p-5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sentinel-500/10 text-sentinel-300">
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white transition group-hover:text-sentinel-200">{label}</p>
              <p className="text-xs text-slate-500">Jump to section</p>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-sentinel-300" />
          </Link>
        ))}
      </section>

      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Browse by topic</p>
            <h2 className="mt-2 text-lg font-semibold text-white sm:text-xl">Guides and references</h2>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-400">
            <Search className="h-3.5 w-3.5 text-slate-500" />
            Search the docs
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {docSections.map(({ title, description, icon: Icon, links, href }) => (
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
              <p className="mt-2 text-xs leading-6 text-slate-400">{description}</p>
              <ul className="mt-4 space-y-2 border-t border-white/5 pt-4">
                {links.map((link) => (
                  <li key={link} className="flex items-center gap-2 text-xs text-slate-400 transition group-hover:text-slate-300">
                    <span className="h-1 w-1 rounded-full bg-sentinel-400" />
                    {link}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </section>

      <CtaSection
        eyebrow="Still exploring?"
        title="Get hands-on with Sentinel in minutes."
        description="Create a workspace, connect a provider, and enforce your first policy today."
        primary={{ label: 'Request a demo', href: '/request-demo' }}
        secondary={{ label: 'Talk to an engineer', href: '/contact' }}
      />
    </div>
  );
}
