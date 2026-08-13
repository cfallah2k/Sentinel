import { BadgeCheck, CalendarClock, FileSearch, Fingerprint, GitBranch, ScrollText } from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';
import FeatureGrid from '@/components/marketing/feature-grid';
import Steps from '@/components/marketing/steps';
import CtaSection from '@/components/marketing/cta-section';

const features = [
  {
    icon: FileSearch,
    title: 'Rich system metadata',
    description: 'Purpose, owner, risk level, data categories, environment, and oversight model — captured at registration.'
  },
  {
    icon: Fingerprint,
    title: 'Data category attestation',
    description: 'Every system declares the categories it touches, and the gateway checks reality against the declaration.'
  },
  {
    icon: GitBranch,
    title: 'Versioned passports',
    description: 'Changes to a system create a new passport version with a full diff — nothing happens silently.'
  },
  {
    icon: BadgeCheck,
    title: 'Attestation workflows',
    description: 'Owners recertify passports on schedule, with expiring attestations escalated to governance.'
  },
  {
    icon: ScrollText,
    title: 'Audit-ready exports',
    description: 'A passport is a self-contained audit document: metadata, decisions, incidents, and evidence.'
  },
  {
    icon: CalendarClock,
    title: 'Lifecycle states',
    description: 'Draft, registered, approved, restricted, retired — each state carries its own controls.'
  }
];

const passportFields = [
  { label: 'System', value: 'Nova Fraud Sentinel' },
  { label: 'Type', value: 'Decision' },
  { label: 'Risk', value: 'High' },
  { label: 'Owner', value: 'Jordan Patel' },
  { label: 'Environment', value: 'Production' },
  { label: 'Data categories', value: 'PII · Financial' }
];

export default function AiPassportPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Product · AI Passports"
        title="Every AI system, documented like a citizen."
        description="An AI passport is the single record of what a system is, what it touches, who owns it, and how it is governed — continuously updated by the platform, not by a quarterly spreadsheet."
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'Governance overview', href: '/product/ai-governance' }}
      >
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[var(--surface-strong)] p-4 shadow-panel backdrop-blur-xl sm:rounded-[2rem] sm:p-5">
          <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),_transparent_45%)]" />
          <div className="relative space-y-2.5">
            <div className="flex items-center justify-between rounded-[1.25rem] border border-white/10 bg-slate-950/90 px-3.5 py-2.5 text-xs text-slate-300 sm:text-sm">
              <span className="font-semibold text-white">AI Passport</span>
              <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                v3 · Approved
              </span>
            </div>
            {passportFields.map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between rounded-2xl bg-slate-950/90 px-3.5 py-2 text-xs sm:text-sm">
                <span className="text-slate-500">{label}</span>
                <span className="text-slate-200">{value}</span>
              </div>
            ))}
            <div className="rounded-2xl border border-white/10 bg-slate-950/85 p-3.5 text-xs text-slate-300">
              <p className="font-semibold text-white">Attestation</p>
              <p className="mt-1 text-slate-500">Recertified 13 Aug 2026 · next review 13 Nov 2026</p>
            </div>
          </div>
        </div>
      </MarketingHero>

      <section className="space-y-8">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Capabilities</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">From registration to retirement, documented</h2>
        </div>
        <FeatureGrid items={features} />
      </section>

      <Steps
        eyebrow="How it works"
        title="Passports write themselves"
        steps={[
          { title: 'Register', description: 'Declare the system, its models, and its data categories at onboarding.' },
          { title: 'Observe', description: 'Gateway traffic, policy decisions, and incidents update the passport continuously.' },
          { title: 'Attest & export', description: 'Owners recertify on schedule; auditors export the complete document on demand.' }
        ]}
      />

      <CtaSection
        eyebrow="AI Passports"
        title="Kill the AI inventory spreadsheet."
        description="Your registry updates itself with every request the gateway sees."
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'Explore data flows', href: '/product/data-flow' }}
      />
    </div>
  );
}
