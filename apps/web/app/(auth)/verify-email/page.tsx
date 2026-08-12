import AuthCard from '../../../components/auth-card';

export default function VerifyEmailPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6 py-12 text-[var(--text)]">
      <AuthCard
        title="Verify your email"
        description="A secure verification link has been sent to your work email. Confirm it to continue onboarding."
      >
        <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6 text-center text-slate-200">
          <div className="mb-4 text-4xl">✅</div>
          <p className="text-sm leading-7 text-slate-300">
            We’ve sent a confirmation email to your inbox. Please check your email and follow the link to complete setup.
          </p>
        </div>
      </AuthCard>
    </main>
  );
}
