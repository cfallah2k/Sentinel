import LegalDoc from '@/components/marketing/legal-doc';
import CtaSection from '@/components/marketing/cta-section';

const sections = [
  {
    heading: 'Information we collect',
    paragraphs: [
      'Account information: name, work email, company, and role identifiers you provide when creating a workspace or requesting a demo.',
      'Service data: gateway evaluations, policy decisions, classification results, audit events, and usage telemetry processed on behalf of your organization in order to deliver the platform.',
      'Technical information: IP address, browser and device characteristics, and interaction data, collected to secure the platform and diagnose issues.',
      'We do not collect, sell, or derive value from the contents of the AI prompts or model responses that pass through your gateway.'
    ]
  },
  {
    heading: 'How we use information',
    paragraphs: [
      'To operate the platform: enforce policies, classify data, maintain the audit trail, and provide dashboards and reports.',
      'To secure the service: detect abuse, investigate incidents, and protect the integrity of governance data.',
      'To improve the service: analyze aggregated usage patterns and error rates without identifying individual data subjects.',
      'To communicate: respond to support requests, send service notices, and — with consent — share product updates.'
    ]
  },
  {
    heading: 'Legal bases for processing',
    paragraphs: [
      'Where the GDPR applies, we rely on the following bases: performance of the service contract, legitimate interests in security and improvement, and consent where we request it.',
      'For customer workspaces, we act as a processor of service data and a controller of account data. Our DPA defines the respective roles for enterprise agreements.',
      'We honor data subject requests made directly to us, and we provide tools to export and delete governance data within your workspace.'
    ]
  },
  {
    heading: 'Data sharing and retention',
    paragraphs: [
      'We share data only with subprocessors required to deliver the service — hosting, monitoring, and support — under written data processing terms.',
      'Audit events are retained according to your workspace configuration, with a default of 90 days on Growth plans and custom windows on Enterprise.',
      'Account information is retained while your account is active and for 30 days after deletion, unless a longer retention is required by law.'
    ]
  },
  {
    heading: 'Security and residency',
    paragraphs: [
      'All data is encrypted in transit with TLS 1.3 and at rest with AES-256. Access is governed by role-based controls and enforced MFA.',
      'Workspaces are hosted in the region selected at signup: US-East, EU-Central, or APAC-Southeast.',
      'Enterprise customers may configure dedicated key management and extended retention to meet local regulatory requirements.'
    ]
  },
  {
    heading: 'Your rights and contact',
    paragraphs: [
      'Depending on your jurisdiction, you may have rights to access, correct, export, restrict, or delete personal information. Contact privacy@sentinel.ai to exercise them.',
      'If you believe processing is unlawful, you may lodge a complaint with your local supervisory authority.',
      'We will notify affected customers of any breach affecting service data within 72 hours of confirmation, per our incident response commitments.'
    ]
  }
];

export default function PrivacyPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <LegalDoc
        eyebrow="Legal"
        title="Privacy policy"
        updated="July 1, 2026"
        intro="Sentinel processes two kinds of data: the account information you give us, and the governance data your organization generates using the platform. This policy explains both — and the boundaries between them."
        sections={sections}
      />
      <CtaSection
        eyebrow="Questions?"
        title="Our privacy team is happy to help."
        description="Reach out any time — we respond within one business day."
        primary={{ label: 'Contact privacy team', href: '/contact' }}
        secondary={{ label: 'Read cookie policy', href: '/legal/cookies' }}
      />
    </div>
  );
}
