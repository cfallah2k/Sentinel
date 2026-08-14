import { BadgeCheck, ClipboardCheck, FileCheck2, ShieldCheck } from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';
import StatsBand from '@/components/marketing/stats-band';
import CtaSection from '@/components/marketing/cta-section';

const stats = [
  { value: '0', label: 'Frameworks certified' },
  { value: '0', label: 'Audit events (live)' },
  { value: '24/7', label: 'Continuous monitoring' },
  { value: '90d+', label: 'Evidence retention' }
];

const frameworks = [
  { name: 'Nigeria Data Protection Act', standard: 'Nigeria', status: 'In progress', progress: 0 },
  { name: 'Ghana Data Protection Act', standard: 'Ghana', status: 'In progress', progress: 0 },
  { name: 'Côte d\u2019Ivoire Law 2013-450', standard: 'Côte d\u2019Ivoire', status: 'In progress', progress: 0 },
  { name: 'Senegal Law 2008-12', standard: 'Senegal', status: 'Planned', progress: 0 },
  { name: 'Kenya Data Protection Act', standard: 'Kenya', status: 'In progress', progress: 0 },
  { name: 'ECOWAS Supplementary Act', standard: 'ECOWAS', status: 'Planned', progress: 0 },
  { name: 'AU Malabo Convention', standard: 'African Union', status: 'Planned', progress: 0 },
  { name: 'SOC 2 Type II', standard: 'AICPA', status: 'In progress', progress: 0 },
  { name: 'ISO/IEC 27001', standard: 'ISO', status: 'Planned', progress: 0 },
  { name: 'GDPR', standard: 'Where it applies', status: 'In progress', progress: 0 },
  { name: 'EU AI Act', standard: 'Where it applies', status: 'Planned', progress: 0 }
];

const controls = [
  {
    icon: ShieldCheck,
    title: 'Access governance',
    description: 'Role-based access, MFA enforcement, and least-privilege defaults across every governance surface.'
  },
  {
    icon: ClipboardCheck,
    title: 'Control mapping',
    description: 'Each framework control is mapped to live telemetry, so evidence is generated continuously — not harvested before audits.'
  },
  {
    icon: FileCheck2,
    title: 'Evidence collection',
    description: 'Screenshots, config exports, and gateway logs are collected and linked to controls automatically.'
  },
  {
    icon: BadgeCheck,
    title: 'Gap remediation',
    description: 'Tracking for open gaps with owners, due dates, and escalation paths built into the platform.'
  }
];

const badgeLabels = ['Nigeria Data Protection Act', 'Ghana Data Protection Act', 'Côte d\u2019Ivoire Law 2013-450', 'Senegal Law 2008-12', 'Kenya Data Protection Act', 'ECOWAS Supplementary Act', 'AU Malabo Convention', 'GDPR', 'EU AI Act', 'SOC 2 Type II', 'ISO 27001'];

export default function CompliancePage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Compliance"
        title="Turn compliance from a quarterly scramble into a continuous process."
        description="Sentinel maps governance controls to live AI telemetry, so evidence for Nigeria\u2019s Data Protection Act, Ghana\u2019s Data Protection Act, Kenya\u2019s Data Protection Act, SOC 2, and ISO 27001 is ready when you are."
        primary={{ label: 'Request a demo', href: '/request-demo' }}
        secondary={{ label: 'See the trust center', href: '/trust' }}
      >
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[var(--surface-strong)] p-4 shadow-panel backdrop-blur-xl sm:rounded-[2rem] sm:p-5">
          <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),_transparent_45%)]" />
          <div className="relative space-y-3">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Control readiness</p>
            <div className="space-y-2.5">
              {[
                { name: 'Nigeria DPA controls linked', state: '0', tone: 'bg-slate-400' },
                { name: 'NDPA controls linked', state: '0', tone: 'bg-slate-400' },
                { name: 'SOC 2 controls linked', state: '0', tone: 'bg-slate-400' },
                { name: 'ISO 27001 controls linked', state: '0', tone: 'bg-slate-400' }
              ].map((control) => (
                <div key={control.name} className="flex items-center justify-between rounded-2xl bg-slate-950/90 px-3.5 py-2.5 text-xs text-slate-200 sm:text-sm">
                  <span>{control.name}</span>
                  <span className={`inline-flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-slate-300`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${control.tone}`} />
                    {control.state}
                  </span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="rounded-2xl border border-white/10 bg-slate-950/85 p-3.5">
                <p className="text-sm font-semibold text-white">0 certified</p>
                <p className="mt-1 text-[0.6rem] uppercase tracking-[0.25em] text-slate-500">Frameworks — roadmap active</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/85 p-3.5">
                <p className="text-sm font-semibold text-white">0 items</p>
                <p className="mt-1 text-[0.6rem] uppercase tracking-[0.25em] text-slate-500">Evidence linked to live telemetry</p>
              </div>
            </div>
          </div>
        </div>
      </MarketingHero>

      <section className="space-y-8">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Framework coverage</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Governance mapped to the standards that matter in Africa</h2>
        </div>
        <StatsBand stats={stats} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {frameworks.map((framework) => (
            <div
              key={framework.name}
              className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white sm:text-base">{framework.name}</h3>
                <span className="rounded-full border border-sentinel-500/30 bg-sentinel-500/10 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-sentinel-300">
                  {framework.status}
                </span>
              </div>
              <p className="mt-1.5 text-xs text-slate-500">{framework.standard}</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sentinel-500 to-cyan-400"
                    style={{ width: `${framework.progress}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-white">{framework.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">How it works</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Controls with continuous evidence</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {controls.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-6"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sentinel-500/10 text-sentinel-300">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-white sm:text-base">{title}</h3>
              <p className="mt-2 text-xs leading-6 text-slate-400 sm:text-sm">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-8">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Frameworks & regulations</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Compliance that speaks your regulators&apos; language</h2>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {badgeLabels.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/90 px-4 py-2 text-xs font-semibold text-slate-200"
            >
              <BadgeCheck className="h-4 w-4 text-sentinel-300" />
              {badge}
            </span>
          ))}
        </div>
      </section>

      <CtaSection
        eyebrow="Audit-ready by design"
        title="See your compliance posture change in minutes, not quarters."
        description="Bring policy, evidence, and audit reporting into one continuous loop."
        primary={{ label: 'Request a demo', href: '/request-demo' }}
        secondary={{ label: 'Request a demo', href: '/request-demo' }}
      />
    </div>
  );
}
