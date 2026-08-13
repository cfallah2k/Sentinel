import { BadgeCheck, FileCheck2, ShieldCheck, Sparkles } from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';
import FeatureGrid from '@/components/marketing/feature-grid';
import StatsBand from '@/components/marketing/stats-band';
import CtaSection from '@/components/marketing/cta-section';

const features = [
  {
    icon: ShieldCheck,
    title: 'Continuous control evidence',
    description: 'Gateway decisions, policy versions, and approvals become control evidence automatically — no audit harvests.'
  },
  {
    icon: FileCheck2,
    title: 'Framework playbooks',
    description: 'Pre-built control mappings for SOC 2, ISO 27001, GDPR, HIPAA, NIST AI RMF, and the EU AI Act.'
  },
  {
    icon: Sparkles,
    title: 'EU AI Act readiness',
    description: 'Tier mapping, transparency obligations, and documentation for high-risk AI systems — enforced, not aspirational.'
  },
  {
    icon: BadgeCheck,
    title: 'Auditor-friendly exports',
    description: 'Signed evidence exports with integrity hashes, scoped by control, framework, or time range.'
  }
];

const stats = [
  { value: '6+', label: 'Frameworks mapped' },
  { value: '100%', label: 'Control-to-telemetry' },
  { value: '90d', label: 'Evidence retention' },
  { value: '0', label: 'Manual harvests' }
];

const frameworks = ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR', 'HIPAA', 'NIST AI RMF', 'EU AI Act', 'CCPA', 'DPDP'];

export default function ComplianceSolutionPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Solution · Compliance & Regulation"
        title="Walk into every audit with evidence that writes itself."
        description="For compliance officers in regulated industries, Sentinel turns daily AI operations into continuous, verifiable control evidence — for the frameworks your auditors actually cite."
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'See framework coverage', href: '/compliance' }}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {frameworks.map((framework) => (
            <div key={framework} className="flex items-center gap-2.5 rounded-[1.25rem] border border-white/10 bg-[var(--surface-strong)] px-4 py-3 shadow-panel backdrop-blur-xl">
              <BadgeCheck className="h-4 w-4 shrink-0 text-sentinel-300" />
              <span className="text-xs font-semibold text-white sm:text-sm">{framework}</span>
            </div>
          ))}
        </div>
      </MarketingHero>

      <section className="space-y-8">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Why teams choose Sentinel</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Compliance as a byproduct of operations</h2>
        </div>
        <StatsBand stats={stats} />
        <FeatureGrid items={features} />
      </section>

      <section className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        {[
          {
            question: 'How is evidence created?',
            answer: 'Every gateway evaluation, policy change, and approval decision is recorded with the metadata your controls require — continuously, without human effort.'
          },
          {
            question: 'Which auditors can use this?',
            answer: 'Exports are signed and scoped, so external auditors from Big Four firms to federal reviewers can verify the trail without new tooling.'
          },
          {
            question: 'How fast is EU AI Act mapping?',
            answer: 'Obligation mapping is pre-built for Tier 1 and Tier 2 systems; you attach systems and the platform tracks documentation readiness.'
          }
        ].map(({ question, answer }) => (
          <div key={question} className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-6">
            <h3 className="text-sm font-semibold text-white sm:text-base">{question}</h3>
            <p className="mt-2.5 text-xs leading-6 text-slate-400 sm:text-sm">{answer}</p>
          </div>
        ))}
      </section>

      <CtaSection
        eyebrow="Compliance"
        title="Close your compliance gaps before the audit calendar does."
        description="Get framework mapping, live evidence, and gap tracking in one workspace."
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'Visit trust center', href: '/trust' }}
      />
    </div>
  );
}
