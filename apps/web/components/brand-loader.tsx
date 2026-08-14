import { ShieldAlert } from 'lucide-react';

export default function BrandLoader({ label = 'Loading your control plane' }: { label?: string }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-5 px-6 py-20 text-center" role="status" aria-label={label}>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sentinel-500 to-cyan-400 shadow-glow">
        <span className="absolute inset-0 animate-pulse rounded-2xl bg-sentinel-500/30" />
        <ShieldAlert className="h-6 w-6 text-white" size={24} />
      </span>
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-white">Sentinel</p>
        <p className="mt-1 text-[0.6rem] uppercase tracking-[0.2em] text-slate-500">AI Control Plane</p>
      </div>
      <div className="flex items-center gap-1.5" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-sentinel-400"
            style={{ animation: `flow-pulse 1s ease-in-out ${i * 0.15}s infinite` }}
          />
        ))}
      </div>
      <p className="text-[0.65rem] uppercase tracking-[0.25em] text-slate-600">
        <span className="sr-only">{label}</span>
        {label}
      </p>
    </div>
  );
}