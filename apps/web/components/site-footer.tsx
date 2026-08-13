import Link from 'next/link';

const LinkedInIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
  </svg>
);

const primaryGradient = 'from-sentinel-500 via-sky-500 to-cyan-400';

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/sentinel-ai', icon: LinkedInIcon },
  { label: 'Twitter', href: 'https://twitter.com/sentinel_ai', icon: TwitterIcon },
  { label: 'GitHub', href: 'https://github.com/sentinel-ai', icon: GitHubIcon }
];

const footerColumns = [
  {
    heading: 'Platform',
    links: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'AI Systems', href: '/ai-systems' },
      { label: 'Applications', href: '/applications' },
      { label: 'Providers', href: '/providers' },
      { label: 'Models', href: '/models' },
      { label: 'Data Sources', href: '/data-sources' }
    ]
  },
  {
    heading: 'Governance',
    links: [
      { label: 'Policies', href: '/policies' },
      { label: 'Risk', href: '/risk' },
      { label: 'Compliance', href: '/compliance-admin' },
      { label: 'Audit Center', href: '/audit' },
      { label: 'Approvals', href: '/approvals' },
      { label: 'Incidents', href: '/incidents' }
    ]
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Integrations', href: '/integrations-hub' },
      { label: 'Developer Center', href: '/developer-portal' },
      { label: 'Reports', href: '/reports' },
      { label: 'AI Passports', href: '/ai-passports' },
      { label: 'Government', href: '/government' },
      { label: 'Docs', href: '/docs' }
    ]
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Trust', href: '/trust' },
      { label: 'System Status', href: '/status' },
      { label: 'Contact', href: '/contact' }
    ]
  }
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[var(--bg-soft)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[var(--surface)] p-6 shadow-panel backdrop-blur-xl sm:p-8">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-3/4 -translate-x-1/2 rounded-full bg-sentinel-500/10 blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-sentinel-300">Enterprise AI governance</p>
              <h2 className="mt-2 text-lg font-bold leading-snug text-white sm:text-xl lg:text-2xl">
                Built to protect every AI decision, signal, and workflow
              </h2>
              <p className="mt-3 text-xs leading-6 text-slate-400 sm:text-sm">
                One control plane for AI policy, data governance, and audit-ready trust.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
              <Link
                href="/contact"
                className={`inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r ${primaryGradient} px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-sentinel-500/20 transition hover:opacity-90 sm:w-auto sm:text-sm`}
              >
                Talk to sales
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] lg:gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sentinel-500 via-sky-500 to-cyan-400 text-white shadow-glow">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  <circle cx="12" cy="17" r="4"></circle>
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white">Sentinel</p>
                <p className="text-[0.65rem] text-slate-500">AI Data Governance</p>
              </div>
            </Link>
            <p className="text-xs leading-6 text-slate-400">
              The modern control plane for AI data governance, policy enforcement, and audit-ready trust.
            </p>
            <div className="flex items-center gap-2.5">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-sentinel-500/40 hover:bg-sentinel-500/10 hover:text-white"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">{column.heading}</h3>
              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-slate-400 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/5 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
            <div className="order-1 flex flex-col items-center gap-3 sm:order-1">
              <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
                <a href="/legal/privacy" className="transition-colors hover:text-white">Privacy</a>
                <a href="/legal/terms" className="transition-colors hover:text-white">Terms</a>
                <a href="/legal/cookies" className="transition-colors hover:text-white">Cookies</a>
                <a href="/legal/security" className="transition-colors hover:text-white">Security</a>
              </nav>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                All systems operational
              </span>
            </div>
          </div>
          <p className="text-center text-xs text-slate-500 lg:text-right">
            © {new Date().getFullYear()} Sentinel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}