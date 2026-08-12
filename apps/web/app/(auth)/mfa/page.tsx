import AuthCard from '../../../components/auth-card';

export default function MfaPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6 py-12 text-[var(--text)]">
      <AuthCard
        title="Verify your identity"
        description="Confirm it’s really you by entering the secure authenticator code from your device."
      >
        <form className="space-y-5">
          <div className="space-y-2 text-sm text-slate-300">
            <label htmlFor="code" className="block">Authentication code</label>
            <input
              id="code"
              type="text"
              inputMode="numeric"
              className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-4 text-center text-2xl tracking-[0.35em] text-white outline-none transition focus:border-sentinel-500 focus:ring-2 focus:ring-sentinel-500/20"
              placeholder="123456"
            />
          </div>
          <button type="submit" className="w-full rounded-3xl bg-sentinel-500 px-4 py-3 text-sm font-semibold text-white shadow-glow hover:bg-sentinel-400">
            Verify
          </button>
        </form>
      </AuthCard>
    </main>
  );
}
