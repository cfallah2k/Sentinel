import { BadgeCheck, ClipboardCheck, FileCheck2, ShieldCheck } from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';
import StatsBand from '@/components/marketing/stats-band';
import CtaSection from '@/components/marketing/cta-section';

const stats = [
  { value: '6+', label: 'Frameworks mapped' },
  { value: '100%', label: 'Audit event coverage' },
  { value: '24/7', label: 'Continuous monitoring' },
  { value: '90d+', label: 'Evidence retention' }
];

const frameworks = [
  { name: 'SOC 2 Type II', standard: 'AICPA', status: 'Certified', progress: 82 },
  { name: 'ISO/IEC 27001', standard: 'ISO', status: 'Certified', progress: 74 },
  { name: 'NIST AI RMF', standard: 'NIST', status: 'Mapped', progress: 61 },
  { name: 'GDPR', standard: 'EU', status: 'Aligned', progress: 88 },
  { name: 'HIPAA', standard: 'HHS', status: 'Aligned', progress: 69 },
  { name: 'EU AI Act', standard: 'EU', status: 'Mapped', progress: 47 }
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

const badgeLabels = ['SOC 2 Type II', 'ISO 27001', 'GDPR', 'EU AI Act', 'NIST AI RMF', 'HIPAA', 'CCPA', 'DPDP'];

export default function CompliancePage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Compliance"
        title="Turn compliance from a quarterly scramble into a continuous process."
        description="Sentinel maps governance controls to live AI telemetry, so evidence for SOC 2, ISO 27001, GDPR, NIST AI RMF, and the EU AI Act is always audit-ready."
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'See the trust center', href: '/trust' }}
      >
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[var(--surface-strong)] p-4 shadow-panel backdrop-blur-xl sm:rounded-[2rem] sm:p-5">
          <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),_transparent_45%)]" />
          <div className="relative space-y-3">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Control readiness</p>
            <div className="space-y-2.5">
              {[
                { name: 'CC6.1 Logical access', state: 'Passing', tone: 'bg-emerald-400' },
                { name: 'CC7.2 Monitoring', state: 'Passing', tone: 'bg-emerald-400' },
                { name: 'A.9.4.2 Secure log-on', state: 'Passing', tone: 'bg-emerald-400' },
                { name: 'GOVERN 1.1 AI framework', state: 'Gap open', tone: 'bg-amber-400' }
              ].map((control) => (
                <div key={control.name} className="flex items-center justify-between rounded-2xl bg-slate-950/90 px-3.5 py-2.5 text-xs text-slate-200 sm:text-sm">
                  <span>{control.name}</span>
                  <span className={`inline-flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.2em] ${control.state === 'Passing' ? 'text-emerald-300' : 'text-amber-300'}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${control.tone}`} />
                    {control.state}
                  </span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="rounded-2xl border border-white/10 bg-slate-950/85 p-3.5">
                <p className="text-sm font-semibold text-white">68 controls</p>
                <p className="mt-1 text-[0.6rem] uppercase tracking-[0.25em] text-slate-500">SOC 2 Type II</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/85 p-3.5">
                <p className="text-sm font-semibold text-white">214 evidence items</p>
                <p className="mt-1 text-[0.6rem] uppercase tracking-[0.25em] text-slate-500">Linked to telemetry</p>
              </div>
            </div>
          </div>
        </div>
      </MarketingHero>

      <section className="space-y-8">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Framework coverage</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Governance mapped to the standards that matter</h2>
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
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Certifications & regulations</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Compliance that speaks your auditors&apos; language</h2>
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
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'Request a demo', href: '/request-demo' }}
      />
    </div>
  );
}
