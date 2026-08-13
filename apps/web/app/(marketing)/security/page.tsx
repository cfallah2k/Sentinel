import { BadgeCheck, FileKey2, Fingerprint, Lock, ScanEye, ShieldCheck, ShieldHalf, UserCheck, Wifi } from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';
import StatsBand from '@/components/marketing/stats-band';
import CtaSection from '@/components/marketing/cta-section';
import Link from 'next/link';

const stats = [
  { value: 'AES-256', label: 'Encryption at rest' },
  { value: 'TLS 1.3', label: 'Encryption in transit' },
  { value: '99.99%', label: 'Gateway uptime' },
  { value: '24/7', label: 'Security monitoring' }
];

const pillars = [
  {
    icon: Lock,
    title: 'Encryption everywhere',
    description:
      'All data is encrypted in transit with TLS 1.3 and at rest with AES-256. Provider keys are stored with envelope encryption and hardware-backed key management.',
    points: ['Envelope encryption for API keys', 'Customer-managed keys on Enterprise', 'Encrypted audit evidence exports']
  },
  {
    icon: ShieldCheck,
    title: 'Zero-trust access',
    description:
      'Every governance surface enforces least-privilege access with role-based permissions, MFA, and short-lived sessions. Administrative actions require verified MFA.',
    points: ['MFA enforced by default', 'Granular RBAC across modules', 'Session and IP policies']
  },
  {
    icon: ScanEye,
    title: 'Continuous monitoring',
    description:
      'Gateway traffic, classification pipelines, and admin actions are monitored 24/7 with anomaly detection and automated escalation to your security team.',
    points: ['Real-time decision telemetry', 'Anomaly detection on traffic', 'SIEM event streaming']
  },
  {
    icon: ShieldHalf,
    title: 'Secure by design',
    description:
      'Sentinel follows an SDLC with code reviews, dependency scanning, and independent penetration testing. Security architecture is documented for customer review.',
    points: ['Annual penetration tests', 'Dependency and CVE scanning', 'Immutable audit logs']
  }
];

const certifications = [
  { name: 'SOC 2 Type II', detail: 'AICPA, audited annually', href: '/trust' },
  { name: 'ISO/IEC 27001', detail: 'Certified ISMS', href: '/trust' },
  { name: 'GDPR', detail: 'EU data protection alignment', href: '/trust' },
  { name: 'EU AI Act', detail: 'Obligation mapping', href: '/trust' },
  { name: 'NIST AI RMF', detail: 'Framework mapping', href: '/trust' },
  { name: 'HIPAA', detail: 'Covered entity controls', href: '/trust' }
];

const badgeItems = [
  { icon: FileKey2, label: 'Vulnerability disclosure', href: '/legal/security' },
  { icon: UserCheck, label: 'Access review process', href: '/trust' },
  { icon: Fingerprint, label: 'Data residency options', href: '/trust' },
  { icon: Wifi, label: 'Network security', href: '/trust' }
];

export default function SecurityPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Security"
        title="A control plane that practices what it enforces."
        description="Sentinel is built on zero-trust principles, encrypted by default, and verified by independent audits. Our security posture is your compliance evidence."
        primary={{ label: 'Visit trust center', href: '/trust' }}
        secondary={{ label: 'Report a vulnerability', href: '/legal/security' }}
      >
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[rgba(15,23,42,0.95)] p-4 shadow-panel backdrop-blur-xl sm:rounded-[2rem] sm:p-5">
          <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),_transparent_45%)]" />
          <div className="relative space-y-3">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Posture snapshot</p>
            {[
              { label: 'Encryption at rest', value: 'AES-256', tone: 'bg-emerald-400' },
              { label: 'Encryption in transit', value: 'TLS 1.3', tone: 'bg-emerald-400' },
              { label: 'MFA enforcement', value: 'Required', tone: 'bg-emerald-400' },
              { label: 'Pen test cadence', value: 'Annual', tone: 'bg-emerald-400' }
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-2xl bg-slate-950/90 px-3.5 py-2.5 text-xs text-slate-200 sm:text-sm">
                <span>{item.label}</span>
                <span className="inline-flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-emerald-300">
                  <span className={`h-1.5 w-1.5 rounded-full ${item.tone}`} />
                  {item.value}
                </span>
              </div>
            ))}
            <div className="rounded-2xl border border-white/10 bg-slate-950/85 p-3.5">
              <p className="text-sm font-semibold text-white">SOC 2 Type II report</p>
              <p className="mt-1 text-[0.6rem] uppercase tracking-[0.25em] text-slate-500">Available on request</p>
            </div>
          </div>
        </div>
      </MarketingHero>

      <section className="space-y-8">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Security posture</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Four pillars of the Sentinel trust model</h2>
        </div>
        <StatsBand stats={stats} />
        <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
          {pillars.map(({ icon: Icon, title, description, points }) => (
            <div
              key={title}
              className="rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-7"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sentinel-500/10 text-sentinel-300">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white sm:text-lg">{title}</h3>
              <p className="mt-2.5 text-xs leading-6 text-slate-400 sm:text-sm">{description}</p>
              <ul className="mt-5 space-y-2.5">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-xs text-slate-300 sm:text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sentinel-400" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-8">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Certifications & frameworks</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Verified, not just claimed</h2>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <Link
              key={cert.name}
              href={cert.href}
              className="group flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-slate-950/90 p-4 transition hover:border-sentinel-500/25"
            >
              <BadgeCheck className="h-5 w-5 shrink-0 text-sentinel-300" />
              <div>
                <p className="text-sm font-semibold text-white transition group-hover:text-sentinel-200">{cert.name}</p>
                <p className="text-xs text-slate-500">{cert.detail}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {badgeItems.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-3 rounded-[1.25rem] bg-slate-950/90 p-4 text-xs font-semibold text-slate-300 transition hover:bg-slate-900/95 sm:text-sm"
            >
              <Icon className="h-4 w-4 shrink-0 text-sentinel-300" />
              {label}
            </Link>
          ))}
        </div>
      </section>

      <CtaSection
        eyebrow="Security reviews"
        title="Send us your security questionnaire."
        description="Enterprise customers get access to our SOC 2 report, ISO certificate, DPA, and dedicated security review support."
        primary={{ label: 'Request access', href: '/contact' }}
        secondary={{ label: 'Read legal security', href: '/legal/security' }}
      />
    </div>
  );
}