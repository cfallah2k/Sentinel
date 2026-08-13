import type { ReactNode } from 'react';
import Link from 'next/link';

const navItems = [
  { href: 'health', label: 'Health' },
  { href: 'services', label: 'Services' },
  { href: 'database', label: 'Database' },
  { href: 'cache', label: 'Cache' },
  { href: 'queues', label: 'Queues' },
  { href: 'workers', label: 'Workers' },
  { href: 'providers', label: 'Providers' },
  { href: 'storage', label: 'Storage' },
  { href: 'metrics', label: 'Metrics' },
  { href: 'logs', label: 'Logs' }
];

export function SystemShell({ active, children }: { active: string; children: ReactNode }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-sentinel-300">Admin</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">System Infrastructure</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          Health, services, queues, and platform telemetry for the Sentinel control plane.
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {navItems.map((item) => {
          const isActive = item.label.toLowerCase() === active;
          return (
            <Link
              key={item.href}
              href={`/admin/system/${item.href}`}
              className={`rounded-full border px-3.5 py-1.5 text-[0.7rem] font-semibold transition ${
                isActive
                  ? 'border-sentinel-500/40 bg-sentinel-500/15 text-sentinel-300'
                  : 'border-white/10 bg-white/[0.04] text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
      {children}
    </div>
  );
}