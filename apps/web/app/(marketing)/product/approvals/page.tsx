import { CheckCircle2, Clock, FileStack, History, UserCheck, XCircle } from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';
import FeatureGrid from '@/components/marketing/feature-grid';
import Steps from '@/components/marketing/steps';
import CtaSection from '@/components/marketing/cta-section';

const features = [
  {
    icon: UserCheck,
    title: 'Human-in-the-loop gates',
    description: 'High-risk requests, policy exceptions, and data access hold for a named approver with full context.'
  },
  {
    icon: Clock,
    title: 'SLA-aware routing',
    description: 'Requests escalate automatically as approval deadlines approach — nothing stalls in limbo.'
  },
  {
    icon: FileStack,
    title: 'Context-rich requests',
    description: 'Every approval shows the system, policy, data categories, and reason — decisions happen in seconds.'
  },
  {
    icon: History,
    title: 'Immutable decision history',
    description: 'Every approve, deny, and expire action lands in the audit trail with the decision rationale.'
  },
  {
    icon: CheckCircle2,
    title: 'Batch and automation hooks',
    description: 'Approve in bulk or wire approval flows into Slack, Teams, or your ticketing system.'
  },
  {
    icon: XCircle,
    title: 'Expiry and quarantine',
    description: 'Unanswered requests expire safely, and held requests are denied by default — never silently allowed.'
  }
];

const queue = [
  { id: 'apr-881', title: 'One-time bulk customer enrichment', type: 'High-Risk Request', risk: 'Critical', status: 'Needs approval', tone: 'text-amber-300' },
  { id: 'apr-880', title: 'Open enrollment campaign exception', type: 'Policy Exception', risk: 'High', status: 'Needs approval', tone: 'text-amber-300' },
  { id: 'apr-879', title: 'Pulse Sales Predictor — production', type: 'New System', risk: 'High', status: 'Needs approval', tone: 'text-amber-300' },
  { id: 'apr-878', title: 'Board materials read access', type: 'Data Access', risk: 'Medium', status: 'Approved', tone: 'text-emerald-300' }
];

export default function ApprovalsPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Product · Approvals"
        title="Human judgment where it matters, automation everywhere else."
        description="Sentinel gates high-risk AI actions behind approval workflows with full context, SLA tracking, and an immutable record — so risk decisions are made by people and proven to auditors."
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'See incident handling', href: '/product/incidents' }}
      >
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[var(--surface-strong)] p-4 shadow-panel backdrop-blur-xl sm:rounded-[2rem] sm:p-5">
          <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),_transparent_45%)]" />
          <div className="relative space-y-2.5">
            <div className="flex items-center justify-between rounded-[1.25rem] border border-white/10 bg-slate-950/90 px-3.5 py-2.5 text-xs text-slate-300 sm:text-sm">
              <span className="font-semibold text-white">Approval queue</span>
              <span className="rounded-full bg-sentinel-500/15 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-sentinel-200">
                3 awaiting
              </span>
            </div>
            {queue.map(({ id, title, type, risk, status, tone }) => (
              <div key={id} className="rounded-2xl bg-slate-950/90 px-3.5 py-2.5">
                <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                  <div className="min-w-0">
                    <p className="truncate text-slate-200">{title}</p>
                    <p className="mt-0.5 text-[0.6rem] uppercase tracking-[0.2em] text-slate-500">
                      {id} · {type} · {risk} risk
                    </p>
                  </div>
                  <span className={`shrink-0 text-[0.6rem] font-semibold uppercase tracking-[0.2em] ${tone}`}>{status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MarketingHero>

      <section className="space-y-8">
        <div className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Capabilities</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">Fast decisions, safe defaults</h2>
        </div>
        <FeatureGrid items={features} />
      </section>

      <Steps
        eyebrow="How it works"
        title="From held to decided in one flow"
        steps={[
          { title: 'Policy triggers a hold', description: 'A request matches a require-approval condition and is queued with full context.' },
          { title: 'Approver acts', description: 'The right approver sees risk, scope, and reason — and approves, denies, or escalates.' },
          { title: 'The gate resolves', description: 'Approved requests release with a time bound; denied requests never reach the model.' }
        ]}
      />

      <CtaSection
        eyebrow="Approvals"
        title="Give risky AI actions a human conscience."
        description="Approval flows run natively — or route into the tools your team already lives in."
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'Read the audit trail', href: '/product/audit' }}
      />
    </div>
  );
}
