export default function TermsPage() {
  const sections = [
    {
      title: 'Service agreement overview',
      description: 'Sentinel provides governance services under enterprise terms designed for security, compliance, and data protection. Specific contractual terms will be defined in the final agreement.'
    },
    {
      title: 'Usage and access',
      description: 'Access is controlled through authenticated API keys, user roles, and policy-based governance. Use is subject to your organization’s service authorization and usage limits.'
    },
    {
      title: 'Data handling',
      description: 'Data processed through Sentinel is treated according to privacy and security commitments. Sensitive content, logs, and audit records are protected by the platform’s access controls.'
    },
    {
      title: 'Liability and support',
      description: 'Support, uptime commitments, and liability terms are negotiated as part of enterprise agreements and are aligned with governance requirements.'
    }
  ];

  return (
    <main className="mx-auto max-w-6xl px-6 py-20 text-[var(--text)]">
      <section className="rounded-[2rem] border border-white/10 bg-[var(--surface)] p-10 shadow-panel backdrop-blur-xl">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.35em] text-sentinel-300">Terms</p>
          <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Terms of service and enterprise governance commitments</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            These terms provide a foundation for how Sentinel supports your organization with secure, compliant AI governance. Final terms are prepared as part of the formal purchase agreement.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {sections.map((section) => (
            <div key={section.title} className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-8 shadow-glow">
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{section.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-8 text-slate-300">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Legal readiness</p>
          <p className="mt-4 text-sm leading-7">
            Sentinel’s terms are designed for enterprises that require strong controls, secure deployment, and audit-aligned governance. Final legal language will reflect service levels, confidentiality, and compliance commitments.
          </p>
        </div>
      </section>
    </main>
  );
}
