import { AlertTriangle, Eye, Gauge, ShieldCheck, Siren, Zap } from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';
import FeatureGrid from '@/components/marketing/feature-grid';
import StatsBand from '@/components/marketing/stats-band';
import CtaSection from '@/components/marketing/cta-section';

const features = [
  {
    icon: Eye,
    title: 'Full request visibility',
    description: 'Security teams see every AI request, decision, and provider interaction — no blind spots in the model call path.'
  },
  {
    icon: Gauge,
    title: 'Zero-trust enforcement',
    description: 'Allow, block, redact, and require-approval decisions run at the gateway, before data leaves your boundary.'
  },
  {
    icon: AlertTriangle,
    title: 'Anomaly detection',
    description: 'Traffic spikes, embedding extraction, and credential patterns surface as incidents with full context.'
  },
  {
    icon: Siren,
    title: 'Incident response, AI-aware',
    description: 'Severity, SLA, escalation, and evidence — the same discipline as your other incidents, tuned for AI.'
  },
  {
    icon: Zap,
    title: 'SIEM-ready telemetry',
    description: 'Stream gateway decisions and audit events into Splunk, Datadog, or your SIEM of choice.'
  },
  {
    icon: ShieldCheck,
    title: 'Threat model coverage',
    description: 'Prompt injection, data exfiltration, shadow AI, and prompt hijacking — mapped to your controls.'
  }
];

const stats = [
  { value: '100%', label: 'Request inspection' },
  { value: '<50ms', label: 'Decision target' },
  { value: '24/7', label: 'Monitoring' },
  { value: '0%', label: 'Auto-detection (live)' }
];

const threats = [
  { label: 'Prompt injection', detail: 'Detected and blocked at the gateway' },
  { label: 'Data exfiltration', detail: 'Redaction stops leaks mid-flight' },
  { label: 'Shadow AI', detail: 'Unregistered systems surfaced instantly' },
  { label: 'Credential abuse', detail: 'Key and token anomalies escalated' }
];

export default function SecuritySolutionPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Solution · Security"
        title="The SOC view of every model call."
        description="Sentinel gives security teams gateway-level enforcement, anomaly detection, and AI-aware incident response — so AI risk lands in your existing operations, not in a binder."
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'View security posture', href: '/security' }}
      >
        <div className="flex flex-col gap-3">
          {threats.map(({ label, detail }) => (
            <div key={label} className="flex items-center justify-between rounded-[1.25rem] border border-white/10 bg-[var(--surface-strong)] px-4 py-3 shadow-panel backdrop-blur-xl">
              <div>
                <p className="text-xs font-semibold text-white sm:text-sm">{label}</p>
                <p className="text-[0.65rem] text-slate-500">{detail}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Monitored
              </span>
            </div>
          ))}
        </div>
      </MarketingHero>

      <section className="space-y-8">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Why security teams choose Sentinel</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">AI risk, treated like the risk it is</h2>
        </div>
        <StatsBand stats={stats} />
        <FeatureGrid items={features} />
      </section>

      <section className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-8">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Operational flow</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">From signal to response in one loop</h2>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { title: 'Detect', detail: 'Gateway decisions and classifiers flag risk in real time' },
            { title: 'Triage', detail: 'Incidents classify by severity with SLA escalation to owners' },
            { title: 'Remediate', detail: 'Block providers, update policies, and export the evidence trail' }
          ].map(({ title, detail }) => (
            <div key={title} className="rounded-[1.25rem] bg-slate-950/90 p-4">
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <p className="mt-2 text-xs leading-6 text-slate-400">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaSection
        eyebrow="Security"
        title="Extend your zero-trust perimeter to every model."
        description="Gateway enforcement, incident response, and SIEM integration — out of the box."
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'See incident response', href: '/product/incidents' }}
      />
    </div>
  );
}
