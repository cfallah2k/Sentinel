'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';
import Faq from '@/components/marketing/faq';
import CtaSection from '@/components/marketing/cta-section';

const plans = [
  {
    name: 'Starter',
    tagline: 'For teams starting their AI governance journey',
    monthly: 99,
    annual: 79,
    cta: { label: 'Request a demo', href: '/request-demo' },
    features: [
      '3 AI providers',
      '10 active policies',
      '30-day audit retention',
      '250k requests / month',
      'Community support'
    ]
  },
  {
    name: 'Growth',
    tagline: 'For scaling AI deployments',
    monthly: 249,
    annual: 199,
    cta: { label: 'Request a demo', href: '/request-demo' },
    highlighted: true,
    features: [
      'Unlimited providers',
      'Unlimited policies',
      '90-day audit retention',
      '5M requests / month',
      'Redaction engine',
      'SSO + SCIM',
      'Email support'
    ]
  },
  {
    name: 'Enterprise',
    tagline: 'For regulated, global operations',
    monthly: 1499,
    annual: 1199,
    cta: { label: 'Talk to sales', href: '/contact' },
    features: [
      'Everything in Growth',
      'Custom retention & residency',
      'Nigeria, Ghana & framework mapping',
      'Dedicated support manager',
      'Availability SLA in contract',
      'Security review & DPA'
    ]
  }
];

const faqItems = [
  {
    question: 'How do I get started?',
    answer:
      'Request a demo and our team will walk you through the gateway, policy engine, classification, and audit trail against your own use cases — with a security review for enterprise teams. No credit card or setup required to get started.'
  },
  {
    question: 'What counts as a request?',
    answer:
      'A request is a single inference call routed through the Sentinel gateway, including streaming sessions and embedding calls. Blocked and redacted requests count the same, since every one is evaluated against policy.'
  },
  {
    question: 'Can I change plans at any time?',
    answer:
      'Yes. Upgrades apply immediately with prorated billing. Downgrades take effect at the end of your billing cycle, and your data and policies are retained throughout.'
  },
  {
    question: 'Do you offer discounts for annual billing?',
    answer:
      'Annual billing includes a 20% discount on the Growth and Enterprise tiers. Enterprise contracts can also include volume-based pricing for request tiers above 10 million per month.'
  },
  {
    question: 'What about data residency and retention?',
    answer:
      'Workspaces are hosted in the region you choose at signup — including our Africa region (Nigeria). Audit retention is configurable on Growth and Enterprise, and Enterprise supports custom retention windows to meet regulatory requirements.'
  },
  {
    question: 'Is a security review available?',
    answer:
      'Enterprise customers receive access to our trust center, compliance roadmap, DPA, and a dedicated security review process with their procurement team.'
  }
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Pricing"
        title="Governance that pays for itself with the first blocked leak."
        description="Request a demo, then scale with volume. Every plan includes the gateway, policy engine, classification, and audit trail."
        primary={{ label: 'Request a demo', href: '/request-demo' }}
        secondary={{ label: 'Talk to sales', href: '/contact' }}
      />

      <section className="space-y-8">
        <div className="flex items-center justify-center gap-3">
          <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${annual ? 'text-slate-500' : 'text-white'}`}>
            Monthly
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={annual}
            aria-label="Toggle annual billing"
            onClick={() => setAnnual((value) => !value)}
            className={`relative h-7 w-14 rounded-full border transition ${annual ? 'border-sentinel-500/50 bg-sentinel-500/30' : 'border-white/10 bg-white/10'}`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-sentinel-400 shadow-glow transition-all duration-200 ${annual ? 'left-7' : 'left-1'}`}
            />
          </button>
          <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${annual ? 'text-white' : 'text-slate-500'}`}>
            Annual
          </span>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Save 20%
          </span>
        </div>

        <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
          {plans.map((plan) => {
            const price = annual ? plan.annual : plan.monthly;
            return (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-[1.25rem] border p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-7 ${
                  plan.highlighted
                    ? 'border-sentinel-500/40 bg-[var(--surface-strong)] shadow-[0_35px_120px_rgba(30,111,255,0.12)]'
                    : 'border-white/10 bg-[var(--surface)]'
                }`}
              >
                {plan.highlighted ? (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-sentinel-500 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white shadow-glow">
                    <Sparkles className="h-3 w-3" /> Most popular
                  </span>
                ) : null}
                <h2 className="text-base font-semibold text-white sm:text-lg">{plan.name}</h2>
                <p className="mt-1 text-xs text-slate-400">{plan.tagline}</p>
                <div className="mt-5 flex items-end gap-2">
                  <p className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    ${price}
                  </p>
                  <p className="pb-1.5 text-xs text-slate-500">/ month{annual && plan.monthly > 0 ? ', billed annually' : ''}</p>
                </div>
                <Link
                  href={plan.cta.href}
                  className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold transition sm:text-sm ${
                    plan.highlighted
                      ? 'bg-sentinel-500 text-white shadow-glow hover:bg-sentinel-400'
                      : 'border border-white/10 bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  {plan.cta.label} <ArrowRight className="h-4 w-4" />
                </Link>
                <ul className="mt-6 space-y-2.5 border-t border-white/5 pt-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-xs text-slate-300 sm:text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-sentinel-300" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <p className="text-center text-xs leading-6 text-slate-500">
          Volume pricing available above 10M requests per month. All plans include unlimited users and policy evaluations.
        </p>
      </section>

      <Faq eyebrow="Pricing FAQ" title="Answers to the questions we hear most" items={faqItems} />

      <CtaSection
        eyebrow="Compare with confidence"
        title="Get a custom quote for your AI estate."
        description="Tell us about your providers, request volume, and compliance obligations — we will size the right tier."
        primary={{ label: 'Talk to sales', href: '/contact' }}
        secondary={{ label: 'Request a demo', href: '/request-demo' }}
      />
    </div>
  );
}
