import LegalDoc from '@/components/marketing/legal-doc';
import CtaSection from '@/components/marketing/cta-section';

const sections = [
  {
    heading: 'Scope of the cookie policy',
    paragraphs: [
      'This policy explains how Sentinel Technologies, Inc. and its affiliates use cookies and similar technologies when you visit sentinel.ai, access the platform, or interact with our marketing materials.',
      'References to Sentinel in this policy include the websites and platform we operate unless we say otherwise.'
    ]
  },
  {
    heading: 'What cookies we use',
    paragraphs: [
      'Strictly necessary cookies are required for the platform to function: session authentication, security tokens, and load-balancing state. These cannot be disabled.',
      'Functional cookies remember your preferences, such as theme selection and language, and are retained for up to 13 months.',
      'Analytics cookies help us understand aggregate usage — pages visited, feature adoption, and error rates. We use first-party analytics that do not require third-party ad networks.',
      'We do not use advertising or third-party tracking cookies on the platform.'
    ]
  },
  {
    heading: 'How we process cookie data',
    paragraphs: [
      'Data collected through cookies is processed to operate, secure, and improve the service, and to respond to support requests.',
      'Where we use analytics cookies, data is aggregated and retained for no longer than 26 months before deletion or anonymization.',
      'We never sell cookie-derived data, and we never combine marketing analytics with gateway policy data or audit records.'
    ]
  },
  {
    heading: 'Managing your preferences',
    paragraphs: [
      'You can withdraw consent for non-essential cookies at any time through your browser settings or the preference banner shown on our sites.',
      'Disabling cookies may affect features that rely on session state, such as single sign-on sessions and dashboard preferences.',
      'Enterprise customers can configure platform cookie behavior and session lifetimes through workspace settings.'
    ]
  },
  {
    heading: 'Contact',
    paragraphs: [
      'Questions about this policy can be directed to our privacy team at privacy@sentinel.ai, or by mail to Sentinel Technologies, Inc., 535 Mission Street, Suite 1200, San Francisco, CA 94105, USA.',
      'You may also contact our data protection representative for the EEA at dpo@sentinel.ai.'
    ]
  }
];

export default function CookiesPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <LegalDoc
        eyebrow="Legal"
        title="Cookie policy"
        updated="July 1, 2026"
        intro="Sentinel uses a small, transparent set of cookies to operate the platform, remember your preferences, and understand aggregate usage. This policy explains what we store, why, and how you control it."
        sections={sections}
      />
      <CtaSection
        eyebrow="Questions?"
        title="Our privacy team is happy to help."
        description="Reach out any time — we respond within one business day."
        primary={{ label: 'Contact privacy team', href: '/contact' }}
        secondary={{ label: 'Read privacy policy', href: '/legal/privacy' }}
      />
    </div>
  );
}
