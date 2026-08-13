import { AlertTriangle, Clock, Radio, ShieldHalf, Siren, Timeline } from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';
import FeatureGrid from '@/components/marketing/feature-grid';
import Steps from '@/components/marketing/steps';
import CtaSection from '@/components/marketing/cta-section';

const features = [
  {
    icon: AlertTriangle,
    title: 'Severity-aware triage',
    description: 'Incidents classify as policy violation, data exposure, AI risk, or anomaly — with severity driving priority.'
  },
  {
    icon: Clock,
    title: 'SLA escalation',
    description: 'Every incident carries an SLA. Overdue items escalate to owners, managers, and on-call automatically.'
  },
  {
    icon: Siren,
    title: 'Context-rich detail',
    description: 'Each incident links to the system, policy, gateway request, and audit events that triggered it.'
  },
  {
    icon: Timeline,
    title: 'Investigation timeline',
    description: 'Notes, evidence, and actions append to an immutable timeline — the full story in one place.'
  },
  {
    icon: Radio,
    title: 'Real-time alerting',
    description: 'Route alerts to Slack, Teams, PagerDuty, or email with per-severity routing rules.'
  },
  {
    icon: ShieldHalf,
    title: 'Remediation workflows',
    description: 'Policy updates, system restrictions, and provider blocking launch from the incident with one click.'
  }
];

const incidents = [
  { id: 'inc-1042', title: 'PII transmitted to unapproved provider', severity: 'Critical', status: 'Investigating', tone: 'text-rose-300', sla: 'SLA 4h' },
  { id: 'inc-1041', title: 'Financial data exposure in staging agent', severity: 'High', status: 'Open', tone: 'text-amber-300', sla: 'SLA 8h' },
  { id: 'inc-1040', title: 'Anomalous embedding extraction pattern', severity: 'Medium', status: 'Investigating', tone: 'text-sky-300', sla: 'SLA 24h' },
  { id: 'inc-1039', title: 'Health data crossing EU boundary', severity: 'High', status: 'Open', tone: 'text-amber-300', sla: 'SLA 8h' }
];

export default function IncidentsPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Product · Incidents"
        title="AI incidents, handled with the rigor they deserve."
        description="When policy is violated or data leaks, Sentinel gives your team the full picture — severity, SLA, context, and remediation paths — in one queue."
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'Read the audit trail', href: '/product/audit' }}
      >
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[rgba(15,23,42,0.95)] p-4 shadow-panel backdrop-blur-xl sm:rounded-[2rem] sm:p-5">
          <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),_transparent_45%)]" />
          <div className="relative space-y-2.5">
            <div className="flex items-center justify-between rounded-[1.25rem] border border-white/10 bg-slate-950/90 px-3.5 py-2.5 text-xs text-slate-300 sm:text-sm">
              <span className="font-semibold text-white">Incident queue</span>
              <span className="rounded-full bg-rose-500/15 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-rose-300">
                3 open
              </span>
            </div>
            {incidents.map(({ id, title, severity, status, tone, sla }) => (
              <div key={id} className="rounded-2xl bg-slate-950/90 px-3.5 py-2.5">
                <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                  <div className="min-w-0">
                    <p className="truncate text-slate-200">{title}</p>
                    <p className="mt-0.5 text-[0.6rem] uppercase tracking-[0.2em] text-slate-500">
                      {id} · {sla}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className={`text-[0.6rem] font-semibold uppercase tracking-[0.2em] ${tone}`}>{severity}</span>
                    <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-slate-400">{status}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { label: 'MTTR', value: '2.1h' },
                { label: 'SLA met', value: '97%' },
                { label: 'Auto-detected', value: '82%' }
              ].map((item) => (
                <div key={item.label} className="rounded-2xl bg-slate-950/85 p-3 text-center">
                  <p className="text-sm font-semibold text-white">{item.value}</p>
                  <p className="mt-0.5 text-[0.55rem] uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MarketingHero>

      <section className="space-y-8">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Capabilities</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">From detection to resolution, with receipts</h2>
        </div>
        <FeatureGrid items={features} />
      </section>

      <Steps
        eyebrow="How it works"
        title="Detect, respond, remediate, prove"
        steps={[
          { title: 'Detect', description: 'Gateway decisions and anomaly signals open incidents automatically with full context.' },
          { title: 'Respond', description: 'Assignees triage with severity and SLA, escalating through owners and on-call.' },
          { title: 'Prove', description: 'The resolved incident archives with timeline, evidence, and audit events intact.' }
        ]}
      />

      <CtaSection
        eyebrow="Incidents"
        title="Your AI estate never sleeps. Neither does your response."
        description="Get detection, escalation, and evidence in one incident loop."
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'See policy engine', href: '/product/policy-engine' }}
      />
    </div>
  );
}
