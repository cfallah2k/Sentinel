import { Fingerprint, Scale, ShieldCheck, UserCheck } from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';
import CtaSection from '@/components/marketing/cta-section';
import Link from 'next/link';

const privacyPoints = [
  {
    icon: Fingerprint,
    title: 'Data minimization',
    description: 'Sentinel processes only the data required to enforce policy decisions and generate audit evidence.'
  },
  {
    icon: ShieldCheck,
    title: 'Protection controls',
    description: 'Sensitive information is protected through encryption, role-based access, and governance isolation.'
  },
  {
    icon: Scale,
    title: 'Transparency',
    description: 'Organizations receive visibility into how AI requests, workflows, and data categories are evaluated and retained.'
  },
  {
    icon: UserCheck,
    title: 'Compliance alignment',
    description: 'Privacy practices are designed to support enterprise obligations across security and regulatory frameworks.'
  }
];

export default function PrivacyPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Privacy"
        title="Privacy and data protection for AI governance."
        description="Sentinel is designed to help organizations govern AI without sacrificing data privacy. The platform treats sensitive signals and governance events as security-first telemetry."
        primary={{ label: 'Read the privacy policy', href: '/legal/privacy' }}
        secondary={{ label: 'Cookie policy', href: '/legal/cookies' }}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
        {privacyPoints.map((point) => {
          const Icon = point.icon;
          return (
            <div
              key={point.title}
              className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl transition hover:border-sentinel-500/30 sm:rounded-[1.5rem] sm:p-7"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-sentinel-500/30 bg-sentinel-500/10 text-sentinel-300">
                <Icon className="h-4.5 w-4.5" size={18} />
              </span>
              <h2 className="mt-4 text-base font-semibold text-white sm:text-lg">{point.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-400">{point.description}</p>
            </div>
          );
        })}
      </div>

      <section className="rounded-[1.25rem] border border-white/10 bg-[var(--surface-strong)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Privacy posture</p>
            <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Architected for privacy-aware AI controls.</h2>
            <p className="mt-2 max-w-2xl text-xs leading-6 text-slate-400 sm:text-sm">
              Data minimization, secure handling, and clear governance reporting for regulated workflows — by design, not by add-on.
            </p>
          </div>
          <Link
            href="/legal/privacy"
            className="inline-flex w-full items-center justify-center rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 sm:w-auto sm:text-sm"
          >
            Read the full policy
          </Link>
        </div>
      </section>

      <CtaSection
        eyebrow="Questions?"
        title="Our privacy team is happy to help."
        description="Reach out any time — we respond within one business day."
        primary={{ label: 'Contact privacy team', href: '/contact' }}
        secondary={{ label: 'Visit trust center', href: '/trust' }}
      />
    </div>
  );
}