import AuthCard from '../../../components/auth-card';

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6 py-12 text-[var(--text)]">
      <AuthCard
        title="Set a new password"
        description="Create a strong password for your Sentinel account and keep your AI governance controls secure."
      >
        <form className="space-y-5">
          <div className="space-y-2 text-sm text-slate-300">
            <label htmlFor="new-password" className="block">New password</label>
            <input
              id="new-password"
              type="password"
              className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none transition focus:border-sentinel-500 focus:ring-2 focus:ring-sentinel-500/20"
            />
          </div>
          <div className="space-y-2 text-sm text-slate-300">
            <label htmlFor="confirm-password" className="block">Confirm password</label>
            <input
              id="confirm-password"
              type="password"
              className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none transition focus:border-sentinel-500 focus:ring-2 focus:ring-sentinel-500/20"
            />
          </div>
          <button type="submit" className="w-full rounded-3xl bg-sentinel-500 px-4 py-3 text-sm font-semibold text-white shadow-glow hover:bg-sentinel-400">
            Update password
          </button>
        </form>
      </AuthCard>
    </main>
  );
}
