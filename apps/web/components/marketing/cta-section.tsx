import Link from 'next/link';

interface CtaSectionProps {
  eyebrow: string;
  title: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}

export default function CtaSection({
  eyebrow,
  title,
  description,
  primary = { label: 'Start free trial', href: '/register' },
  secondary = { label: 'Talk to sales', href: '/contact' }
}: CtaSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.95)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-7">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-3/4 -translate-x-1/2 rounded-full bg-sentinel-500/10 blur-3xl" />
      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">{eyebrow}</p>
          <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">{title}</h2>
          {description ? <p className="mt-2 max-w-2xl text-xs leading-6 text-slate-400 sm:text-sm">{description}</p> : null}
        </div>
        <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
          <Link
            href={primary.href}
            className="inline-flex w-full items-center justify-center rounded-full bg-sentinel-500 px-5 py-2.5 text-xs font-semibold text-white shadow-glow transition hover:bg-sentinel-400 sm:w-auto sm:text-sm"
          >
            {primary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
