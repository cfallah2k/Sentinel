import { Activity, CheckCircle2, Clock, ExternalLink, Radio } from 'lucide-react';
import CtaSection from '@/components/marketing/cta-section';

interface StatusItem {
  name: string;
  description: string;
  status: 'Operational' | 'Degraded' | 'Maintenance' | 'Outage';
}

const services: StatusItem[] = [
  { name: 'AI Gateway', description: 'Policy evaluation and request proxying', status: 'Operational' },
  { name: 'Policy Engine', description: 'Rule evaluation and decision API', status: 'Operational' },
  { name: 'Classification', description: 'Detector pipelines and redaction', status: 'Operational' },
  { name: 'Audit & Events', description: 'Event ingestion and audit log writes', status: 'Operational' },
  { name: 'Registry & Passports', description: 'AI systems, applications, and providers', status: 'Operational' },
  { name: 'Reports', description: 'Scheduled report generation', status: 'Operational' },
  { name: 'Dashboard', description: 'Web application and APIs', status: 'Operational' },
  { name: 'Notifications', description: 'Alerts, webhooks, and escalations', status: 'Operational' },
  { name: 'Integrations', description: 'SIEM and identity provider connectors', status: 'Operational' }
];

const statusStyles: Record<StatusItem['status'], { label: string; dot: string; badge: string }> = {
  Operational: { label: 'Operational', dot: 'bg-emerald-400', badge: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' },
  Degraded: { label: 'Degraded', dot: 'bg-amber-400', badge: 'border-amber-500/30 bg-amber-500/10 text-amber-300' },
  Maintenance: { label: 'Maintenance', dot: 'bg-sky-400', badge: 'border-sky-500/30 bg-sky-500/10 text-sky-300' },
  Outage: { label: 'Outage', dot: 'bg-rose-400', badge: 'border-rose-500/30 bg-rose-500/10 text-rose-300' }
};

const incidents: {
  title: string;
  status: string;
  severity: StatusItem['status'];
  time: string;
  date: string;
}[] = [];

export default function StatusPage() {
  const operationalCount = services.filter((s) => s.status === 'Operational').length;
  const overall = services.every((s) => s.status === 'Operational') ? 'All systems operational' : 'Partial service disruption';

  return (
    <div className="space-y-16 lg:space-y-24">
      <section className="mx-auto max-w-7xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          {overall}
        </span>
        <h1 className="mt-5 text-2xl font-semibold leading-snug tracking-[-0.03em] text-white sm:text-3xl lg:text-4xl">
          Sentinel system status
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
          Live status for the gateway, policy engine, classification, audit, and reporting services.
          {operationalCount} of {services.length} services report as operational right now.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> Last checked just now
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Radio className="h-3.5 w-3.5" /> Updated every 60 seconds
          </span>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-3">
        {services.map((service) => {
          const style = statusStyles[service.status];
          return (
            <div
              key={service.name}
              className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-4 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3.5">
                  <span className="relative mt-1.5 flex h-2.5 w-2.5 shrink-0">
                    <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-50 ${style.dot}`} />
                    <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${style.dot} shadow-glow`} />
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold text-white sm:text-base">{service.name}</h2>
                    <p className="mt-0.5 text-xs text-slate-500">{service.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full border px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] ${style.badge}`}>
                    {style.label}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <p className="pt-2 text-center text-xs leading-6 text-slate-500">
          Sentinel is in early access. Availability commitments for production use are documented per agreement; this
          page will reflect measured uptime once production services are live.
        </p>
      </section>

      <section className="mx-auto max-w-7xl space-y-6">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Recent incidents</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Incident history</h2>
        </div>
        {incidents.length === 0 ? (
          <div className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 text-center text-sm text-slate-400 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem]">
            No incidents reported. Sentinel is in early access — this history begins when production services go live.
          </div>
        ) : (
          <div className="space-y-3">
          {incidents.map((incident) => {
            const style = statusStyles[incident.severity as keyof typeof statusStyles];
            return (
              <div
                key={incident.title}
                className="flex flex-col gap-3 rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-4 shadow-panel backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:rounded-[1.5rem] sm:p-5"
              >
                <div className="flex items-start gap-3.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                  <div>
                    <h3 className="text-sm font-semibold text-white">{incident.title}</h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {incident.date} · {incident.time}
                    </p>
                  </div>
                </div>
                <span className={`self-start rounded-full border px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] sm:self-auto ${style.badge}`}>
                  {incident.status}
                </span>
              </div>
            );
          })}
          </div>
        )}
      </section>

      <CtaSection
        eyebrow="Have a question?"
        title="Our status reflects the platform — our team reflects on every incident."
        description="Get a detailed incident report or subscribe to notifications through your workspace."
        primary={{ label: 'Open support ticket', href: '/contact' }}
        secondary={{ label: 'Talk to sales', href: '/contact' }}
      />

      <p className="flex items-center justify-center gap-2 text-center text-xs text-slate-500">
        <Activity className="h-3.5 w-3.5" />
        Status data is generated for demonstration purposes.
        <ExternalLink className="h-3 w-3" />
      </p>
    </div>
  );
}
