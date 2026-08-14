import { Eye, Fingerprint, Lock, ScanSearch, ShieldHalf, UserCheck } from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';
import FeatureGrid from '@/components/marketing/feature-grid';
import StatsBand from '@/components/marketing/stats-band';
import CtaSection from '@/components/marketing/cta-section';

const features = [
  {
    icon: Lock,
    title: 'Data minimization in motion',
    description: 'The gateway inspects, redacts, or blocks personal data before it ever reaches a model — nothing to delete later.'
  },
  {
    icon: Fingerprint,
    title: 'Purpose-scoped processing',
    description: 'Policy conditions tie data categories to approved purposes, so personal data only flows where it belongs.'
  },
  {
    icon: Eye,
    title: 'Transparency by default',
    description: 'Data subjects see how their data moves — DPAs, records of processing, and audit events generated continuously.'
  },
  {
    icon: ShieldHalf,
    title: 'Residency controls',
    description: 'Region-pinned workspaces keep personal data inside the jurisdictions your program requires.'
  },
  {
    icon: UserCheck,
    title: 'Rights request support',
    description: 'Registry and lineage make access, erasure, and portability requests tractable across AI systems.'
  },
  {
    icon: ScanSearch,
    title: 'Privacy impact evidence',
    description: 'Classification results and flow graphs feed DPIA documentation with real data, not estimates.'
  }
];

const stats = [
  { value: '18', label: 'Privacy detectors' },
  { value: '100%', label: 'Traffic inspected' },
  { value: '0%', label: 'Exposure reduction (live)' },
  { value: '0', label: 'Data sold' }
];

const categories = ['PII', 'Health (PHI)', 'Biometric', 'Financial', 'Employee', 'Customer', 'Location', 'Credentials'];

export default function PrivacySolutionPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Solution · Privacy"
        title="Privacy programs that survive contact with AI."
        description="Sentinel gives privacy teams the classification, redaction, and lineage to keep personal data out of models — and the evidence to prove it to regulators."
        primary={{ label: 'Request a demo', href: '/request-demo' }}
        secondary={{ label: 'Read privacy policy', href: '/legal/privacy' }}
      >
        <div className="flex flex-col gap-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center justify-between rounded-[1.25rem] border border-white/10 bg-[var(--surface-strong)] px-4 py-3 text-xs text-slate-300 shadow-panel backdrop-blur-xl sm:text-sm">
              <span>{category}</span>
              <span className="inline-flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Classified
              </span>
            </div>
          ))}
        </div>
      </MarketingHero>

      <section className="space-y-8">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Why privacy teams choose Sentinel</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Prevention over consent theater</h2>
        </div>
        <StatsBand stats={stats} />
        <FeatureGrid items={features} />
      </section>

      <section className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-8">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">For your next DPIA</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Documentation from live telemetry</h2>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { title: 'Inventory', detail: 'Every AI system with its data categories, mapped to processing purposes' },
            { title: 'Data flows', detail: 'Lineage graphs showing exactly where personal data travels' },
            { title: 'Controls', detail: 'Redaction and blocking evidence tied to minimization measures' }
          ].map(({ title, detail }) => (
            <div key={title} className="rounded-[1.25rem] bg-slate-950/90 p-4">
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <p className="mt-2 text-xs leading-6 text-slate-400">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaSection
        eyebrow="Privacy"
        title="Keep personal data out of the model — by policy, not by prayer."
        description="Classification runs on every request; minimization is enforced, measured, and documented."
        primary={{ label: 'Request a demo', href: '/request-demo' }}
        secondary={{ label: 'See classification', href: '/product/data-classification' }}
      />
    </div>
  );
}
