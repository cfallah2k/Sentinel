import AuthCard from '../../../components/auth-card';

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6 py-12 text-[var(--text)]">
      <AuthCard
        title="Reset your password"
        description="Enter your work email and we’ll send a secure reset link to restore access safely."
      >
        <form className="space-y-5">
          <div className="space-y-2 text-sm text-slate-300">
            <label htmlFor="email" className="block">Email</label>
            <input
              id="email"
              type="email"
              className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none transition focus:border-sentinel-500 focus:ring-2 focus:ring-sentinel-500/20"
              placeholder="name@company.com"
            />
          </div>
          <button type="submit" className="w-full rounded-3xl bg-sentinel-500 px-4 py-3 text-sm font-semibold text-white shadow-glow hover:bg-sentinel-400">
            Send reset link
          </button>
        </form>
      </AuthCard>
    </main>
  );
}
