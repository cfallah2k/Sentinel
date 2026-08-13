import { CalendarClock, Download, FileSearch, Lock, ScrollText, ShieldCheck } from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';
import FeatureGrid from '@/components/marketing/feature-grid';
import Steps from '@/components/marketing/steps';
import CtaSection from '@/components/marketing/cta-section';

const features = [
  {
    icon: Lock,
    title: 'Immutable event log',
    description: 'Gateway decisions, policy changes, approvals, and admin actions append to a tamper-evident audit trail.'
  },
  {
    icon: FileSearch,
    title: 'Searchable by any dimension',
    description: 'Filter by actor, action, resource, policy, system, or result — and pivot into detail in one click.'
  },
  {
    icon: CalendarClock,
    title: 'Configurable retention',
    description: 'Retention windows from 7 days to custom periods, aligned to your regulatory requirements.'
  },
  {
    icon: ShieldCheck,
    title: 'Evidence-grade exports',
    description: 'Export audit ranges as PDF, CSV, or JSON with integrity hashes your auditors can verify.'
  },
  {
    icon: ScrollText,
    title: 'Policy change history',
    description: 'Every policy revision records who, what, when, and why — rollbacks stay traceable.'
  },
  {
    icon: Download,
    title: 'Scheduled report delivery',
    description: 'Daily, weekly, or monthly audit summaries delivered to named recipients automatically.'
  }
];

const events = [
  { time: '09:42:11', action: 'policy.update', actor: 'amara.okafor@nexora.io', result: 'Success', tone: 'text-emerald-300' },
  { time: '09:31:07', action: 'gateway.evaluate', actor: 'system', result: 'Denied', tone: 'text-rose-300' },
  { time: '09:18:44', action: 'approval.decide', actor: 'jordan.patel@nexora.io', result: 'Success', tone: 'text-emerald-300' },
  { time: '09:02:59', action: 'system.register', actor: 'devon.clarke@nexora.io', result: 'Success', tone: 'text-emerald-300' },
  { time: '08:47:22', action: 'auth.mfa_challenge', actor: 'priya.raman@nexora.io', result: 'Denied', tone: 'text-amber-300' }
];

export default function AuditPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Product · Audit"
        title="An audit trail that answers before you ask."
        description="Every AI interaction, policy change, and approval decision lands in an immutable, searchable event log — with exports your auditors can verify without pulling teeth."
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'See compliance mapping', href: '/compliance' }}
      >
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/95 p-4 shadow-panel backdrop-blur-xl sm:rounded-[2rem] sm:p-5">
          <div className="pointer-events-none absolute -right-16 top-10 h-24 w-24 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="flex items-center justify-between rounded-[1.25rem] border border-white/10 bg-slate-950/90 px-3.5 py-2.5 text-xs text-slate-300 sm:text-sm">
            <span className="font-semibold text-white">Audit event stream</span>
            <span className="rounded-full bg-sentinel-500/15 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-sentinel-200">
              Live
            </span>
          </div>
          <div className="mt-2.5 space-y-2">
            {events.map(({ time, action, actor, result, tone }) => (
              <div key={`${time}-${action}`} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-950/90 px-3.5 py-2.5 text-xs sm:text-sm">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="text-slate-500">{time}</span>
                  <span className="truncate font-mono text-slate-200">{action}</span>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="hidden text-[0.65rem] text-slate-500 sm:block">{actor}</span>
                  <span className={`text-[0.6rem] font-semibold uppercase tracking-[0.2em] ${tone}`}>{result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MarketingHero>

      <section className="space-y-8">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Capabilities</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Every event, every answer, one log</h2>
        </div>
        <FeatureGrid items={features} />
      </section>

      <Steps
        eyebrow="How it works"
        title="Captured, verified, exported"
        steps={[
          { title: 'Capture', description: 'The platform emits structured events for every governed action — automatically.' },
          { title: 'Immortalize', description: 'Events append to the immutable log with integrity hashes and retention policy applied.' },
          { title: 'Export', description: 'Auditors get signed exports filtered to scope, with full provenance included.' }
        ]}
      />

      <CtaSection
        eyebrow="Audit"
        title="Walk into your next audit already prepared."
        description="Evidence that collects itself while you ship AI features."
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'Explore incidents', href: '/product/incidents' }}
      />
    </div>
  );
}
