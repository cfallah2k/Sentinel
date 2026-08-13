import { Activity, CheckCircle2, Clock, ExternalLink, Radio } from 'lucide-react';
import Link from 'next/link';
import CtaSection from '@/components/marketing/cta-section';

interface StatusItem {
  name: string;
  description: string;
  status: 'Operational' | 'Degraded' | 'Maintenance' | 'Outage';
  uptime: number;
}

const services: StatusItem[] = [
  { name: 'AI Gateway', description: 'Policy evaluation and request proxying', status: 'Operational', uptime: 99.99 },
  { name: 'Policy Engine', description: 'Rule evaluation and decision API', status: 'Operational', uptime: 99.99 },
  { name: 'Classification', description: 'Detector pipelines and redaction', status: 'Operational', uptime: 99.97 },
  { name: 'Audit & Events', description: 'Event ingestion and audit log writes', status: 'Operational', uptime: 99.99 },
  { name: 'Registry & Passports', description: 'AI systems, applications, and providers', status: 'Operational', uptime: 99.95 },
  { name: 'Reports', description: 'Scheduled report generation', status: 'Degraded', uptime: 99.12 },
  { name: 'Dashboard', description: 'Web application and APIs', status: 'Operational', uptime: 99.98 },
  { name: 'Notifications', description: 'Alerts, webhooks, and escalations', status: 'Operational', uptime: 99.93 },
  { name: 'Integrations', description: 'SIEM and identity provider connectors', status: 'Maintenance', uptime: 98.84 }
];

const statusStyles: Record<StatusItem['status'], { label: string; dot: string; badge: string }> = {
  Operational: { label: 'Operational', dot: 'bg-emerald-400', badge: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' },
  Degraded: { label: 'Degraded', dot: 'bg-amber-400', badge: 'border-amber-500/30 bg-amber-500/10 text-amber-300' },
  Maintenance: { label: 'Maintenance', dot: 'bg-sky-400', badge: 'border-sky-500/30 bg-sky-500/10 text-sky-300' },
  Outage: { label: 'Outage', dot: 'bg-rose-400', badge: 'border-rose-500/30 bg-rose-500/10 text-rose-300' }
};

const incidents = [
  { title: 'Reports generation delayed during batch window', status: 'Monitoring', severity: 'Degraded', time: 'Resolved in 1h 12m', date: 'Aug 11, 2026' },
  { title: 'Gateway latency spike in US-East', status: 'Resolved', severity: 'Operational', time: 'Resolved in 24m', date: 'Aug 4, 2026' },
  { title: 'Classification index rebuild', status: 'Completed', severity: 'Maintenance', time: 'Completed in 18m', date: 'Jul 27, 2026' },
  { title: 'Audit ingestion backpressure', status: 'Resolved', severity: 'Degraded', time: 'Resolved in 41m', date: 'Jul 15, 2026' }
];

export default function StatusPage() {
  const operationalCount = services.filter((s) => s.status === 'Operational').length;
  const overall = services.every((s) => s.status === 'Operational') ? 'All systems operational' : 'Partial service disruption';

  return (
    <div className="space-y-16 lg:space-y-24">
      <section className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          {overall}
        </span>
        <h1 className="mt-5 text-2xl font-semibold leading-snug tracking-[-0.03em] text-white sm:text-3xl lg:text-4xl">
          Sentinel system status
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
          Live status for the gateway, policy engine, classification, audit, and reporting services.
          {operationalCount} of {services.length} services are operational right now.
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

      <section className="mx-auto max-w-3xl space-y-3">
        {services.map((service) => {
          const style = statusStyles[service.status];
          return (
            <div
              key={service.name}
              className="rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-4 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3.5">
                  <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${style.dot} shadow-glow`} />
                  <div>
                    <h2 className="text-sm font-semibold text-white sm:text-base">{service.name}</h2>
                    <p className="mt-0.5 text-xs text-slate-500">{service.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-slate-800 sm:block">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sentinel-500 to-cyan-400"
                      style={{ width: `${Math.min(service.uptime, 100)}%` }}
                    />
                  </div>
                  <span className="w-16 text-right text-xs font-semibold text-slate-300">{service.uptime.toFixed(2)}%</span>
                  <span className={`rounded-full border px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] ${style.badge}`}>
                    {style.label}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <p className="pt-2 text-center text-xs leading-6 text-slate-500">
          Uptime reflects the trailing 90 days. Service-level targets are documented in our{' '}
          <Link href="/legal/terms" className="text-sentinel-300 transition hover:text-sentinel-200">
            service agreement
          </Link>
          .
        </p>
      </section>

      <section className="mx-auto max-w-3xl space-y-6">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Recent incidents</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Incident history</h2>
        </div>
        <div className="space-y-3">
          {incidents.map((incident) => {
            const style = statusStyles[incident.severity as keyof typeof statusStyles];
            return (
              <div
                key={incident.title}
                className="flex flex-col gap-3 rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-4 shadow-panel backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:rounded-[1.5rem] sm:p-5"
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
