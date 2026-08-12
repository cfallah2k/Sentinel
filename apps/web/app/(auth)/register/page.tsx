import AuthCard from '../../../components/auth-card';

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6 py-12 text-[var(--text)]">
      <AuthCard
        title="Create your Sentinel identity"
        description="Start your enterprise AI governance journey with secure onboarding, permissioned access, and compliance-aware controls."
        footer={
          <p>
            Already have an account? <a href="/login" className="text-sentinel-300 hover:text-white">Log in</a>
          </p>
        }
      >
        <form className="space-y-5">
          {[
            { label: 'Full name', type: 'text', name: 'name', placeholder: 'Jane Doe' },
            { label: 'Work email', type: 'email', name: 'email', placeholder: 'name@company.com' },
            { label: 'Organization name', type: 'text', name: 'org', placeholder: 'Acme Security' },
            { label: 'Country', type: 'text', name: 'country', placeholder: 'United States' },
            { label: 'Password', type: 'password', name: 'password', placeholder: '••••••••' }
          ].map((field) => (
            <div key={field.name} className="space-y-2 text-sm text-slate-300">
              <label htmlFor={field.name} className="block">{field.label}</label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none transition focus:border-sentinel-500 focus:ring-2 focus:ring-sentinel-500/20"
              />
            </div>
          ))}

          <label className="flex items-start gap-3 text-sm text-slate-400">
            <input type="checkbox" className="mt-1 h-4 w-4 rounded border-white/10 bg-slate-950 text-sentinel-400 focus:ring-sentinel-500" />
            <span>I accept the terms and understand Sentinel is an AI governance platform.</span>
          </label>

          <button type="submit" className="w-full rounded-3xl bg-sentinel-500 px-4 py-3 text-sm font-semibold text-white shadow-glow hover:bg-sentinel-400">
            Register
          </button>
        </form>
      </AuthCard>
    </main>
  );
}
