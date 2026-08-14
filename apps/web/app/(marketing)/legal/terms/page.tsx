import LegalDoc, { LEGAL_NAV } from '@/components/marketing/legal-doc';
import CtaSection from '@/components/marketing/cta-section';

const sections = [
  {
    heading: 'The service',
    paragraphs: [
      'Sentinel provides an AI data governance and control plane, including the AI gateway, policy engine, classification pipeline, approvals, incidents, audit, and reporting modules, delivered as a cloud service (the Service).',
      'Use of the Service is governed by the order form or enterprise agreement between your organization and Sentinel Technologies, Inc. These terms, the privacy policy, and the security policy form part of that agreement.'
    ]
  },
  {
    heading: 'Accounts and access',
    paragraphs: [
      'You are responsible for the activity that occurs under your workspace credentials and for keeping API keys confidential. Sentinel enforces MFA and role-based access and may suspend access that violates the agreement.',
      'Workspaces may be used only for lawful purposes. You may not reverse engineer the Service, bypass rate limits or controls, or resell the Service without written authorization.',
      'Service accounts and API keys are issued to named administrators; shared credentials are prohibited.'
    ]
  },
  {
    heading: 'Data and governance responsibilities',
    paragraphs: [
      'You retain ownership of your data, including gateway telemetry, policy configurations, and audit records. Sentinel processes this data solely to deliver the Service and as described in the DPA.',
      'You are responsible for configuring policies, classifications, and retention settings that meet your regulatory obligations.',
      'Sentinel may use aggregate, de-identified platform metrics to improve the Service, provided no customer data or governance content is revealed.'
    ]
  },
  {
    heading: 'Acceptable use',
    paragraphs: [
      'You may not use the Service to process data in violation of applicable law, to infringe third-party rights, or to build competing services from platform output.',
      'Automated extraction of dashboards, reports, or audit data beyond reasonable operational needs requires written approval.',
      'We reserve the right to block traffic that presents an imminent security risk while notifying you immediately.'
    ]
  },
  {
    heading: 'Availability and support',
    paragraphs: [
      'Sentinel is in early access. Standard plans receive best-effort availability and email support; availability commitments, if any, are defined per agreement rather than assumed.',
      'Planned maintenance is announced at least 24 hours in advance and scheduled for low-traffic windows where possible.',
      'Support severity levels and response times are defined in your agreement; the status page publishes operational state.'
    ]
  },
  {
    heading: 'Liability and termination',
    paragraphs: [
      'The Service is provided as described in your agreement, without warranties beyond those stated. Each party is liable for its direct damages and confidential-information breaches, with liability limits as set out in the enterprise agreement.',
      'Either party may terminate for material breach with 30 days written notice, or immediately for breaches of data protection obligations or unauthorized access attempts.',
      'Upon termination, you may export your data for 30 days before deletion, unless longer retention is required by law.'
    ]
  },
  {
    heading: 'General',
    paragraphs: [
      'These terms are governed by the laws of the Republic of Liberia, without regard to conflict-of-law principles, except where your agreement specifies otherwise.',
      'We will notify you of material changes to these terms at least 30 days in advance; continued use after the effective date constitutes acceptance.',
      'Questions about these terms may be directed to legal@sentinel.ai.'
    ]
  }
];

export default function TermsPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <LegalDoc
        eyebrow="Legal"
        title="Terms of service"
        updated="July 1, 2026"
        intro="These terms govern access to and use of the Sentinel platform. They cover the service we provide, your responsibilities as a customer, and the commitments that keep AI governance trustworthy."
        sections={sections}
        nav={LEGAL_NAV}
        activeNav="Terms of service"
      />
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
