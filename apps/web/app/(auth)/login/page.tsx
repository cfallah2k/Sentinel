export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6 py-12 text-[var(--text)]">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[var(--surface)] p-8 shadow-panel backdrop-blur-xl">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-sentinel-300">Sentinel</p>
          <h1 className="mt-4 text-3xl font-semibold text-white">Secure your AI data and controls</h1>
        </div>
        <form className="space-y-5">
          <div className="space-y-2 text-sm text-slate-300">
            <label htmlFor="email" className="block">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none transition focus:border-sentinel-500 focus:ring-2 focus:ring-sentinel-500/20"
              placeholder="name@company.com"
            />
          </div>
          <div className="space-y-2 text-sm text-slate-300">
            <label htmlFor="password" className="block">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none transition focus:border-sentinel-500 focus:ring-2 focus:ring-sentinel-500/20"
              placeholder="••••••••"
            />
          </div>
          <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between text-slate-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-white/10 bg-slate-950 text-sentinel-400 focus:ring-sentinel-500" />
              Remember me
            </label>
            <a href="/forgot-password" className="text-sentinel-300 hover:text-white">Forgot password?</a>
          </div>
          <button type="submit" className="w-full rounded-3xl bg-sentinel-500 px-4 py-3 text-sm font-semibold text-white shadow-glow hover:bg-sentinel-400">
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          Need help? <a href="/contact" className="text-sentinel-300 hover:text-white">Contact support</a>
        </p>
      </div>
    </main>
  );
}
