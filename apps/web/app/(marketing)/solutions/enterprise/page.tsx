import { Building2, Globe2, LayoutDashboard, ShieldCheck, Workflow } from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';
import FeatureGrid from '@/components/marketing/feature-grid';
import StatsBand from '@/components/marketing/stats-band';
import CtaSection from '@/components/marketing/cta-section';

const features = [
  {
    icon: LayoutDashboard,
    title: 'One control plane, many business units',
    description: 'Workspace-level governance with per-unit visibility, owners, and reporting — no shadow AI under the radar.'
  },
  {
    icon: Globe2,
    title: 'Global residency & privacy',
    description: 'Region-pinned workspaces, local data classification, and residency options that satisfy cross-border policies.'
  },
  {
    icon: ShieldCheck,
    title: 'Zero-trust enforcement',
    description: 'MFA, RBAC, and least privilege extend from your workforce to every application calling a model.'
  },
  {
    icon: Workflow,
    title: 'Approval and escalation culture',
    description: 'High-risk AI actions route through named approvers with SLA escalation — risk decisions stay human.'
  },
  {
    icon: Building2,
    title: 'Procurement-friendly',
    description: 'SOC 2 Type II, ISO 27001, DPA, security reviews, and signed audit evidence for every acquisition.'
  },
  {
    icon: ShieldCheck,
    title: 'Vendor risk on autopilot',
    description: 'Provider registries and risk scoring keep your model supply chain visible and governed.'
  }
];

const stats = [
  { value: '140+', label: 'Enterprise customers' },
  { value: '18', label: 'Countries served' },
  { value: '99.99%', label: 'Gateway uptime SLA' },
  { value: '24/7', label: 'Security monitoring' }
];

const useCases = [
  {
    title: 'A global bank',
    detail: 'Fraud-scoring copilot governed under EU AI Act Tier 2 with region-pinned evidence.'
  },
  {
    title: 'A healthcare network',
    detail: 'PHI classifiers redacting every patient mention before it reaches external models.'
  },
  {
    title: 'A SaaS scale-up',
    detail: 'Copilot shipped to 2,000 customers with SOC 2 evidence generated continuously.'
  }
];

export default function EnterpriseSolutionPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Solution · Enterprise"
        title="AI at enterprise scale, governed at enterprise standard."
        description="For global organizations running hundreds of AI systems, Sentinel delivers one control plane across business units, regions, and providers — with the evidence your board and auditors expect."
        primary={{ label: 'Talk to sales', href: '/contact' }}
        secondary={{ label: 'Request a demo', href: '/request-demo' }}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {useCases.map(({ title, detail }) => (
            <div key={title} className="rounded-[1.25rem] border border-white/10 bg-[var(--surface-strong)] p-4 shadow-panel backdrop-blur-xl">
              <p className="text-sm font-semibold text-white">{title}</p>
              <p className="mt-1.5 text-xs leading-5 text-slate-400">{detail}</p>
            </div>
          ))}
        </div>
      </MarketingHero>

      <section className="space-y-8">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Why enterprises choose Sentinel</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Scale without losing control</h2>
        </div>
        <StatsBand stats={stats} />
        <FeatureGrid items={features} />
      </section>

      <section className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Enterprise rollout</p>
            <h2 className="mt-2 text-lg font-semibold text-white">From pilot to global rollout in six weeks</h2>
          </div>
          <ol className="space-y-3">
            {[
              'Pilot: one business unit, gateway-first, three policies',
              'Scale: registry onboarding for every AI system and application',
              'Integrate: SSO, SIEM, data sources, and GRC tooling',
              'Certify: framework mapping and signed audit evidence'
            ].map((step, index) => (
              <li key={step} className="flex items-center gap-3 rounded-2xl bg-slate-950/90 p-3.5 text-xs text-slate-300 sm:text-sm">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sentinel-500/15 text-xs font-bold text-sentinel-300">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaSection
        eyebrow="Enterprise"
        title="Bring every AI system into one governed plane."
        description="Security reviews, DPA, and a dedicated launch team included with every enterprise agreement."
        primary={{ label: 'Talk to sales', href: '/contact' }}
        secondary={{ label: 'View pricing', href: '/pricing' }}
      />
    </div>
  );
}
