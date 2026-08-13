import { BadgeCheck, FileKey2, FileText, Fingerprint, Globe2, Lock, ShieldCheck, UserCheck, Wifi } from 'lucide-react';
import Link from 'next/link';
import MarketingHero from '@/components/marketing/hero';
import CtaSection from '@/components/marketing/cta-section';

const trustPillars = [
  {
    icon: Lock,
    title: 'Security',
    description: 'Encryption by default, zero-trust access, and continuous monitoring across every Sentinel surface.',
    links: [
      { label: 'Security overview', href: '/security' },
      { label: 'Encryption standards', href: '/security' },
      { label: 'Legal security terms', href: '/legal/security' }
    ]
  },
  {
    icon: BadgeCheck,
    title: 'Compliance',
    description: 'Independent audits and framework mapping turn governance into verifiable, exportable evidence.',
    links: [
      { label: 'Compliance overview', href: '/compliance' },
      { label: 'Framework coverage', href: '/compliance' },
      { label: 'Request audit reports', href: '/contact' }
    ]
  },
  {
    icon: UserCheck,
    title: 'Privacy',
    description: 'Data minimization, regional residency options, and transparent processing commitments.',
    links: [
      { label: 'Privacy policy', href: '/legal/privacy' },
      { label: 'Data processing terms', href: '/legal/terms' },
      { label: 'Cookie policy', href: '/legal/cookies' }
    ]
  },
  {
    icon: Fingerprint,
    title: 'Reliability',
    description: 'A control plane designed for 99.99% availability with transparent incident reporting.',
    links: [
      { label: 'System status', href: '/status' },
      { label: 'Uptime history', href: '/status' },
      { label: 'Service agreement', href: '/legal/terms' }
    ]
  }
];

const certifications = [
  { name: 'SOC 2 Type II', detail: 'AICPA — audited annually', icon: ShieldCheck },
  { name: 'ISO/IEC 27001', detail: 'Certified information security management', icon: Globe2 },
  { name: 'GDPR', detail: 'EU data protection alignment', icon: FileText },
  { name: 'EU AI Act', detail: 'Tier 2 obligation mapping', icon: FileKey2 },
  { name: 'NIST AI RMF', detail: 'Govern, map, measure, manage', icon: Wifi }
];

const documentList = [
  { name: 'SOC 2 Type II report', detail: 'Latest audit period', icon: FileText },
  { name: 'ISO 27001 certificate', detail: 'Valid through 2027', icon: FileKey2 },
  { name: 'Data processing addendum (DPA)', detail: 'Signed, latest revision', icon: Fingerprint },
  { name: 'Security whitepaper', detail: 'Architecture and controls', icon: Lock },
  { name: 'Subprocessor list', detail: 'Current list, July 2026', icon: Globe2 },
  { name: 'Vulnerability disclosure policy', detail: 'Responsible disclosure program', icon: ShieldCheck }
];

export default function TrustPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Trust center"
        title="Security, compliance, and privacy — documented and verifiable."
        description="Everything your risk and procurement teams need to evaluate Sentinel: certifications, audit reports, policies, and live platform status in one place."
        primary={{ label: 'Request audit reports', href: '/contact' }}
        secondary={{ label: 'View system status', href: '/status' }}
      >
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[var(--surface-strong)] p-4 shadow-panel backdrop-blur-xl sm:rounded-[2rem] sm:p-5">
          <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),_transparent_45%)]" />
          <div className="relative space-y-3">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Trust snapshot</p>
            {[
              { label: 'SOC 2 Type II', value: 'Certified', tone: 'bg-emerald-400' },
              { label: 'ISO 27001', value: 'Certified', tone: 'bg-emerald-400' },
              { label: 'GDPR', value: 'Aligned', tone: 'bg-emerald-400' },
              { label: 'EU AI Act', value: 'Mapped', tone: 'bg-emerald-400' },
              { label: 'Gateway uptime', value: '99.99%', tone: 'bg-emerald-400' }
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-2xl bg-slate-950/90 px-3.5 py-2.5 text-xs text-slate-200 sm:text-sm">
                <span>{item.label}</span>
                <span className="inline-flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-emerald-300">
                  <span className={`h-1.5 w-1.5 rounded-full ${item.tone}`} />
                  {item.value}
                </span>
              </div>
            ))}
            <div className="rounded-2xl border border-white/10 bg-slate-950/85 p-3.5 text-xs text-slate-300">
              <p className="text-sm font-semibold text-white">Audit evidence on demand</p>
              <p className="mt-1 text-slate-500">Shared under NDA with enterprise customers</p>
            </div>
          </div>
        </div>
      </MarketingHero>

      <section className="grid gap-4 md:grid-cols-2 lg:gap-6">
        {trustPillars.map(({ icon: Icon, title, description, links }) => (
          <div
            key={title}
            className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-7"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sentinel-500/10 text-sentinel-300">
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-base font-semibold text-white sm:text-lg">{title}</h2>
            <p className="mt-2 text-xs leading-6 text-slate-400 sm:text-sm">{description}</p>
            <ul className="mt-5 space-y-2.5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs font-semibold text-sentinel-300 transition hover:text-sentinel-200 sm:text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-8">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Certifications</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Independently verified</h2>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {certifications.map(({ name, detail, icon: Icon }) => (
            <div key={name} className="flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/90 px-5 py-3">
              <Icon className="h-4 w-4 text-sentinel-300" />
              <div>
                <p className="text-xs font-semibold text-white">{name}</p>
                <p className="text-[0.6rem] text-slate-500">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Documentation</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Reports and policies on request</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {documentList.map(({ name, detail, icon: Icon }) => (
            <div
              key={name}
              className="flex items-start gap-4 rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl transition duration-300 hover:border-sentinel-500/25 sm:rounded-[1.5rem] sm:p-6"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sentinel-500/10 text-sentinel-300">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white sm:text-base">{name}</h3>
                <p className="mt-1 text-xs text-slate-500">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaSection
        eyebrow="For your risk team"
        title="Request the full trust pack."
        description="SOC 2 report, ISO certificate, DPA, and security whitepaper — shared under NDA within one business day."
        primary={{ label: 'Request documents', href: '/contact' }}
        secondary={{ label: 'Start free trial', href: '/register' }}
      />
    </div>
  );
}