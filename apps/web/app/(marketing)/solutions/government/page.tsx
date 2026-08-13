import { FileSearch, Fingerprint, Landmark, ScrollText, ShieldCheck, Users } from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';
import FeatureGrid from '@/components/marketing/feature-grid';
import StatsBand from '@/components/marketing/stats-band';
import CtaSection from '@/components/marketing/cta-section';

const features = [
  {
    icon: Landmark,
    title: 'Registry-first governance',
    description: 'Every AI system used by the agency is registered with purpose, operator, risk level, and data categories — before it serves the public.'
  },
  {
    icon: Fingerprint,
    title: 'Public-sector classification',
    description: 'Sensitivity labels matched to citizen data, benefit data, and law-enforcement information.'
  },
  {
    icon: ShieldCheck,
    title: 'Accountability by design',
    description: 'Named operators, human oversight modes, and audit trails for every automated decision.'
  },
  {
    icon: ScrollText,
    title: 'Regulatory reporting',
    description: 'Export registry snapshots and decision summaries for transparency registers and parliamentary reporting.'
  },
  {
    icon: Users,
    title: 'Multi-agency isolation',
    description: 'Each agency governs its own estate within a federated platform — shared standards, isolated controls.'
  },
  {
    icon: FileSearch,
    title: 'Vendor accountability',
    description: 'Track AI vendors, model approvals, and contractual obligations per system across the registry.'
  }
];

const stats = [
  { value: '24/7', label: 'Service monitoring' },
  { value: '100%', label: 'Systems registered' },
  { value: '5', label: 'Tier risk model' },
  { value: '60d', label: 'Publication cycles' }
];

const principles = [
  { label: 'Lawful', detail: 'Decisions traceable to legal authority' },
  { label: 'Transparent', detail: 'Public registries of AI use' },
  { label: 'Accountable', detail: 'Named human owners per system' },
  { label: 'Rights-preserving', detail: 'Bias, redress, and human review' }
];

export default function GovernmentSolutionPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Solution · Government"
        title="AI that serves citizens must answer to citizens."
        description="Sentinel gives public-sector organizations the registry, classification, and audit infrastructure to deploy AI responsibly — with accountability baked into every workflow."
        primary={{ label: 'Talk to our public sector team', href: '/contact' }}
        secondary={{ label: 'Request a demo', href: '/request-demo' }}
      >
        <div className="grid grid-cols-2 gap-3">
          {principles.map(({ label, detail }) => (
            <div key={label} className="rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.95)] p-4 shadow-panel backdrop-blur-xl">
              <p className="text-sm font-semibold text-white">{label}</p>
              <p className="mt-1 text-xs leading-5 text-slate-400">{detail}</p>
            </div>
          ))}
        </div>
      </MarketingHero>

      <section className="space-y-8">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Why agencies choose Sentinel</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Trust that survives the ballot box</h2>
        </div>
        <StatsBand stats={stats} />
        <FeatureGrid items={features} />
      </section>

      <section className="rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-8">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Use cases</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Where agencies deploy Sentinel</h2>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { title: 'Citizen services', detail: 'Chatbots and permit tools with transparent, reviewable answers' },
            { title: 'Benefits administration', detail: 'Eligibility engines with human review and redress paths' },
            { title: 'Public safety', detail: 'Classification and audit for high-risk analytical systems' }
          ].map(({ title, detail }) => (
            <div key={title} className="rounded-[1.25rem] bg-slate-950/90 p-4">
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <p className="mt-2 text-xs leading-6 text-slate-400">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaSection
        eyebrow="Government"
        title="Deploy AI the public can audit."
        description="Registry, classification, and reporting built for the public sector — from day one."
        primary={{ label: 'Talk to our team', href: '/contact' }}
        secondary={{ label: 'Start free trial', href: '/register' }}
      />
    </div>
  );
}
