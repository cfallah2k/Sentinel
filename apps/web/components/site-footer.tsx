import Link from 'next/link';

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Product', href: '/product' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Pricing', href: '/pricing' }
];

const resources = [
  { label: 'Security', href: '/security' },
  { label: 'Developers', href: '/developers' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' }
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[rgba(2,6,23,0.82)] px-6 py-16">
      <div className="mx-auto max-w-7xl space-y-12">
        <div className="rounded-[2rem] border border-white/10 bg-[rgba(15,23,42,0.88)] p-10 shadow-panel backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-sentinel-300">Enterprise AI governance</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Built to protect every AI decision, signal, and workflow.</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-sentinel-500 px-6 py-3 text-sm font-semibold text-white shadow-glow hover:bg-sentinel-400">
                Talk to sales
              </Link>
              <Link href="/register" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white hover:bg-white/10">
                Start free trial
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-sentinel-300">SENTINEL</p>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Trusted AI security for modern enterprise teams.</h2>
            <p className="max-w-xl text-sm leading-7 text-slate-400">
              Sentinel brings clarity, policy enforcement, and audit-ready evidence to every AI data flow across cloud, SaaS, and on-prem systems.
            </p>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Company</p>
            <div className="flex flex-col gap-3 text-sm text-slate-300">
              {companyLinks.map((item) => (
                <Link key={item.href} href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Resources</p>
            <div className="flex flex-col gap-3 text-sm text-slate-300">
              {resources.map((item) => (
                <Link key={item.href} href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-white/5 pt-6 text-sm text-slate-500 sm:flex sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Sentinel. Built for modern AI security teams.</p>
        <p className="mt-4 sm:mt-0">Designed for scale, compliance, and polished enterprise experiences.</p>
      </div>
    </footer>
  );
}
