import { ClipboardCheck, FileText, Lock, ShieldCheck } from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';
import CtaSection from '@/components/marketing/cta-section';
import Link from 'next/link';

const sections = [
  {
    icon: ClipboardCheck,
    title: 'Service agreement overview',
    description: 'Sentinel provides governance services under enterprise terms designed for security, compliance, and data protection. Specific contractual terms will be defined in the final agreement.'
  },
  {
    icon: Lock,
    title: 'Usage and access',
    description: 'Access is controlled through authenticated API keys, user roles, and policy-based governance. Use is subject to your organization’s service authorization and usage limits.'
  },
  {
    icon: ShieldCheck,
    title: 'Data handling',
    description: 'Data processed through Sentinel is treated according to privacy and security commitments. Sensitive content, logs, and audit records are protected by the platform’s access controls.'
  },
  {
    icon: FileText,
    title: 'Liability and support',
    description: 'Support, uptime commitments, and liability terms are negotiated as part of enterprise agreements and are aligned with governance requirements.'
  }
];

export default function TermsPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Terms"
        title="Terms of service and enterprise governance commitments."
        description="These terms provide a foundation for how Sentinel supports your organization with secure, compliant AI governance. Final terms are prepared as part of the formal purchase agreement."
        primary={{ label: 'Read the terms of service', href: '/legal/terms' }}
        secondary={{ label: 'Contact sales', href: '/contact' }}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.title}
              className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl transition hover:border-sentinel-500/30 sm:rounded-[1.5rem] sm:p-7"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-sentinel-500/30 bg-sentinel-500/10 text-sentinel-300">
                <Icon className="h-4.5 w-4.5" size={18} />
              </span>
              <h2 className="mt-4 text-base font-semibold text-white sm:text-lg">{section.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-400">{section.description}</p>
            </div>
          );
        })}
      </div>

      <section className="rounded-[1.25rem] border border-white/10 bg-[var(--surface-strong)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Legal readiness</p>
            <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Strong controls, secure deployment, audit-aligned governance.</h2>
            <p className="mt-2 max-w-2xl text-xs leading-6 text-slate-400 sm:text-sm">
              Final legal language will reflect service levels, confidentiality, and compliance commitments.
            </p>
          </div>
          <Link
            href="/legal/terms"
            className="inline-flex w-full items-center justify-center rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 sm:w-auto sm:text-sm"
          >
            Read the full terms
          </Link>
        </div>
      </section>

      <CtaSection
        eyebrow="Negotiating terms?"
        title="Enterprise agreements include tailored SLA, DPA, and liability terms."
        description="Our legal team works with your procurement to finalize everything before day one."
        primary={{ label: 'Talk to sales', href: '/contact' }}
        secondary={{ label: 'Read privacy policy', href: '/legal/privacy' }}
      />
    </div>
  );
}