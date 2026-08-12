import { Bell, Search, UserCircle } from 'lucide-react';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[rgba(2,6,23,0.88)] px-6 py-4 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Control plane</p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Secure AI data flows at enterprise scale</h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">Search, review, and act on AI risk signals from a single audit-ready command center.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-[1.75fr_0.9fr] lg:w-[560px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search policies, providers, incidents"
              className="w-full rounded-full border border-white/10 bg-slate-950/75 px-12 py-3 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15"
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <button className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-slate-300 transition hover:bg-white/10">
              <Bell className="h-4 w-4" />
            </button>
            <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10">
              <UserCircle className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
