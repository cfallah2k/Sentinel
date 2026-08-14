import Link from 'next/link';
import { ArrowRight, BookOpen, CalendarDays, FileText, PlayCircle, ScrollText } from 'lucide-react';
import MarketingHero from '@/components/marketing/hero';
import CtaSection from '@/components/marketing/cta-section';

const featured = {
  title: 'Nigeria, Ghana & Kenya: the data protection stack African AI teams can\u2019t ignore',
  description:
    'Forty-plus African countries now enforce data protection laws and the AU\u2019s Malabo Convention is in force. A practical breakdown of the frameworks Sentinel is mapping controls against — and what they mean for AI deployments.',
  category: 'Compliance',
  readTime: '9 min read',
  date: 'Aug 6, 2026',
  href: '/resources'
};

const posts = [
  {
    title: 'How AI passports turn model registries into audit evidence',
    description: 'Why metadata-rich AI inventories are the backbone of every serious governance program.',
    category: 'Governance',
    readTime: '6 min read',
    date: 'Jul 30, 2026',
    icon: ScrollText,
    href: '/resources'
  },
  {
    title: 'Five data classification patterns for LLM pipelines',
    description: 'Detector placement, redaction order, and how to avoid false positives at inference time.',
    category: 'Engineering',
    readTime: '8 min read',
    date: 'Jul 24, 2026',
    icon: FileText,
    href: '/resources'
  },
  {
    title: 'Gateway-level policy: stopping PII leaks before they happen',
    description: 'A field guide to request interception, token inspection, and allow-block-redact decisioning.',
    category: 'Security',
    readTime: '7 min read',
    date: 'Jul 17, 2026',
    icon: BookOpen,
    href: '/resources'
  },
  {
    title: 'Building an audit trail your data protection officer will love',
    description: 'Immutable logs, evidence collection, and the telemetry that makes regulatory inspection painless.',
    category: 'Compliance',
    readTime: '5 min read',
    date: 'Jul 9, 2026',
    icon: PlayCircle,
    href: '/resources'
  },
  {
    title: 'Incident response for AI: a 4-step playbook',
    description: 'From prompt injection to data exposure — how to triage, escalate, and remediate AI incidents.',
    category: 'Security',
    readTime: '10 min read',
    date: 'Jun 28, 2026',
    icon: CalendarDays,
    href: '/resources'
  },
  {
    title: 'Cost, risk, and control: running self-hosted LLMs under policy',
    description: 'What changes when inference moves on-premises, and what stays the same.',
    category: 'Engineering',
    readTime: '6 min read',
    date: 'Jun 19, 2026',
    icon: BookOpen,
    href: '/resources'
  }
];

const categories = ['All', 'Security', 'Compliance', 'Governance', 'Engineering'];

export default function BlogPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Blog"
        title="Notes from the front line of AI governance."
        description="Deep dives on policy engines, data classification, audit engineering, and the regulations shaping enterprise AI — written by the team building Sentinel."
      >
        <div className="flex flex-col gap-3">
          {['AI governance', 'Policy engineering', 'Nigeria & Ghana DPA', 'Data classification'].map((topic) => (
            <div
              key={topic}
              className="flex items-center justify-between rounded-[1.25rem] border border-white/10 bg-[var(--surface-strong)] px-4 py-3 text-xs text-slate-300 shadow-panel backdrop-blur-xl sm:text-sm"
            >
              <span>{topic}</span>
              <ArrowRight className="h-4 w-4 text-sentinel-300" />
            </div>
          ))}
        </div>
      </MarketingHero>

      <section className="relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-sentinel-500/10 blur-3xl" />
        <div className="relative grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <div className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.25em] text-slate-500">
              <span className="rounded-full border border-sentinel-500/35 bg-sentinel-500/10 px-3 py-1 text-sentinel-300">
                {featured.category}
              </span>
              <span>{featured.readTime}</span>
              <span>{featured.date}</span>
            </div>
            <h2 className="mt-4 text-lg font-semibold leading-snug text-white sm:text-2xl">{featured.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">{featured.description}</p>
            <Link
              href={featured.href}
              className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-sentinel-300 transition hover:text-sentinel-200 sm:text-sm"
            >
              Read the feature <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {['Policy engine', 'Nigeria & Ghana DPA', 'Audit trail', 'Classification'].map((label) => (
              <div key={label} className="rounded-[1.25rem] border border-white/10 bg-slate-950/90 p-4">
                <p className="text-[0.6rem] uppercase tracking-[0.25em] text-slate-500">Featured</p>
                <p className="mt-2 text-sm font-semibold text-white">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Latest articles</p>
            <h2 className="mt-2 text-lg font-semibold text-white sm:text-xl">Fresh thinking on AI governance</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition hover:border-sentinel-500/30 hover:text-white"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {posts.map(({ icon: Icon, ...post }) => (
            <Link
              key={post.title}
              href={post.href}
              className="group flex flex-col rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sentinel-500/25 sm:rounded-[1.5rem] sm:p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sentinel-500/10 text-sentinel-300">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-[0.6rem] uppercase tracking-[0.25em] text-slate-500">{post.category}</span>
              </div>
              <h3 className="mt-5 text-sm font-semibold leading-snug text-white transition group-hover:text-sentinel-200 sm:text-base">
                {post.title}
              </h3>
              <p className="mt-2.5 flex-1 text-xs leading-6 text-slate-400">{post.description}</p>
              <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4 text-[0.65rem] uppercase tracking-[0.2em] text-slate-500">
                <span>{post.readTime}</span>
                <span>{post.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CtaSection
        eyebrow="Never miss a post"
        title="Get governance insights in your inbox."
        description="One email a month on policy engines, classification, and the regulations shaping AI."
        primary={{ label: 'Request a demo', href: '/request-demo' }}
        secondary={{ label: 'Browse resources', href: '/resources' }}
      />
    </div>
  );
}
