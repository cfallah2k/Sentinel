import type { ReactNode } from 'react';
import { ShieldCheck } from 'lucide-react';

interface AuthCardProps {
  title: string;
  description: string;
  footer?: ReactNode;
  children: ReactNode;
}

export default function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--surface)] p-8 shadow-[0_35px_100px_rgba(15,23,42,0.2)] backdrop-blur-xl sm:p-10">
      <div className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-sentinel-500/12 blur-3xl" />
      <div className="absolute left-0 top-0 h-1 w-24 rounded-br-full bg-gradient-to-r from-sentinel-500 via-sky-400 to-cyan-300" />
      <div className="relative space-y-6">
        <div className="flex items-center gap-3 text-slate-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-sentinel-500/15 text-sentinel-300 shadow-glow">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-sentinel-300">Identity</p>
            <h1 className="text-3xl font-semibold tracking-tight text-white">{title}</h1>
          </div>
        </div>
        <p className="max-w-prose text-sm leading-7 text-slate-300">{description}</p>
        <div className="space-y-5">{children}</div>
        {footer ? <div className="mt-4 text-sm text-slate-500">{footer}</div> : null}
      </div>
    </div>
  );
}
