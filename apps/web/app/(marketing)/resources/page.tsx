import { ArrowRight, BookOpen, FileDown, FileText, MonitorPlay, ScrollText } from 'lucide-react';
import Link from 'next/link';
import MarketingHero from '@/components/marketing/hero';
import CtaSection from '@/components/marketing/cta-section';

const featuredGuides = [
  {
    icon: ScrollText,
    kind: 'Guide',
    title: 'The enterprise playbook for EU AI Act compliance',
    description: 'A phased approach to tier mapping, transparency obligations, and audit readiness before enforcement deadlines.',
    readTime: '24 pages',
    href: '/get-started'
  },
  {
    icon: BookOpen,
    kind: 'Whitepaper',
    title: 'Gateway policy engines: the technical deep dive',
    description: 'How request interception, token inspection, and decision caching deliver sub-50ms policy evaluation.',
    readTime: '18 pages',
    href: '/product/ai-gateway'
  },
  {
    icon: FileDown,
    kind: 'Template',
    title: 'AI system risk assessment template',
    description: 'A repeatable scoring rubric for models, agents, and copilots — mapped to NIST AI RMF functions.',
    readTime: 'CSV + DOCX',
    href: '/product/ai-governance'
  }
];

const allResources = [
  { title: 'Data classification catalog for LLM pipelines', kind: 'Guide', format: 'PDF', date: 'Aug 2026' },
  { title: 'Incident response runbook for AI data exposures', kind: 'Runbook', format: 'PDF', date: 'Jul 2026' },
  { title: 'Choosing an AI governance platform: RFP questions', kind: 'Checklist', format: 'DOCX', date: 'Jul 2026' },
  { title: 'SOC 2 evidence automation for AI systems', kind: 'Whitepaper', format: 'PDF', date: 'Jun 2026' },
  { title: 'Redaction strategies for sensitive tokens', kind: 'Guide', format: 'PDF', date: 'Jun 2026' },
  { title: 'AI passport schema reference', kind: 'Reference', format: 'JSON', date: 'May 2026' },
  { title: 'Self-hosted LLM governance field guide', kind: 'Guide', format: 'PDF', date: 'May 2026' },
  { title: 'Prompt injection detection methods', kind: 'Whitepaper', format: 'PDF', date: 'Apr 2026' },
  { title: 'Measuring governance ROI: the metrics that matter', kind: 'Playbook', format: 'PDF', date: 'Apr 2026' }
];

export default function ResourcesPage() {
  return (
    <div className="space-y-16 lg:space-y-24">
      <MarketingHero
        eyebrow="Resources"
        title="Playbooks, guides, and references for AI governance teams."
        description="Practical material built from production deployments — not theory. Take them to your next architecture review."
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'Read the blog', href: '/blog' }}
      />

      <section className="space-y-6">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Featured resources</p>
          <h2 className="mt-2 text-lg font-semibold text-white sm:text-xl">Start with the essentials</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
          {featuredGuides.map(({ icon: Icon, kind, title, description, readTime, href }) => (
            <Link
              key={title}
              href={href}
              className="group flex flex-col rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 shadow-panel backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sentinel-500/25 sm:rounded-[1.5rem] sm:p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sentinel-500/10 text-sentinel-300">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="rounded-full border border-sentinel-500/30 bg-sentinel-500/10 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-sentinel-300">
                  {kind}
                </span>
              </div>
              <h3 className="mt-5 flex-1 text-sm font-semibold leading-snug text-white transition group-hover:text-sentinel-200 sm:text-base">
                {title}
              </h3>
              <p className="mt-2.5 text-xs leading-6 text-slate-400">{description}</p>
              <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500">{readTime}</span>
                <ArrowRight className="h-4 w-4 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-sentinel-300" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">Library</p>
          <h2 className="mt-2 text-lg font-semibold text-white sm:text-xl">Browse every resource</h2>
        </div>
        <div className="space-y-3">
          {allResources.map(({ title, kind, format, date }) => (
            <div
              key={title}
              className="group flex flex-col gap-3 rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-4 shadow-panel backdrop-blur-xl transition hover:border-sentinel-500/25 sm:flex-row sm:items-center sm:justify-between sm:rounded-[1.5rem] sm:p-5"
            >
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sentinel-500/10 text-sentinel-300">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white transition group-hover:text-sentinel-200 sm:text-base">{title}</h3>
                  <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span>{kind}</span>
                    <span>{format}</span>
                    <span>{date}</span>
                  </div>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold text-sentinel-300">
                Download <FileDown className="h-4 w-4" />
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3 lg:gap-6">
        {[
          { icon: MonitorPlay, title: 'Watch a demo', detail: '30-minute live walkthrough', href: '/request-demo' },
          { icon: BookOpen, title: 'Read the docs', detail: 'Guides and API references', href: '/docs' },
          { icon: ScrollText, title: 'Visit the blog', detail: 'Engineering and governance notes', href: '/blog' }
        ].map(({ icon: Icon, title, detail, href }) => (
          <Link
            key={title}
            href={href}
            className="group flex items-center gap-4 rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 shadow-panel backdrop-blur-xl transition duration-300 hover:border-sentinel-500/25 sm:rounded-[1.5rem] sm:p-6"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sentinel-500/10 text-sentinel-300">
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white sm:text-base">{title}</h3>
              <p className="mt-1 text-xs text-slate-400">{detail}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-sentinel-300" />
          </Link>
        ))}
      </section>

      <CtaSection
        eyebrow="Going deeper?"
        title="Try the patterns in a live workspace."
        description="Every guide in this library maps to features you can test today, free."
        primary={{ label: 'Start free trial', href: '/register' }}
        secondary={{ label: 'Request a demo', href: '/request-demo' }}
      />
    </div>
  );
}
