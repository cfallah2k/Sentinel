import { Boxes, GitBranch, Radar, Scale, ShieldCheck, Workflow } from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';
import { LiveTicker } from '@/components/marketing/live-hero';
import FeatureGrid from '@/components/marketing/feature-grid';
import Steps from '@/components/marketing/steps';
import CtaSection from '@/components/marketing/cta-section';

const features = [
  {
    icon: Radar,
    title: 'Single governance console',
    description: 'Registry, policy, risk, and compliance in one workspace — no spreadsheets stitching the story together.'
  },
  {
    icon: GitBranch,
    title: 'Policy versioning',
    description: 'Every change is versioned, reviewable, and auditable. Roll back any decision matrix in one click.'
  },
  {
    icon: Boxes,
    title: 'Cross-system consistency',
    description: 'The same policy logic applies to hosted providers, self-hosted clusters, and every application that calls them.'
  },
  {
    icon: Scale,
    title: 'Framework mapping',
    description: 'Controls map to Nigeria\u2019s Data Protection Act, Ghana\u2019s Data Protection Act, Kenya\u2019s Data Protection Act, GDPR, and the AU Malabo Convention with live evidence.'
  },
  {
    icon: ShieldCheck,
    title: 'Role-based separation of duties',
    description: 'Governance owners write policy, security analysts respond to incidents, auditors read everything.'
  },
  {
    icon: Workflow,
    title: 'Automated oversight',
    description: 'Escalation paths, approval gates, and drift detection run continuously without manual reviews.'
  }
];

const pillars = [
  { label: 'Registry', value: '0 systems', tone: 'bg-sky-400' },
  { label: 'Policy coverage', value: '0%', tone: 'bg-emerald-400' },
  { label: 'Risk reviewed', value: '0 assessments', tone: 'bg-amber-400' },
  { label: 'Framework status', value: 'Roadmap', tone: 'bg-amber-400' }
];

export default function AiGovernancePage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Product · AI Governance"
        title="Govern AI like you govern everything else."
        description="A single control plane that connects what your AI systems are, what they are allowed to do, and what auditors can prove — one loop, one source of truth."
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'See the registry', href: '/product/ai-passport' }}
      >
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[var(--surface-strong)] p-4 shadow-panel backdrop-blur-xl sm:rounded-[2rem] sm:p-5">
          <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),_transparent_45%)]" />
          <div className="relative space-y-3">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Governance posture</p>
            <div className="grid grid-cols-2 gap-2.5">
              {pillars.map(({ label, value, tone }) => (
                <div key={label} className="rounded-2xl bg-slate-950/90 p-3.5">
                  <span className={`inline-flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-slate-400`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${tone}`} />
                    {label}
                  </span>
                  <p className="mt-2 text-sm font-semibold text-white sm:text-base">{value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/85 p-3.5">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Nigeria DPA — lawful processing controls</span>
                <span className="text-amber-300">In progress</span>
              </div>
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[0%] rounded-full bg-gradient-to-r from-sentinel-500 to-cyan-400" />
              </div>
            </div>
            <LiveTicker
              items={[
                'simulated · control GRD-04 · in progress · evidence pending',
                'simulated · assessment.due · Nigeria DPA · controls 0/0 mapped',
                'simulated · evidence.captured · audit ready · evt-…',
                'simulated · posture.snapshot · saved to registry'
              ]}
            />
          </div>
        </div>
      </MarketingHero>

      <section className="space-y-8">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Capabilities</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Governance that holds up to scrutiny</h2>
        </div>
        <FeatureGrid items={features} />
      </section>

      <Steps
        eyebrow="How it works"
        title="Connect, control, and certify"
        steps={[
          { title: 'Register the estate', description: 'AI systems, applications, providers, and models enter the registry with rich metadata.' },
          { title: 'Connect policy to reality', description: 'Policies attach to systems, data categories, and providers — enforced by the gateway.' },
          { title: 'Prove continuous control', description: 'Framework mapping turns live decisions into audit evidence without harvest campaigns.' }
        ]}
      />

      <CtaSection
        eyebrow="AI Governance"
        title="One loop from registration to audit."
        description="See the whole estate governed in one place, with evidence that writes itself."
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'Meet AI passports', href: '/product/ai-passport' }}
      />
    </div>
  );
}
