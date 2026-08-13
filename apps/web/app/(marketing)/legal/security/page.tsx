import LegalDoc from '@/components/marketing/legal-doc';
import CtaSection from '@/components/marketing/cta-section';

const sections = [
  {
    heading: 'Reporting a vulnerability',
    paragraphs: [
      'We maintain a coordinated disclosure program for security researchers. Please report suspected vulnerabilities to security@sentinel.ai with a technical description, reproduction steps, and affected versions.',
      'Include your preferred contact method. We acknowledge receipt within 24 hours and provide an initial assessment within 5 business days.',
      'We ask that researchers avoid destructive testing, data exfiltration, or disruption of customer-facing services. Good-faith research under this policy is exempt from enforcement under our Terms of Service.'
    ]
  },
  {
    heading: 'What we ask of researchers',
    paragraphs: [
      'Report privately before public disclosure, and give us a reasonable window — typically 60 days — to remediate before publishing.',
      'Do not access data belonging to other customers, and do not store or redistribute any data encountered during testing.',
      'Stop testing once you observe a confirmed vulnerability and allow us to verify and fix it before further exploration.'
    ]
  },
  {
    heading: 'Our security commitments',
    paragraphs: [
      'Encryption: all data is encrypted in transit with TLS 1.3 and at rest with AES-256, with envelope-encrypted secrets for provider credentials.',
      'Access: role-based access control, MFA by default, short-lived sessions, and quarterly access reviews across all production systems.',
      'Monitoring: 24/7 security monitoring with anomaly detection, SIEM forwarding, and automated escalation for critical events.',
      'Lifecycle: secure SDLC with code review, dependency scanning, staged deployments, and immutable audit logging of production changes.'
    ]
  },
  {
    heading: 'Audits and verification',
    paragraphs: [
      'Sentinel undergoes annual SOC 2 Type II audits and maintains ISO/IEC 27001 certification, both available to customers under NDA.',
      'Independent penetration tests are performed at least annually against the platform, with findings tracked to remediation.',
      'Customers may request a security review or security questionnaire; enterprise agreements include a dedicated review workflow with our security team.'
    ]
  },
  {
    heading: 'Incident response',
    paragraphs: [
      'Confirmed security incidents affecting customer data are escalated within one hour and notified within 72 hours of confirmation.',
      'Our incident response plan covers detection, containment, eradication, recovery, and post-incident review with root-cause analysis.',
      'Incident summaries are shared with affected customers and, on request, included in compliance evidence for audits.'
    ]
  },
  {
    heading: 'Contact',
    paragraphs: [
      'Security questions and disclosure submissions: security@sentinel.ai.',
      'For urgent issues, our security on-call is reachable through the workspace incident reporting flow at all times.',
      'Legal contact for security terms: Sentinel Technologies, Inc., 535 Mission Street, Suite 1200, San Francisco, CA 94105, USA.'
    ]
  }
];

export default function SecurityPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <LegalDoc
        eyebrow="Legal"
        title="Security policy & disclosure"
        updated="July 1, 2026"
        intro="Security is the product. This policy documents how we handle vulnerability disclosure, what we commit to operationally, and how our posture is verified — so your auditors can rely on it."
        sections={sections}
      />
      <CtaSection
        eyebrow="Want the full picture?"
        title="Review our security architecture in depth."
        description="The security overview covers encryption, access, and monitoring in the context of the platform."
        primary={{ label: 'Security overview', href: '/security' }}
        secondary={{ label: 'Visit trust center', href: '/trust' }}
      />
    </div>
  );
}
